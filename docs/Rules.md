# GeneScope AI — Rules & Conventions

---

## Use

**Backend**
- SQLAlchemy ORM (no raw SQL)
- Pydantic models for every request/response
- `Depends(get_db)` for DB sessions
- `HTTPException` for all errors

**Web frontend**
- Tailwind CSS utility classes only
- shadcn/ui for base components
- Lucide for icons (one icon set, project-wide)
- Recharts for charts
- TypeScript for all new code

**Mobile (frozen)**
- `utils/theme.js` as single source of design tokens

---

## Avoid

- Sending name, email, phone, or DOB to the backend — ever
- Storing raw PII in the database — hash only
- Hardcoded API keys or secrets — use `.env`
- AI Assistant naming medications, dosages, or treatments
- AI Assistant issuing a diagnosis
- Mixing component libraries on web
- Marking a feature "done" before it's tested end-to-end

---

## Error Handling

**Backend:** wrap route logic in `try/except` → `HTTPException(status_code, detail)`. Never leak stack traces to the client.

**Frontend:** distinguish error types explicitly —
| Type | Meaning | UI response |
|---|---|---|
| `OFFLINE` | No internet | Show offline banner, block submit |
| `API_ERROR` | Request failed | Friendly retry message |
| `HISTORY_ERROR` | History fetch failed | Empty state + retry |

Always `console.error` the real error; always show the user a plain message, never a raw stack trace.

---

## AI Assistant — Hard Rules

1. Never diagnose — explain the existing result only
2. Never name medications, dosages, or treatments → redirect to a doctor
3. One clear disclaimer sentence on clinical-adjacent answers, not a wall of text
4. Context limited to the user's own anonymized result
5. When uncertain, redirect to a doctor rather than guessing

---

## Privacy

- Anonymization happens client-side, before any network call
- Only identifier: a random local device ID, immediately hashed (SHA-256)
- No accounts, no login, no session tied to real identity
- Profile/History screens must make "no real identity stored" clear in-context

---

## Documentation

- `PHASES.md` marks a phase ✅ only once tested and verified
- `MEMORY.md` updated each session — what was done, what's in progress, what's next
- README Tech Stack must always match what's actually installed — no aspirational entries