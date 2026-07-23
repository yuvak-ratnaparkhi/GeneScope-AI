# GeneScope AI — Architecture Document

> Status: Living document — reflects the system as of Phase 12 (mobile frozen), Phase 13 starting (web)

---

## 1. System Overview

GeneScope AI has **one backend** and **two frontends** (mobile, frozen; web, active
development). Both frontends talk to the same FastAPI backend and the same
PostgreSQL database.

```

              ┌───────────────────────┐
              │   FastAPI Backend      │
              │  (Random Forest, SHAP, │
              │   Gemini/OpenAI, DB)   │
              └───────────┬────────────┘
                          │  REST API
        ┌─────────────────┼─────────────────┐
        │                                    │
┌───────────────┐                 ┌────────────────────┐
│  Mobile App     │                 │   Web App           │
│  (React Native  │                 │   (Next.js, new)     │
│   / Expo)        │                 │                      │
│  STATUS: frozen  │                 │  STATUS: active dev  │
└───────────────┘                 └────────────────────┘

```

---

## 2. End-to-End Data Flow

1. User fills out the screening form (age, family history, lifestyle, gene markers)
2. Client strips PII and hashes any identifier — **nothing identifying leaves the device**
3. Client checks internet connectivity
   - Offline → show offline state, block submission
   - Online → continue
4. Client sends `{ features, user_hash }` to `POST /api/predict`
5. Backend runs the Random Forest model → predicted disorder category
6. Backend runs SHAP → top contributing features
7. Backend sends the disorder + top features to Gemini/OpenAI → plain-language summary
8. Backend saves the prediction (disorder, features, summary, timestamp) to PostgreSQL,
   keyed only by `user_hash`
9. Backend returns the full result to the client
10. Client renders the result (risk score, factor bars, AI summary)
11. Later, client can call `GET /api/history/{user_hash}` to retrieve past predictions

---

## 3. Backend Structure (`backend/`)

```
backend/
├── app/
│   ├── main.py                       # FastAPI app entrypoint, router registration
│   ├── database.py                   # SQLAlchemy engine/session setup (PostgreSQL)
│   ├── db_models.py                  # ORM models (Prediction table)
│   ├── routers/
│   │   ├── predict.py                # POST /api/predict
│   │   └── history.py                # GET /api/history/{user_hash}
│   ├── schemas/
│   │   └── predict_schema.py         # PredictRequest / PredictResponse (Pydantic)
│   └── services/
│       ├── ml_service.py             # Loads model, runs predict_risk()
│       ├── explainability_service.py # SHAP top-feature extraction
│       └── llm_service.py            # Gemini/OpenAI summary generation
├── tests/
│   └── test_predict.py
├── requirements.txt
└── venv/
```

---

## 4. Mobile Structure (`mobile/`) — frozen

```
mobile/
├── App.js                    # Bottom tab navigator (Home/History/Profile)
├── screens/
│   ├── FormScreen.js
│   ├── ResultScreen.js
│   └── HistoryScreen.js
├── components/
│   ├── Card.js
│   ├── RiskBadge.js
│   ├── RiskGauge.js
│   ├── FactorBar.js
│   ├── PrimaryButton.js
│   └── OfflineBanner.js
├── services/
│   ├── api.js                # getPrediction(), getHistory()
│   └── network.js            # isOnline()
├── utils/
│   ├── anonymize.js          # buildAnonymizedPayload(), hashIdentifier()
│   ├── userIdentity.js       # getUserHash() — persistent anonymous device hash
│   └── theme.js              # colors, spacing, radius
└── package.json
```

---

## 5. Web Structure (`web/`) — new, Phase 13+

```
web/
├── app/                       # Next.js App Router
│   ├── page.tsx                # Landing page
│   ├── dashboard/
│   │   └── page.tsx
│   ├── screening/
│   │   └── page.tsx             # Multi-step wizard
│   ├── results/[id]/
│   │   └── page.tsx
│   ├── history/
│   │   └── page.tsx
│   ├── assistant/
│   │   └── page.tsx             # AI Health Assistant
│   ├── privacy/
│   │   └── page.tsx             # Privacy Center
│   └── profile/
│       └── page.tsx
├── components/
│   ├── ui/                     # shadcn/ui primitives
│   └── shared/                 # RiskGauge, FactorChart, RiskBadge, etc.
├── lib/
│   ├── api.ts                  # API client, mirrors mobile's api.js
│   ├── anonymize.ts
│   └── userIdentity.ts
├── styles/
│   └── globals.css             # Tailwind + design tokens
└── package.json
```

---

## 6. Tech Stack — Full (Start to End)

| Layer | Technology | Status |
|---|---|---|
| ML Model | Python, pandas, scikit-learn (Random Forest) | ✅ In use |
| Explainability | SHAP | ✅ In use |
| Model serialization | joblib | ✅ In use |
| Backend framework | FastAPI | ✅ In use |
| Data validation | Pydantic | ✅ In use |
| Database | PostgreSQL | ✅ In use |
| ORM | SQLAlchemy | ✅ In use |
| DB driver | psycopg2-binary | ✅ In use |
| Server | Uvicorn | ✅ In use |
| GenAI summary | Gemini API (switchable to OpenAI) | ✅ In use |
| Mobile framework | React Native (Expo, SDK 57) | ✅ In use — frozen |
| Mobile navigation | React Navigation (native-stack, bottom-tabs) | ✅ In use |
| Mobile local storage | AsyncStorage | ✅ In use |
| Mobile hashing | expo-crypto (SHA-256) | ✅ In use |
| Mobile TTS | expo-speech | ✅ In use |
| Mobile charts/gauge | react-native-svg | ✅ In use |
| Mobile network detection | @react-native-community/netinfo | ✅ In use |
| **Web framework** | **Next.js** | 🚧 New — Phase 13 |
| **Web styling** | **Tailwind CSS** | 🚧 New — Phase 13 |
| **Web components** | **shadcn/ui** | 🚧 New — Phase 13 |
| **Web icons** | **Lucide** | 🚧 New — Phase 13 |
| **Web charts** | **Recharts** | 🚧 New — Phase 15 |
| **Web animation** | **Framer Motion** | 🚧 New — Phase 14 |
| Deployment (backend) | Render / Railway (planned) | ⬜ Planned |
| Deployment (web) | Vercel (planned) | ⬜ Planned |
| Version control | Git + GitHub | ✅ In use |

---

## 7. Key Architectural Decisions

- **Stateless-by-default backend, opt-in persistence.** Predictions are saved, but no
  user account exists — only an anonymous hash links records together.
- **SQLAlchemy over raw SQL.** Keeps the persistence layer portable between SQLite
  (early dev) and PostgreSQL (current) with a one-line connection string change.
- **Anonymization happens client-side, before the network call.** The backend never
  receives raw PII in the first place — there is nothing to accidentally log or leak.
- **Two independent frontends, one backend contract.** Mobile and web both consume the
  same `/api/predict` and `/api/history/{user_hash}` endpoints, so either can evolve
  independently without backend changes.