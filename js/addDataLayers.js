var atmClusteredLayer, cafeClusteredLayer, foodBeverageClusteredLayer,
    parkingClusteredLayer, taxiClusteredLayer;

// initiate vector layer from a GeoJson file url
var naturalDataLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'data/natural2.geojson',
        format: new ol.format.GeoJSON()
    }),
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'green',
            width: 1
        }),
        fill: new ol.style.Fill({
            color: 'rgba(0, 0, 255, 0.1)'
        })
    })
});
// -------------------------------------------------
var atmIconStyle = new ol.style.Style({
    image: new ol.style.Icon(({
        opacity: 0.75,
        scale: 0.05,
        src: 'data/atm.svg'
    }))
});

var atmOriginalSource = new ol.source.Vector({
    url: 'data/atm.geojson',
    format: new ol.format.GeoJSON()
});
// -------------------------------------------------
var cafeIconStyle = new ol.style.Style({
    image: new ol.style.Icon(({
        opacity: 0.75,
        scale: 0.05,
        src: 'data/cafe.svg'
    }))
});

var cafeOriginalSource = new ol.source.Vector({
    url: 'data/cafe.geojson',
    format: new ol.format.GeoJSON()
});
// -------------------------------------------------
var foodBeverageIconStyle = new ol.style.Style({
    image: new ol.style.Icon(({
        opacity: 0.75,
        scale: 0.05,
        src: 'data/food_beverage.svg'
    }))
});

var foodBeverageOriginalSource = new ol.source.Vector({
    url: 'data/food_beverage.geojson',
    format: new ol.format.GeoJSON()
});
// -------------------------------------------------
var parkingIconStyle = new ol.style.Style({
    image: new ol.style.Icon(({
        opacity: 0.75,
        scale: 0.05,
        src: 'data/parking.svg'
    }))
});

var parkingOriginalSource = new ol.source.Vector({
    url: 'data/parking.geojson',
    format: new ol.format.GeoJSON()
});
// -------------------------------------------------
var taxiIconStyle = new ol.style.Style({
    image: new ol.style.Icon(({
        opacity: 0.75,
        scale: 0.1,
        src: 'data/taxi.svg'
    }))
});

var taxiOriginalSource = new ol.source.Vector({
    url: 'data/taxi.geojson',
    format: new ol.format.GeoJSON()
});

// following data layer does not need clustering feature



var communityCenterIconStyle = new ol.style.Style({
    image: new ol.style.Icon(({
        opacity: 0.75,
        scale: 0.1,
        src: 'data/communityCenter.svg'
    }))
});

var communityCentreDataLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'data/communityCenter.geojson',
        format: new ol.format.GeoJSON()
    }),
    style: communityCenterIconStyle
});

var libraryIconStyle = new ol.style.Style({
    image: new ol.style.Icon(({
        opacity: 0.75,
        scale: 0.1,
        src: 'data/library.svg'
    }))
});

var libraryDataLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'data/library.geojson',
        format: new ol.format.GeoJSON()
    }),
    style: libraryIconStyle
});

// register listening event

$("#natural_data_layer").change(function() {
    if ($("#natural_data_layer").prop('checked') == true) {
        map.addLayer(naturalDataLayer);
    } else {
        map.removeLayer(naturalDataLayer);
    }
});


$("#atm_data_layer").change(function() {
    if ($("#atm_data_layer").prop('checked') == true) {
        atmClusteredLayer = addClusteringStyleTo(atmOriginalSource, atmIconStyle);
        map.addLayer(atmClusteredLayer);
    } else {
        map.removeLayer(atmClusteredLayer);
    }
});

$("#cafe_data_layer").change(function() {
    if ($("#cafe_data_layer").prop('checked') == true) {
        cafeClusteredLayer = addClusteringStyleTo(cafeOriginalSource, cafeIconStyle);
        map.addLayer(cafeClusteredLayer);
    } else {
        map.removeLayer(cafeClusteredLayer);
    }
});

$("#foodBeverage_data_layer").change(function() {
    if ($("#foodBeverage_data_layer").prop('checked') == true) {
        foodBeverageClusteredLayer = addClusteringStyleTo(foodBeverageOriginalSource, foodBeverageIconStyle);
        map.addLayer(foodBeverageClusteredLayer);
    } else {
        map.removeLayer(foodBeverageClusteredLayer);
    }
});

$("#parking_data_layer").change(function() {
    if ($("#parking_data_layer").prop('checked') == true) {
        parkingClusteredLayer = addClusteringStyleTo(parkingOriginalSource, parkingIconStyle);
        map.addLayer(parkingClusteredLayer);
    } else {
        map.removeLayer(parkingClusteredLayer);
    }
});

$("#taxi_data_layer").change(function() {
    if ($("#taxi_data_layer").prop('checked') == true) {
        taxiClusteredLayer = addClusteringStyleTo(taxiOriginalSource, taxiIconStyle);
        map.addLayer(taxiClusteredLayer);
    } else {
        map.removeLayer(taxiClusteredLayer);
    }
});


$("#communityCentre_data_layer").change(function() {
    if ($("#communityCentre_data_layer").prop('checked') == true) {
        map.addLayer(communityCentreDataLayer);
    } else {
        map.removeLayer(communityCentreDataLayer);
    }
});

$("#library_data_layer").change(function() {
    if ($("#library_data_layer").prop('checked') == true) {
        map.addLayer(libraryDataLayer);
    } else {
        map.removeLayer(libraryDataLayer);
    }
});



















// below code is reserved to show how to import a vector data layer without clustering 
/*
var atmDataLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'data/atm.geojson',
        format: new ol.format.GeoJSON()
    }),
    style: atmIconStyle
});*/

// below code is reserved to show how to add checkbox switch to a ordinariy vector data layer
/*$("#cafe_data_layer").change(function() {
    if ($("#cafe_data_layer").prop('checked') == true) {
        map.addLayer(cafeDataLayer);
    } else {
        map.removeLayer(cafeDataLayer);
    }
});*/
