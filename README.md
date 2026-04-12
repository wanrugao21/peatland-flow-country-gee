[![Status](https://img.shields.io/badge/Status-Submitted-green)](.)
[![Method](https://img.shields.io/badge/Method-Google_Earth_Engine-brightgreen)](https://earthengine.google.com)
[![Data](https://img.shields.io/badge/Data-Sentinel--2-blue)](https://sentinel.esa.int)

# Multi-temporal Peatland Condition Mapping — Scotland's Flow Country

> Sentinel-2 remote sensing analysis of peatland degradation dynamics  
> using Google Earth Engine. Unsupervised K-means classification and  
> NDVI trend analysis (2020–2025).

## 📋 Overview

| Item | Detail |
|------|--------|
| Study area | Flow Country, Caithness & Sutherland, Scotland |
| Extent | 58.1°N–58.55°N; 4.5°W–3.15°W (~396,000 ha) |
| Satellite | Sentinel-2 MSI Level-2A (10 m) |
| Period | January 2020 – December 2025 |
| Platform | Google Earth Engine |
| Analysis | K-means clustering (k=4), NDVI linear trend analysis |

## 🗺️ Key Results

| Metric | Value |
|--------|-------|
| Intact peatland | 77.6% (307,731 ha) |
| Degraded peatland | 22.4% (88,740 ha) |
| Overall accuracy | 90.0% |
| Kappa coefficient | 0.737 |
| Positive NDVI trend | 82.6% of study area |

**Key finding:** Widespread greening (82.6% positive NDVI trends)  
does not indicate peatland recovery — positive trends in eastern  
areas correspond to afforested/plantation zones, not Sphagnum  
recovery.

## 🔬 Methods

1. **Preprocessing**: SCL-based cloud masking, summer median  
   composite (June–August 2023)
2. **Feature extraction**: NDVI, NDWI, Sentinel-2 bands  
   (B2, B3, B4, B8, B11)
3. **Classification**: K-means unsupervised clustering  
   (sensitivity: k=3,4,5; optimal k=4)
4. **Trend analysis**: Per-pixel NDVI linear regression  
   (annual composites 2020–2025; thresholds ±0.005 yr⁻¹)
5. **Validation**: 100 random points, Google Earth + Street View
   visual interpretation

## 📁 Repository Structure

```text
├── gee_scripts/
│   └── 01_peatland_analysis_complete.js   # Full GEE workflow
├── r_analysis/
│   └── 02_ndvi_slope_distribution.R       # Threshold visualisation
├── figures/                                # Output maps and charts
│   ├── study_area_map.png
│   ├── peatland_classification_k4.png
│   ├── ndvi_trend_map.png
│   └── confusion_matrix.png
└── data/
    └── README.md
```  
                  

## 🛠️ Tools

- **Google Earth Engine** (JavaScript) — primary analysis
- **R / ggplot2 / terra** — statistical visualisation
- **ArcGIS Pro** — spatial processing and cartography

## 📄 Related Work

*Submitted dissertation:* "Multi-temporal Remote Sensing Analysis  
of Peatland Condition and Degradation Patterns in the Flow Country,  
Scotland" — University of Nottingham, 2026

## 📬 Contact

Wanru Gao | wanrugao21@gmail.com  
BSc Environmental Science, University of Nottingham  
[LinkedIn](https://linkedin.com/in/wanru-gao-9581672b9)
