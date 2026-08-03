import os
import urllib.request
import pandas as pd
import joblib

MODEL_PATH = os.path.join(os.path.dirname(__file__), "..", "..", "model_v1.pkl")
MODEL_URL = "https://github.com/yuvak-ratnaparkhi/GeneScope-AI/releases/download/v1.0-model/model_v1.pkl"

if not os.path.exists(MODEL_PATH):
    print("Model not found locally, downloading...")
    urllib.request.urlretrieve(MODEL_URL, MODEL_PATH)

model = joblib.load(MODEL_PATH)

disorder_labels = {
    0: "Mitochondrial genetic inheritance disorder",
    1: "Multifactorial genetic inheritance disorder",
    2: "Single-gene inheritance disease"
}

def process_features(raw_features: dict) -> pd.DataFrame:
    default_values = {
        'Patient Age': 30.0,
        "Genes in mother's side": 0.0,
        'Inherited from father': 0.0,
        'Maternal gene': 0.0,
        'Paternal gene': 0.0,
        'Blood cell count (mcL)': 4.8,
        "Mother's age": 30.0,
        "Father's age": 33.0,
        'Status': 1.0,
        'Respiratory Rate (breaths/min)': 1.0,
        'Heart Rate (rates/min': 0.0,
        'Follow-up': 1.0,
        'Gender': 0.0,
        'Autopsy shows birth defect (if applicable)': 0.0,
        'Folic acid details (peri-conceptional)': 1.0,
        'H/O serious maternal illness': 0.0,
        'H/O radiation exposure (x-ray)': 0.0,
        'H/O substance abuse': 0.0,
        'Assisted conception IVF/ART': 0.0,
        'Birth defects': 0.0,
        'White Blood cell count (thousand per microliter)': 6.5,
        'Blood test result': 1.0,
        'Symptom 1': 0.0,
        'Symptom 2': 0.0,
        'Symptom 3': 0.0,
        'Symptom 4': 0.0,
        'Symptom 5': 0.0,
        'Symptom_Count': 0.0,
        'Parent_Age_Gap': 3.0
    }

    processed = default_values.copy()

    if 'age' in raw_features and raw_features['age']:
        try:
            processed['Patient Age'] = float(raw_features['age'])
        except (ValueError, TypeError):
            pass

    if 'gender' in raw_features:
        g = str(raw_features['gender']).lower()
        processed['Gender'] = 1.0 if g in ['female', 'f', '1'] else 0.0

    if 'familyHistory' in raw_features:
        val = 1.0 if raw_features['familyHistory'] else 0.0
        processed["Genes in mother's side"] = val
        processed['Inherited from father'] = val

    if 'lifestyleRisk' in raw_features:
        val = 1.0 if raw_features['lifestyleRisk'] else 0.0
        processed['H/O substance abuse'] = val

    for col in model.feature_names_in_:
        if col in raw_features and raw_features[col] is not None:
            try:
                processed[col] = float(raw_features[col])
            except (ValueError, TypeError):
                pass

    return pd.DataFrame([processed])[model.feature_names_in_]

def predict_risk(features: dict):
    patient_df = process_features(features)
    probs = model.predict_proba(patient_df)[0]
    pred_idx = int(probs.argmax())
    prediction_label = disorder_labels[pred_idx]
    pred_prob = float(probs[pred_idx])
    return prediction_label, pred_prob, patient_df