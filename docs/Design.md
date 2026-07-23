# GeneScope AI — Design System

> Status: Living document — mobile tokens established (Phase 10), web system defined here for Phase 13+

---

## 1. Design Principles

- **Calm, not clinical-cold.** Healthcare-adjacent, but never sterile hospital-white.
- **Trust through clarity, not decoration.** Every visual choice should make the
  product feel more honest and understandable, not just prettier.
- **Explainability is the hero.** The SHAP-driven "why" is the project's strongest
  differentiator — the design should make it feel like the centerpiece, not an
  afterthought.
- **Never visually implies a diagnosis.** No red alarm-style treatments, no urgent
  medical iconography that could be mistaken for a real clinical alert.

---

## 2. Color Palette

### Primary
| Token | Hex | Use |
|---|---|---|
| `primary` | `#0F6E56` | Buttons, active states, key accents |
| `primary-light` | `#E1F5EE` | Backgrounds behind primary-colored elements |
| `accent` | `#5DCAA5` | Progress bars, secondary highlights |

### Semantic
| Token | Hex | Use |
|---|---|---|
| `success` | `#639922` | Low risk indicators |
| `warning` | `#EF9F27` | Moderate risk indicators |
| `danger` | `#D85A30` | High risk indicators, offline/error states |

### Neutral
| Token | Hex | Use |
|---|---|---|
| `background` | `#F4F6F5` | Page background (never pure white) |
| `card` | `#FFFFFF` | Card surfaces |
| `border` | `#E0E0E0` | Dividers, input borders |
| `text-primary` | `#1A1A1A` | Headings, primary body text |
| `text-secondary` | `#5F5E5A` | Supporting text, captions |

*Extend for web: add a full 50–900 shade scale per token using Tailwind's color
config, rather than single hex values, so hover/active/disabled states are derivable.*

---

## 3. Typography

| Role | Font | Notes |
|---|---|---|
| Headings / Display | **Manrope** (or General Sans) | Slightly warmer than a pure grotesk, gives personality without sacrificing professionalism |
| Body / UI text | **Inter** | Highly legible at small sizes, standard for data-dense UI |

### Type Scale
| Level | Size | Weight | Use |
|---|---|---|---|
| Display | 32px | 800 | Landing page hero |
| H1 | 24px | 800 | Page titles |
| H2 | 18px | 700 | Section headers |
| Body | 15px | 400–600 | Paragraph text, labels |
| Caption | 13px | 500 | Timestamps, secondary metadata |

---

## 4. Spacing System

4px base unit, used consistently across margin/padding/gap:

```
xs   = 4px
sm   = 8px
md   = 16px
lg   = 24px
xl   = 32px
xxl  = 48px
xxxl = 64px
```

---

## 5. Radius & Elevation

| Token | Value | Use |
|---|---|---|
| `radius-button` | 12px | Buttons, inputs |
| `radius-card` | 16px | Cards, modals |
| `radius-pill` | 999px | Badges, tags |
| Shadow (card) | `0 2px 8px rgba(0,0,0,0.06)` | Soft, low-elevation — never harsh drop shadows |

---

## 6. Component Library

- **Base:** shadcn/ui on Tailwind CSS
- **Icons:** Lucide — consistent stroke weight, single icon set project-wide
- **Charts:** Recharts — used for SHAP factor visualization, any risk-over-time views
- **Animation:** Framer Motion — page transitions, skeleton shimmer, gauge fill-in

---

## 7. Illustration Style

- Minimal, geometric, single-tint (using the primary/accent palette, not literal
  full-color medical clipart)
- Reserved for empty states and the landing page hero — used sparingly, not on every
  screen

---

## 8. Component-Specific Notes

- **Risk Gauge:** circular progress ring, color shifts by risk band
  (success → warning → danger), animated fill on load
- **Risk Badge:** pill-shaped, color-coded, paired with a small dot indicator
- **Factor Bars:** horizontal, rounded, sorted by contribution weight descending
- **Cards:** consistent radius and shadow across the entire app — this is the primary
  structural unit, replacing flat full-width sections