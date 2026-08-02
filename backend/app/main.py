from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from app.routers import predict, history, chat
from app.database import engine, Base
from app import db_models


import os

app = FastAPI(title="GeneScope AI API")

frontend_url = os.getenv("FRONTEND_URL")
allowed_origins = [frontend_url] if frontend_url else ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
Base.metadata.create_all(bind=engine)
app.include_router(predict.router)
app.include_router(history.router)
app.include_router(chat.router)

@app.get("/favicon.ico", include_in_schema=False)
def favicon():
    return Response(status_code=204)

@app.get("/")
def root():
    return {"message": "GeneScope AI backend is running"}

if __name__ == "__main__":
    import uvicorn
    import os
    port = int(os.environ.get("PORT", 10000))
    uvicorn.run(app, host="0.0.0.0", port=port)