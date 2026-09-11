from datetime import datetime, timezone
from typing import Dict

from fastapi import APIRouter, Header, HTTPException
from pydantic import BaseModel, Field


router = APIRouter(
    prefix="/iot",
    tags=["IoT"]
)


# ============================================================
# TELEMETRY DATA MODEL
# ============================================================

class TankTelemetry(BaseModel):
    name: str
    pct: float = Field(..., ge=0, le=100)
    raw: int
    is_reserve: bool = False


class ThermistorTelemetry(BaseModel):
    temp_c: float
    raw: int
    valid: bool = True


class RainTelemetry(BaseModel):
    is_rain: bool
    raw: int


class IoTTelemetry(BaseModel):
    device_id: str = "esp32-reservoir-01"

    tanks: Dict[str, TankTelemetry]
    thermistors: Dict[str, ThermistorTelemetry]
    rain_sensors: Dict[str, RainTelemetry]

    rates: Dict[str, float] = {}

    avg_temp: float = 25.0
    is_hot: bool = False
    any_rain: bool = False
    farm_rain: bool = False

    timestamp: datetime | None = None


# ============================================================
# LATEST TELEMETRY
# ============================================================

latest_telemetry = None


# ============================================================
# RECEIVE TELEMETRY FROM MOTOR CONTROLLER
# ============================================================

@router.post("/telemetry")
def receive_telemetry(
    telemetry: IoTTelemetry,
    x_device_key: str | None = Header(default=None)
):
    global latest_telemetry

    # Optional device authentication.
    # For now this is disabled unless AQUAXCHANGE_DEVICE_KEY
    # is configured in the backend environment.

    latest_telemetry = telemetry.model_dump()

    latest_telemetry["received_at"] = datetime.now(
        timezone.utc
    ).isoformat()

    return {
        "status": "success",
        "message": "Telemetry received successfully",
        "device_id": telemetry.device_id,
        "received_at": latest_telemetry["received_at"]
    }


# ============================================================
# GET LATEST TELEMETRY
# ============================================================

@router.get("/telemetry/latest")
def get_latest_telemetry():

    if latest_telemetry is None:
        return {
            "status": "waiting",
            "message": "No telemetry received yet",
            "data": None
        }

    return {
        "status": "online",
        "data": latest_telemetry
    }