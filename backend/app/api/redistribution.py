from typing import Dict, Any, List


# ============================================================
# AQUAXCHANGE REDISTRIBUTION CONFIGURATION
# ============================================================

CRITICAL_LEVEL = 34.0

# Reservoir is NEVER selected as the redistribution source.
SOURCE_TANKS = {
    "1": "City Tank",
    "2": "Farm Tank",
    "3": "Industrial Tank",
}

ALL_TANKS = {
    "1": "City Tank",
    "2": "Farm Tank",
    "3": "Industrial Tank",
    "4": "Government Reservoir",
}


# Physical pump topology
#
# Pump 1: City -> Farm
# Pump 2: Farm -> Industrial
# Pump 3: Industrial -> Reservoir
# Pump 4: Reservoir -> City
#
PUMP_ROUTES = {
    ("1", "2"): ["1"],
    ("2", "3"): ["2"],
    ("3", "4"): ["3"],
    ("4", "1"): ["4"],
}


# ============================================================
# FIND LOWEST / CRITICAL TANK
# ============================================================

def find_critical_tanks(tanks: Dict[str, Any]) -> List[str]:
    """
    Return all tanks whose level is below the critical threshold.
    """

    critical = []

    for tank_id in ALL_TANKS:

        tank = tanks.get(tank_id)

        if not tank:
            continue

        level = float(tank.get("pct", 0))

        if level < CRITICAL_LEVEL:
            critical.append(tank_id)

    return critical


# ============================================================
# FIND LARGEST NON-RESERVOIR SOURCE
# ============================================================

def find_largest_source(
    tanks: Dict[str, Any],
    destination_id: str
) -> str | None:

    candidates = []

    for tank_id in SOURCE_TANKS:

        # Never use the destination itself as the source.
        if tank_id == destination_id:
            continue

        tank = tanks.get(tank_id)

        if not tank:
            continue

        level = float(tank.get("pct", 0))

        # A source should itself remain above the critical level.
        if level >= CRITICAL_LEVEL:
            candidates.append(
                (tank_id, level)
            )

    if not candidates:
        return None

    # Largest available non-reservoir tank
    candidates.sort(
        key=lambda item: item[1],
        reverse=True
    )

    return candidates[0][0]


# ============================================================
# DETERMINE PHYSICAL ROUTE
# ============================================================

def find_physical_route(
    source_id: str,
    destination_id: str
) -> List[str] | None:

    if source_id == destination_id:
        return None

    # Direct pump route
    if (source_id, destination_id) in PUMP_ROUTES:
        return PUMP_ROUTES[
            (source_id, destination_id)
        ]

    # Current hardware is a circular network:
    #
    # 1 -> 2 -> 3 -> 4 -> 1
    #
    # Therefore find the route by following the
    # physical pump topology.

    current = source_id
    route = []
    visited = set()

    while current != destination_id:

        if current in visited:
            return None

        visited.add(current)

        next_node = None
        pump = None

        for (source, destination), pumps in PUMP_ROUTES.items():

            if source == current:
                next_node = destination
                pump = pumps[0]
                break

        if next_node is None:
            return None

        route.append(pump)
        current = next_node

    return route


# ============================================================
# CREATE REDISTRIBUTION DECISION
# ============================================================

def calculate_redistribution(
    telemetry: Dict[str, Any]
) -> Dict[str, Any]:

    tanks = telemetry.get("tanks", {})

    if not tanks:
        return {
            "redistribution_required": False,
            "reason": "No tank telemetry available."
        }

    # --------------------------------------------------------
    # 1. Find tanks below 34%
    # --------------------------------------------------------

    critical_tanks = find_critical_tanks(tanks)

    if not critical_tanks:

        return {
            "redistribution_required": False,
            "reason": (
                f"All tanks are at or above "
                f"{CRITICAL_LEVEL}%."
            ),
            "threshold": CRITICAL_LEVEL
        }

    # --------------------------------------------------------
    # 2. Select the most critical destination
    # --------------------------------------------------------

    destination_id = min(
        critical_tanks,
        key=lambda tank_id: float(
            tanks[tank_id].get("pct", 0)
        )
    )

    destination_level = float(
        tanks[destination_id].get("pct", 0)
    )

    # --------------------------------------------------------
    # 3. Find largest non-reservoir source
    # --------------------------------------------------------

    source_id = find_largest_source(
        tanks,
        destination_id
    )

    if source_id is None:

        return {
            "redistribution_required": True,
            "status": "no_source_available",
            "reason": (
                "A critical tank exists, but no "
                "eligible non-reservoir source "
                "is above the minimum threshold."
            ),
            "destination": {
                "id": destination_id,
                "name": ALL_TANKS[destination_id],
                "level": destination_level
            },
            "critical_threshold": CRITICAL_LEVEL
        }

    source_level = float(
        tanks[source_id].get("pct", 0)
    )

    # --------------------------------------------------------
    # 4. Determine physical pump route
    # --------------------------------------------------------

    pump_route = find_physical_route(
        source_id,
        destination_id
    )

    if not pump_route:

        return {
            "redistribution_required": True,
            "status": "no_physical_route",
            "reason": (
                "A source and destination were identified, "
                "but the current hardware topology does "
                "not provide a valid route."
            ),
            "source": {
                "id": source_id,
                "name": ALL_TANKS[source_id],
                "level": source_level
            },
            "destination": {
                "id": destination_id,
                "name": ALL_TANKS[destination_id],
                "level": destination_level
            }
        }

    # --------------------------------------------------------
    # 5. Calculate the basic deficit
    # --------------------------------------------------------

    deficit = max(
        0,
        CRITICAL_LEVEL - destination_level
    )

    # Keep the source above 34%.
    available_surplus = max(
        0,
        source_level - CRITICAL_LEVEL
    )

    transfer_level = min(
        deficit,
        available_surplus
    )

    # --------------------------------------------------------
    # 6. Return decision
    # --------------------------------------------------------

    return {
        "redistribution_required": True,
        "status": "redistribution_planned",

        "threshold": CRITICAL_LEVEL,

        "source": {
            "id": source_id,
            "name": ALL_TANKS[source_id],
            "level": source_level
        },

        "destination": {
            "id": destination_id,
            "name": ALL_TANKS[destination_id],
            "level": destination_level
        },

        "deficit": round(deficit, 2),

        "available_source_surplus": round(
            available_surplus,
            2
        ),

        "recommended_transfer": round(
            transfer_level,
            2
        ),

        "pump_route": pump_route,

        "pump_commands": pump_route
    }