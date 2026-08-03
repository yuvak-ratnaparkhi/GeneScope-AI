# GeneScope AI — Product Requirements Document (PRD)

> **Status:** ✅ Project Complete — All 20 Development Phases Finished & Production Deployed

---

## 1. Project Summary

GeneScope AI is an **explainable, privacy-conscious, offline-resilient genetic risk screening platform**. It predicts the likelihood of a genetic disorder category from patient-reported clinical data, explains *why* the model reached that conclusion using SHAP, and converts that explanation into a plain-language AI summary using Gemini 2.5 Flash / OpenAI.

*Portfolio and demo project built on a public dataset — not real patient data, and not a certified medical device.*

---

## 2. Problem Statement

Most ML-powered health screening demos are black boxes: they output a number with no reasoning, no privacy consideration, and no resilience when offline. GeneScope AI demonstrates that a screening tool can be:

- **Accurate & Honest:** A trained Random Forest model with documented validation and leakage testing (68.5% accuracy).
- **Explainable:** Every prediction includes top contributing factors computed via SHAP.
- **Private by Design:** Client-side hashing and PII stripping ensure personal data never leaves the device.
- **Resilient:** Graceful offline detection and fallback handling.
- **Human-Centered & Guardrailed:** Defers to certified healthcare professionals, never claims to diagnose.

---

## 3. Target Users

| User Persona | Why They Use It | Primary Need |
|---|---|---|
| **End User (Demo Persona)** | Wants a quick, understandable genetic risk screening without creating an account or handing over personal data. | Fast, non-technical risk breakdown and plain-language summary with zero PII required. |
| **Recruiters & Engineering Leads** | Evaluating real full-stack ML engineering, explainability, GenAI integration, privacy design, and product craftsmanship. | Production-grade code, honest metrics, transparent architecture, and live deployment. |
| **Project Owner (Yuvak)** | Portfolio centerpiece demonstrating end-to-end ML engineering, clean system architecture, and web deployment. | Full-stack showcase spanning ML model training, FastAPI backend, and Next.js frontend. |

---

## 4. Goals & Non-Goals

### Goals
- Predict genetic disorder risk categories from structured clinical inputs.
- Explain the top contributing factors behind each prediction (SHAP).
- Convert explanations into plain-language summaries via LLM (Gemini 2.5 Flash / OpenAI).
- Provide a guardrailed AI Health Assistant for contextual Q&A on screening results.
- Ensure zero PII collection or transmission anywhere in the application.
- Function gracefully with offline detection and client-side handling.
- Persist anonymized prediction history tied to a hashed anonymous identity in PostgreSQL.
- Present all features in a polished, responsive, healthcare-grade Next.js web interface.

### Non-Goals
- **Diagnostic Tool:** Does not diagnose real medical conditions or replace clinical diagnosis.
- **Treatment / Medication Advisor:** Explicitly restricted from providing dosage, prescriptions, or medical treatment advice.
- **User Account Management:** No user registration, passwords, or stored PII — persistence relies strictly on anonymous hashed device/session identity.

---

## 5. Core Features & Status

| Feature | Status | Tech Stack / Layer |
|---|---|---|
| Random Forest risk prediction model | ✅ Complete | scikit-learn, Python, joblib |
| SHAP explainability layer | ✅ Complete | SHAP, Python |
| FastAPI backend REST API | ✅ Complete | FastAPI, Uvicorn, Pydantic v2 |
| Gemini / OpenAI plain-language summaries | ✅ Complete | Google GenAI SDK (Gemini 2.5 Flash) |
| Client-side PII anonymization & hashing | ✅ Complete | JavaScript (`anonymize.js`), SHA-256 |
| Offline detection & fallback UI | ✅ Complete | React / Next.js state, NetInfo |
| Mobile application shell (React Native / Expo) | ✅ Complete (Frozen) | Phase 12 mobile shell & navigation |
| PostgreSQL persistence & history endpoints | ✅ Complete | PostgreSQL, SQLAlchemy 2.0 |
| Next.js Web Prediction Wizard | ✅ Complete | Next.js 16 (App Router), React 19, TypeScript |
| Web Results Dashboard & SHAP visualization | ✅ Complete | Recharts, Tailwind CSS v4, Framer Motion |
| AI Health Assistant (guardrailed chatbot) | ✅ Complete | Next.js, FastAPI, Gemini API |
| Motion & Micro-interaction Polish | ✅ Complete | Framer Motion, Tailwind CSS v4 |
| Production Web & Backend Deployment | ✅ Complete | Vercel (Web), Render (FastAPI + Postgres) |
| Portfolio Polish & Live Links | ✅ Complete | README, documentation, and live demo links |

---

## 6. Success Criteria

- A user can complete a full screening (form → prediction → explanation → AI summary) in under 2 minutes with zero PII transmitted.
- The web app visually reads as a professional, trustworthy healthcare product.
- The AI Health Assistant answers user questions contextually while maintaining strict medical safety guardrails.
- The repository stands as an honest, fully documented, non-overclaiming portfolio showcase.

---

## 7. Constraints & Safety Rules

- **Public/synthetic dataset only** — no real patient data.
- **Strict PII stripping** on the client before network transmission.
- **Medical safety guardrails:** no medication recommendations, diagnosis, or clinical prescriptions.
- **Honest performance documentation:** no inflated metrics or hidden data leakage.