# LunaPath — Scientific Methodology & Data Integrity Documentation

> **NASA Space Apps Challenge 2026**  
> **Challenge:** Lunar Landing Site Navigator  
> **Project:** LunaPath – Moon Landing Planner  

---

## 1. Executive Summary & Scientific Baseline

LunaPath is an interactive decision-support prototype designed to evaluate candidate landing sites near the lunar South Pole based on sunlight conditions, direct-to-Earth visibility, local terrain feasibility, and mission timing.

All quantitative landing site metrics within LunaPath are derived directly from published peer-reviewed planetary science research:
- **Primary Source:** Wueller, L., Berger, L. M., Christopher, H., Sugimoto, K., Thaker, A. D., Carton, L., Jo, W., Lee, S., Pedrelli, R., Sanchez, P., & Kring, D. A. (2026). *Assessing potential landing sites with favorable illumination and accessible, potentially volatile-rich permanently shadowed regions within Artemis candidate landing regions*. **Journal of Geophysical Research: Planets**, 131(3), e2025JE009434. [DOI: 10.1029/2025JE009434](https://doi.org/10.1029/2025JE009434)
- **Dataset:** Complementary Data for Wueller et al. (2026). Zenodo. [DOI: 10.5281/zenodo.17084058](https://doi.org/10.5281/zenodo.17084058)
- **NASA Mission Announcements:** NASA Provides Update on Artemis III Moon Landing Regions (2024); NASA NTRS Downselection Update (2026).

---

## 2. Candidate Landing Regions & Specific Representative Points

LunaPath evaluates three representative candidate landing sites selected from three distinct NASA Artemis candidate regions:

| Candidate Site ID | Region Name | Latitude (°S) | Longitude (°E/W) | Source Table |
|---|---|---|---|---|
| **SP11** | Slater Plain (SP) | `-86.9500°` | `126.6750°` | Wueller et al. (2026), Table A1 |
| **NR2_K2023** | Nobile Rim 2 (NR2) | `-84.0740°` | `59.1970°` | Wueller et al. (2026), Table A1 |
| **HW10** | Haworth (HW) | `-86.5270°` | `-14.8760°` | Wueller et al. (2026), Table A1 |

### Representative Points vs. Region Boundaries
> [!NOTE]
> Coordinates represent manually selected representative site points evaluated in published studies; they do not encompass entire region boundaries. Sites can be shifted locally within suitable areas while retaining comparable illumination characteristics.

---

## 3. Human Landing System (HLS) Terrain Feasibility Criteria

Terrain statistics in LunaPath reflect the Human Landing System engineering criteria established in NASA Artemis studies and evaluated in Wueller et al. (2026, Table 1):
1. **Slope threshold:** Slopes shallower than **8°**.
2. **Buffer constraint:** Located more than **100 meters** away from slopes steeper than 8°.

### Region Statistics:
- **Slater Plain (SP):** `77.0 km²` meeting criterion (`19.3%` of the region — highest fractional suitable area among all 16 regions analyzed in the study).
- **Nobile Rim 2 (NR2):** `56.9 km²` meeting criterion (`14.0%` of the region).
- **Haworth (HW):** `77.3 km²` meeting criterion (`8.7%` of the region).

> [!WARNING]
> **Safety Disclaimer:** Meeting slope criteria alone does not guarantee a safe landing. Small craters, boulders, micro-roughness, descent optical conditions, and guidance navigation tolerances are distinct factors requiring dedicated orbital reconnaissance.

---

## 4. Midsummer Lighting & Earth Line-of-Sight Dynamics

### Why Solar Illumination Skims at the Poles
The Moon's spin axis is tilted only **~1.54°** relative to the ecliptic. Consequently:
- The Sun circles the polar horizon roughly once every 29.5 Earth days.
- Solar elevation never exceeds ~1.8° above the astronomical horizon.
- Elevated ridges (such as crater rims) can experience weeks of unbroken sunlight, while adjacent crater depressions remain in permanent cryogenic shadow (< 110 K).

### Midsummer Cycle Progression (2025–2032)
Because the Moon's orbital nodal precession follows an eclipse year (~346.6 days), peak south polar midsummer shifts ~18.6 calendar days earlier each calendar year:

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

### Core Scientific Invariants
1. **Mathematical Inequality:**  
   $$\text{Max Consecutive Sun-and-Earth Days} \le \text{Max Consecutive Sun Days}$$
   Earth line-of-sight requires simultaneous visibility and is subject to terrain blockage and lunar libration.
2. **Valid Zeros:**  
   In 2031, NR2_K2023 and SP11 record 0 days of continuous sunlight. This represents a scientifically modeled zero (polar midwinter/shadow condition), not missing or null data.
3. **Midsummer Maxima, Not Daily Predictions:**  
   Durations reflect the longest unbroken run of illumination during each year's modeled midsummer, not predictions for arbitrary calendar dates outside these windows.
