from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import predict, history, chat
from app.database import engine, Base
from app import db_models


app = FastAPI(title="GeneScope AI API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # temporary — we'll lock this down once we have your real Vercel URL
    allow_methods=["*"],
    allow_headers=["*"],
)
Base.metadata.create_all(bind=engine)
app.include_router(predict.router)
app.include_router(history.router)
app.include_router(chat.router)

@app.get("/")
def root():
    return {"message": "GeneScope AI backend is running"}

if __name__ == "__main__":
    import uvicorn
    import os
    port = int(os.environ.get("PORT", 10000))
    uvicorn.run(app, host="0.0.0.0", port=port)