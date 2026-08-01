from pydantic import BaseModel
from typing import Optional, Dict

class ChatRequest(BaseModel):
    message: str
    context: Optional[Dict] = None  # last prediction result, if available

class ChatResponse(BaseModel):
    reply: str