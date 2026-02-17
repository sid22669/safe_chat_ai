# SafeChat AI Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a React PWA + Python FastAPI app that classifies pasted text messages into 5 categories (Normal, Spam, Harassment, Scam, Promotional) using a Naive Bayes ML model.

**Architecture:** Monorepo with `frontend/` (React + Vite + Tailwind) and `backend/` (FastAPI + scikit-learn). Frontend calls single `POST /api/classify` endpoint. All user data in localStorage. Demo auth only.

**Tech Stack:** React 18, Vite, Tailwind CSS v3, Recharts, Lucide React, TypeScript | Python 3.11+, FastAPI, scikit-learn, uvicorn

**Design doc:** `docs/plans/2026-02-16-safechat-ai-design.md`

**User preferences:** No AI-related commits (no Co-Authored-By). User handles git commits themselves.

---

## Task Group A: Backend (ML + API)

These tasks are independent from frontend and can run in parallel with Task Group B.

---

### Task A1: Scaffold Python backend

**Files:**
- Create: `backend/main.py`
- Create: `backend/requirements.txt`
- Create: `backend/.gitignore`

**Step 1: Create requirements.txt**

```
fastapi==0.115.0
uvicorn==0.30.0
scikit-learn==1.5.0
pandas==2.2.0
joblib==1.4.0
python-multipart==0.0.9
```

**Step 2: Create .gitignore**

```
__pycache__/
*.pyc
venv/
.env
model/*.pkl
```

**Step 3: Create minimal main.py with health check**

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="SafeChat AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health():
    return {"status": "ok"}
```

**Step 4: Create venv and install deps**

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

**Step 5: Run and verify**

```bash
uvicorn main:app --reload --port 8000
# GET http://localhost:8000/api/health → {"status": "ok"}
```

---

### Task A2: Create training dataset

**Files:**
- Create: `backend/data/prepare_dataset.py`
- Output: `backend/data/dataset.csv`

**Step 1: Write dataset preparation script**

This script downloads the SMS Spam Collection from a public URL and augments it with manually written examples for the 3 additional categories (Harassment, Scam, Promotional). The SMS Spam Collection has 2 classes (ham/spam). We map "ham" → "Normal" and "spam" → "Spam", then add ~150 examples each for Harassment, Scam, and Promotional.

```python
import pandas as pd
import os

