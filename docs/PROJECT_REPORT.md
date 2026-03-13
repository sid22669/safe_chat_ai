# SAFE CHAT AI – AI-POWERED CHAT MESSAGE SAFETY CLASSIFIER

## PROJECT REPORT

*Submitted in partial fulfillment of the requirements for the award of the degree of*

**BACHELOR OF SCIENCE IN COMPUTER TECHNOLOGY**

---

**By**

**[STUDENT NAME] (Reg. No: [XXXXXXXXX])**

*Under the Guidance of*

[GUIDE NAME], M.C.A., M.Phil., Ph.D.
Assistant Professor

**DEPARTMENT OF COMPUTER TECHNOLOGY**

[INSTITUTION NAME]
[AFFILIATED UNIVERSITY], [CITY]

**[MONTH] – [YEAR]**

---

## DECLARATION

I, [STUDENT NAME] (Reg No: [XXXXXXXXX]), hereby declare that the Project report entitled **"SAFE CHAT AI – AI-POWERED CHAT MESSAGE SAFETY CLASSIFIER"** submitted in partial fulfillment of the requirement for the award of the degree of BACHELOR OF SCIENCE IN COMPUTER TECHNOLOGY is a record of original work done during the period of my study under the supervision and guidance of [GUIDE NAME], Assistant Professor, Department of Computer Technology. This project has not been submitted previously for the award of any degree or diploma.

**[STUDENT NAME]**
Reg No: [XXXXXXXXX]

Place: [City]
Date:

---

## CERTIFICATE

This is to certify that the project report entitled **"SAFE CHAT AI – AI-POWERED CHAT MESSAGE SAFETY CLASSIFIER"** submitted in partial fulfilment of the requirement for the award of degree of Bachelor of Science in Computer Technology is a record of original work done by [STUDENT NAME] (Reg No: [XXXXXXXXX]).

Viva-voce Examination held on…………………

Internal Examiner &emsp;&emsp;&emsp;&emsp;&emsp;&emsp; External Examiner

---

## ACKNOWLEDGEMENT

This Project report represents a significant milestone in my academic journey, and it would not have been possible without the blessings of God almighty and the support of those who believed in my capabilities.

I express my sincere gratitude to my guide, [GUIDE NAME], Assistant Professor, Department of Computer Technology, for the exemplary guidance, encouragement, and constant support throughout the development of this project.

I sincerely thank the Head of the Department of Computer Technology for the sustained interest, valuable suggestions, and assistance provided during the course of this work.

I also take this opportunity to thank all the faculty members of the Department for their constant inspiration, assistance, and resourceful guidance that helped me complete this project successfully.

I am grateful to my family and friends for their encouragement, moral support, and prayers, without which this project would not have been possible.

**[STUDENT NAME]**

---

## TABLE OF CONTENTS

| Section | Topic | Page No. |
|---------|-------|----------|
| 1 | Abstract | |
| 2 | Introduction | |
| 3 | System Specification | |
| 4 | System Analysis | |
| 5 | System Design | |
| 6 | System Development | |
| 7 | Testing and Implementation | |
| 8 | Conclusion | |
| 9 | Future Enhancement | |
| 10 | Bibliography | |
| 11 | Appendices | |

---

## ABSTRACT

Safe Chat AI is an intelligent, AI-powered web application designed to protect users from harmful digital communications by automatically classifying chat messages into threat categories in real time. The system leverages machine learning — specifically a TF-IDF vectorizer paired with a trained scikit-learn classifier — to analyze text and assign it to one of five categories: **Normal, Spam, Harassment, Scam,** or **Promotional**. In addition to the ML model, a regex-based pattern detection engine provides transparent, explainable reasoning by flagging suspicious patterns such as urgency tactics, financial language, and threatening phrasing.

The application is built with a React and TypeScript frontend communicating with a FastAPI Python backend over a RESTful API. It features an intuitive mobile-first interface with a scan sheet for real-time message analysis, a dashboard for monitoring threat statistics, a reports page with interactive charts, and a notifications system. All scan history is persisted locally on the user's device. The system is containerized using Docker for straightforward deployment.

---

## 1. INTRODUCTION

The rapid growth of digital communication through messaging platforms, social media, and online communities has introduced a parallel rise in harmful content — including spam, scam attempts, harassment, and unsolicited promotional messages. Users, particularly children and vulnerable individuals, are frequently exposed to these threats without any automated protection layer.

Safe Chat AI is a modern, technology-driven solution designed to give users a personal AI-powered shield for their digital conversations. By allowing users to paste or type any received message and receive an instant AI analysis, the system empowers individuals to make informed decisions about how to respond to potentially harmful content.

Unlike passive content filters embedded in social platforms, Safe Chat AI operates as a standalone, user-driven tool. Users retain full control — they can choose to Allow, Warn, Block, or Report any detected message. The system provides transparency through flagged pattern explanations, enabling users to understand *why* a message was classified as a threat.

The system addresses a real-world problem: according to online safety research, over 70% of internet users have encountered spam or scam messages, and harassment rates on digital platforms continue to rise. Safe Chat AI aims to reduce the harm caused by such messages through accessible, AI-powered threat detection.

---

## 2. SYSTEM SPECIFICATION

### 2.1 Software Specification

| Component | Technology |
|-----------|------------|
| Operating System | Ubuntu Linux / Windows 10 and above |
| Frontend Framework | React 18 with TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Charts Library | Recharts |
| Backend Framework | FastAPI (Python) |
| ML Libraries | scikit-learn, pandas, joblib |
| API Communication | REST (HTTP/JSON) |
| Containerization | Docker, Docker Compose |
| Web Server (Frontend) | Nginx |

### 2.2 Hardware Specification

| Component | Requirement |
|-----------|-------------|
| Processor | Intel Core i3 or above (1.6 GHz minimum) |
| RAM | 4 GB and above |
| Hard Disk | 10 GB free space and above |
| Internet | Required for API access |
| Browser | Chrome, Firefox, Safari, Edge (modern versions) |

### 2.3 Software Description

#### FRONTEND

The frontend of Safe Chat AI is built with modern web technologies to ensure a responsive, mobile-first, and highly interactive user experience.

**React (with TypeScript)**
React is a declarative JavaScript library for building user interfaces through reusable components. TypeScript adds static type-checking to JavaScript, reducing runtime errors and improving code reliability. Together, they form the foundation of the Safe Chat AI frontend, enabling a robust component architecture with type-safe data flow between modules.

**Vite**
Vite is a next-generation frontend build tool that provides lightning-fast hot module replacement (HMR) during development and optimized production builds. It serves the React application with near-instant startup times, improving the developer experience significantly over traditional bundlers.

**Tailwind CSS**
Tailwind CSS is a utility-first CSS framework that provides a comprehensive set of pre-defined classes for styling directly in the markup. It enables rapid UI development with a consistent design system, ensuring a polished and responsive layout across all screen sizes without writing custom CSS.

**Recharts**
Recharts is a composable charting library built on React and SVG. It is used in the Reports & Analytics module to render interactive pie charts and bar charts that visualize message category distributions and scan statistics.

**Lucide React**
Lucide React provides a clean set of open-source icons used throughout the interface for intuitive visual communication.

#### BACKEND

**Python**
Python is the primary backend language, chosen for its extensive ecosystem of machine learning libraries, simplicity, and performance in data-processing tasks.

**FastAPI**
FastAPI is a modern, high-performance Python web framework for building RESTful APIs. It leverages Python type annotations for automatic request validation and generates interactive API documentation (Swagger UI). FastAPI handles the `/api/classify` endpoint that powers the core message analysis feature.

**scikit-learn**
scikit-learn is a comprehensive machine learning library for Python. It provides the classification model trained to categorize chat messages, as well as the TF-IDF (Term Frequency-Inverse Document Frequency) vectorizer that converts raw text into numerical feature vectors suitable for machine learning.

