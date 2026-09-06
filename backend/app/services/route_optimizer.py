from math import radians, sin, cos, sqrt, atan2


def calculate_distance(lat1, lon1, lat2, lon2):
    """
    Calculate distance between two geographic points
    using the Haversine formula.

    Returns distance in kilometers.
    """

    R = 6371  # Earth radius in km

    lat1 = radians(lat1)
    lon1 = radians(lon1)
    lat2 = radians(lat2)
    lon2 = radians(lon2)

    dlat = lat2 - lat1
    dlon = lon2 - lon1

    a = (
        sin(dlat / 2) ** 2
        + cos(lat1)
        * cos(lat2)
        * sin(dlon / 2) ** 2
    )

    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    return R * c


def calculate_route_score(
    availability,
    quality,
    priority,
    distance
):
    """
    Calculate an overall suitability score.

    Higher score = better source.
    """

    # Normalize distance.
    # Closer sources get a higher score.

    if distance <= 1:
        distance_score = 100
    else:
        distance_score = max(
            0,
            100 - (distance * 2)
        )

    # Priority score

    priority_scores = {
        "HIGH": 100,
        "MEDIUM": 70,
        "LOW": 40
    }

    priority_score = priority_scores.get(
        priority.upper(),
        50
    )

    # Final weighted score

    score = (
        availability * 0.35
        + quality * 0.25
        + priority_score * 0.20
        + distance_score * 0.20
    )

    return round(score, 2)