def prepare_dataset():
    """Download SMS Spam Collection and augment with extra categories."""

    # Download SMS Spam Collection
    url = "https://raw.githubusercontent.com/justmarkham/pycon-2016-tutorial/master/data/sms.tsv"
    sms = pd.read_csv(url, sep='\t', header=None, names=['label', 'text'])

    # Map labels
    sms['label'] = sms['label'].map({'ham': 'Normal', 'spam': 'Spam'})

    # Augmented examples for Harassment
    harassment = [
        "You are absolutely worthless and nobody wants you here. Leave now or else.",
        "I know where you live. You better watch your back. This is your last warning.",
        "Nobody likes you. Everyone is talking about how pathetic you are behind your back.",
        "You're so ugly I can't even look at you. Do everyone a favor and disappear.",
        "I will make your life a living hell if you don't do what I say.",
        "You're a complete waste of space. The world would be better without you.",
        "I'm going to find you and make you pay for what you did.",
        "You stupid idiot, you can't do anything right. Just give up already.",
        "Watch yourself. I know people who can make problems for you.",
        "You're disgusting and everyone hates you. Why don't you just leave?",
        "I'll destroy your reputation. Everyone will know what a loser you are.",
        "You think you're safe? Think again. I have your address.",
        "No one cares about your opinion. Shut up and go away forever.",
        "You're the most pathetic person I've ever met. Everyone laughs at you.",
        "I'm going to ruin everything you care about. Just wait and see.",
        "You deserve every bad thing that happens to you. Karma is coming.",
        "Stay away from my friends or you'll regret it. This is not a joke.",
        "You're a terrible person and everyone secretly despises you.",
        "I hope something terrible happens to you. You deserve nothing but pain.",
        "Keep talking and see what happens. I dare you to say one more word.",
        "You make me sick. The sight of you is revolting to everyone.",
        "I will expose all your secrets if you don't do exactly what I want.",
        "You're nothing. Absolutely nothing. And you always will be nothing.",
        "Don't think I won't find you. I always get what I want.",
        "Everyone is better than you. You're at the bottom of the barrel.",
        "I'll make sure you never work in this town again.",
        "Your family must be so ashamed of you. What a disappointment.",
        "Tick tock. Your time is running out. Better start running.",
        "You're a fraud and I'm going to tell everyone the truth about you.",
        "I've been watching you. I know your routine. Be very careful.",
    ]

    # Augmented examples for Scam
    scam = [
        "URGENT: Your account has been compromised. Click this link immediately to verify your identity.",
        "Congratulations! You have won $1,000,000 in our lottery. Send your bank details to claim.",
        "DOUBLE your Bitcoin in 24 hours GUARANTEED! Limited spots available. Invest now!",
        "Your package is being held at customs. Pay $4.99 processing fee to release it: bit.ly/pkg123",
        "IRS NOTICE: You owe $5,432 in back taxes. Pay immediately to avoid arrest. Call 555-0199.",
        "Your Apple ID has been locked. Verify your identity here to restore access immediately.",
        "You've been selected for a $500 Walmart gift card! Complete this survey to claim: bit.ly/wm500",
        "FINAL WARNING: Your bank account will be suspended. Update your information now.",
        "Dear customer, unusual activity detected on your account. Login here to secure it.",
        "You have an unclaimed inheritance of $2.5 million from a distant relative in Nigeria.",
        "Your Netflix subscription has expired. Update payment to avoid losing your account.",
        "ALERT: Someone tried to access your PayPal. Verify your identity: paypa1-secure.com",
        "Congratulations! Your phone number was randomly selected to win a brand new Tesla!",
        "Your Social Security number has been compromised. Call 555-0177 immediately.",
        "Make $10,000 per week from home! No experience needed. Reply YES to get started.",
        "URGENT: Your computer has been infected with a virus. Call Microsoft support: 555-0188.",
        "You've won a free cruise vacation! Claim your tickets before midnight tonight!",
        "Your Amazon order #12345 cannot be delivered. Update your address and payment info here.",
        "IMPORTANT: Your credit score has dropped 200 points. Check now at freescore-check.com",
        "We've detected suspicious transactions on your Visa card ending in 4821. Call now.",
        "You qualify for a government grant of $25,000. Apply now before funds run out!",
        "Your email account will be deleted in 24 hours unless you verify: verify-email-now.com",
        "Exclusive investment opportunity: 500% returns guaranteed in just 30 days!",
        "FINAL NOTICE: Legal action will be taken if you don't respond within 24 hours.",
        "You have a pending refund of $847.50. Enter your bank details to process it.",
        "Your phone has been hacked! Download our security app immediately to protect your data.",
        "Congratulations! You've been approved for a $50,000 loan at 0% interest. Apply now!",
        "WARNING: Your router has been compromised. Call tech support at 555-0166 immediately.",
        "You've been chosen for our exclusive Bitcoin mining program. Earn $5000 daily!",
        "URGENT TAX NOTICE: Pay your overdue taxes of $3,299 or face criminal prosecution.",
    ]

    # Augmented examples for Promotional
    promotional = [
        "EXCLUSIVE OFFER! Get 50% OFF all products TODAY ONLY! Click here: bit.ly/deals123",
        "Limited time offer! Subscribe now and get 3 months FREE. Best deal of the year!",
        "New arrivals this week! Check out our latest collection and enjoy free shipping over $50.",
        "Special discount just for you! Use code SAVE20 for 20% off your next purchase.",
        "Flash sale starts NOW! Up to 70% off on selected items. Don't miss out!",
        "Hey! We miss you. Come back and get 15% off your next order with code WELCOME15.",
        "Black Friday deals are HERE! Save up to 80% on everything in store.",
        "Free shipping on ALL orders this weekend only! No minimum purchase required.",
        "NEW: Our bestselling product is back in stock! Order now before it sells out again.",
        "Loyalty reward! You've earned 500 points. Redeem them for a $25 gift card today!",
        "Summer sale! Buy 2 get 1 free on all clothing items. Shop now!",
        "Your cart is waiting! Complete your purchase and get 10% off with code FINISH10.",
        "Introducing our premium membership. Join today and get exclusive perks and discounts.",
        "Weekend special: All pizzas are buy one get one free! Order online now.",
        "Upgrade your plan today and save 30%. Premium features at basic prices!",
        "Just launched: New spring collection 2026. Be the first to shop the latest trends.",
        "Happy hour deal! 40% off all drinks from 4-7 PM. Show this message at checkout.",
        "Annual clearance sale! Everything must go. Prices slashed up to 90% off.",
        "Refer a friend and both get $20 credit! Share your unique code now.",
        "Birthday special! Enjoy a FREE dessert on us when you dine in this week.",
        "Early bird discount: Book your summer vacation now and save 25% on all packages.",
        "Members-only preview sale starts tomorrow! Get first access to our newest arrivals.",
        "Download our app and get $10 off your first order. Available on iOS and Android.",
        "Last chance! Cyber Monday deals end at midnight. Save big on electronics and more.",
        "VIP exclusive: Private shopping event this Saturday. RSVP now for 40% off everything.",
        "New customer? Get your first month free! No credit card required to start.",
        "Bundle deal: Buy the complete set and save $50. Limited stock available.",
        "Thanks for being a loyal customer! Here is an exclusive 35% off coupon just for you.",
        "Pre-order now and get a FREE bonus gift worth $30. Ships next week!",
        "Season finale sale! Last chance to grab winter styles at 60% off before they are gone.",
    ]

    # Build augmented dataframe
    aug_data = (
        [(text, 'Harassment') for text in harassment] +
        [(text, 'Scam') for text in scam] +
        [(text, 'Promotional') for text in promotional]
    )
    aug_df = pd.DataFrame(aug_data, columns=['text', 'label'])

    # Combine
    dataset = pd.concat([sms[['text', 'label']], aug_df], ignore_index=True)
    dataset = dataset.sample(frac=1, random_state=42).reset_index(drop=True)

    # Save
    os.makedirs('data', exist_ok=True)
    dataset.to_csv('data/dataset.csv', index=False)
    print(f"Dataset saved: {len(dataset)} samples")
    print(dataset['label'].value_counts())

