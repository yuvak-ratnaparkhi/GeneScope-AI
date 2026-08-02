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
    importances = pd.Series(model.feature_importances_, index=model.feature_names_in_)
    top_features = importances.sort_values(ascending=False).head(top_n)

    humanized = {label_map.get(k, k): v for k, v in top_features.to_dict().items()}
    predicted_class = model.predict(patient_row)[0]

    return {
        "predicted_disorder": disorder_labels[predicted_class],
        "top_features": humanized
    }