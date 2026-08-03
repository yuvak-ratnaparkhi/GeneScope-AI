# GeneScope AI — Design System

> **Status:** ✅ Production Specification — Implemented across Next.js Web App & React Native Mobile App

---

## 1. Design Principles

- **Calm & Trustworthy:** Healthcare-grade visual design that avoids cold hospital-white or alarmist red tones.
- **Visual Clarity Over Decoration:** Clean typography and generous whitespace guide users through complex screening data.
- **Explainability as the Hero:** SHAP contribution bars and interactive gauges are prominent visual focal points.
- **Smooth Motion & Feedback:** Micro-interactions (Framer Motion) provide immediate visual feedback without distracting from clinical findings.

---

## 2. Color Palette & Tokens

### Primary Brand Colors
| Token | Hex / HSL | Usage |
|---|---|---|
| `primary` | `#0F6E56` | Primary action buttons, active navigation states |
| `primary-light` | `#E1F5EE` | Subtle background badges, selected input cards |
| `accent` | `#5DCAA5` | Progress bar indicators, interactive highlights |

### Semantic Risk Indicators
| Risk Level | Token | Hex | Usage |
|---|---|---|---|
| Low Risk | `risk-low` | `#639922` | Safe status badges, positive factor indicators |
| Moderate Risk | `risk-moderate` | `#EF9F27` | Warning indicators, moderate risk gauge bands |
| High Risk | `risk-high` | `#D85A30` | Elevated risk alerts, top risk factor callouts |

### Neutral Surface Palette
| Token | Light Mode | Dark Mode | Usage |
|---|---|---|---|
| `background` | `#F4F6F5` | `#0D1117` | Main page background |
| `surface` | `#FFFFFF` | `#161B22` | Card containers, modal sheets |
| `border` | `#E0E0E0` | `#30363D` | Card borders, form dividers |
| `text-primary` | `#1A1A1A` | `#F0F6FC` | Headings, primary body text |
| `text-secondary` | `#5F5E5A` | `#8B949E` | Subtitles, helper text, captions |

---

## 3. Typography System

| Level | Size | Weight | Line Height | Usage |
|---|---|---|---|---|
| **Display** | 32px / 2.25rem | 800 (ExtraBold) | 1.2 | Landing page hero header |
| **H1** | 24px / 1.5rem | 700 (Bold) | 1.3 | Dashboard section headings |
| **H2** | 18px / 1.125rem | 600 (SemiBold) | 1.4 | Card titles, step headers |
| **Body** | 15px / 0.9375rem | 400–500 | 1.5 | General UI text, descriptions |
| **Caption** | 13px / 0.8125rem | 500 (Medium) | 1.4 | Badges, timestamps, chart axes |

*Typography Stack:* `Inter`, `system-ui`, `-apple-system`, `sans-serif`.

---

## 4. Spacing, Radius & Elevation

### Spacing Scale (4px grid)
`4px (xs) · 8px (sm) · 16px (md) · 24px (lg) · 32px (xl) · 48px (xxl) · 64px (xxxl)`

### Border Radius
| Token | Value | Applied Elements |
|---|---|---|
| `radius-button` | 12px | Action buttons, input fields |
| `radius-card` | 16px | Screening cards, result containers |
| `radius-pill` | 999px | Risk badges, filter tags, status pills |

### Shadows & Elevation
- **Card Soft Shadow:** `0 2px 8px rgba(0, 0, 0, 0.06)`
- **Modal Elevation:** `0 12px 32px rgba(0, 0, 0, 0.12)`

---

## 5. UI Component Library

- **Component Primitives:** `shadcn/ui`, Base UI
- **Icons:** `Lucide React`
- **Charts & Gauges:** `Recharts` (Web), `react-native-svg` (Mobile)
- **Animations:** `Framer Motion` (Web), `React Native Reanimated` (Mobile)

---

## 6. Interactive Component Patterns

- **Risk Gauge:** Semi-circular or full-circle animated SVG ring with dynamic color transition based on prediction score.
- **SHAP Factor Breakdown:** Horizontal bar charts sorted by feature contribution magnitude (positive vs. negative impact).
- **AI Summary Card:** Glassmorphism card container featuring AI spark badge, structured bullet points, and disclaimer footer.
- **AI Health Assistant Chat Interface:** Floating or full-page chat panel with streaming message animation and medical safety notices.