if __name__ == '__main__':
    prepare_dataset()
```

**Step 2: Run it**

```bash
cd backend
source venv/bin/activate
python data/prepare_dataset.py
```

Expected output: ~5,664 samples with 5 categories.

---

### Task A3: Train the ML model

**Files:**
- Create: `backend/model/train.py`
- Output: `backend/model/model.pkl`, `backend/model/vectorizer.pkl`

**Step 1: Write training script**

```python
import pandas as pd
import joblib
import os
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

def preprocess(text: str) -> str:
    """Lowercase, remove URLs, emails, punctuation, extra spaces."""
    text = text.lower()
    text = re.sub(r'http\S+|www\.\S+', '', text)
    text = re.sub(r'\S+@\S+', '', text)
    text = re.sub(r'[^a-z\s]', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def train():
    df = pd.read_csv('data/dataset.csv')
    df['clean_text'] = df['text'].apply(preprocess)

    X_train, X_test, y_train, y_test = train_test_split(
        df['clean_text'], df['label'], test_size=0.2, random_state=42, stratify=df['label']
    )

    vectorizer = TfidfVectorizer(max_features=5000, ngram_range=(1, 2))
    X_train_tfidf = vectorizer.fit_transform(X_train)
    X_test_tfidf = vectorizer.transform(X_test)

    model = MultinomialNB(alpha=0.1)
    model.fit(X_train_tfidf, y_train)

    y_pred = model.predict(X_test_tfidf)
    print(classification_report(y_test, y_pred))

    os.makedirs('model', exist_ok=True)
    joblib.dump(model, 'model/model.pkl')
    joblib.dump(vectorizer, 'model/vectorizer.pkl')
    print("Model and vectorizer saved to model/")

if __name__ == '__main__':
    train()
```

**Step 2: Run training**

```bash
cd backend
source venv/bin/activate
python model/train.py
```

Expected: Classification report printed, model.pkl + vectorizer.pkl saved.

---

### Task A4: Build the /api/classify endpoint

**Files:**
- Modify: `backend/main.py`

**Step 1: Add classify endpoint to main.py**

Replace the entire `backend/main.py` with:

```python
import re
import joblib
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="SafeChat AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
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
    original = text  # Use original (not preprocessed) for pattern detection

    if re.search(r'[A-Z]{3,}', original):
        patterns.append("Excessive caps")
    if re.search(r'https?://|bit\.ly|tinyurl', original, re.IGNORECASE):
        patterns.append("Suspicious link")
    if re.search(r'\$\d+|money|cash|prize|winner|won|lottery', original, re.IGNORECASE):
        patterns.append("Money/prize language")
    if re.search(r'urgent|immediately|act now|limited time|expires', original, re.IGNORECASE):
        patterns.append("Urgency tactics")
    if re.search(r'click here|click this|click below|tap here', original, re.IGNORECASE):
        patterns.append("Call to action")
    if re.search(r'bank|account|password|ssn|social security|verify', original, re.IGNORECASE):
        patterns.append("Requests sensitive info")
    if re.search(r'threat|kill|hurt|die|destroy|watch your back', original, re.IGNORECASE):
        patterns.append("Threatening language")
    if re.search(r'idiot|stupid|pathetic|worthless|loser|ugly|hate', original, re.IGNORECASE):
        patterns.append("Personal attacks")
    if re.search(r'%\s*off|discount|coupon|sale|deal|offer|free shipping', original, re.IGNORECASE):
        patterns.append("Marketing/discount language")
    if re.search(r'subscribe|unsubscribe|newsletter|promo', original, re.IGNORECASE):
        patterns.append("Marketing content")
    if re.search(r'!{2,}', original):
        patterns.append("Multiple exclamation marks")
    if re.search(r'guaranteed|no risk|100%', original, re.IGNORECASE):
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

    return ClassifyResponse(
        category=category,
        confidence=round(confidence, 4),
        flagged_patterns=flagged,
    )
```

**Step 2: Test it**

```bash
cd backend
source venv/bin/activate
uvicorn main:app --reload --port 8000
```

Then test with curl:
```bash
curl -X POST http://localhost:8000/api/classify \
  -H "Content-Type: application/json" \
  -d '{"text": "Congratulations! You won a free iPhone! Click here to claim."}'
```

Expected: JSON response with category, confidence, and flagged_patterns.

---

## Task Group B: Frontend Scaffold

Can run in parallel with Task Group A.

---

### Task B1: Scaffold React + Vite + Tailwind project

**Step 1: Create Vite project**

```bash
cd /Users/siddharthv/clg_projects/mob_app_some
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install
```

**Step 2: Install dependencies**

```bash
cd /Users/siddharthv/clg_projects/mob_app_some/frontend
npm install tailwindcss @tailwindcss/vite lucide-react recharts
```

**Step 3: Configure Tailwind**

Update `frontend/vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': 'http://localhost:8000'
    }
  }
})
```

Replace `frontend/src/index.css` with:

```css
@import "tailwindcss";
```

**Step 4: Clean up default files**

- Delete `frontend/src/App.css`
- Replace `frontend/src/App.tsx` with a minimal placeholder:

```typescript
function App() {
  return (
    <div className="h-screen bg-slate-50 flex items-center justify-center">
      <h1 className="text-2xl text-slate-900">SafeChat AI</h1>
    </div>
  );
}

