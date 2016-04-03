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


