# GeneScope AI — Dataset Dictionary & Preprocessing Specification

> Dataset Source: Public Kaggle Dataset (*"Genetic Disorder Classification"*)  
> Dataset Shape: 18,000 Rows | 33 Columns (29 Modeling Features after Identity Drop)

---

## 1. Dropped Identity Columns

These columns contain synthetic PII identifiers and are completely stripped prior to model training to prevent identity leakage:

| Column Name | Data Type | Missing % | Action | Rationale |
|---|---|---|---|---|
| `Patient Id` | `object` | 0.0% | Drop | Non-predictive unique record ID |
| `Patient First Name` | `object` | 0.0% | Drop | Synthetic first name (PII) |
| `Family Name` | `object` | 41.7% | Drop | Synthetic surname (PII & high missingness) |
| `Father's name` | `object` | 0.0% | Drop | Synthetic parental name (PII) |

---

## 2. Demographic & Hereditary Features

| Column Name | Data Type | Missing % | Preprocessing Strategy | Description |
|---|---|---|---|---|
| `Patient Age` | `float64` | 6.0% | Median Imputation | Patient age in years (Range 0–14) |
| `Mother's age` | `float64` | 25.4% | Median Imputation | Mother's age at conception |
| `Father's age` | `float64` | 25.7% | Median Imputation | Father's age at conception |
| `Gender` | `object` | 8.7% | Mode Imputation + One-Hot | Male / Female / Ambiguous |
| `Genes in mother's side` | `object` | 0.0% | Binary Encoding (1/0) | Maternal family genetic disorder history |
| `Inherited from father` | `object` | 1.3% | Mode Imputation + Binary | Paternal family genetic inheritance flag |
| `Maternal gene` | `object` | 12.2% | Mode Imputation + Binary | Specific maternal gene marker flag |
| `Paternal gene` | `object` | 0.0% | Binary Encoding (1/0) | Specific paternal gene marker flag |

---

## 3. Clinical & Laboratory Measurements

| Column Name | Data Type | Missing % | Preprocessing Strategy | Description |
|---|---|---|---|---|
| `Blood cell count (mcL)` | `float64` | 0.0% | Standard Scaling | Complete blood cell count |
| `White Blood cell count` | `float64` | 9.1% | Median Imputation | WBC count (thousand per microliter) |
| `Respiratory Rate` | `object` | 9.0% | Categorical Mapping | Breaths/min classification |
| `Heart Rate` | `object` | 9.2% | Categorical Mapping | Beats/min classification |
| `Blood test result` | `object` | 9.1% | Mode Imputation + One-Hot | Clinical blood assay result categories |

---

## 4. Clinical Symptoms & Medical History

| Column Name | Data Type | Missing % | Preprocessing Strategy | Description |
|---|---|---|---|---|
| `Symptom 1` – `Symptom 5` | `object` | ~9.1% | Mode Imputation + Binary | Individual binary symptom flags |
| `Status` | `object` | 0.0% | Binary Encoding | Patient status (Alive / Deceased) |
| `Follow-up` | `object` | 9.4% | Mode Imputation | Clinical follow-up frequency |
| `Birth defects` | `object` | 9.2% | Mode Imputation + Binary | Observed congenital birth defects |
| `H/O serious maternal illness`| `object` | 8.8% | Mode Imputation + Binary | History of maternal medical illness |
| `H/O radiation exposure` | `object` | 9.1% | Mode Imputation + One-Hot | History of maternal x-ray/radiation exposure |
| `H/O substance abuse` | `object` | 9.6% | Mode Imputation + One-Hot | Maternal substance exposure history |
| `Assisted conception IVF/ART` | `object` | 9.2% | Mode Imputation + Binary | History of assisted reproductive technology |

---

## 5. Target Classification Variables

| Target Column | Type | Class Distribution | Description |
|---|---|---|---|
| **`Genetic Disorder`** | Categorical Target | **3 Classes** (6,000 / 6,000 / 6,000) | **Primary Target:** Mitochondrial, Single-gene, or Multifactorial genetic inheritance disorder |
| `Disorder Subclass` | Categorical Sub-target | 9 Imbalanced Classes | Secondary subclass categorization |

---

## 6. Preprocessing & Data Cleaning Protocol

1. **Identity Removal:** Strip `Patient Id`, `Patient First Name`, `Family Name`, and `Father's name`.
2. **Missing Value Imputation:** Numerical features imputed via median; categorical features imputed via mode.
3. **Encoding:** Binary flags mapped to `0/1`; multi-class categoricals one-hot encoded.
4. **Duplicate Handling Analysis:** 4,015 rows (22%) share identical feature vectors due to coarse binary symptom encoding. Dropping these rows disproportionately shrinks *Multifactorial genetic inheritance disorders* from 6,000 to 1,985 records, destroying dataset balance. **Decision:** Retain rows to preserve class balance for Random Forest training.