**joblib**
joblib is used to serialize and deserialize the trained ML model (`model.pkl`) and vectorizer (`vectorizer.pkl`), allowing them to be loaded once at startup and reused across all requests without retraining.

---

## 3. SYSTEM ANALYSIS

### 3.1 Existing System

In the current digital landscape, users rely on platform-level content moderation embedded within messaging apps and social media platforms. These systems are largely opaque — users have no insight into why a message was filtered or what patterns triggered a flag. Key limitations of existing approaches include:

- No real-time, on-demand message analysis tool available to end users.
- Platform moderation is reactive, not proactive — harmful messages often reach the recipient before action is taken.
- No transparency or explainability in classification decisions.
- No centralized tool that handles multiple threat types (spam, scam, harassment, promotions) in one place.
- Users cannot take personalized actions (Allow, Warn, Block, Report) with an audit trail.
- Reports and analytics on received threats are not available to individual users.

### 3.2 Proposed System

Safe Chat AI proposes a user-centric, AI-powered message safety classifier that puts the power of threat detection directly in the hands of the user. The proposed system offers:

- **Real-time classification**: Any message can be analyzed instantly via the Scan Message interface.
- **Multi-category detection**: Five distinct categories — Normal, Spam, Harassment, Scam, and Promotional — cover the full threat landscape.
- **Explainability**: A regex-based pattern detector supplements the ML model by flagging specific suspicious patterns (e.g., urgency tactics, money language, threatening phrases), providing users with understandable reasons for a classification.
- **User-controlled actions**: Users choose how to respond to each detected message — Allow, Warn, Block, or Report.
- **Persistent history**: All scanned messages are stored locally so users can review past threats.
- **Analytics dashboard**: A Reports page with interactive charts provides insights into threat distribution and scan history.
- **Cross-device responsive design**: The application works seamlessly on both mobile and desktop.
- **Containerized deployment**: Docker ensures consistent and reproducible deployment.

**Advantages of the proposed system include:**

- Immediate, on-demand protection from harmful messages.
- Transparent AI decision-making through pattern explanations.
- A single platform handling all major message threat types.
- Personalized user control over threat responses.
- Historical reporting and analytics for personal safety insights.
- Secure local data storage with no server-side personal data retention.

---

## 4. SYSTEM DESIGN

### 4.1 Input Design

The primary input to Safe Chat AI is a text message provided by the user through the Scan Sheet interface. The input design ensures:

- A large, accessible textarea for pasting or typing messages of any length.
- Real-time character count display to help users understand input size.
- Input validation to prevent empty submissions.
- Clear error messaging if the backend is unreachable.
- Disabled state with loading indicator during AI processing to prevent duplicate submissions.

Secondary inputs include the user's name entered during the Login screen, and action selections (Allow, Warn, Block, Report) applied to classified messages via the Category Detail screen.

### 4.2 Output Design

The system produces structured, human-readable outputs at multiple levels:

**Classification Result (ScanResult Component):**
- The predicted category (Normal, Spam, Harassment, Scam, or Promotional) displayed with a color-coded badge.
- A confidence score (0–100%) indicating the model's certainty.
- A list of flagged patterns detected by the regex engine (e.g., "Urgency tactics", "Money/prize language", "Threatening language").
- Action buttons (Allow, Warn, Block, Report) for the user to respond.

**Dashboard (HomePage Component):**
- Total messages scanned, total blocked, and overall threat rate percentage.
- Category cards showing counts for Spam, Harassment, Scam, and Promotional messages.
- System status indicator showing real-time protection is active.

**Reports & Analytics (ReportsPage Component):**
- Quick statistics: Total Scanned, Threats Detected, Safe Messages, Actions Taken.
- Interactive pie chart showing category distribution percentages.
- Interactive bar chart showing message counts per category.

**Notifications (NotificationsPage Component):**
- Chronological feed of flagged messages for review.

