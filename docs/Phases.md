# GeneScope AI — Project Phases

> Status: Living document — updated as each phase is completed and verified

**Legend:** ✅ Done &nbsp;|&nbsp; 🚧 In Progress &nbsp;|&nbsp; ⬜ Planned

---

## Completed Phases

| Phase | Name | Summary |
|---|---|---|
| 1 | Foundation & Planning | Project scope, dataset selection, initial planning |
| 2 | Data & EDA | Exploratory data analysis on the public genetic disorder dataset |
| 3 | Core ML Model | Random Forest classifier trained and evaluated (68.5% accuracy, documented leakage test) |
| 4 | Explainability Layer | SHAP integrated to extract top contributing features per prediction |
| 5 | Backend API | FastAPI backend built — `/api/predict` endpoint, request/response schemas |
| 6 | Generative AI Interpretation Layer | Gemini/OpenAI integration — converts prediction + SHAP output into a plain-language summary |
| 7 | Privacy & Anonymization Layer (Client-Side) | `anonymize.js` — strips PII, hashes identifiers client-side before any network call |
| 8 | Offline Fallback Mode | Lightweight version — network detection + offline banner, blocks submission when offline |
| 9 | Mobile Frontend Integration | Form and Result screens, navigation, TTS, accessibility labels (mocked API) |
| 10 | Healthcare-themed UI Redesign | Reusable component library (Card, RiskGauge, RiskBadge, FactorBar, PrimaryButton), dynamic mock scoring |
| 11 | Database & Persistence Layer | PostgreSQL integrated via SQLAlchemy, predictions saved and retrievable via `/api/history/{user_hash}` |
| 12 | Mobile App Shell & Navigation | Bottom tab navigation (Home/History/Profile), History and Profile screens — **mobile frozen here** |

---

## Current Phase

| Phase | Name | Summary |
|---|---|---|
| 13 | Web App Foundation | Next.js + Tailwind + shadcn/ui setup, design system, landing page. Full product review and information architecture completed prior to build. |

---

## Planned Phases

| Phase | Name | Summary |
|---|---|---|
| 14 | Web Prediction Wizard | Multi-step screening form (Personal Info → Family History → Lifestyle → Review → Predict) |
| 15 | Web Results Dashboard | Risk score, visual SHAP explainability, AI summary, PDF export, "Ask AI" entry point |
| 16 | Web History & Profile | Card-based history with filtering, anonymous profile with stats |
| 17 | AI Health Assistant | Guardrailed chatbot (web) — explains results, redirects clinical questions to doctors |
| 18 | Motion & Micro-interaction Polish | Skeleton loaders, page transitions, gauge fill animation, empty/error state polish |
| 19 | Testing, Hardening, Deployment | Backend deployed (Render/Railway), web deployed (Vercel), `USE_MOCK` flipped off, end-to-end testing |
| 20 | Portfolio Polish | README overhaul, demo video, recruiter-facing summary, final cleanup |

---

## Notes on Scope Decisions

- The mobile app (React Native/Expo) is **intentionally frozen** at Phase 12. It remains
  a complete, working, demonstrable product on its own — further mobile-specific
  feature work was deliberately paused in favor of the web app, to keep the project
  scope realistic given time constraints.
- A prior plan to add a rule-based offline scoring engine (Phase 8) was deliberately
  simplified to a lightweight "offline banner + blocked submission" approach, to avoid
  maintaining two divergent scoring systems.
- User profiles/history and document-upload (OCR) features were considered and
  intentionally scoped out of the active build — documented here as acknowledged
  future roadmap items rather than built features.