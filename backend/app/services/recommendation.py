from math import radians, sin, cos, sqrt, atan2


def calculate_distance(lat1, lon1, lat2, lon2):
    """
    Calculate distance between two coordinates in kilometers.
    """

    R = 6371

    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)

    a = (
        sin(dlat / 2) ** 2
        + cos(radians(lat1))
        * cos(radians(lat2))
        * sin(dlon / 2) ** 2
    )

    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    return R * c


def calculate_score(
    availability_score,
    quality_score,
    priority_score,
    distance_score
):
    """
    Calculate the overall AI recommendation score.
    """

    score = (
        0.40 * availability_score
        + 0.30 * quality_score
        + 0.20 * priority_score
        + 0.10 * distance_score
    )

    return round(score, 2)
from app.models.water_request import WaterRequest
from app.models.water_source import WaterSource
from app.models.allocation import Allocation


def generate_recommendation(request_id, db):
    # 1. Find the water request
    request = db.query(WaterRequest).filter(
        WaterRequest.id == request_id
    ).first()

    if not request:
        return {"error": "Water request not found"}

    # 2. Get all active water sources
    sources = db.query(WaterSource).filter(
        WaterSource.status == "active"
    ).all()

    if not sources:
        return {"error": "No active water sources available"}

    recommendations = []

    # 3. Evaluate every water source
    for source in sources:

        # Skip sources that don't have enough water
        if source.available_quantity < request.quantity_required:
            continue

        # Availability score
        availability_score = min(
            (source.available_quantity / request.quantity_required) * 100,
            100
        )

        # Quality score
        quality_score = source.quality_score

        # Priority score
        if request.priority.lower() == "high":
            priority_score = 100
        elif request.priority.lower() == "medium":
            priority_score = 70
        else:
            priority_score = 40

        # Distance
        distance = calculate_distance(
            request.latitude,
            request.longitude,
            source.latitude,
            source.longitude
        )

        # Higher score for closer sources
        distance_score = max(
            0,
            100 - (distance * 2)
        )

        # Overall AI score
        ai_score = calculate_score(
            availability_score,
            quality_score,
            priority_score,
            distance_score
        )

        recommendations.append({
            "source": source,
            "distance": distance,
            "ai_score": ai_score
        })

    # 4. Check whether a suitable source was found
    if not recommendations:
        return {
            "error": "No water source has sufficient available quantity"
        }

    # 5. Select the highest-scoring source
    best = max(
        recommendations,
        key=lambda x: x["ai_score"]
    )

    best_source = best["source"]

    # 6. Save recommendation in database
    allocation = Allocation(
        request_id=request.id,
        source_id=best_source.id,
        recommended_quantity=request.quantity_required,
        ai_score=best["ai_score"],
        status="recommended"
    )

    db.add(allocation)
    db.commit()
    db.refresh(allocation)

    # 7. Return recommendation
    return {
        "request_id": request.id,
        "recommended_source": best_source.name,
        "source_id": best_source.id,
        "recommended_quantity": request.quantity_required,
        "distance_km": round(best["distance"], 2),
        "ai_score": best["ai_score"],
        "status": "recommended"
    }