### 4.3 Data Design

Safe Chat AI uses a client-side data persistence model. No user data is sent to or stored on a remote server. All data is persisted in the browser's `localStorage` under the key `safechat_messages`.

**Message Object Structure:**

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier (timestamp + random string) |
| `content` | string | Original message text |
| `category` | MessageCategory | Predicted class: Normal, Spam, Harassment, Scam, Promotional |
| `confidence` | number | Model confidence score (0.0 – 1.0) |
| `flaggedPatterns` | string[] | List of detected suspicious patterns |
| `action` | MessageAction \| null | User action: Allow, Warn, Block, Report, or null |
| `timestamp` | string | ISO 8601 timestamp of when the message was scanned |

**User Profile Structure:**

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Display name entered by the user |
| `avatar` | string | Avatar identifier |
| `onboarded` | boolean | Whether the user has completed onboarding |

**Backend API Contract:**

*POST /api/classify*

Request:
```json
{ "text": "string" }
```

Response:
```json
{
  "category": "Normal | Spam | Harassment | Scam | Promotional",
  "confidence": 0.9423,
  "flagged_patterns": ["Urgency tactics", "Money/prize language"]
}
```

*GET /api/health*

Response:
```json
{ "status": "ok" }
```

---

## 5. SYSTEM DEVELOPMENT

### 5.1 Description of Modules

1. Onboarding Flow
2. Login Screen
3. Home Dashboard
4. Scan Message (ScanSheet)
5. Scan Result (ScanResult)
6. Category Detail
7. Reports & Analytics
8. Notifications
9. Settings
10. Backend Classification API

### 5.2 Module Descriptions

#### Onboarding Flow

The OnboardingFlow module is the first experience for new users. It introduces the core features of Safe Chat AI through a guided multi-step walkthrough, explaining the purpose of the application and how to use the message scanning feature. Once the user completes onboarding, the `onboarded` flag is saved to `localStorage`, and they are directed to the Login screen. Returning users bypass this module automatically.

#### Login Screen

The LoginScreen module provides a simple, client-side username entry form. Users enter their display name, which is stored locally and used to personalize the dashboard greeting. This lightweight authentication model ensures instant access without backend user management. The user profile persists across browser sessions.

#### Home Dashboard

The HomePage module serves as the central hub of the application. It displays:
- A personalized welcome header with the user's name.
- Three key statistics: Total Scanned, Blocked, and Threat Rate.
- A system status indicator confirming AI protection is active.
- Category cards for Spam, Harassment, Scam, and Promotional messages, each showing the count of detected messages. Tapping a card navigates to the Category Detail view.
- A floating action button (mobile) or header button (desktop) to open the Scan Sheet.

#### Scan Message (ScanSheet)

The ScanSheet module is the core user interaction point. It renders as a bottom sheet on mobile and a centered modal on desktop. Users paste or type any message they wish to analyze. Upon clicking "Scan Message," the frontend calls the `/api/classify` endpoint. A loading indicator is displayed during the API request. Upon receiving the response, the scanned message is added to local history and the ScanResult view is displayed within the same sheet.

#### Scan Result (ScanResult)

The ScanResult module renders the classification output returned by the backend. It displays:
- A color-coded category badge (e.g., red for Harassment, orange for Spam).
- Confidence percentage.
- A list of flagged patterns detected by the regex engine.
- Action buttons (Allow, Warn, Block, Report) allowing the user to record their response to the message.

The selected action is persisted with the message in `localStorage`.

#### Category Detail

The CategoryDetail module renders when a user taps a category card on the Home Dashboard. It displays a filtered list of all messages belonging to that category, showing each message's content, confidence score, flagged patterns, and any action taken. Users can apply or change actions for individual messages from this view. A back button returns the user to the Home Dashboard.

#### Reports & Analytics

