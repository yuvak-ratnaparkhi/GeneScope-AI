from pydantic import BaseModel
from typing import Dict

class PredictRequest(BaseModel):
    features: Dict[str, float] # e.g. {"Patient Age": 7, "Blood cell count (mcL)": 4,9, ...}

class PredictResponse(BaseModel):
    predicted_disorder: str
    top_features: Dict[str, float]
    summary_text: str
    disclaimer: str