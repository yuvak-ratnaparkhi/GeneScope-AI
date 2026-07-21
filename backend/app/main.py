from fastapi import FastAPI
from app.routers import predict, history
from app.database import engine, Base
from app import db_models

app = FastAPI(title="GeneScope AI API")
Base.metadata.create_all(bind=engine)
app.include_router(predict.router)
app.include_router(history.router)

@app.get("/")
def root():
    return {"message": "GeneScope AI backend is running"}