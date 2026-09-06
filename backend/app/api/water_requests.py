from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.water_request import WaterRequest

router = APIRouter(
    prefix="/water-requests",
    tags=["Water Requests"]
)


@router.post("/")
def create_water_request(
    requester_id: int,
    water_type: str,
    quantity_required: float,
    priority: str,
    latitude: float,
    longitude: float,
    purpose: str = None,
    db: Session = Depends(get_db)
):
    request = WaterRequest(
        requester_id=requester_id,
        water_type=water_type,
        quantity_required=quantity_required,
        priority=priority,
        latitude=latitude,
        longitude=longitude,
        purpose=purpose
    )

    db.add(request)
    db.commit()
    db.refresh(request)

    return request


@router.get("/")
def get_water_requests(db: Session = Depends(get_db)):
    return db.query(WaterRequest).all()