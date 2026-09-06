from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.sql import func

from app.db.database import Base


class WaterRequest(Base):
    __tablename__ = "water_requests"

    id = Column(Integer, primary_key=True, index=True)

    requester_id = Column(Integer, nullable=False)

    water_type = Column(String, nullable=False)

    quantity_required = Column(Float, nullable=False)

    priority = Column(String, default="normal")

    required_by = Column(DateTime(timezone=True), nullable=True)

    latitude = Column(Float, nullable=False)

    longitude = Column(Float, nullable=False)

    purpose = Column(String, nullable=True)

    status = Column(String, default="pending")

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )