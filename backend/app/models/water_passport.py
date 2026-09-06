from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.sql import func

from app.db.database import Base


class WaterPassport(Base):
    __tablename__ = "water_passports"

    id = Column(Integer, primary_key=True, index=True)

    passport_code = Column(String, unique=True, nullable=False)

    allocation_id = Column(Integer, nullable=False)
    request_id = Column(Integer, nullable=False)
    source_id = Column(Integer, nullable=False)

    source_name = Column(String, nullable=False)
    quantity = Column(Float, nullable=False)

    ai_score = Column(Float, nullable=True)

    status = Column(String, default="active")

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )