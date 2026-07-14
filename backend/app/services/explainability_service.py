import pandas as pd
import joblib
import shap

model = joblib.load("../model/registry/model_v1.pkl")
explainer = shap.TreeExplainer(model)

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
    shap_values = explainer.shap_values(patient_row)
    predicted_class = model.predict(patient_row)[0]
    class_index = list(model.classes_).index(predicted_class)

    patient_shap = shap_values[0, :, class_index]
    feature_impact = pd.Series(patient_shap, index=patient_row.columns)
    top_features = feature_impact.abs().sort_values(ascending=False).head(top_n)

    humanized = {label_map.get(k, k): v for k, v in top_features.to_dict().items()}

    return {
        "predicted_disorder": disorder_labels[predicted_class],
        "top_features": humanized
    }