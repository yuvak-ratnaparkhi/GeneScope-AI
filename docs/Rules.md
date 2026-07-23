# GeneScope AI — Rules & Conventions

> Status: Living document — engineering and AI-safety guardrails for the whole project

---

## 1. What to Use

### Backend
- **SQLAlchemy ORM** for all database access — never write raw SQL strings
- **Pydantic models** for every request/response shape — no untyped dicts crossing
  the API boundary
- **Dependency injection** (`Depends(get_db)`) for database sessions — never open a
  session manually inside a route
- **HTTPException** for all error responses — never let an unhandled exception leak
  a raw stack trace to the client

### Web frontend
- **Tailwind CSS utility classes** for styling — no inline style objects, no ad hoc CSS
- **shadcn/ui** for base components (buttons, cards, dialogs, tabs) — customize via
  Tailwind config, don't fork the components unless necessary
- **Lucide** for all icons — keep one icon set project-wide, never mix icon libraries
- **Recharts** for any chart/graph — consistent with the rest of the ecosystem
- **TypeScript** for all new web code

### Mobile frontend (frozen, maintenance only)
- Keep using the existing pattern: `utils/theme.js` as the single source of design
  tokens, reusable components in `components/`

---

## 2. What to Avoid

- **Never** send name, email, phone, or date of birth to the backend, in any field,
  under any circumstance
- **Never** store raw PII in the database — only the anonymized hash
- **Never** hardcode API keys, database passwords, or secrets directly in source files
  — use environment variables (`.env`, excluded via `.gitignore`)
- **Never** let the AI Assistant name a medication, dosage, or treatment plan
- **Never** let the AI Assistant issue a diagnosis — it explains *the existing
  screening result*, nothing more
- **Never** mix component libraries on the web app (e.g. don't add Material UI
  alongside shadcn/ui) — one system, consistently applied
- **Never** claim a feature is "done" in documentation unless it has been tested and
  verified working end-to-end

---

## 3. Error Handling Conventions

### Backend
- All route logic wrapped in `try/except`, raising `HTTPException(status_code=..., detail=...)`
- Error details should be descriptive enough to debug, but never leak internal
  file paths or stack traces to the client in production

### Frontend (mobile and web, same pattern)
- API calls distinguish error types explicitly:
  - `OFFLINE` — no internet connection, show offline banner, block submission
  - `API_ERROR` — request failed, show a friendly retry message
  - `HISTORY_ERROR` — history fetch failed, show empty state with a retry option
- Every `catch` block logs the real error (`console.error`) for debugging, but shows
  the user a plain-language message — never a raw error string or stack trace

---

## 4. AI Assistant Boundaries (Hard Rules)

These are non-negotiable constraints for the chatbot's system prompt (Phase 17):

1. **Never diagnose.** The assistant explains an existing screening result — it does
   not produce new medical conclusions.
2. **Never name medications, dosages, or treatments.** Any question in this territory
   is redirected: *"That's a question for your doctor — I can help explain what this
   screening found, but treatment decisions need a medical professional."*
3. **Always include a soft disclaimer** on clinically-adjacent answers, not a wall of
   legal text every message — one clear sentence is enough.
4. **Context is limited to the user's own anonymized result.** The assistant never
   references other users' data, never asks for real identity information.
5. **When uncertain, redirect to a doctor** rather than guessing.

---

## 5. Privacy Rules

- Anonymization happens **client-side**, before any network request is constructed
- The only persistent identifier is a random, locally-generated device ID, immediately
  hashed (SHA-256) before ever being used — the raw ID never leaves the device
- The backend has no concept of "user accounts" — there is no login, no password, no
  session tied to a real identity
- Every screen that displays personal-feeling data (Profile, History) must make clear,
  in-context, that no real identity is stored

---

## 6. Documentation Rules

- `PHASES.md` must always reflect **actual** completed work — a phase is only marked
  ✅ Done once it has been tested and verified, not just coded
- `MEMORY.md` (once introduced) is updated at the end of each work session — what was
  done, what file is in progress, what's next
- README's Tech Stack table must always match what's actually installed and used —
  no aspirational entries (this was previously corrected once already: removing an
  unused PostgreSQL/SQLite dual-listing in favor of what was actually built)