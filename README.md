# Peatland Degradation Mapping — Scotland's Flow Country

> Remote sensing analysis of peatland condition and long-term 
> degradation dynamics using Sentinel-2 multispectral imagery 
> in Google Earth Engine.

## Research Context

Peatlands store approximately 30% of global soil carbon despite 
covering only 3% of land area. Scotland's Flow Country, as Europe's 
largest blanket bog, is a UNESCO World Heritage Site and critical 
carbon sink. This project analyses long-term vegetation dynamics 
and maps degradation states to support carbon accounting and 
restoration planning.

## Study Area

- Location: Flow Country, Caithness & Sutherland, Scotland, UK
- Area: ~4,000 km²
- Data period: January 2020 – December 2025

## Methods

### Data
- Satellite: Sentinel-2 MSI Level-2A, processed via Google Earth Engine
- Cloud masking: SCL (Scene Classification Layer)
- Composite: Seasonal median composites

### Analysis Pipeline
1. **Preprocessing**: Cloud masking and median compositing
2. **Feature extraction**: NDVI, NDWI, seasonal statistics
3. **Classification**: K-means unsupervised clustering (k=3,4,5)
4. **Trend analysis**: Long-term NDVI linear regression slope
5. **Validation**: Manual reference point sampling (n=100)

## Key Results

| Metric | Value |
|--------|-------|
| Overall Accuracy | 0.90 |
| Kappa Coefficient | 0.737 |
| Study period | 2020–2025 |
| Spatial resolution | 10m |

**Note:** Current classification uses unsupervised K-means. 
Known limitation: degraded class recall = 33.3%. 
Future work will implement supervised classification to improve 
degradation detection sensitivity.

## Output Maps

![Classification Map](figures/peatland_classification_k4.png)
![NDVI Trend](figures/ndvi_timeseries.png)

## Tools

- **Google Earth Engine** (JavaScript) — primary analysis platform
- **R / ggplot2** — statistical analysis and visualisation  
- **ArcGIS Pro** — spatial processing and map production

## Related Publication

*In preparation*: "High-Resolution Mapping of Peatland Degradation 
in Scotland's Flow Country using Remote Sensing and Machine Learning"
Target dissertation: University of Nottingham, 2026

## Contact

Wanru Gao | wanrugao21@gmail.com  
University of Nottingham
LinkedIn: [linkedin.com/in/wanru-gao-9581672b9](https://linkedin.com/in/wanru-gao-9581672b9)
