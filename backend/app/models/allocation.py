from sqlalchemy import Column, Integer, Float, String, DateTime
from sqlalchemy.sql import func

from app.db.database import Base


class Allocation(Base):
    __tablename__ = "allocations"

    id = Column(Integer, primary_key=True, index=True)

    request_id = Column(Integer, nullable=False)
    source_id = Column(Integer, nullable=False)

    recommended_quantity = Column(Float, nullable=False)
    approved_quantity = Column(Float, nullable=True)

    ai_score = Column(Float, nullable=True)

    status = Column(String, default="recommended")

    approved_by = Column(Integer, nullable=True)

    approved_at = Column(DateTime(timezone=True), nullable=True)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )