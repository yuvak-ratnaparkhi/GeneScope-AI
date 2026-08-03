# GeneScope AI — Explainable Genetic Risk Screening Platform

🔗 **Live Demo:** [gene-scope-ai-chi.vercel.app](https://gene-scope-ai-chi.vercel.app/)

> ⚠️ **Portfolio/demo project only.** Built using a public dataset — not real patient data.
> This is not a certified medical device and should never be used for real diagnosis.

## Why This Project Matters

GeneScope AI demonstrates full-stack ML engineering: a trained model with honest,
documented accuracy; explainability via SHAP rather than a black-box output; a
privacy-first architecture where PII never leaves the device; graceful offline
handling; and a production-style web app with real deployment, database
persistence, and a guardrailed AI assistant — built end-to-end, not assembled
from templates.

## What This Project Does

GeneScope AI predicts the risk of a genetic disorder using patient clinical data,
and explains *why* it made that prediction — not just a number.

- Predicts risk using a **Random Forest** model
- Explains the **top reasons** behind each prediction
- Turns the result into a **plain-language summary** using an LLM (Gemini/OpenAI)
- Still works **offline**, showing a clear offline status instead of failing silently

## Tech Stack

| Category | Technologies |
|---|---|
| Frontend | Next.js, React, TypeScript, Tailwind CSS |
| Backend | FastAPI, Python |
| AI & Machine Learning | Gemini 2.5 Flash (Google GenAI), Random Forest (scikit-learn), SHAP |
| Database | PostgreSQL |
| Deployment | Vercel, Render |
| Mobile | React Native (Expo) (Frozen at Phase 12) |

## 🚀 Getting Started

Follow these steps to set up and run GeneScope AI locally on your machine.

### Prerequisites

Make sure you have the following installed:
- **Git**
- **Python 3.10+** & `pip`
- **Node.js 18+** & `npm`

---

### 1. Clone the Repository

```bash
git clone https://github.com/yuvak-ratnaparkhi/GeneScope-AI.git
cd GeneScope-AI
```

### 2. Set Up & Start the Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Create and activate a Python virtual environment:
   - **Windows:**
     ```powershell
     python -m venv venv
     venv\Scripts\activate
     ```
   - **macOS / Linux:**
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

3. Install required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure environment variables:
   Copy the example environment file to `.env`:
   ```bash
   cp .env.example .env
   ```
   *(Optional: Add your `GEMINI_API_KEY` in `.env` for AI health summaries)*

5. Start the FastAPI backend server:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

   - 📍 **Backend API:** `http://localhost:8000`
   - 📖 **Interactive API Docs (Swagger):** `http://localhost:8000/docs`

---

### 3. Set Up & Start the Web Frontend

1. Open a new terminal window, navigate to the `web` directory, and install dependencies:
   ```bash
   cd web
   npm install
   ```

2. Configure environment variables:
   Copy the example environment file to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

3. Start the Next.js development server:
   ```bash
   npm run dev
   ```

   - 🌐 **Web Application:** `http://localhost:3000`

## Future Improvements

- **Full clinical field wizard** — expand the screening form to collect the model's complete ~28-field input set (parental history, symptoms, lab values) instead of the current simplified subset, for more precise predictions
- **Document upload & auto-fill (OCR)** — allow users to upload a blood test or family history report (PDF/image); the system extracts clinical values automatically and pre-fills the screening form
- **Standalone mobile app** — package the current web app as a fully native mobile app (beyond the existing web-based experience), giving users a dedicated app-store presence rather than only a browser-based platform

## Development History

For the full development history and phase breakdown, see [docs/Phases.md](docs/Phases.md).

## Important Disclaimer

This app does **not** diagnose any real medical condition. All predictions are
for educational and portfolio purposes only, based on a public dataset.

## License

MIT — see `LICENSE` file.