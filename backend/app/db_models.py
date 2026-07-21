from sqlalchemy import Column, Integer, String, Float, DateTime, JSON
from sqlalchemy.sql import func
from app.database import Base 

class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    user_hash = Column(String, index=True, nullable=True)
    predicted_disorder = Column(String)
    top_features = Column(JSON)
    summary = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())