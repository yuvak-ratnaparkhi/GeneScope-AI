# GeneScope AI — Privacy & Security Threat Model

> **Status:** ✅ Complete — Architectural Privacy Specification & Safety Analysis

---

## 1. Executive Summary

GeneScope AI handles clinical risk factors for genetic screening. To prioritize privacy and safety, the platform enforces a **client-side privacy-first boundary**: no Personally Identifiable Information (PII) is ever stored or transmitted to backend API services.

---

## 2. PII Sanitization & Data Flow

### Scrubbed Client-Side (Never Transmitted)
- Patient Full Name / First Name / Last Name
- Contact Information (Email Address, Phone Number)
- Social Security / Government / National Health Identifiers
- Free-Text Notes or Unstructured Patient Inputs

### Transmitted to Backend API
- **Structured Clinical Vector:** Anonymized numerical features (e.g., patient age, gene marker presence, lifestyle indicators, lab test metrics).
- **Identity Hash:** A one-way SHA-256 hash generated on the client device used solely for session and history retrieval (`GET /api/history/{user_hash}`).

---

## 3. Threat Scenarios & Mitigations

| Threat Scenario | Impact | Mitigation Strategy | Status |
|---|---|---|---|
| **Network Eavesdropping / In-Transit Interception** | Interception of health metrics | All network communication is enforced via TLS/HTTPS (`https://`) on Render and Vercel. | ✅ Enforced |
| **Database Data Leakage / Breaches** | Unauthorized exposure of patient records | Database stores zero PII. Records in PostgreSQL are indexed exclusively by anonymous SHA-256 hashes. | ✅ Enforced |
| **Prompt Injection via AI Assistant** | AI generating harmful medical/drug advice | Strict system prompts, Pydantic schema validation, and guardrails block prescription/dosage outputs. | ✅ Enforced |
| **Re-Identification via User Hash** | Matching session history to individual identity | Hashes are generated using client-side salt + device secrets; no raw identifiers are stored to compare against. | ✅ Enforced |
| **Unauthenticated Data Tampering** | Unauthorized database modifications | API endpoints only support read/create operations via parameter validation schemas; write access is restricted. | ✅ Enforced |

---

## 4. Generative AI Safety Guardrails

- **Scope Restriction:** The Gemini 2.5 Flash / OpenAI integration is strictly restricted to interpreting provided SHAP risk factors.
- **Medical Disclaimer Enforcement:** AI outputs automatically append a mandatory medical disclaimer recommending professional clinical consultation.
- **No Treatment Prescriptions:** The LLM prompt explicitly forbids generating specific drug names, dosages, or therapeutic plans.

---

## 5. Scope Limitations & Production Considerations

This platform is a portfolio demo built on public clinical datasets. A certified production healthcare deployment would additionally require:
- **HIPAA Compliance & Business Associate Agreements (BAAs)** with cloud providers (Vercel, Render, Google Cloud).
- **Encryption at Rest:** AES-256 encryption for database volumes and persistent storage.
- **Comprehensive Audit Logs:** Immutable access logging for data access tracking.
- **K-Anonymity / Differential Privacy:** Advanced mathematical noise injection for dataset differential privacy.