export default App;
```

**Step 5: Verify it runs**

```bash
cd /Users/siddharthv/clg_projects/mob_app_some/frontend
npm run dev
```

Expected: Vite dev server at http://localhost:5173 showing "SafeChat AI" with Tailwind styling.

---

### Task B2: Create types, hooks, and API layer

**Files:**
- Create: `frontend/src/types.ts`
- Create: `frontend/src/hooks/useMessages.ts`
- Create: `frontend/src/hooks/useUser.ts`
- Create: `frontend/src/lib/api.ts`

**Step 1: Create types.ts**

```typescript
export type MessageCategory = 'Normal' | 'Spam' | 'Harassment' | 'Scam' | 'Promotional';
export type MessageAction = 'Allow' | 'Warn' | 'Block' | 'Report';
export type Screen = 'onboarding' | 'login' | 'home' | 'reports' | 'settings' | 'notifications' | 'category-detail';

export interface Message {
  id: string;
  content: string;
  category: MessageCategory;
  confidence: number;
  flaggedPatterns: string[];
  action: MessageAction | null;
  timestamp: string;
}

export interface UserProfile {
  name: string;
  avatar: string;
  onboarded: boolean;
}

export interface ClassifyResponse {
  category: MessageCategory;
  confidence: number;
  flagged_patterns: string[];
}
```

**Step 2: Create lib/api.ts**

```typescript
import type { ClassifyResponse } from '../types';

