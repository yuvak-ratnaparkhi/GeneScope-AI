from fastapi.testclient import TestClient
from app.main import app
import json

client = TestClient(app)

def test_predict_returns_valid_response():
    with open("tests/sample_payload.json") as f:
        payload = json.load(f)

    response = client.post("/api/predict", json=payload)

    assert response.status_code == 200
    data = response.json()
    assert "predicted_disorder" in data
    assert "top_features" in data
    assert len(data["top_features"]) == 3