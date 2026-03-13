import os
import re
import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai

app = FastAPI(title="SafeChat AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://safe-chat-ai.sidai.in",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Gemini client
client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])

CLASSIFY_PROMPT = """You are a message safety classifier. Analyze the following message and classify it.

You MUST respond with ONLY a valid JSON object, no extra text, no markdown, no code fences.

The JSON must have exactly these fields:
- "category": one of "Normal", "Spam", "Harassment", "Scam", "Promotional"
- "confidence": a float between 0.0 and 1.0 indicating how confident you are
- "flagged_patterns": an array of strings describing detected patterns. Use patterns like:
  "Excessive caps", "Suspicious link", "Money/prize language", "Urgency tactics",
  "Call to action", "Requests sensitive info", "Threatening language", "Personal attacks",
  "Marketing/discount language", "Marketing content", "Multiple exclamation marks",
  "Unrealistic promises", "Emotional manipulation", "Impersonation", "Phishing attempt"

Message to classify:
"""


class ClassifyRequest(BaseModel):
    text: str


class ClassifyResponse(BaseModel):
    category: str
    confidence: float
    flagged_patterns: list[str]
    threat_level: str


def compute_threat_level(category: str, confidence: float, flagged_patterns: list[str]) -> str:
    """Compute threat level from category, confidence, and pattern count."""
    if category == "Normal":
        return "Low"

    severity = {"Spam": 1, "Promotional": 1, "Harassment": 3, "Scam": 3}
    base = severity.get(category, 1)
    pattern_bonus = min(len(flagged_patterns) * 0.5, 2.0)
    score = base * confidence + pattern_bonus

    if score >= 2.5:
        return "Critical"
    elif score >= 1.8:
        return "High"
    elif score >= 1.0:
        return "Medium"
    return "Low"


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.post("/api/classify", response_model=ClassifyResponse)
def classify(req: ClassifyRequest):
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=CLASSIFY_PROMPT + req.text,
    )

    raw = response.text.strip()
    # Strip markdown code fences if present
    if raw.startswith("```"):
        raw = re.sub(r"^```(?:json)?\s*", "", raw)
        raw = re.sub(r"\s*```$", "", raw)

    result = json.loads(raw)

    category = result.get("category", "Normal")
    confidence = float(result.get("confidence", 0.5))
    flagged_patterns = result.get("flagged_patterns", [])

    # Validate category
    valid_categories = {"Normal", "Spam", "Harassment", "Scam", "Promotional"}
    if category not in valid_categories:
        category = "Normal"

    confidence = max(0.0, min(1.0, confidence))
    threat_level = compute_threat_level(category, confidence, flagged_patterns)

    return ClassifyResponse(
        category=category,
        confidence=round(confidence, 4),
        flagged_patterns=flagged_patterns,
        threat_level=threat_level,
    )
