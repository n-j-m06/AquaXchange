from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.api import iot
from app.services.redistribution import calculate_redistribution


router = APIRouter(
    prefix="/iot",
    tags=["IoT Control"]
)


# ============================================================
# PENDING PUMP COMMANDS
# ============================================================

# Stores the latest command waiting for the physical controller
pending_commands = {}
# Stores the remaining pump sequence for an active redistribution.
# Example:
# {
#     "esp32-reservoir-01": {
#         "sequence": ["3", "4", "1"],
#         "current_index": 0
#     }
# }
redistribution_sequences = {}

# ============================================================
# PUMP COMMAND MODEL
# ============================================================

class PumpCommand(BaseModel):
    device_id: str
    command: str


# ============================================================
# ALLOWED PUMP COMMANDS
# ============================================================

ALLOWED_COMMANDS = {
    "1",  # Pump 1: City -> Farm
    "2",  # Pump 2: Farm -> Industrial
    "3",  # Pump 3: Industrial -> Government Reservoir
    "4",  # Pump 4: Government Reservoir -> City
    "5",  # Pumps 1 & 2
    "6",  # Pumps 3 & 4
    "a",  # All pumps
    "0",  # Stop all pumps
}


# ============================================================
# HARDWARE ONLINE CONFIGURATION
# ============================================================

# ESP32 + motor_controller.py is considered online only if
# telemetry has been received within this many seconds.

DEVICE_TIMEOUT_SECONDS = 10


# ============================================================
# CHECK HARDWARE STATUS
# ============================================================

def is_hardware_online():
    """
    Hardware is considered online only if the motor controller
    has sent telemetry recently.
    """

    telemetry = iot.latest_telemetry

    # No telemetry has ever been received
    if telemetry is None:
        return False

    received_at = telemetry.get("received_at")

    # Telemetry does not contain a timestamp
    if not received_at:
        return False

    try:
        received_time = datetime.fromisoformat(
            received_at.replace("Z", "+00:00")
        )

        now = datetime.now(timezone.utc)

        age = (now - received_time).total_seconds()

        return age <= DEVICE_TIMEOUT_SECONDS

    except Exception:
        return False
def start_redistribution_sequence(device_id, pump_sequence):
    """
    Start a redistribution pump sequence.

    Only the first pump is queued initially.
    The remaining pumps are stored until the sequence
    is explicitly advanced.
    """

    if not pump_sequence:
        return None

    redistribution_sequences[device_id] = {
        "sequence": pump_sequence,
        "current_index": 0,
    }

    first_pump = pump_sequence[0]

    pending_commands[device_id] = first_pump

    return first_pump

# ============================================================
# GET HARDWARE STATUS
# ============================================================

@router.get("/hardware-status")
def get_hardware_status():
    """
    Returns whether the physical ESP32/motor controller
    is currently online.
    """

    online = is_hardware_online()

    if online:
        return {
            "status": "online",
            "hardware": "ESP32",
            "message": "ESP32 hardware is connected and sending telemetry."
        }

    return {
        "status": "offline",
        "hardware": "ESP32",
        "message": "ESP32 hardware is offline. Connect the USB cable and start motor_controller.py."
    }


# ============================================================
# SEND PUMP COMMAND
# ============================================================

@router.post("/pump-command")
def send_pump_command(command_data: PumpCommand):

    # --------------------------------------------------------
    # CHECK HARDWARE FIRST
    # --------------------------------------------------------

    if not is_hardware_online():
        raise HTTPException(
            status_code=503,
            detail=(
                "ESP32 hardware is offline. "
                "Connect the USB cable and start motor_controller.py."
            )
        )

    # --------------------------------------------------------
    # VALIDATE COMMAND
    # --------------------------------------------------------

    command = command_data.command.strip().lower()

    if command not in ALLOWED_COMMANDS:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid pump command: {command}"
        )

    # --------------------------------------------------------
    # QUEUE COMMAND
    # --------------------------------------------------------

    pending_commands[command_data.device_id] = command

    return {
        "status": "command_queued",
        "device_id": command_data.device_id,
        "command": command,
        "hardware": "online"
    }


# ============================================================
# MOTOR CONTROLLER FETCHES COMMAND
# ============================================================

@router.get("/pump-command")
def get_pump_command(device_id: str):

    command = pending_commands.pop(device_id, None)

    return {
        "device_id": device_id,
        "command": command
    }


# ============================================================
# AI WATER REDISTRIBUTION
# ============================================================

