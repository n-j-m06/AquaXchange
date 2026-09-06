from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.water_source import WaterSource

router = APIRouter(
    prefix="/water-sources",
    tags=["Water Sources"]
)


@router.post("/")
def create_water_source(
    name: str,
    source_type: str,
    available_quantity: float,
    quality_score: float,
    latitude: float,
    longitude: float,
    db: Session = Depends(get_db)
):
    water_source = WaterSource(
        name=name,
        source_type=source_type,
        available_quantity=available_quantity,
        quality_score=quality_score,
        latitude=latitude,
        longitude=longitude,
        status="active"
    )

    db.add(water_source)
    db.commit()
    db.refresh(water_source)

    return water_source


@router.get("/")
def get_water_sources(db: Session = Depends(get_db)):
    return db.query(WaterSource).all()