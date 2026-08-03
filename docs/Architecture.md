# GeneScope AI — Architecture Document

> **Status:** ✅ Complete — Production Architecture (Web on Vercel, Backend & Database on Render)

---

## 1. System Overview

GeneScope AI features a unified **FastAPI REST backend** powering **two frontends**: a modern **Next.js Web Application** (active, deployed on Vercel) and a **React Native Mobile App** (frozen at Phase 12). Both frontends interact seamlessly with the backend REST API and PostgreSQL database.

```
              ┌───────────────────────────────────────────┐
              │              FastAPI Backend              │
              │  (Random Forest, SHAP, Gemini/OpenAI, DB) │
              │            Deployed on Render             │
              └─────────────────────┬─────────────────────┘
                                    │  REST API
        ┌───────────────────────────┴───────────────────────────┐
        │                                                       │
┌───────────────┐                                       ┌───────────────┐
│  Mobile App   │                                       │    Web App    │
│ (React Native │                                       │   (Next.js    │
│    / Expo)    │                                       │ App Router)   │
│ STATUS: frozen│                                       │ STATUS: Live  │
└───────────────┘                                       └───────────────┘
```

---

## 2. End-to-End Data Flow

1. **User Input:** User completes the genetic risk screening wizard (age, clinical history, lifestyle, gene markers).
2. **Client Anonymization:** Client strips all PII and generates a SHA-256 anonymous user hash — **zero personal data leaves the browser**.
3. **Offline Check:** Client verifies network connectivity. If offline, graceful fallback UI triggers.
4. **Prediction Request:** Client sends `{ features, user_hash }` to `POST /api/predict`.
5. **ML Prediction:** FastAPI backend runs the trained Random Forest classifier to determine disorder risk probability.
6. **Explainability Computation:** Backend invokes SHAP engine to calculate feature contribution scores.
7. **LLM Summary Generation:** Backend sends risk prediction and top SHAP features to Gemini 2.5 Flash / OpenAI to craft a plain-language explanation.
8. **Database Persistence:** Backend saves anonymized prediction record (disorder category, SHAP scores, AI summary, timestamp) to PostgreSQL keyed by `user_hash`.
9. **Client Rendering:** Web/Mobile client renders interactive risk gauge, SHAP factor breakdown charts, and LLM summary.
10. **History Retrieval:** Client queries `GET /api/history/{user_hash}` to display historical screening timeline.

---

## 3. Backend Directory Structure (`backend/`)

```
backend/
├── app/
│   ├── main.py                       # FastAPI app entrypoint, CORS, router registration
│   ├── database.py                   # SQLAlchemy engine & PostgreSQL connection pool
│   ├── db_models.py                  # Database ORM schema (Prediction table)
│   ├── routers/
│   │   ├── predict.py                # POST /api/predict
│   │   ├── history.py                # GET /api/history/{user_hash}
│   │   └── chat.py                   # POST /api/chat (AI Assistant)
│   ├── schemas/
│   │   └── predict_schema.py         # PredictRequest / PredictResponse (Pydantic v2)
│   └── services/
│       ├── ml_service.py             # Model loader & inference wrapper
│       ├── explainability_service.py # SHAP calculation engine
│       └── llm_service.py            # Gemini 2.5 Flash / OpenAI API client
├── tests/
│   ├── test_predict.py               # API & model unit tests
│   └── test_chat.py                  # AI assistant guardrail tests
├── requirements.txt                  # Backend Python dependencies
└── model_v1.pkl                      # Serialized Random Forest model artifact
```

---

## 4. Web Application Structure (`web/`) — Production Live

```
web/
├── app/                              # Next.js 16 App Router
│   ├── page.tsx                      # Landing page with CTA & features
│   ├── dashboard/page.tsx            # Main user control dashboard
│   ├── screening/page.tsx            # Multi-step genetic screening wizard
│   ├── results/page.tsx              # Detailed risk dashboard & SHAP visualizer
│   ├── history/page.tsx              # Prediction history timeline
│   ├── assistant/page.tsx            # Contextual AI Health Assistant chatbot
│   ├── privacy/page.tsx              # Interactive Privacy Center
│   └── profile/page.tsx              # Anonymous user profile settings
├── components/
│   ├── ui/                           # Base UI & Radix primitives
│   ├── shared/                       # Navbar, Footer, RiskGauge, FactorChart, RiskBadge
│   └── assistant/                    # Chat interface & message bubbles
├── lib/
│   ├── api.ts                        # Typed API client wrapper & feature mapper
│   ├── anonymize.ts                  # Client-side PII stripping & hashing
│   └── userIdentity.ts               # Anonymous persistent ID manager
├── styles/
│   └── globals.css                   # Tailwind CSS v4 design tokens & utilities
└── package.json
```

---

## 5. Mobile Application Structure (`mobile/`) — Frozen at Phase 12

```
mobile/
├── App.js                            # React Navigation bottom-tabs (Home/History/Profile)
├── screens/
│   ├── FormScreen.js                 # Screening questionnaire
│   ├── ResultScreen.js               # Risk gauge & factor breakdown
│   └── HistoryScreen.js              # Historical screening list
├── components/                       # Custom mobile component library
├── services/
│   ├── api.js                        # Mobile API client
│   └── network.js                    # NetInfo connectivity listener
└── package.json
```

---

## 6. Tech Stack Overview

| Layer | Technology | Status |
|---|---|---|
| ML Engine | Python 3.10+, scikit-learn (Random Forest), pandas | ✅ In use |
| Explainability | SHAP (SHapley Additive exPlanations) | ✅ In use |
| Model Storage | joblib (`model_v1.pkl`) | ✅ In use |
| Backend Framework | FastAPI, Uvicorn, Pydantic v2 | ✅ In use |
| Database & ORM | PostgreSQL, SQLAlchemy 2.0, psycopg2 | ✅ In use |
| Generative AI | Google GenAI SDK (Gemini 2.5 Flash) / OpenAI API | ✅ In use |
| Web Application | Next.js 16 (App Router), React 19, TypeScript | ✅ Live on Vercel |
| Web Styling & UI | Tailwind CSS v4, Framer Motion, Recharts, Lucide Icons | ✅ In use |
| Privacy & Export | Client-side PII Anonymization (`anonymize.js`), jsPDF | ✅ In use |
| Deployment (Web) | Vercel (`gene-scope-ai-chi.vercel.app`) | ✅ Live |
| Deployment (Backend)| Render (`genescope-backend.onrender.com`) | ✅ Live |
| Mobile App | React Native (Expo SDK 57) | ✅ Frozen at Phase 12 |

---

## 7. Key Architectural Decisions

1. **Client-Side Privacy First:** Anonymization and hashing occur entirely in the user's browser before network transmission. Raw names, emails, or phone numbers are never transmitted or logged.
2. **Stateless Backend with Anonymous Persistence:** The FastAPI backend requires no user logins or passwords. History persistence relies strictly on anonymous SHA-256 identity hashes.
3. **Multi-Layer AI System:** ML models handle objective risk probability, SHAP handles explainability, and LLMs handle human-readable clinical summaries — keeping each AI layer specialized and auditable.
4. **Single Backend, Dual Frontends:** Mobile and web frontends consume identical REST API contracts (`/api/predict`, `/api/history/{user_hash}`, `/api/chat`), ensuring seamless multi-platform support.