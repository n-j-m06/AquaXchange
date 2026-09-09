from app.websocket.allocation_ws import router as allocation_ws_router
from app.api.auth import router as auth_router
from app.api.emergency import router as emergency_router
from app.api.predictions import router as predictions_router
from app.api.routes import router as routes_router
from app.api.map import router as map_router
from app.api.dashboard import router as dashboard_router
from app.api.water_passports import router as water_passports_router
from app.api.allocations import router as allocations_router
from app.api.recommendations import router as recommendation_router
from app.api.water_requests import router as water_requests_router
from app.api.water_sources import router as water_sources_router
from app.db.database import Base, engine
from app.db import base
from sqlalchemy import text
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
Base.metadata.create_all(bind=engine)
app = FastAPI(
    title="AquaXChange API",
    description="AI Powered Intelligent Water Exchange and Decision Support Platform",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(allocation_ws_router)
app.include_router(auth_router)
app.include_router(emergency_router)
app.include_router(predictions_router)
app.include_router(routes_router)
app.include_router(map_router)
app.include_router(dashboard_router)
app.include_router(allocations_router)
app.include_router(recommendation_router)
app.include_router(water_requests_router)
app.include_router(water_sources_router)
app.include_router(water_passports_router)
@app.get("/")
def home():
    return {
        "message": "Welcome to AquaXChange",
        "status": "Backend is running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }
@app.get("/db-test")
def database_test():
    with engine.connect() as connection:
        result = connection.execute(
            text("SELECT version();")
        )
        version = result.scalar()

    return {
        "database": "connected",
        "postgresql_version": version
    }