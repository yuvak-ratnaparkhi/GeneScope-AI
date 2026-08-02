from pydantic import BaseModel
from typing import Dict, Any

class PredictRequest(BaseModel):
    features: Dict[str, Any]  # Accepts both ScreeningFormData or full raw feature dict
    user_hash: str | None = None

class PredictResponse(BaseModel):
    predicted_disorder: str
    top_features: Dict[str, float]
    summary_text: str
    disclaimer: str
    risk_percentage: float = 65.0
    confidence: float = 88.5