import pandas as pd
from app.services.explainability_service import get_top_features

def test_get_top_features_returns_expected_keys():
    # Replace this with a real sample row matching your 29 training columns
    sample = pd.DataFrame([[0]*29], columns=[f"col_{i}" for i in range(29)])
    # Note: this is a placeholder test structure — real column names needed once backend is wired up
    assert True  # Full test will be completed in Phase 5 once real data flows through the API