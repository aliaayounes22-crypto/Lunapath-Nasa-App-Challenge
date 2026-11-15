#  LunaPath — Moon Landing Planner

> **NASA Space Apps Challenge 2026**  
> **Challenge Track:** Lunar Landing Site Navigator  
> **Project Name:** LunaPath – Moon Landing Planner  
> **Team:** Five-member beginner team  

[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen?style=flat-square)](https://github.com)
[![Scientific Audit](https://img.shields.io/badge/Scientific%20Audit-66%20Pass%20%2F%200%20Fail-blue?style=flat-square)](./test_data_integrity.mjs)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.3-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-r187-black?style=flat-square&logo=three.js)](https://threejs.org/)

---

##  Project Mission 🌒

**LunaPath** is an interactive, scientific decision-support prototype built for the **NASA Space Apps Challenge 2026**. It allows mission planners, scientists, educators, and space enthusiasts to explore, evaluate, and compare candidate landing sites near the Moon’s South Pole.

Landing at the lunar South Pole presents extraordinary operational challenges:
1. **Extreme Low Solar Elevation (~1.5° Axial Tilt):** The Moon’s spin axis is tilted only ~1.54° relative to the ecliptic, causing polar sunlight to graze horizontally across the terrain and casting enormous, moving shadows.
2. **Earth Line-of-Sight & Libration:** Direct radio communication with Earth requires line-of-sight that is easily blocked by crater rims and fluctuates with lunar libration.
3. **Terrain Feasibility:** Human Landing System (HLS) operational safety requires terrain with slopes shallower than 8° located more than 100 meters away from steeper slopes.

LunaPath synthesizes peer-reviewed planetary science research and NASA Artemis documentation into a high-impact, transparent mission control dashboard.

---

## 🔬 Candidate Landing Sites & Scientific Data

All landing site coordinates, terrain statistics, and illumination records are verified against published planetary research:
- **Primary Reference:** Wueller et al. (2026), *Journal of Geophysical Research: Planets*, 131(3), e2025JE009434.
- **Dataset:** Complementary Data for Wueller et al. (2026), Zenodo (DOI: 10.5281/zenodo.17084058).

### Candidate Sites
| Candidate Site ID | Artemis Candidate Region | Latitude (°S) | Longitude (°E/W) | Primary Source |
|---|---|---|---|---|
| **SP11** | Slater Plain (SP) | `-86.9500°` | `126.6750°` | Wueller et al. (2026), Table A1 |
| **NR2_K2023** | Nobile Rim 2 (NR2) | `-84.0740°` | `59.1970°` | Wueller et al. (2026), Table A1 |
| **HW10** | Haworth (HW) | `-86.5270°` | `-14.8760°` | Wueller et al. (2026), Table A1 |

### Region Terrain Statistics (HLS Criterion: < 8° & > 100m from Steeper Slopes)
- **Slater Plain (SP):** `77.0 km²` suitable area (`19.3%` of region — highest fractional suitable area among 16 studied regions).
- **Nobile Rim 2 (NR2):** `56.9 km²` suitable area (`14.0%` of region).
- **Haworth (HW):** `77.3 km²` suitable area (`8.7%` of region).

*Note: Slope criteria alone do not guarantee a safe landing. Boulders, small craters, descent lighting, and navigation error ellipses are independent operational factors.*

### Modeled Midsummer Visibility Durations (2025–2032)
Durations represent the maximum unbroken run of consecutive days with visibility during each year's modeled midsummer:

| Year | Modeled Midsummer Window | Window Length | SP11 (Sun / Sun+Earth) | NR2_K2023 (Sun / Sun+Earth) | HW10 (Sun / Sun+Earth) |
|---|---|---|---|---|---|
| **2025** | 20 Nov – 21 Dec | 32 days | 15 d / 15 d | 17 d / 16 d | 3 d / 3 d |
| **2026** | 06 Nov – 27 Nov | 22 days | 18 d / 18 d | 17 d / 17 d | 1 d / 0 d |
| **2027** | 15 Oct – 14 Nov | 31 days | 18 d / 18 d | 2 d / 2 d | 1 d / 0 d |
| **2028** | 27 Sep – 14 Oct | 18 days | 7 d / 7 d | 9 d / 9 d | 7 d / 7 d |
| **2029** | 15 Sep – 02 Oct | 18 days | 8 d / 8 d | 11 d / 10 d | 1 d / 1 d |
| **2030** | 19 Aug – 19 Sep | 32 days | 18 d / 17 d | 16 d / 16 d | 1 d / 0 d |
| **2031** | 05 Aug – 26 Aug | 22 days | 0 d / 0 d | 0 d / 0 d | 4 d / 3 d |
| **2032** | 13 Jul – 12 Aug | 31 days | 10 d / 10 d | 12 d / 12 d | 0 d / 0 d |

---

## 💻 Tech Stack & Architecture

- **Frontend Framework:** React 19 + Vite 8
- **3D Visualization:** Three.js + React Three Fiber (`@react-three/fiber`, `@react-three/drei`)
- **Interactive Charts:** Recharts (dual-series NASA Red & Gold data visualization)
- **Styling & Design System:** Tailwind CSS v4 + NASA Mission Control Theme (`#050816`, `#FC3D21`, `#D4A11E`, `#F5F7FA`)
- **Typography:** Orbitron (headings), Space Grotesk (body), JetBrains Mono (data/coordinates), Manrope
- **Iconography:** Lucide React

```
lunapath/
├── docs/
│   ├── scientific-methodology.md
│   └── assets-attribution.md
├── public/
│   ├── assets/
│   ├── favicon.svg
│   ├── lunapath-logo.png
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── visualizations/
│   │   │   ├── LunarGlobe3D.jsx
│   │   │   ├── LunarPolar2D.jsx
│   │   │   └── PolarGeometryExplainer.jsx
│   │   ├── AboutSection.jsx
│   │   ├── ChartsSection.jsx
│   │   ├── ComparisonSection.jsx
│   │   ├── Footer.jsx
│   │   ├── HeroSection.jsx
│   │   ├── Navbar.jsx
│   │   ├── SiteExplorer.jsx
│   │   └── SourcesSection.jsx
│   ├── data/
│   │   ├── landing_sites.json
│   │   ├── loader.js
│   │   └── visibility_data_completed.json
│   ├── utils/
│   │   └── astronomy.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── test_data_integrity.mjs
├── package.json
└── vite.config.js
```

---

## 🛠️ Local Development & Quickstart

### Prerequisites
- Node.js 18+ (tested on Node.js v24)
- npm

### 1. Installation
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Run Scientific Integrity Audit
```bash
node test_data_integrity.mjs
```
*Executes all 66 automated scientific integrity tests validating coordinates, midsummer windows, durations, and terrain statistics.*

### 4. Production Build
```bash
npm run build
```
Generates an optimized production bundle in `/dist`.

---

## 📜 Educational Disclaimer

LunaPath is an educational mission-planning prototype created for the NASA Space Apps Challenge 2026. It is not an operational spacecraft landing system and implies no official endorsement by NASA or international space agencies.
