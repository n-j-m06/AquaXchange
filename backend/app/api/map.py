from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.water_source import WaterSource
from app.models.water_request import WaterRequest


router = APIRouter(
    prefix="/map",
    tags=["Map"]
)


# ============================================================
# WATER SOURCES
# ============================================================

@router.get("/water-sources")
def get_map_water_sources(
    db: Session = Depends(get_db)
):

    sources = db.query(WaterSource).all()

    features = []

    for source in sources:

        features.append({
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    source.longitude,
                    source.latitude
                ]
            },
            "properties": {
                "id": source.id,
                "name": source.name,
                "source_type": source.source_type,
                "available_quantity": source.available_quantity,
                "quality_score": source.quality_score,
                "status": source.status
            }
        })

    return {
        "type": "FeatureCollection",
        "features": features
    }


# ============================================================
# WATER REQUESTS
# ============================================================

@router.get("/water-requests")
def get_map_water_requests(
    db: Session = Depends(get_db)
):

    requests = db.query(WaterRequest).all()

    features = []

    for request in requests:

        features.append({
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    request.longitude,
                    request.latitude
                ]
            },
            "properties": {
                "id": request.id,
                "requester_id": request.requester_id,
                "water_type": request.water_type,
                "quantity_required": request.quantity_required,
                "priority": request.priority,
                "purpose": request.purpose,
                "status": request.status
            }
        })

    return {
        "type": "FeatureCollection",
        "features": features
    }