# GeneScope AI — Design System

---

## Principles

- Calm, not clinical-cold — never sterile hospital-white
- Trust through clarity, not decoration
- Explainability (SHAP) is the visual hero, not an afterthought
- Never use alarm-style red or urgent medical iconography

---

## Color Palette

**Primary**
| Token | Hex | Use |
|---|---|---|
| `primary` | `#0F6E56` | Buttons, active states |
| `primary-light` | `#E1F5EE` | Backgrounds behind primary elements |
| `accent` | `#5DCAA5` | Progress bars, highlights |

**Semantic**
| Token | Hex | Use |
|---|---|---|
| `success` | `#639922` | Low risk |
| `warning` | `#EF9F27` | Moderate risk |
| `danger` | `#D85A30` | High risk, errors |

**Neutral**
| Token | Hex | Use |
|---|---|---|
| `background` | `#F4F6F5` | Page background |
| `card` | `#FFFFFF` | Card surfaces |
| `border` | `#E0E0E0` | Dividers, inputs |
| `text-primary` | `#1A1A1A` | Headings, body |
| `text-secondary` | `#5F5E5A` | Captions, supporting text |

*Web: extend each token to a full 50–900 Tailwind shade scale.*

---

## Typography

| Role | Font |
|---|---|
| Headings | Manrope (or General Sans) |
| Body / UI | Inter |

| Level | Size | Weight |
|---|---|---|
| Display | 32px | 800 |
| H1 | 24px | 800 |
| H2 | 18px | 700 |
| Body | 15px | 400–600 |
| Caption | 13px | 500 |

---

## Spacing (4px base)

`xs 4 · sm 8 · md 16 · lg 24 · xl 32 · xxl 48 · xxxl 64`

---

## Radius & Elevation

| Token | Value |
|---|---|
| `radius-button` | 12px |
| `radius-card` | 16px |
| `radius-pill` | 999px |
| Card shadow | `0 2px 8px rgba(0,0,0,0.06)` — soft only, no harsh drop shadows |

---

## Component Library

- **Base:** shadcn/ui + Tailwind
- **Icons:** Lucide
- **Charts:** Recharts
- **Animation:** Framer Motion

---

## Illustration

Minimal, geometric, single-tint (primary/accent palette). Used sparingly — empty states and landing hero only.

---

## Component Notes

- **Risk Gauge:** circular ring, color shifts by band, animated fill
- **Risk Badge:** pill-shaped, color-coded with dot indicator
- **Factor Bars:** horizontal, rounded, sorted by weight descending
- **Cards:** consistent radius + shadow everywhere — the primary structural unit