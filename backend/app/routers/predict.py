from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.schemas.predict_schema import PredictRequest, PredictResponse
from app.services.ml_service import predict_risk
from app.services.explainability_service import get_top_features
from app.services.llm_service import generate_summary
from app.database import get_db
from app.db_models import Prediction

router = APIRouter()

@router.post("/api/predict", response_model=PredictResponse)
def predict(payload: PredictRequest, db: Session = Depends(get_db)):
    try:
        predicted_disorder, patient_df = predict_risk(payload.features)
        explain_result = get_top_features(patient_df)
        summary = generate_summary(predicted_disorder, explain_result["top_features"])

        # Save this prediction to the database, tied only to the anonymized hash
        db_record = Prediction(
            user_hash=payload.user_hash,
            predicted_disorder=predicted_disorder,
            top_features=explain_result["top_features"],
            summary=summary,
        )
        db.add(db_record)
        db.commit()

        return PredictResponse(
            predicted_disorder=predicted_disorder,
            top_features=explain_result["top_features"],
            summary_text=summary,
            disclaimer="This is an informational estimate, not a medical diagnosis."
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))