const API_BASE = '/api';

export async function classifyMessage(text: string): Promise<ClassifyResponse> {
  const res = await fetch(`${API_BASE}/classify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) {
    throw new Error(`Classification failed: ${res.status}`);
  }

  return res.json();
}
```

**Step 3: Create hooks/useMessages.ts**

```typescript
import { useState, useEffect } from 'react';
import type { Message, MessageAction } from '../types';

const STORAGE_KEY = 'safechat_messages';

function loadMessages(): Message[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveMessages(messages: Message[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>(loadMessages);

  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  const addMessage = (msg: Omit<Message, 'id' | 'timestamp' | 'action'>) => {
    const newMsg: Message = {
      ...msg,
      id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      action: null,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [newMsg, ...prev]);
    return newMsg;
  };

  const setAction = (messageId: string, action: MessageAction) => {
    setMessages(prev =>
      prev.map(m => (m.id === messageId ? { ...m, action } : m))
    );
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return { messages, addMessage, setAction, clearMessages };
}
```

**Step 4: Create hooks/useUser.ts**

```typescript
import { useState, useEffect } from 'react';
import type { UserProfile } from '../types';

const STORAGE_KEY = 'safechat_user';

const DEFAULT_USER: UserProfile = { name: '', avatar: '', onboarded: false };

function loadUser(): UserProfile {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : DEFAULT_USER;
}

export function useUser() {
  const [user, setUser] = useState<UserProfile>(loadUser);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }, [user]);

  const login = (name: string) => {
    setUser(prev => ({ ...prev, name, onboarded: true }));
  };

  const logout = () => {
    setUser(DEFAULT_USER);
  };

  return { user, login, logout, setUser };
}
```

---

## Task Group C: Frontend Screens

Depends on Task B2 (types/hooks). Each screen is independent and can be built in parallel.

---

### Task C1: Onboarding + Login screens

**Files:**
- Create: `frontend/src/components/OnboardingFlow.tsx`
- Create: `frontend/src/components/LoginScreen.tsx`

Build these from the Figma Make source code (already read earlier). Adapt to use the `useUser` hook:

- **OnboardingFlow**: 3 slides (Spam Detection, Harassment Filtering, AI Safety) with dot indicators and Next/Get Started buttons. Calls `onComplete` when done.
- **LoginScreen**: Demo mode. Text input for name, "Start Protecting" button. Calls `onLogin(name)`. No real auth — just saves name to localStorage via hook.

Use the Figma component code as the base, but replace any mock data interfaces with the shared types from `types.ts`.

---

### Task C2: Dashboard (HomePage) + BottomNavigation

**Files:**
- Create: `frontend/src/components/HomePage.tsx`
- Create: `frontend/src/components/BottomNavigation.tsx`

Build from Figma source. The Dashboard shows:
- Header with shield icon, "SafeChat AI", greeting
- Stats card: total scanned, blocked count, threat rate percentage
- "System Active" indicator
- Category cards (Spam, Harassment, Scam, Promotional) — each clickable → navigates to category-detail
- **FAB button** (bottom-right, above nav): blue circle with "+" or scan icon, triggers `onScanOpen()`

**BottomNavigation**: 4 tabs (Home, Reports, Alerts, Settings) — extracted as shared component since all screens use it. Takes `currentScreen` and `onNavigate` props.

---

### Task C3: ScanSheet + ScanResult (NEW components)

**Files:**
- Create: `frontend/src/components/ScanSheet.tsx`
- Create: `frontend/src/components/ScanResult.tsx`

**ScanSheet** — Bottom sheet modal:
- Dark backdrop overlay, slides up from bottom
- Large textarea: placeholder "Paste or type a message to analyze..."
- Character count indicator
- "Scan Message" button (blue gradient, full width)
- Close/X button top-right
- Loading state: spinner + "Analyzing with AI..." while API call in progress
- On success: transitions to show ScanResult inline
- On error: shows error toast

**ScanResult** — Result card (shown inside ScanSheet after scan):
- Category badge (color-coded pill matching the category colors from design)
- Confidence score as progress bar with percentage
- Flagged patterns as colored tags
- Action buttons: Allow, Block, Warn, Report (2x2 grid, same as CategoryDetail)
- "Scan Another" button to reset

Color mapping for categories:
- Normal: green
- Spam: orange
- Harassment: red
- Scam: purple
- Promotional: yellow

---

### Task C4: CategoryDetail screen

**Files:**
- Create: `frontend/src/components/CategoryDetail.tsx`

Build from Figma source. Shows:
- Gradient header with category icon, title, message count
- Back arrow button
- List of messages in that category (from useMessages hook, filtered)
- Each message card: sender avatar (first letter), content preview, timestamp, confidence bar, flagged pattern tags, action buttons (Allow/Block/Warn/Report)
- Empty state: icon + "No messages in this category"

---

### Task C5: ReportsPage

**Files:**
- Create: `frontend/src/components/ReportsPage.tsx`

Build from Figma source. Uses Recharts:
- Summary cards: threat rate (%) with trend, protected count with trend
- PieChart: category distribution (donut chart with legend)
- BarChart: messages per category (horizontal bars)
- Weekly summary card with stats

All data computed from the messages array passed as prop. No backend call needed.

---

### Task C6: NotificationsPage

**Files:**
- Create: `frontend/src/components/NotificationsPage.tsx`

Build from Figma source. Shows:
- Active threats alert banner (if any harassment/scam messages exist)
- List of notification cards generated from recent messages:
  - "High-Risk Message Detected" for scam/harassment
  - "Protection Active" with scan count
  - "System Update" static card
- Each card: colored icon, title, description, timestamp
- "Manage Settings" link at bottom

---

### Task C7: SettingsPage

**Files:**
- Create: `frontend/src/components/SettingsPage.tsx`

Build from Figma source:
- Profile section: name display, edit placeholder
- Quick toggles: Auto-block threats, Push notifications, Email alerts (all local state, visual only)
- Menu items: Protection Settings, Security, Notification Preferences, About App (all non-functional, just UI)
- Logout button → clears localStorage, navigates to login

---

## Task Group D: Wire Everything Together

Depends on C1-C7 being complete.

---

### Task D1: Build App.tsx with routing and state

**Files:**
- Modify: `frontend/src/App.tsx`

Wire all screens together:

```typescript
import { useState } from 'react';
import type { Screen, MessageCategory } from './types';
import { useMessages } from './hooks/useMessages';
import { useUser } from './hooks/useUser';
import { OnboardingFlow } from './components/OnboardingFlow';
import { LoginScreen } from './components/LoginScreen';
import { HomePage } from './components/HomePage';
import { CategoryDetail } from './components/CategoryDetail';
import { ReportsPage } from './components/ReportsPage';
import { NotificationsPage } from './components/NotificationsPage';
import { SettingsPage } from './components/SettingsPage';
import { ScanSheet } from './components/ScanSheet';
import { BottomNavigation } from './components/BottomNavigation';

function App() {
  const { user, login, logout } = useUser();
  const { messages, addMessage, setAction, clearMessages } = useMessages();
  const [screen, setScreen] = useState<Screen>('home');
  const [selectedCategory, setSelectedCategory] = useState<MessageCategory | null>(null);
  const [scanOpen, setScanOpen] = useState(false);

  // Show onboarding/login if not onboarded
  if (!user.onboarded) {
    return <OnboardingFlow onComplete={() => {}} />;
    // After onboarding → LoginScreen → login(name) sets onboarded=true
  }

  // Actual routing logic to be implemented — this is the pattern:
  // screen === 'home' → HomePage
  // screen === 'category-detail' → CategoryDetail with selectedCategory
  // screen === 'reports' → ReportsPage
  // screen === 'notifications' → NotificationsPage
  // screen === 'settings' → SettingsPage
  // scanOpen overlay → ScanSheet

  // Each main screen gets <BottomNavigation currentScreen={screen} onNavigate={setScreen} />
  // HomePage gets onScanOpen={() => setScanOpen(true)} and onCategoryClick
  // ScanSheet gets onClose, addMessage, classifyMessage integration
}
```

The implementing agent should flesh this out fully with proper conditional rendering, the complete flow from onboarding → login → dashboard, and all navigation wired up.

---

### Task D2: PWA setup

**Files:**
- Create: `frontend/public/manifest.json`
- Create: `frontend/public/sw.js`
- Modify: `frontend/index.html` (add manifest link + SW registration)

**manifest.json:**
```json
{
  "name": "SafeChat AI",
  "short_name": "SafeChat",
  "description": "AI-powered message protection system",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#f8fafc",
  "theme_color": "#3b82f6",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

**sw.js** — basic cache-first service worker for the app shell.

**index.html** — add `<link rel="manifest" href="/manifest.json">` and inline script to register SW.

---

## Task Dependency Graph

```
A1 (scaffold backend) ──▶ A2 (dataset) ──▶ A3 (train model) ──▶ A4 (classify endpoint)

B1 (scaffold frontend) ──▶ B2 (types/hooks/api)
                                │
                ┌───────┬───────┼───────┬───────┬───────┐
                ▼       ▼       ▼       ▼       ▼       ▼
               C1      C2      C3      C4      C5     C6,C7
            (onboard) (home)  (scan) (detail) (reports) (notif,settings)
                │       │       │       │       │       │
                └───────┴───────┴───────┴───────┴───────┘
                                │
                                ▼
                        D1 (wire App.tsx)
                                │
                                ▼
                        D2 (PWA setup)
```

**Parallel lanes:**
- Lane 1: A1 → A2 → A3 → A4 (backend, fully independent)
- Lane 2: B1 → B2 → C1-C7 in parallel → D1 → D2 (frontend)
- Lanes merge at the end when both are running and connected via `/api` proxy.
