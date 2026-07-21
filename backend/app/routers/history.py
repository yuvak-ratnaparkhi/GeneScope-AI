from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.db_models import Prediction

router = APIRouter()

@router.get("/api/history/{user_hash}")
def get_history(user_hash: str, db: Session = Depends(get_db)):
    records = (
        db.query(Prediction)
        .filter(Prediction.user_hash == user_hash)
        .order_by(Prediction.created_at.desc())
        .all()
    )

    return [
        {
            "id": r.id,
            "predicted_disorder": r.predicted_disorder,
            "top_features": r.top_features,
            "summary": r.summary,
            "created_at": r.created_at,
        }
        for r in records
    ]