from fastapi import APIRouter, HTTPException
from app.schemas.predict_schema import PredictRequest, PredictResponse
from app.services.ml_service import predict_risk
from app.services.explainability_service import get_top_features

router = APIRouter()

@router.post("/api/predict", response_model=PredictResponse)
def predict(payload: PredictRequest):
    try:
        predicted_disorder, patient_df = predict_risk(payload.features)
        explain_result = get_top_features(patient_df)

        return PredictResponse(
            predicted_disorder=predicted_disorder,
            top_features=explain_result["top_features"],
            disclaimer="This is an informational estimate, not a medical diagnosis."
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))