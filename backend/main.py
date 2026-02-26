import re
import joblib
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

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

# Load model at startup
model = joblib.load("model/model.pkl")
vectorizer = joblib.load("model/vectorizer.pkl")

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

    # Weight: category severity + confidence + number of flagged patterns
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

def preprocess(text: str) -> str:
    text = text.lower()
    text = re.sub(r'http\S+|www\.\S+', '', text)
    text = re.sub(r'\S+@\S+', '', text)
    text = re.sub(r'[^a-z\s]', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def detect_patterns(text: str) -> list[str]:
    """Regex-based pattern detection for explainability."""
    patterns = []
    if re.search(r'[A-Z]{3,}', text):
        patterns.append("Excessive caps")
    if re.search(r'https?://|bit\.ly|tinyurl', text, re.IGNORECASE):
        patterns.append("Suspicious link")
    if re.search(r'\$\d+|money|cash|prize|winner|won|lottery', text, re.IGNORECASE):
        patterns.append("Money/prize language")
    if re.search(r'urgent|immediately|act now|limited time|expires', text, re.IGNORECASE):
        patterns.append("Urgency tactics")
    if re.search(r'click here|click this|click below|tap here', text, re.IGNORECASE):
        patterns.append("Call to action")
    if re.search(r'bank|account|password|ssn|social security|verify', text, re.IGNORECASE):
        patterns.append("Requests sensitive info")
    if re.search(r'threat|kill|hurt|die|destroy|watch your back', text, re.IGNORECASE):
        patterns.append("Threatening language")
    if re.search(r'idiot|stupid|pathetic|worthless|loser|ugly|hate', text, re.IGNORECASE):
        patterns.append("Personal attacks")
    if re.search(r'%\s*off|discount|coupon|sale|deal|offer|free shipping', text, re.IGNORECASE):
        patterns.append("Marketing/discount language")
    if re.search(r'subscribe|unsubscribe|newsletter|promo', text, re.IGNORECASE):
        patterns.append("Marketing content")
    if re.search(r'!{2,}', text):
        patterns.append("Multiple exclamation marks")
    if re.search(r'guaranteed|no risk|100%', text, re.IGNORECASE):
        patterns.append("Unrealistic promises")
    return patterns

@app.get("/api/health")
def health():
    return {"status": "ok"}

@app.post("/api/classify", response_model=ClassifyResponse)
def classify(req: ClassifyRequest):
    clean = preprocess(req.text)
    tfidf = vectorizer.transform([clean])

    category = model.predict(tfidf)[0]
    probas = model.predict_proba(tfidf)[0]
    confidence = float(max(probas))

    flagged = detect_patterns(req.text)

    threat_level = compute_threat_level(category, confidence, flagged)

    return ClassifyResponse(
        category=category,
        confidence=round(confidence, 4),
        flagged_patterns=flagged,
        threat_level=threat_level,
    )
