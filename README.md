# GeneScope AI — Explainable Genetic Risk Screening Platform

> ⚠️ **Portfolio/demo project only.** Built using a public dataset — not real patient data.
> This is not a certified medical device and should never be used for real diagnosis.

## What This Project Does

GeneScope AI predicts the risk of a genetic disorder using patient clinical data,
and explains *why* it made that prediction — not just a number.

- Predicts risk using a **Random Forest** model
- Explains the **top reasons** behind each prediction
- Turns the result into a **plain-language summary** using an LLM (Gemini/OpenAI)
- Still works **offline**, showing a clear offline status instead of failing silently

## Tech Stack

| Layer | Technology |
|---|---|
| ML Model | scikit-learn (Random Forest) |
| Explainability | SHAP (SHapley Additive exPlanations) |
| AI Interpretation | Gemini API / OpenAI (switchable plain-language summary) |
| Backend API | FastAPI (Python, Uvicorn) |
| Database & ORM | PostgreSQL, SQLAlchemy |
| Web Application | Next.js (App Router, React, TypeScript) |
| Styling & Components | Tailwind CSS v4, shadcn/ui, Lucide Icons |
| Mobile App | React Native (Expo) — *Frozen at Phase 12* |
| Privacy & Client Utilities | Anonymization (`anonymize.js`), Web Share API, Native Print Engine |

## Project Status

- ✅ Phase 1 — Foundation & Planning — complete
- ✅ Phase 2 — Data & EDA — complete
- ✅ Phase 3 — Core ML Model (Random Forest) — complete (68.5% accuracy, documented leakage test) 
- ✅ Phase 4 — Explainability Layer — complete
- ✅ Phase 5 — Backend API (FastAPI) — complete
- ✅ Phase 6 — Generative AI Interpretation Layer — complete 
- ✅ Phase 7 — Privacy & Anonymization Layer (Client-Side) — complete
- ✅ Phase 8 — Offline Fallback Mode (lightweight) — complete
- ✅ Phase 9 — Mobile Frontend Integration — complete (mocked API, pending deployment)
- ✅ Phase 10 — Healthcare-themed UI Redesign — complete (dynamic risk scoring, reusable component library)
- ✅ Phase 11 — Database & Persistence Layer (PostgreSQL) — complete

- ✅ Phase 12 — Mobile App Shell & Navigation (Home/History/Profile tabs) — complete, mobile app frozen here
- ✅ Phase 13 — Web App Foundation (Next.js) — complete
- ✅ Phase 14 — Web Prediction Wizard — complete
- ✅ Phase 15 — Web Results Dashboard — complete
- ✅ Phase 16 — Web History & Profile — complete
- ✅ Phase 17 — AI Health Assistant — complete
- 🚧 Phase 18 — Motion & Micro-interaction Polish — Next
- ⬜ Phase 19 — Testing, Hardening, Deployment — Pending
- ⬜ Phase 20 — Portfolio Polish — Pending

## Important Disclaimer

This app does **not** diagnose any real medical condition. All predictions are
for educational and portfolio purposes only, based on a public dataset.

## License

MIT — see `LICENSE` file.