The ReportsPage module provides a visual summary of all scanned messages using interactive charts built with the Recharts library. It displays:
- Quick stats row: Total Scanned, Threats Detected, Safe Messages, Actions Taken.
- A pie chart showing the percentage distribution of messages across all categories.
- A bar chart showing message counts per category with consistent color coding.

This module helps users understand their personal threat landscape over time.

#### Notifications

The NotificationsPage module presents a chronological feed of scanned messages that were flagged as threats (non-Normal category). This allows users to review all detected harmful messages in a dedicated, easy-to-browse list, similar to an inbox for threats.

#### Settings

The SettingsPage module allows users to manage their account and data:
- Displays the current user's name.
- Provides a "Clear All Messages" option to erase all scan history from `localStorage`.
- Provides a "Log Out" option that clears all messages and resets the user profile, returning to the Login screen.

#### Backend Classification API

The backend is a FastAPI application (`main.py`) that exposes two endpoints:

**Text Preprocessing (`preprocess` function):**
Incoming message text is cleaned before classification:
1. Converted to lowercase.
2. URLs and email addresses are removed.
3. Non-alphabetic characters are stripped.
4. Whitespace is normalized.

**Pattern Detection (`detect_patterns` function):**
A regex-based engine runs on the *original* (unprocessed) text and checks for 12 suspicious patterns:
- Excessive caps
- Suspicious links
- Money/prize language
- Urgency tactics
- Call-to-action phrases
- Requests for sensitive information
- Threatening language
- Personal attacks
- Marketing/discount language
- Marketing content (subscribe, newsletter)
- Multiple exclamation marks
- Unrealistic promises

**Classification (`/api/classify` endpoint):**
1. The preprocessed text is transformed into a TF-IDF feature vector using the loaded vectorizer.
2. The trained scikit-learn model predicts the category.
3. `predict_proba` is called to extract the confidence score (maximum class probability).
4. The response is returned as a JSON object containing the category, confidence, and flagged patterns.

---

## 6. TESTING AND IMPLEMENTATION

### 6.1 Objectives of Testing

The objective of testing Safe Chat AI is to ensure that:
- The ML model accurately classifies messages across all five categories.
- The regex pattern detector correctly identifies all defined suspicious patterns.
- The API endpoints handle valid and invalid inputs gracefully.
- The frontend correctly sends requests and renders responses.
- Data persistence via `localStorage` functions correctly across sessions.
- The application is responsive and functional on both mobile and desktop viewports.

### 6.2 Test Plan

Testing was conducted in multiple phases covering the backend API, the ML classification engine, pattern detection, frontend components, and end-to-end user flows. Test cases were designed to cover normal operation, edge cases (empty input, very long messages), and failure scenarios (backend unavailable).

### 6.3 Testing Methods

The following testing methodologies were applied:

**Unit Testing**
Individual functions were tested in isolation:
- `preprocess()`: Verified that URLs, emails, special characters, and extra whitespace are correctly stripped.
- `detect_patterns()`: Each of the 12 regex patterns was tested with representative inputs to confirm correct detection.
- `useMessages` hook: Tested that `addMessage`, `setAction`, and `clearMessages` correctly update state and persist to `localStorage`.

**Integration Testing**
The frontend and backend were tested together to verify that:
- The Scan Sheet correctly sends the user's text to `/api/classify` via the `classifyMessage` API function.
- The returned `category`, `confidence`, and `flagged_patterns` fields are correctly mapped to the Message type and rendered in the ScanResult component.
- Actions applied in CategoryDetail are reflected correctly in the messages store.

**Validation Testing**
Validation testing confirmed that the system meets all functional requirements:
- Messages are classified into the correct categories with high confidence.
- All five categories (Normal, Spam, Harassment, Scam, Promotional) are correctly handled end-to-end.
- The confidence score is always between 0 and 1.
- Flagged patterns are always an array (empty if none detected).

**Output Testing**
The output of the system was verified for correctness and format:
- API responses conform to the `ClassifyResponse` schema.
- Charts on the Reports page render correctly for all category combinations.
- Dashboard statistics update in real time as messages are scanned and actions are applied.

