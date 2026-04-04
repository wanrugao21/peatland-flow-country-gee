// 1. Define AOI
var aoi = ee.Geometry.Rectangle([-4.5, 58.1, -3.15, 58.55]);
Map.centerObject(aoi, 9);

// 2. Load Sentinel-2 (FIXED)
var bands = ['B2','B3','B4','B8','B11','SCL'];

var s2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterBounds(aoi)
  .filterDate('2023-05-01','2023-09-30')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',40))
  .select(bands);   

// 3. Cloud mask
function maskClouds(img){
  var scl = img.select('SCL');
  
  // remove cloud & shadow classes
  var mask = scl.neq(3)   // shadow
    .and(scl.neq(8))      // cloud
    .and(scl.neq(9))
    .and(scl.neq(10));
  
  return img.updateMask(mask);
}

s2 = s2.map(maskClouds);

// 4. Composite
var img = s2.median().clip(aoi);

// 5. Indices
var ndvi = img.normalizedDifference(['B8','B4']).rename('NDVI');
var ndwi = img.normalizedDifference(['B3','B11']).rename('NDWI');

img = img.addBands(ndvi).addBands(ndwi);

// 6. Display
Map.addLayer(img, {
  bands:['B4','B3','B2'],
  min:0,
  max:3000
}, 'RGB');

Map.addLayer(ndvi, {
  min:0,
  max:0.8,
  palette:['white','green']
}, 'NDVI');

Map.addLayer(ndwi, {
  min:-0.3,
  max:0.4,
  palette:['brown','blue']
}, 'NDWI');


// 7. Unsupervised clustering
var clusterBands = ['B2','B3','B4','B8','B11','NDVI','NDWI'];

var training = img.select(clusterBands)
  .sample({
    region:aoi,
    scale:10,
    numPixels:5000,
    seed:1
  });

var clusterer = ee.Clusterer.wekaKMeans(4).train(training);

var classified = img.select(clusterBands).cluster(clusterer);

Map.addLayer(classified.randomVisualizer(), {}, 'Peatland clusters');

// 8. NDVI time-series (FIXED HERE)
var ndviCollection = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterBounds(aoi)
  .filterDate('2020-01-01','2025-12-31')
  .select(['B8','B4'])
  .map(function(image){

      var ndvi = image.normalizedDifference(['B8','B4']).rename('NDVI');
      return ndvi.copyProperties(image, ['system:time_start']);
  });

var chart = ui.Chart.image.series({
  imageCollection: ndviCollection,
  region: aoi,
  reducer: ee.Reducer.mean(),
  scale: 30,          
});

print(chart);


// 9. Export
Export.image.toDrive({
  image: classified,
  description: 'FlowCountry_clusters_10m',
  region: aoi,
  scale: 10,
  maxPixels: 1e13
});