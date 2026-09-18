# ============================================================
# AQUAXCHANGE WATER REDISTRIBUTION ENGINE
# ============================================================

CRITICAL_LEVEL = 34.0

# Physical tank IDs
CITY = "1"
FARM = "2"
INDUSTRY = "3"
RESERVOIR = "4"

TANK_NAMES = {
    CITY: "City Tank",
    FARM: "Farm Tank",
    INDUSTRY: "Industrial Tank",
    RESERVOIR: "Government Reservoir",
}

# The reservoir must NEVER be selected as the redistribution source.
SOURCE_TANKS = {
    CITY,
    FARM,
    INDUSTRY,
}

# Physical pump connections
#
# Pump 1: City -> Farm
# Pump 2: Farm -> Industry
# Pump 3: Industry -> Reservoir
# Pump 4: Reservoir -> City
#
ROUTES = {
    (CITY, FARM): ["1"],
    (FARM, INDUSTRY): ["2"],
    (INDUSTRY, RESERVOIR): ["3"],
    (RESERVOIR, CITY): ["4"],
}


# ============================================================
# FIND CRITICAL TANKS
# ============================================================

def find_critical_tanks(tanks):
    """
    Find every tank below the critical 34% level.
    """

    critical = []

    for tank_id, tank in tanks.items():

        pct = float(tank.get("pct", 0))

        if pct < CRITICAL_LEVEL:
            critical.append({
                "id": tank_id,
                "name": TANK_NAMES.get(
                    tank_id,
                    tank.get("name", f"Tank {tank_id}")
                ),
                "level": pct,
                "deficit": round(
                    CRITICAL_LEVEL - pct,
                    2
                ),
            })

    return critical


# ============================================================
# FIND LARGEST NON-RESERVOIR SOURCE
# ============================================================

def find_largest_source(tanks, destination_id):
    """
    Find the largest available non-reservoir tank.

    The destination itself cannot be the source.
    """

    candidates = []

    for tank_id in SOURCE_TANKS:

        if tank_id == destination_id:
            continue

        tank = tanks.get(tank_id)

        if not tank:
            continue

        pct = float(tank.get("pct", 0))

        # Source must itself remain above the critical level.
        if pct >= CRITICAL_LEVEL:
            candidates.append({
                "id": tank_id,
                "name": TANK_NAMES[tank_id],
                "level": pct,
                "surplus": round(
                    pct - CRITICAL_LEVEL,
                    2
                ),
            })

    if not candidates:
        return None

    return max(
        candidates,
        key=lambda source: source["level"]
    )


# ============================================================
# FIND PHYSICAL ROUTE
# ============================================================

def find_physical_route(source_id, destination_id):
    """
    Determine the pump sequence required to move water
    through the physical circular network.

    The route follows the existing hardware topology.
    """

    if source_id == destination_id:
        return []

    # Direct route
    if (source_id, destination_id) in ROUTES:
        return ROUTES[(source_id, destination_id)]

    # Follow the physical circular network.
    current = source_id
    visited = set()
    pumps = []

    while current != destination_id:

        if current in visited:
            return None

        visited.add(current)

        next_tank = None
        pump = None

        for (start, end), pump_sequence in ROUTES.items():

            if start == current:
                next_tank = end
                pump = pump_sequence[0]
                break

        if next_tank is None:
            return None

        pumps.append(pump)
        current = next_tank

    return pumps


# ============================================================
# CALCULATE REDISTRIBUTION
# ============================================================

def calculate_redistribution(telemetry):
    """
    Calculate the redistribution decision from live telemetry.

    Rule:

    1. Find tanks below 34%.
    2. Select the most critical destination.
    3. Find the largest non-reservoir source.
    4. Keep the source at or above 34%.
    5. Determine the physical pump route.
    """

    tanks = telemetry.get("tanks", {})

    if not tanks:
        return {
            "status": "no_data",
            "message": "No tank telemetry available."
        }

    # --------------------------------------------------------
    # FIND CRITICAL DESTINATIONS
    # --------------------------------------------------------

    critical_tanks = find_critical_tanks(tanks)

    if not critical_tanks:
        return {
            "status": "balanced",
            "message": (
                "No tank is below the critical "
                "34% level. Redistribution is not required."
            ),
            "critical_level": CRITICAL_LEVEL,
            "critical_tanks": [],
        }

    # Most critical tank = lowest percentage
    destination = min(
        critical_tanks,
        key=lambda tank: tank["level"]
    )

    destination_id = destination["id"]

    # --------------------------------------------------------
    # FIND LARGEST SOURCE
    # --------------------------------------------------------

    source = find_largest_source(
        tanks,
        destination_id
    )

    if source is None:
        return {
            "status": "insufficient_supply",
            "message": (
                "A tank is below 34%, but there is "
                "no eligible non-reservoir source "
                "above the critical level."
            ),
            "critical_level": CRITICAL_LEVEL,
            "critical_tanks": critical_tanks,
            "destination": destination,
        }

    source_id = source["id"]

    # --------------------------------------------------------
    # DETERMINE PHYSICAL ROUTE
    # --------------------------------------------------------

    pump_sequence = find_physical_route(
        source_id,
        destination_id
    )

    if pump_sequence is None:
        return {
            "status": "no_route",
            "message": (
                "A source and destination were found, "
                "but no valid physical pump route exists."
            ),
            "source": source,
            "destination": destination,
        }

    # --------------------------------------------------------
    # CALCULATE TRANSFER LEVEL
    # --------------------------------------------------------

    destination_deficit = (
        CRITICAL_LEVEL -
        destination["level"]
    )

    source_surplus = (
        source["level"] -
        CRITICAL_LEVEL
    )

    transfer_level = min(
        destination_deficit,
        source_surplus
    )

    transfer_level = round(
        transfer_level,
        2
    )

    # --------------------------------------------------------
    # RETURN DECISION
    # --------------------------------------------------------

    return {
        "status": "redistribution_required",

        "message": (
            f"Redistribute water from "
            f"{source['name']} to "
            f"{destination['name']}."
        ),

        "critical_level": CRITICAL_LEVEL,

        "source": {
            "id": source["id"],
            "name": source["name"],
            "current_level": source["level"],
            "remaining_level": round(
                source["level"] - transfer_level,
                2
            ),
        },

        "destination": {
            "id": destination["id"],
            "name": destination["name"],
            "current_level": destination["level"],
            "target_level": round(
                destination["level"] + transfer_level,
                2
            ),
        },

        "transfer_level": transfer_level,

        "pump_sequence": pump_sequence,

        "pump_count": len(pump_sequence),

        "physical_route": {
            "source": source["name"],
            "destination": destination["name"],
            "pumps": pump_sequence,
        },

        "critical_tanks": critical_tanks,
    }