import os
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()

DISCLAIMER = "This is an informational estimate, not a medical diagnosis. Please consult a qualified doctor for any health concerns."

def get_client() -> genai.Client | None:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return None
    try:
        return genai.Client(api_key=api_key)
    except Exception:
        return None

def generate_summary(predicted_disorder: str, top_features: dict) -> str:
    features_text = ", ".join([f"{k}" for k in top_features.keys()])

    prompt = f"""
You are a medical communication assistant. A screening model has flagged a possible
risk category. Explain this to a patient in simple, clear, non-alarming language.

Predicted category: {predicted_disorder}
Top contributing factors: {features_text}

Rules:
- Do NOT diagnose. Do NOT suggest medications or dosages.
- Keep it under 120 words.
- End with a suggestion to consult a doctor.
- Be calm and reassuring, not alarming.
"""

    try:
        client = get_client()
        if not client:
            raise ValueError("GEMINI_API_KEY not configured")

        response = client.models.generate_content(
            model="gemini-flash-latest",
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.4,
                max_output_tokens=1024 
            )
        )
        return response.text.strip()
    except Exception as e:
        return (
            f"Based on the screening, you were flagged under the '{predicted_disorder}' "
            f"category, mainly influenced by: {features_text}. "
            f"{DISCLAIMER}"
        )