from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.water_request import WaterRequest
from app.models.water_source import WaterSource
from app.models.allocation import Allocation


router = APIRouter(
    prefix="/emergency",
    tags=["Emergency Allocation"]
)


@router.post("/allocate/{request_id}")
def emergency_allocate(
    request_id: int,
    db: Session = Depends(get_db)
):

    # 1. Find water request
    request = db.query(WaterRequest).filter(
        WaterRequest.id == request_id
    ).first()

    if not request:
        raise HTTPException(
            status_code=404,
            detail="Water request not found"
        )

    # 2. Check whether request is already allocated
    existing = db.query(Allocation).filter(
        Allocation.request_id == request_id
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Request already has an allocation"
        )

    # 3. Find available water sources
    sources = db.query(WaterSource).filter(
        WaterSource.available_quantity > 0,
        WaterSource.status == "active"
    ).all()

    if not sources:
        raise HTTPException(
            status_code=404,
            detail="No active water sources available"
        )

    # 4. Determine required quantity
    required_quantity = request.quantity_required

    # 5. Select the best source
    # Priority is given to:
    # - Higher available quantity
    # - Higher quality score

    best_source = max(
        sources,
        key=lambda source: (
            source.quality_score or 0,
            source.available_quantity
        )
    )

    # 6. Determine emergency allocation quantity
    allocated_quantity = min(
        required_quantity,
        best_source.available_quantity
    )

    # 7. Calculate emergency AI score
    quality = best_source.quality_score or 0

    availability_score = min(
        (best_source.available_quantity /
         required_quantity) * 100,
        100
    )

    priority_score = 100

    emergency_score = (
        availability_score * 0.40
        + quality * 0.30
        + priority_score * 0.30
    )

    emergency_score = round(
        emergency_score,
        2
    )

    # 8. Create emergency allocation
    allocation = Allocation(
        request_id=request.id,
        source_id=best_source.id,
        recommended_quantity=allocated_quantity,
        approved_quantity=0,
        ai_score=emergency_score,
        status="recommended"
    )

    db.add(allocation)

    # 9. Reserve the water
    best_source.available_quantity -= allocated_quantity

    db.commit()
    db.refresh(allocation)

    # 10. Return result
    return {
        "message": "Emergency allocation recommendation generated",
        "request_id": request.id,
        "request_priority": request.priority,
        "required_quantity": required_quantity,
        "source_id": best_source.id,
        "source_name": best_source.name,
        "allocated_quantity": allocated_quantity,
        "remaining_source_water": best_source.available_quantity,
        "emergency_ai_score": emergency_score,
        "status": allocation.status
    }