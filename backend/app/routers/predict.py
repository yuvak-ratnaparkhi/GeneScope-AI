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
        predicted_disorder, pred_prob, patient_df = predict_risk(payload.features)
        explain_result = get_top_features(patient_df)
        summary = generate_summary(predicted_disorder, explain_result["top_features"])

        # Calculate dynamic risk score based on model prediction probability & patient risk inputs
        raw_risk = pred_prob * 100.0
        risk_modifier = 0.0
        feat = payload.features

        if feat.get("familyHistory") or feat.get("Genes in mother's side") == 1:
            risk_modifier += 16.5
        if feat.get("lifestyleRisk") or feat.get("H/O substance abuse") == 1:
            risk_modifier += 12.0
        
        patient_age = float(feat.get("Patient Age", feat.get("age", 30)) or 30)
        if patient_age > 45:
            risk_modifier += 9.5
        elif patient_age < 20:
            risk_modifier -= 5.0

        risk_percentage = round(min(94.0, max(2.0, (raw_risk * 0.4) + risk_modifier)), 1)
        confidence = round(min(96.0, max(74.0, raw_risk * 1.05)), 1)

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
            disclaimer="This is an informational estimate, not a medical diagnosis.",
            risk_percentage=risk_percentage,
            confidence=confidence,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))