# SafeChat AI - Spam Detection System Design

## Overview

A React PWA for classifying text messages into 5 categories (Normal, Spam, Harassment, Scam, Promotional) using a Python ML backend. Users paste/type text, get instant AI classification with confidence scores and flagged patterns.

## Architecture

```
React PWA (Vite + Tailwind) ──POST /api/classify──▶ FastAPI + scikit-learn
     localStorage                                    Stateless, no DB
```

- **Frontend**: React + Vite + Tailwind CSS + Recharts + Lucide icons
- **Backend**: FastAPI with Naive Bayes model trained on SMS Spam Collection + augmented data
- **Storage**: localStorage only (messages, user profile, settings)
- **Auth**: Demo mode (name stored in localStorage, no real auth)

## API

Single endpoint:

```
POST /api/classify
Request:  { "text": "some message" }
Response: { "category": "Spam", "confidence": 0.94, "flagged_patterns": ["Excessive caps", "Shortened URL"] }
```

Categories: Normal, Spam, Harassment, Scam, Promotional

## ML Pipeline

1. Dataset: SMS Spam Collection (5,574 msgs) + ~500 augmented examples for Harassment/Scam/Promotional
2. Preprocessing: lowercase, remove punctuation, strip URLs/emails
3. Features: TF-IDF vectorizer (max 5000 features)
4. Model: MultinomialNB (Naive Bayes)
5. Pattern detection: Regex rules for flagged patterns (caps, URLs, money, urgency words)
6. Artifacts: model.pkl + vectorizer.pkl loaded at startup

## Screens

From Figma (adapted):
- **Onboarding**: 3-slide intro (Spam Detection, Harassment Filtering, AI Safety)
- **Login**: Demo mode, stores name in localStorage
- **Dashboard (Home)**: Stats overview (total scanned, blocked, threat rate), category cards, FAB for scanning
- **ScanSheet** (NEW): Bottom sheet modal triggered by FAB, textarea + "Scan" button
- **ScanResult** (NEW): Animated result card with category badge, confidence bar, flagged patterns, action buttons
- **Category Detail**: Message list filtered by category, confidence scores, Allow/Block/Warn/Report actions
- **Reports**: Pie chart (category distribution), bar chart (weekly trends), summary stats
- **Notifications/Alerts**: Threat alerts, system updates
- **Settings**: Profile, toggles (auto-block, push notifications, email alerts)

Bottom nav: Home | Reports | Alerts | Settings

## Data Flow

1. User types text → hits Scan
2. Frontend calls POST /api/classify
3. Backend returns category + confidence + flagged_patterns
4. Frontend creates message object, saves to localStorage
5. Result card animates in
6. Dashboard stats, Category Detail, Reports all read from same localStorage array

## localStorage Schema

```json
{
  "safechat_user": { "name": "...", "avatar": "...", "onboarded": true },
  "safechat_messages": [
    {
      "id": "msg-...",
      "content": "...",
      "category": "Spam",
      "confidence": 0.94,
      "flaggedPatterns": ["Prize scam"],
      "action": null,
      "timestamp": "2026-02-16T..."
    }
  ]
}
```

## PWA

- Service worker for offline app shell caching
- Web app manifest for Add to Home Screen
- Offline banner: "Scanning requires internet connection"

## Project Structure

```
safechat-ai/
├── frontend/          # React + Vite + Tailwind
│   ├── public/        # manifest.json, sw.js
│   └── src/
│       ├── components/  # All screens
│       ├── hooks/       # useMessages.ts (localStorage CRUD)
│       ├── lib/         # api.ts (fetch wrapper)
│       └── App.tsx
├── backend/           # FastAPI + scikit-learn
│   ├── main.py
│   ├── model/         # train.py, model.pkl, vectorizer.pkl
│   ├── data/          # dataset.csv
│   └── requirements.txt
└── README.md
```

## Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Architecture | Monorepo | Single repo, easy for college team |
| ML Model | Naive Bayes + TF-IDF | Simple, explainable, fast |
| Auth | Demo mode | Focus on ML, not auth infra |
| Storage | localStorage | No database needed |
| Scan UX | FAB → bottom sheet | Clean, doesn't clutter nav |
| Charts | Recharts | Already in Figma design |
