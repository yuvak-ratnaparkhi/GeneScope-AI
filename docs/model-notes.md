# GeneScope AI — Machine Learning Model Documentation

> **Status:** ✅ Complete — Model v1 Trained, Evaluated, and Production Deployed (`backend/model_v1.pkl`)

---

## 1. Model Summary

- **Algorithm:** Random Forest Classifier (200 Estimators)
- **Primary Task:** Multi-class Genetic Disorder Risk Classification (3 target classes)
- **Validation Accuracy:** **68.5%** (Honest Out-of-Fold / Test Evaluation)
- **Artifact:** `backend/model_v1.pkl` (~5.9 MB serialized model file)
- **Engineered Features:** `Symptom_Count` (aggregate symptom burden) and `Parent_Age_Gap`

---

## 2. Experimental Benchmark Results

| Model Architecture | Features & Preprocessing | Validation Accuracy | Status |
|---|---|---|---|
| Random Forest (Baseline) | Default Hyperparameters | 67.4% | Superseded |
| Random Forest (Tuned) | Grid Search Hyperparameter Tuning | 67.5% | Superseded |
| **Random Forest + Feature Engineering** | **`Symptom_Count` & `Parent_Age_Gap` Added** | **68.5%** | **Selected (Production)** |
| Gradient Boosting (XGBoost/LightGBM) | Standard Scaling + Encoded Features | 61.3% | Discarded (Lower Accuracy) |
| Random Forest (One-Hot Encoded) | Expanded Categoricals | 68.1% | Discarded (Higher Complexity) |
| *Random Forest + Disorder Subclass* | Included `Disorder Subclass` feature | *95.0%* | **Discarded (Data Leakage)** |

---

## 3. Data Leakage Experiment & Inclusion Decision

> [!IMPORTANT]
> **Data Leakage Identification:** Including `Disorder Subclass` in feature inputs resulted in a misleading **95.0% accuracy**. Analysis revealed that `Disorder Subclass` directly encodes the main `Genetic Disorder` target, representing severe target leakage. In a real-world clinical screening scenario, disorder subclass is unknown prior to diagnosis. We intentionally discarded the leaked model in favor of our honest, realistic **68.5% accuracy** model.

---

## 4. Feature Engineering & Importance

The top features driving predictions according to SHAP (SHapley Additive exPlanations) and Random Forest feature importances:

1. **`Maternal gene` & `Paternal gene` flags:** Strongest indicators for single-gene & mitochondrial disorders.
2. **`Genes in mother's side`:** Primary hereditary risk multiplier.
3. **`Symptom_Count` (Engineered):** Quantifies total clinical symptom load.
4. **`Parent_Age_Gap` (Engineered):** Absolute age difference between parents at conception.
5. **`Blood cell count (mcL)` & `White Blood cell count`:** Laboratory indicators for systemic disorders.

---

## 5. Model Serialization & Deployment

- **Storage Path:** `backend/model_v1.pkl`
- **Loading:** Loaded at FastAPI application startup via `joblib.load()` in `backend/app/services/ml_service.py`.
- **Inference Pipeline:** Receives sanitized input dictionary, constructs feature array matching training schema, executes `model.predict_proba()`, and passes predictions to the SHAP explainability engine.