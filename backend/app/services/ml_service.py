import pandas as pd
import joblib

model = joblib.load("../model/registry/model_v1.pkl")

disorder_labels = {
    0: "Mitochondrial genetic inheritance disorder",
    1: "Multifactorial genetic inheritance disorder",
    2: "Single-gene inheritance disease"
}

def predict_risk(features: dict):
    patient_df = pd.DataFrame([features])
    # Reorder columns to match exactly what the model was trained on
    patient_df = patient_df[model.feature_names_in_]
    prediction = model.predict(patient_df)[0]
    return disorder_labels[prediction], patient_df