# Privacy Threat Model (Simulated HIPAA-Style Design)

## PII categories scrubbed client-side (never sent raw)
- Full name / first / last name
- Contact info (email, phone)
- Government/patient ID
- Free-text notes that could contain names

## What reaches the backend
- Anonymized numeric vectors (age, labs, symptom flags)
- A one-way local hash used only for session retrieval

## Known limitations
- Not full k-anonymity or differential privacy — basic scrub + hash only
- Real clinical system would need BAAs, encryption at rest, audit logs (out of scope for this demo)