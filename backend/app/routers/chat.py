from fastapi import APIRouter, HTTPException
from app.schemas.chat_schema import ChatRequest, ChatResponse
from app.services.chat_service import get_chat_reply

router = APIRouter()

@router.post("/api/chat", response_model=ChatResponse)
def chat(payload: ChatRequest):
    try:
        reply = get_chat_reply(payload.message, payload.context)
        return ChatResponse(reply=reply)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))