from fastapi import APIRouter
from pydantic import BaseModel

from app.services.demand_predictor import predict_demand


router = APIRouter(
    prefix="/predictions",
    tags=["Demand Prediction"]
)


# Input format
class DemandInput(BaseModel):
    temperature: float
    rainfall: float
    month: int


@router.post("/demand")
def get_demand_prediction(data: DemandInput):

    # Validate month
    if data.month < 1 or data.month > 12:
        return {
            "error": "Month must be between 1 and 12"
        }

    # Get prediction from ML model
    prediction = predict_demand(
        temperature=data.temperature,
        rainfall=data.rainfall,
        month=data.month
    )

    return {
        "temperature": data.temperature,
        "rainfall": data.rainfall,
        "month": data.month,
        "predicted_water_demand": prediction,
        "unit": "litres"
    }