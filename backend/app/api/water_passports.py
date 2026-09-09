import qrcode
import os
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.allocation import Allocation
from app.models.water_source import WaterSource
from app.models.water_passport import WaterPassport


router = APIRouter(
    prefix="/water-passports",
    tags=["Water Passports"]
)


# ============================================================
# CREATE WATER PASSPORT
# ============================================================

@router.post("/{allocation_id}")
def create_water_passport(
    allocation_id: int,
    db: Session = Depends(get_db)
):

    # 1. Find allocation
    allocation = db.query(Allocation).filter(
        Allocation.id == allocation_id
    ).first()

    if not allocation:
        raise HTTPException(
            status_code=404,
            detail="Allocation not found"
        )

    # 2. Check allocation approval
    if allocation.status != "approved":
        raise HTTPException(
            status_code=400,
            detail="Allocation must be approved first"
        )

    # 3. Find water source
    source = db.query(WaterSource).filter(
        WaterSource.id == allocation.source_id
    ).first()

    if not source:
        raise HTTPException(
            status_code=404,
            detail="Water source not found"
        )

    # 4. Check whether passport already exists
    existing = db.query(WaterPassport).filter(
        WaterPassport.allocation_id == allocation_id
    ).first()

    if existing:

        # Generate verification URL
        verification_url = (
    f"https://aquaxchange-backend.onrender.com/"
    f"water-passports/verify/"
)

        # Generate QR code
        qr = qrcode.make(verification_url)

        # Create QR folder
        os.makedirs("qr_codes", exist_ok=True)

        # QR file name
        qr_filename = (
            f"qr_codes/{existing.passport_code}.png"
        )

        # Save QR code
        qr.save(qr_filename)

        return {
            "message": "Water Passport already exists - QR code generated",
            "passport_id": existing.id,
            "passport_code": existing.passport_code,
            "qr_file": qr_filename,
            "verification_url": verification_url
        }

    # ========================================================
    # 5. Generate passport code
    # ========================================================

    passport_code = f"AX-{allocation_id:06d}"

    # ========================================================
    # 6. Create Water Passport
    # ========================================================

    passport = WaterPassport(
        passport_code=passport_code,
        allocation_id=allocation.id,
        request_id=allocation.request_id,
        source_id=allocation.source_id,
        source_name=source.name,
        quantity=allocation.approved_quantity,
        ai_score=allocation.ai_score,
        status="active"
    )

    db.add(passport)
    db.commit()
    db.refresh(passport)

    # ========================================================
    # 7. Generate verification URL
    # ========================================================

    verification_url = (
    f"https://aquaxchange-backend.onrender.com/"
    f"water-passports/verify/"
    f"{passport.passport_code}"
)

    # ========================================================
    # 8. Generate QR code
    # ========================================================

    qr = qrcode.make(verification_url)

    # Create QR folder
    os.makedirs("qr_codes", exist_ok=True)

    # QR file name
    qr_filename = (
        f"qr_codes/{passport.passport_code}.png"
    )

    # Save QR code
    qr.save(qr_filename)

    # ========================================================
    # 9. Return NEW passport details
    # ========================================================

    return {
        "message": "Water Passport generated successfully",
        "passport_id": passport.id,
        "passport_code": passport.passport_code,
        "allocation_id": passport.allocation_id,
        "request_id": passport.request_id,
        "source": passport.source_name,
        "quantity": passport.quantity,
        "ai_score": passport.ai_score,
        "status": passport.status,
        "qr_file": qr_filename,
        "verification_url": verification_url
    }


# ============================================================
# VERIFY WATER PASSPORT
# ============================================================

@router.get("/verify/{passport_code}")
def verify_water_passport(
    passport_code: str,
    db: Session = Depends(get_db)
):

    # Find passport
    passport = db.query(WaterPassport).filter(
        WaterPassport.passport_code == passport_code
    ).first()

    # Passport not found
    if not passport:
        raise HTTPException(
            status_code=404,
            detail="Water Passport not found"
        )

    # Return verification information
    return {
        "verified": True,
        "passport_code": passport.passport_code,
        "allocation_id": passport.allocation_id,
        "request_id": passport.request_id,
        "source": passport.source_name,
        "quantity": passport.quantity,
        "ai_score": passport.ai_score,
        "status": passport.status
    }
# ============================================================
# GET QR CODE
# ============================================================

@router.get("/qr/{passport_code}")
def get_qr_code(
    passport_code: str
):

    qr_filename = f"qr_codes/{passport_code}.png"

    # Check whether QR exists
    if not os.path.exists(qr_filename):
        raise HTTPException(
            status_code=404,
            detail="QR code not found"
        )

    return FileResponse(
        qr_filename,
        media_type="image/png",
        filename=f"{passport_code}.png"
    )