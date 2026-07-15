from fastapi import FastAPI
from app.routers import predict

app = FastAPI(title="GeneScope AI API")
app.include_router(predict.router)

@app.get("/")
def root():
    return {"message": "GeneScope AI backend is running"}