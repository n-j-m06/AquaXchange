from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.services.recommendation import generate_recommendation


router = APIRouter(
    prefix="/recommendations",
    tags=["Recommendations"]
)


@router.post("/{request_id}")
def get_recommendation(
    request_id: int,
    db: Session = Depends(get_db)
):
    return generate_recommendation(request_id, db)