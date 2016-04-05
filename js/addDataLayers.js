// initiate vector layer from a GeoJson file url
var naturalDataLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'data/natural.geojson',
        format: new ol.format.GeoJSON()
    })
});


var atmIconStyle = new ol.style.Style({
    image: new ol.style.Icon(({
        opacity: 0.75,
        scale: 0.05,
        src: 'data/atm.svg'
    }))
});

var atmDataLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'data/atm.geojson',
        format: new ol.format.GeoJSON()
    }),
    style: atmIconStyle
});

var cafeDataLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'data/cafe.geojson',
        format: new ol.format.GeoJSON()
    })
});

var communityCentreDataLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'data/communityCenter.geojson',
        format: new ol.format.GeoJSON()
    })
});

var foodBeverageDataLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'data/food_beverage.geojson',
        format: new ol.format.GeoJSON()
    })
});

var libraryDataLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'data/library.geojson',
        format: new ol.format.GeoJSON()
    })
});

var parkingDataLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'data/parking.geojson',
        format: new ol.format.GeoJSON()
    })
});

var taxiDataLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'data/taxi.geojson',
        format: new ol.format.GeoJSON()
    })
});

// register listening event

$("#natural_data_layer").change(function() {
    if ($("#natural_data_layer").prop('checked') == true) {
        console.log("hee");
        map.addLayer(naturalDataLayer);
    } else {
        console.log("llo");
        map.removeLayer(naturalDataLayer);
    }
});


$("#atm_data_layer").change(function() {
    if ($("#atm_data_layer").prop('checked') == true) {
        console.log("hee");
        map.addLayer(atmDataLayer);
    } else {
        console.log("llo");
        map.removeLayer(atmDataLayer);
    }
});


$("#cafe_data_layer").change(function() {
    if ($("#cafe_data_layer").prop('checked') == true) {
        map.addLayer(cafeDataLayer);
    } else {
        map.removeLayer(cafeDataLayer);
    }
});

$("#communityCentre_data_layer").change(function() {
    if ($("#communityCentre_data_layer").prop('checked') == true) {
        map.addLayer(communityCentreDataLayer);
    } else {
        map.removeLayer(communityCentreDataLayer);
    }
});

$("#foodBeverage_data_layer").change(function() {
    if ($("#foodBeverage_data_layer").prop('checked') == true) {
        map.addLayer(foodBeverageDataLayer);
    } else {
        map.removeLayer(foodBeverageDataLayer);
    }
});

$("#library_data_layer").change(function() {
    if ($("#library_data_layer").prop('checked') == true) {
        map.addLayer(libraryDataLayer);
    } else {
        map.removeLayer(libraryDataLayer);
    }
});

$("#parking_data_layer").change(function() {
    if ($("#parking_data_layer").prop('checked') == true) {
        map.addLayer(parkingDataLayer);
    } else {
        map.removeLayer(parkingDataLayer);
    }
});

$("#taxi_data_layer").change(function() {
    if ($("#taxi_data_layer").prop('checked') == true) {
        map.addLayer(taxiDataLayer);
    } else {
        map.removeLayer(taxiDataLayer);
    }
});