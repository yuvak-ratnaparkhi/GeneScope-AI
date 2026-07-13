# Model Notes — Phase 3

## Final Model
Random Forest, 200 trees, feature-engineered (Symptom_Count, Parent_Age_Gap added)
**Test accuracy: 68.5%**

## Models tested
| Approach | Accuracy |
|---|---|
| Random Forest (default) | 67.4% |
| Random Forest (tuned) | 67.5% |
| + Feature engineering | 68.5% |
| Gradient Boosting | 61.3% (worse, discarded) |
| One-hot encoding | 68.1% (no improvement) |
| + Disorder Subclass (leakage test) | 95.0% — **discarded, data leakage** |

## Why Disorder Subclass was excluded
Including it inflates accuracy artificially because subclass almost fully determines
the main disorder category — not usable in a real prediction scenario where subclass
is unknown. Verified this experimentally, chose the honest 68.5% model instead.

## Note on model file
`model_v1.pkl` is not committed to Git (exceeds GitHub's 100MB limit).
Regenerate it locally by running all cells in `notebooks/model_training.ipynb`.