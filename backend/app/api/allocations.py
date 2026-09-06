from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

from app.db.database import get_db
from app.models.allocation import Allocation
from app.models.user import User
from app.api.auth import require_government
from app.websocket.allocation_ws import manager


router = APIRouter(
    prefix="/allocations",
    tags=["Allocations"]
)


# ============================================================
# GET ALL ALLOCATIONS
# ============================================================

@router.get("/")
def get_allocations(
    db: Session = Depends(get_db)
):
    return db.query(Allocation).all()


# ============================================================
# APPROVE ALLOCATION
# GOVERNMENT ONLY
# ============================================================

@router.put("/{allocation_id}/approve")
async def approve_allocation(
    allocation_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_government)
):

    allocation = db.query(Allocation).filter(
        Allocation.id == allocation_id
    ).first()

    if not allocation:
        raise HTTPException(
            status_code=404,
            detail="Allocation not found"
        )

    if allocation.status == "approved":
        raise HTTPException(
            status_code=400,
            detail="Allocation already approved"
        )

    allocation.status = "approved"

    allocation.approved_quantity = (
        allocation.recommended_quantity
    )

    allocation.approved_by = current_user.id

    allocation.approved_at = datetime.now()

    db.commit()
    db.refresh(allocation)
    await manager.broadcast(
    f"Allocation #{allocation.id} approved successfully"
)

    return {
        "message": "Allocation approved successfully",
        "allocation_id": allocation.id,
        "request_id": allocation.request_id,
        "source_id": allocation.source_id,
        "approved_quantity": allocation.approved_quantity,
        "approved_by": current_user.id,
        "status": allocation.status
    }


# ============================================================
# REJECT ALLOCATION
# GOVERNMENT ONLY
# ============================================================

@router.put("/{allocation_id}/reject")
def reject_allocation(
    allocation_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_government)
):

    allocation = db.query(Allocation).filter(
        Allocation.id == allocation_id
    ).first()

    if not allocation:
        raise HTTPException(
            status_code=404,
            detail="Allocation not found"
        )

    if allocation.status == "approved":
        raise HTTPException(
            status_code=400,
            detail="Approved allocation cannot be rejected"
        )

    allocation.status = "rejected"

    allocation.approved_by = current_user.id

    allocation.approved_at = datetime.now()

    db.commit()
    db.refresh(allocation)

    return {
        "message": "Allocation rejected",
        "allocation_id": allocation.id,
        "approved_by": current_user.id,
        "status": allocation.status
    }