**Whitebox Testing**
Whitebox testing was applied to the backend Python code:
- All branches in `detect_patterns()` were exercised to ensure full regex coverage.
- The preprocessing pipeline was traced for inputs containing URLs, emails, and special characters.
- Model loading from `model/model.pkl` and `model/vectorizer.pkl` was verified to occur once at startup.

**Blackbox Testing**
Blackbox testing focused on the user-visible behavior of the application:
- Correct classification of known spam, scam, harassment, and normal messages.
- Graceful error display when the backend is unavailable.
- Correct persistence of scan history across browser refreshes.
- Correct behavior of the Logout and Clear Messages functions.

**User Acceptance Testing**
The system was tested by representative users who scanned real-world message samples. Feedback confirmed that:
- The classification results matched user expectations for common threat types.
- The interface was intuitive and easy to navigate on both mobile and desktop.
- The flagged pattern explanations helped users understand the AI's reasoning.
- The action buttons provided a satisfying sense of control over detected threats.

### 6.4 System Implementation

The implementation of Safe Chat AI was carried out in the following phases:

**Environment Setup:**
The backend Docker container runs the FastAPI application with Uvicorn as the ASGI server, exposed on port 8000. The frontend Docker container builds the React application with Vite and serves it via Nginx on port 3000. Docker Compose orchestrates both containers, with the frontend depending on the backend service.

**Model Deployment:**
The trained scikit-learn model (`model.pkl`) and TF-IDF vectorizer (`vectorizer.pkl`) are bundled inside the backend Docker image under the `model/` directory. They are loaded once at application startup using `joblib.load()` and reused for all subsequent classification requests.

**Frontend Deployment:**
The React application is built with `npm run build` inside the frontend Dockerfile, producing a static bundle that Nginx serves. The Nginx configuration proxies `/api/` requests to the backend container, enabling seamless communication without exposing the backend port to the public.

**CORS Configuration:**
The FastAPI backend is configured with CORS middleware to allow requests from both the local development server (`http://localhost:5173`) and the production domain (`https://safe-chat-ai.sidai.in`).

After deployment, the system was verified with end-to-end testing across multiple devices. Support documentation and usage guidance were prepared for end users.

---

## 7. CONCLUSION

Safe Chat AI provides an effective, user-centered solution for the growing problem of harmful digital communications. By combining a machine learning classification engine with a transparent regex-based pattern detection system, the application delivers accurate, explainable results that empower users to protect themselves from spam, scams, harassment, and unwanted promotions.

Through a carefully structured development lifecycle — including requirement analysis, modular design, iterative implementation, and comprehensive testing — the system has been built for reliability, responsiveness, and ease of use. The use of modern technologies such as React, TypeScript, FastAPI, and Docker ensures that the application is maintainable, scalable, and deployable in both local and cloud environments.

The successful implementation of Safe Chat AI demonstrates that AI-powered safety tools need not be complex or opaque. By presenting classification results alongside human-readable explanations and giving users direct control through action buttons, the system builds trust and promotes informed decision-making in digital communication.

---

## 8. FUTURE ENHANCEMENT

The following enhancements are proposed for future versions of Safe Chat AI:

**Advanced ML Model Training:**
The current model can be retrained on larger, more diverse datasets to improve classification accuracy across all categories. Transformer-based models (e.g., BERT, DistilBERT) could be integrated for richer contextual understanding of messages.

**Real-time Chat Integration:**
Browser extensions or API integrations with popular messaging platforms could enable automatic scanning of incoming messages without requiring manual copy-paste, providing seamless protection.

**Multi-language Support:**
Extending the preprocessing pipeline and training data to support multiple languages would make Safe Chat AI accessible to a global user base.

**Cloud-based User Accounts:**
Introducing optional server-side user accounts would allow scan history and settings to sync across devices and be backed up securely in the cloud.