@router.post("/redistribute")
def redistribute_water():

    # --------------------------------------------------------
    # CHECK HARDWARE
    # --------------------------------------------------------

    if not is_hardware_online():
        raise HTTPException(
            status_code=503,
            detail=(
                "ESP32 hardware is offline. "
                "Connect the USB cable and start motor_controller.py."
            )
        )

    # --------------------------------------------------------
    # CHECK TELEMETRY
    # --------------------------------------------------------

    if iot.latest_telemetry is None:
        raise HTTPException(
            status_code=503,
            detail="No live IoT telemetry available."
        )

    # --------------------------------------------------------
    # CALCULATE REDISTRIBUTION
    # --------------------------------------------------------

    decision = calculate_redistribution(
        iot.latest_telemetry
    )

    # --------------------------------------------------------
    # NO REDISTRIBUTION REQUIRED
    # --------------------------------------------------------

    if decision.get("status") != "redistribution_required":
        return decision

    # --------------------------------------------------------
    # GET PUMP SEQUENCE
    # --------------------------------------------------------

    pump_sequence = decision.get(
        "pump_sequence",
        []
    )

    if not pump_sequence:
        return {
            **decision,
            "command_status": "no_pump_required",
        }

    # --------------------------------------------------------
    # DEVICE
    # --------------------------------------------------------

    device_id = iot.latest_telemetry.get(
        "device_id",
        "esp32-reservoir-01"
    )

    # --------------------------------------------------------
    # START SEQUENCE
    # --------------------------------------------------------

    first_pump = start_redistribution_sequence(
        device_id,
        pump_sequence
    )

    # --------------------------------------------------------
    # RETURN RESULT
    # --------------------------------------------------------

    return {
        **decision,
        "command_status": "queued",
        "device_id": device_id,
        "next_pump": first_pump,
        "sequence_position": 1,
        "sequence_length": len(pump_sequence),
        "message": (
            f"Redistribution started. "
            f"Pump {first_pump} queued."
        ),
    }
@router.get("/redistribute/status")
def redistribution_status(
    device_id: str = "esp32-reservoir-01"
):
    """
    Return the current redistribution sequence.
    """

    sequence_data = redistribution_sequences.get(device_id)

    if not sequence_data:
        return {
            "status": "idle",
            "device_id": device_id,
            "sequence": [],
            "current_pump": None,
        }

    sequence = sequence_data["sequence"]
    current_index = sequence_data["current_index"]

    current_pump = None

    if current_index < len(sequence):
        current_pump = sequence[current_index]

    return {
        "status": "active",
        "device_id": device_id,
        "sequence": sequence,
        "current_pump": current_pump,
        "sequence_position": current_index + 1,
        "sequence_length": len(sequence),
    }
@router.get("/redistribute-command")
def get_redistribute_command(device_id: str = "esp32-reservoir-01"):
    """
    Return the current redistribution pump command.

    IMPORTANT:
    The sequence does NOT advance merely because the controller
    polls this endpoint. The controller must call the completion
    endpoint after the physical pump operation finishes.
    """

    sequence_data = redistribution_sequences.get(device_id)

    if not sequence_data:
        return {
            "device_id": device_id,
            "command": None,
            "status": "idle"
        }

    sequence = sequence_data["sequence"]
    current_index = sequence_data["current_index"]

    if current_index >= len(sequence):
        redistribution_sequences.pop(device_id, None)

        return {
            "device_id": device_id,
            "command": None,
            "status": "completed"
        }

    return {
        "device_id": device_id,
        "command": sequence[current_index],
        "status": "active",
        "sequence_position": current_index + 1,
        "sequence_length": len(sequence)
    }
@router.post("/redistribute-command-complete")
def complete_redistribution_command(
    device_id: str = "esp32-reservoir-01"
):
    """
    Mark the current redistribution pump as completed
    and advance to the next pump in the sequence.
    """

    sequence_data = redistribution_sequences.get(device_id)

    if not sequence_data:
        return {
            "device_id": device_id,
            "status": "idle",
            "message": "No active redistribution sequence."
        }

    sequence = sequence_data["sequence"]
    current_index = sequence_data["current_index"]

    if current_index >= len(sequence):
        redistribution_sequences.pop(device_id, None)

        return {
            "device_id": device_id,
            "status": "completed"
        }

    completed_pump = sequence[current_index]

    sequence_data["current_index"] += 1

    if sequence_data["current_index"] >= len(sequence):
        redistribution_sequences.pop(device_id, None)

        return {
            "device_id": device_id,
            "status": "completed",
            "completed_pump": completed_pump,
            "message": "Redistribution sequence completed."
        }

    next_pump = sequence[sequence_data["current_index"]]

    return {
        "device_id": device_id,
        "status": "active",
        "completed_pump": completed_pump,
        "next_pump": next_pump,
        "sequence_position": sequence_data["current_index"] + 1,
        "sequence_length": len(sequence)
    }