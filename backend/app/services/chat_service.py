from google.genai import types
from app.services.llm_service import get_client, DISCLAIMER

SYSTEM_PROMPT = """You are the GeneScope AI Health Assistant.

STRICT RULES — never break these:
1. You NEVER diagnose. You only explain an existing screening result the user already has.
2. You NEVER name medications, dosages, or treatment plans. If asked, say: "That's a question for your doctor — I can help explain this screening, but treatment decisions need a medical professional."
3. You NEVER guess about symptoms not covered by the user's actual screening result.
4. When a question goes beyond explaining the result, redirect to a doctor clearly and kindly.
5. Keep responses concise (under 120 words), warm, and easy to understand — avoid clinical jargon.
6. If context about a screening result is provided, use it to answer specifically. If not, answer generally but still follow all rules above.
7. You ONLY discuss health, genetics, and topics directly related to this screening tool. If asked something entirely unrelated (general trivia, current events, coding help, etc.), politely decline and redirect: "I'm focused on helping you understand your genetic risk screening — for anything outside that, I'm not the right tool!" Do NOT answer the off-topic question first.
"""

def get_chat_reply(message: str, context: dict | None) -> str:
    context_text = ""
    if context:
        context_text = f"\n\nThe user's most recent screening result: {context}"

    full_prompt = f"{SYSTEM_PROMPT}{context_text}\n\nUser question: {message}"

    try:
        client = get_client()
        if not client:
            raise ValueError("GEMINI_API_KEY not configured")

        response = client.models.generate_content(
            model="gemini-flash-latest",
            contents=full_prompt,
            config=types.GenerateContentConfig(
                temperature=0.4,
                max_output_tokens=1024
            )
        )
        return response.text.strip()
    except Exception as e:
        return (
            "I'm having trouble responding right now. "
            f"{DISCLAIMER}"
        )