**Severity Scoring:**
Beyond binary category classification, a severity score could provide finer-grained risk assessment, helping users prioritize which threats require immediate attention.

**Batch Scanning:**
A bulk scan feature would allow users to upload a list of messages (e.g., a CSV export from a messaging app) and receive a comprehensive safety report for the entire dataset.

**Push Notifications:**
Integration with web push notifications could alert users when a previously blocked sender attempts to send a new message.

**Parental Control Mode:**
A dedicated mode for parents to monitor messages received by their children, with automatic alerting for high-severity threats, would expand the use case to family safety.

**Feedback Loop:**
Allowing users to report incorrect classifications would generate labeled data that can be used to continuously improve the ML model through active learning.

**Accessibility Enhancements:**
Full keyboard navigation, screen reader support (ARIA labels), and high-contrast mode would make the application accessible to users with disabilities.

---

## BIBLIOGRAPHY

[1]. Géron, A. (2019). *Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow* (2nd ed.). O'Reilly Media.

[2]. Pedregosa, F., et al. (2011). Scikit-learn: Machine Learning in Python. *Journal of Machine Learning Research*, 12, 2825–2830.

[3]. Ramage, D., Hall, D., Nallapati, R., & Manning, C. D. (2009). Labeled LDA: A supervised topic model for credit attribution in multi-labeled corpora. *Proceedings of the 2009 Conference on Empirical Methods in Natural Language Processing*, 248–256.

[4]. Fastapi Documentation. (2024). FastAPI – A modern, fast web framework for building APIs with Python 3.8+. Retrieved from https://fastapi.tiangolo.com

[5]. React Documentation. (2024). React – A JavaScript library for building user interfaces. Retrieved from https://react.dev

[6]. Sculley, D., Holt, G., Golovin, D., Davydov, E., Phillips, T., Ebner, D., ... & Young, M. (2015). Hidden Technical Debt in Machine Learning Systems. *Advances in Neural Information Processing Systems*, 28.

[7]. Zoltan, G. (2020). *Natural Language Processing with Python and spaCy*. No Starch Press.

### WEBSITE REFERENCES

[1]. https://fastapi.tiangolo.com – FastAPI Official Documentation

[2]. https://scikit-learn.org/stable/ – scikit-learn Official Documentation

[3]. https://react.dev – React Official Documentation

[4]. https://tailwindcss.com – Tailwind CSS Official Documentation

[5]. https://recharts.org – Recharts Official Documentation

[6]. https://docs.docker.com – Docker Official Documentation

---

## APPENDICES

### Appendix A: System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                        USER BROWSER                                 │
│                                                                     │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────┐  ┌────────────┐  │
│  │  Onboarding │  │   Dashboard  │  │  Reports  │  │  Settings  │  │
│  │    Flow     │  │  (HomePage)  │  │   Page    │  │    Page    │  │
│  └─────────────┘  └──────────────┘  └───────────┘  └────────────┘  │
│                          │                                          │
│              ┌───────────────────────┐                              │
│              │     ScanSheet Modal   │                              │
│              │  ┌─────────────────┐  │                              │
│              │  │  Text Input     │  │                              │
│              │  └────────┬────────┘  │                              │
│              └───────────┼───────────┘                              │
│                          │ HTTP POST /api/classify                  │
└──────────────────────────┼──────────────────────────────────────────┘
                           │
                  ┌────────▼────────┐
                  │   Nginx Proxy   │ (Frontend Container)
                  └────────┬────────┘
                           │ Proxied to backend:8000
                  ┌────────▼────────┐
                  │    FastAPI      │ (Backend Container)
                  │  /api/classify  │
                  │  /api/health    │
                  └────────┬────────┘
                           │
              ┌────────────┴────────────┐
              │                         │
    ┌─────────▼──────────┐   ┌──────────▼──────────┐
    │   TF-IDF           │   │  Regex Pattern      │
    │   Vectorizer       │   │  Detector           │
    │   (vectorizer.pkl) │   │  (detect_patterns)  │
    └─────────┬──────────┘   └──────────┬──────────┘
              │                         │
    ┌─────────▼──────────┐              │
    │  sklearn Classifier │              │
    │  (model.pkl)        │              │
    └─────────────────────┘              │
              │                         │
              └────────────┬────────────┘
                           │
                ┌──────────▼──────────┐
                │  ClassifyResponse   │
                │  {category,         │
                │   confidence,       │
                │   flagged_patterns} │
                └─────────────────────┘
