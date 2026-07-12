# Data Dictionary — Genetic Disorder Dataset

Source: Public Kaggle dataset ("Genetic Disorder Classification")
Rows: 18,000 | Columns: 33 (29 after dropping identity columns)

## Identity Columns (dropped before modeling)
| Column | Type | Missing % | Notes |
|---|---|---|---|
| Patient Id | object | 0% | Unique row identifier, not predictive |
| Patient First Name | object | 0% | Fake/synthetic name, PII-style — drop |
| Family Name | object | 41.7% | Fake/synthetic name, most missing column — drop |
| Father's name | object | 0% | Fake/synthetic name, PII-style — drop |

## Demographic & Family History
| Column | Type | Missing % | Notes |
|---|---|---|---|
| Patient Age | float64 | 6.0% | Range 0–14, needs imputation (mean/median) |
| Mother's age | float64 | 25.4% | Needs imputation |
| Father's age | float64 | 25.7% | Needs imputation |
| Gender | object | 8.7% | 3 categories, needs imputation (mode) |
| Genes in mother's side | object | 0% | 2 categories (Yes/No) |
| Inherited from father | object | 1.3% | 2 categories |
| Maternal gene | object | 12.2% | 2 categories, needs imputation |
| Paternal gene | object | 0% | 2 categories |

## Clinical Measurements
| Column | Type | Missing % | Notes |
|---|---|---|---|
| Blood cell count (mcL) | float64 | 0% | Clean, no missing values |
| White Blood cell count (thousand per microliter) | float64 | 9.1% | Needs imputation |
| Respiratory Rate (breaths/min) | object | 9.0% | Categorical-coded, 2 values |
| Heart Rate (rates/min) | object | 9.2% | Categorical-coded, 2 values |
| Blood test result | object | 9.1% | 4 categories |

## Symptoms
| Column | Type | Missing % | Notes |
|---|---|---|---|
| Symptom 1 | object | 9.1% | Binary flag |
| Symptom 2 | object | 9.0% | Binary flag |
| Symptom 3 | object | 9.0% | Binary flag |
| Symptom 4 | object | 8.9% | Binary flag |
| Symptom 5 | object | 9.4% | Binary flag |

## Pregnancy & Birth History
| Column | Type | Missing % | Notes |
|---|---|---|---|
| Status | object | 0% | Alive/Deceased |
| Follow-up | object | 9.4% | 2 categories |
| Autopsy shows birth defect (if applicable) | object | 19.7% | 3 categories |
| Folic acid details (peri-conceptional) | object | 9.2% | 2 categories |
| H/O serious maternal illness | object | 8.8% | 2 categories |
| H/O radiation exposure (x-ray) | object | 9.1% | 4 categories |
| H/O substance abuse | object | 9.6% | 4 categories |
| Assisted conception IVF/ART | object | 9.2% | 2 categories |
| Birth defects | object | 9.2% | 2 categories |

## Targets
| Column | Type | Missing % | Notes |
|---|---|---|---|
| Genetic Disorder | object | 0% | **Main target.** 3 classes, perfectly balanced (6000/6000/6000) |
| Disorder Subclass | object | 9.4% | **Sub-target.** 9 classes, imbalanced (264–4780 range) |

## Cleaning Plan (Phase 2)
- Drop the 4 identity columns before modeling
- Impute numeric columns with mean/median
- Impute categorical columns with mode
- Handle `Disorder Subclass` imbalance only if modeling at that level (class weighting or SMOTE)

## Note on Duplicates
4,015 rows (22%) share identical feature values after dropping identity columns.
Dropping them would break target balance — "Multifactorial genetic inheritance
disorders" would fall from 6,000 to 1,985 rows while the other two classes stay
at 6,000. This isn't duplicate patients, just shared clinical feature combinations
(common with many binary columns). Decision: keep as-is to preserve class balance.