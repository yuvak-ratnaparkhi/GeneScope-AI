import os
import urllib.request
import pandas as pd
import joblib

MODEL_PATH = os.path.join(os.path.dirname(__file__), "..", "..", "model_v1.pkl")
MODEL_URL = "https://github.com/yuvak-ratnaparkhi/GeneScope-AI/releases/download/v1.0-model/model_v1.pkl"

if not os.path.exists(MODEL_PATH):
    urllib.request.urlretrieve(MODEL_URL, MODEL_PATH)

model = joblib.load(MODEL_PATH)

label_map = {
    "Symptom_Count": "Number of reported symptoms",
    "Parent_Age_Gap": "Age gap between parents",
    "Genes in mother's side": "Family history on mother's side",
    "Father's age": "Father's age",
    "Mother's age": "Mother's age",
    "Blood cell count (mcL)": "Blood cell count",
    "White Blood cell count (thousand per microliter)": "White blood cell count",
    "Patient Age": "Patient's age",
    "Symptom 1": "Symptom 1 present",
    "Symptom 2": "Symptom 2 present",
    "Symptom 3": "Symptom 3 present",
    "Symptom 4": "Symptom 4 present",
    "Symptom 5": "Symptom 5 present",
}

disorder_labels = {
    0: "Mitochondrial genetic inheritance disorder",
    1: "Multifactorial genetic inheritance disorder",
    2: "Single-gene inheritance disease"
}

def get_top_features(patient_row, top_n=3):
    feature_names = model.feature_names_in_
    row = patient_row.iloc[0]

    dynamic_weights = {}
    for i, col in enumerate(feature_names):
        base_imp = float(model.feature_importances_[i])
        val = float(row[col])

        if col in ["Genes in mother's side", "Inherited from father", "Maternal gene", "Paternal gene"]:
            factor = 2.5 if val > 0 else 0.3
        elif col in ["Symptom_Count", "H/O substance abuse", "Symptom 1", "Symptom 2", "Symptom 3", "Symptom 4"]:
            factor = 1.0 + (val * 0.7)
        elif col == "Patient Age":
            factor = 1.0 + (val / 40.0)
        elif col == "White Blood cell count (thousand per microliter)":
            factor = 1.6 if val > 8.0 else 0.5
        else:
            factor = 1.2 if val > 0 else 0.5

        dynamic_weights[col] = base_imp * factor

    sorted_weights = sorted(dynamic_weights.items(), key=lambda x: x[1], reverse=True)[:top_n]
    total_top_weight = sum(v for _, v in sorted_weights) or 1.0

    humanized = {
        label_map.get(k, k): round(v / total_top_weight, 2) for k, v in sorted_weights
    }

    predicted_class = model.predict(patient_row)[0]

    return {
        "predicted_disorder": disorder_labels[predicted_class],
        "top_features": humanized
    }