```

### Appendix B: Data Flow Diagram

**Level 0 – Context Diagram:**

```
                    ┌───────────────────────────┐
                    │                           │
    Message Text ──►│     SAFE CHAT AI SYSTEM   │──► Classification Result
                    │                           │
        User ──────►│                           │──► Statistics & Reports
                    │                           │
                    └───────────────────────────┘
```

**Level 1 – System Data Flow:**

```
User Input
    │
    ▼
[1.0 Preprocess Text]
    │  Clean text (lowercase, remove URLs/emails/special chars)
    ▼
[2.0 Vectorize Text]
    │  TF-IDF feature extraction
    ▼
[3.0 Classify Message]
    │  ML model prediction + confidence
    ▼
[4.0 Detect Patterns]
    │  Regex pattern matching on original text
    ▼
[5.0 Store Message]
    │  Persist to localStorage
    ▼
[6.0 Display Result]
    │  Render category, confidence, flagged patterns
    ▼
[7.0 User Action]
    Allow / Warn / Block / Report
    │
    ▼
[8.0 Update Record]
    Persist action to localStorage
```

### Appendix C: Message Category Definitions

| Category | Description | Example Indicators |
|----------|-------------|-------------------|
| Normal | Safe, benign message with no harmful intent | Everyday conversation, greetings |
| Spam | Unsolicited, bulk, or irrelevant messages | Repeated messages, nonsense content |
| Harassment | Messages intended to intimidate, threaten, or distress the recipient | Threats, personal attacks, abusive language |
| Scam | Messages designed to deceive the recipient for financial or personal gain | Phishing, fake prizes, requests for passwords |
| Promotional | Unsolicited marketing or advertising content | Discounts, coupons, subscribe/unsubscribe links |

### Appendix D: Detected Pattern Reference

| Pattern Name | Trigger Condition |
|---|---|
| Excessive caps | 3 or more consecutive uppercase letters |
| Suspicious link | URLs containing http/https, bit.ly, or tinyurl |
| Money/prize language | Words: $, money, cash, prize, winner, won, lottery |
| Urgency tactics | Words: urgent, immediately, act now, limited time, expires |
| Call to action | Phrases: click here, click this, click below, tap here |
| Requests sensitive info | Words: bank, account, password, ssn, social security, verify |
| Threatening language | Words: threat, kill, hurt, die, destroy, watch your back |
| Personal attacks | Words: idiot, stupid, pathetic, worthless, loser, ugly, hate |
| Marketing/discount language | Words: % off, discount, coupon, sale, deal, offer, free shipping |
| Marketing content | Words: subscribe, unsubscribe, newsletter, promo |
| Multiple exclamation marks | Two or more consecutive exclamation marks |
| Unrealistic promises | Phrases: guaranteed, no risk, 100% |

### Appendix E: API Endpoint Reference

**POST /api/classify**

Classifies a text message and returns its category, confidence, and flagged patterns.

*Request Body:*
```json
{
  "text": "Congratulations! You've WON a $1000 prize. Click here NOW to claim!"
}
```

*Response Body:*
```json
{
  "category": "Scam",
  "confidence": 0.9231,
  "flagged_patterns": [
    "Money/prize language",
    "Urgency tactics",
    "Call to action",
    "Multiple exclamation marks",
    "Excessive caps"
  ]
}
```

**GET /api/health**

Returns the health status of the backend service.

*Response Body:*
```json
{
  "status": "ok"
}
```

---

*End of Project Report*
