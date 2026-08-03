# GeneScope AI — Development Rules & Conventions

> **Status:** ✅ Complete & Active Guidelines for GeneScope AI

---

## 1. Codebase Standards & Tech Choices

### Backend (Python & FastAPI)
- **Database & ORM:** Use SQLAlchemy ORM for all database operations (no raw SQL queries).
- **Data Validation:** Use Pydantic v2 schemas for all incoming request and outgoing response payloads.
- **Dependency Injection:** Use `Depends(get_db)` for database session management.
- **Error Handling:** Raise `HTTPException(status_code, detail)` for all operational failures. Never leak raw stack traces to the client.

### Web Frontend (Next.js & React)
- **Styling:** Use Tailwind CSS v4 design tokens and utility classes exclusively.
- **Component Primitives:** Use `shadcn/ui` / Base UI for base components.
- **Icons:** Use `Lucide React` across all web components for visual consistency.
- **Charts & Visuals:** Use `Recharts` for interactive SHAP factor breakdowns and risk metric displays.
- **TypeScript:** Enforce strict TypeScript typing across all web components and service utilities.

### Mobile App (React Native — Frozen)
- Use `utils/theme.js` as the single source of truth for design tokens.

---

## 2. Privacy & Security Rules

- **Zero PII Transmission:** Never send user names, emails, phone numbers, or dates of birth to the backend API.
- **Client-Side Anonymization:** PII stripping and SHA-256 identity hashing must occur entirely on the client *before* network requests.
- **No Hardcoded Secrets:** Store API keys (`GEMINI_API_KEY`, `DATABASE_URL`) strictly in `.env` files.
- **Anonymous Persistence:** History records in PostgreSQL are keyed solely by anonymous device/session SHA-256 hashes.

---

## 3. AI Assistant Medical Guardrails

1. **No Diagnosis:** The AI Assistant must never diagnose medical conditions or issue clinical determinations.
2. **No Treatment / Medication Advice:** The AI Assistant must never prescribe or name specific medications, dosages, or treatment plans. Always redirect treatment queries to certified healthcare professionals.
3. **Context Scoping:** AI summaries and chat responses must be strictly scoped to the user's anonymized screening metrics.
4. **Mandatory Disclaimer:** Every AI response must include a concise, professional medical disclaimer.
5. **Fallback to Clinical Consultation:** When encountering ambiguous or high-risk queries, default to recommending a consultation with a physician or genetic counselor.

---

## 4. Operational & Network Error Handling

**Backend:** Wrap route logic in `try/except` → `HTTPException(status_code, detail)`. Never leak stack traces to the client.

**Frontend:** Distinguish error types explicitly:
| Error Type | Meaning | UI Response |
|---|---|---|
| `OFFLINE` | No internet connection | Show offline banner, block form submission |
| `API_ERROR` | FastAPI request failed | Friendly user notification & retry button |
| `HISTORY_ERROR` | History fetch failed | Render clean empty state + manual refresh |

*Always log real errors via `console.error`; always present plain, friendly messages to end users.*

---

## 5. Repository Integrity Rules

- **Honest Status:** Mark project phases as complete (`✅`) only after end-to-end runtime verification.
- **No Aspirational Tech List:** Documentation and README tech stack tables must strictly match installed, running dependencies.