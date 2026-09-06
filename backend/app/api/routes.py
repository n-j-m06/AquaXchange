from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.water_request import WaterRequest
from app.models.water_source import WaterSource

from app.services.route_optimizer import (
    calculate_distance,
    calculate_route_score
)


router = APIRouter(
    prefix="/routes",
    tags=["Route Optimization"]
)


@router.post("/optimize/{request_id}")
def optimize_route(
    request_id: int,
    db: Session = Depends(get_db)
):

    # ---------------------------------------------------------
    # 1. Find water request
    # ---------------------------------------------------------

    request = db.query(WaterRequest).filter(
        WaterRequest.id == request_id
    ).first()

    if not request:
        raise HTTPException(
            status_code=404,
            detail="Water request not found"
        )

    # ---------------------------------------------------------
    # 2. Get available water sources
    # ---------------------------------------------------------

    sources = db.query(WaterSource).filter(
        WaterSource.status == "active",
        WaterSource.available_quantity > 0
    ).all()

    if not sources:
        raise HTTPException(
            status_code=404,
            detail="No active water sources available"
        )

    # ---------------------------------------------------------
    # 3. Calculate route and score for every source
    # ---------------------------------------------------------

    recommendations = []

    for source in sources:

        # Calculate geographical distance

        distance = calculate_distance(
            request.latitude,
            request.longitude,
            source.latitude,
            source.longitude
        )

        # Availability score
        #
        # If source has enough water for the request,
        # give maximum availability score.

        if source.available_quantity >= request.quantity_required:
            availability_score = 100
        else:
            availability_score = (
                source.available_quantity
                / request.quantity_required
            ) * 100

        availability_score = min(
            availability_score,
            100
        )

        # Calculate overall suitability score

        score = calculate_route_score(
            availability=availability_score,
            quality=source.quality_score,
            priority=request.priority,
            distance=distance
        )

        recommendations.append({
            "source_id": source.id,
            "source_name": source.name,
            "distance_km": round(distance, 2),
            "available_quantity": source.available_quantity,
            "quality_score": source.quality_score,
            "availability_score": round(
                availability_score,
                2
            ),
            "priority": request.priority,
            "route_score": score
        })

    # ---------------------------------------------------------
    # 4. Sort by highest score
    # ---------------------------------------------------------

    recommendations.sort(
        key=lambda x: x["route_score"],
        reverse=True
    )

    # ---------------------------------------------------------
    # 5. Select best source
    # ---------------------------------------------------------

    best_source = recommendations[0]

    # ---------------------------------------------------------
    # 6. Return result
    # ---------------------------------------------------------

    return {
        "request_id": request.id,
        "required_quantity": request.quantity_required,
        "best_source": best_source,
        "alternatives": recommendations[1:]
    }