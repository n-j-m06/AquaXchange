from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/iot", tags=["IoT Control"])


# Stores the latest command waiting for the physical controller
pending_commands = {}


class PumpCommand(BaseModel):
    device_id: str
    command: str


ALLOWED_COMMANDS = {
    "1",  # Pump 1: City -> Farm
    "2",  # Pump 2: Farm -> Industrial
    "3",  # Pump 3: Industrial -> Government
    "4",  # Pump 4: Government -> City
    "5",  # Pumps 1 & 2
    "6",  # Pumps 3 & 4
    "a",  # All pumps
    "0",  # Stop all pumps
}


@router.post("/pump-command")
def send_pump_command(command_data: PumpCommand):
    command = command_data.command.strip().lower()

    if command not in ALLOWED_COMMANDS:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid pump command: {command}"
        )

    pending_commands[command_data.device_id] = command

    return {
        "status": "command_queued",
        "device_id": command_data.device_id,
        "command": command,
    }


@router.get("/pump-command")
def get_pump_command(device_id: str):
    command = pending_commands.pop(device_id, None)

    return {
        "device_id": device_id,
        "command": command,
    }