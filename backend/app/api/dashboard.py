from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.water_source import WaterSource
from app.models.water_request import WaterRequest
from app.models.allocation import Allocation
from app.models.water_passport import WaterPassport


router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/stats")
def get_dashboard_stats(
    db: Session = Depends(get_db)
):

    # Count water sources
    total_sources = db.query(WaterSource).count()

    # Count water requests
    total_requests = db.query(WaterRequest).count()

    # Count allocations
    total_allocations = db.query(Allocation).count()

    # Count approved allocations
    approved_allocations = db.query(Allocation).filter(
        Allocation.status == "approved"
    ).count()

    # Count pending/recommended allocations
    pending_allocations = db.query(Allocation).filter(
        Allocation.status == "recommended"
    ).count()

    # Count rejected allocations
    rejected_allocations = db.query(Allocation).filter(
        Allocation.status == "rejected"
    ).count()

    # Count water passports
    total_passports = db.query(WaterPassport).count()

    # Calculate total available water
    total_available_water = db.query(WaterSource).with_entities(
        WaterSource.available_quantity
    ).all()

    total_water = sum(
        quantity[0] or 0
        for quantity in total_available_water
    )

    # Calculate approved water quantity
    approved_quantities = db.query(
        Allocation.approved_quantity
    ).filter(
        Allocation.status == "approved"
    ).all()

    total_allocated_water = sum(
        quantity[0] or 0
        for quantity in approved_quantities
    )

    # Calculate average AI score
    ai_scores = db.query(
        Allocation.ai_score
    ).all()

    valid_scores = [
        score[0]
        for score in ai_scores
        if score[0] is not None
    ]

    average_ai_score = (
        sum(valid_scores) / len(valid_scores)
        if valid_scores
        else 0
    )

    return {
        "total_water_sources": total_sources,
        "total_water_requests": total_requests,
        "total_allocations": total_allocations,
        "approved_allocations": approved_allocations,
        "pending_allocations": pending_allocations,
        "rejected_allocations": rejected_allocations,
        "total_water_passports": total_passports,
        "total_available_water": total_water,
        "total_allocated_water": total_allocated_water,
        "average_ai_score": round(average_ai_score, 2)
    }