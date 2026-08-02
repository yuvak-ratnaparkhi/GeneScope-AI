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

def predict_risk(features: dict):
    patient_df = pd.DataFrame([features])
    patient_df = patient_df[model.feature_names_in_]
    prediction = model.predict(patient_df)[0]
    return disorder_labels[prediction], patient_df