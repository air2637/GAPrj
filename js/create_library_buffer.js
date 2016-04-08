// create_library_buffer.js

/*var pt = {
    type: "Feature",
    properties: {},
    geometry: {
        type: "Point",
        coordinates: [103.872095, 1.357983]
    }
};


var unit = 'meters';

var buffered = turf.buffer(pt, 35, unit);
var result = turf.featurecollection([buffered.features, pt]);



var formater = new ol.format.GeoJSON({
    defaultDataProjection: 'EPSG:4326',
    projection: 'EPSG:4326'
});

var vectorSource = new ol.source.Vector({
    features: formater.readFeatures(buffered)
});

var vectorLayer = new ol.layer.Vector({
    source: vectorSource
});

map.addLayer(vectorLayer);*/


// get every library potes
var unit = 'meters';
var buffered = [];
var features = [];

$.getJSON("data/library.geojson", function(data) {
    var items = [];
    $.each(data, function(key, val) {
        //items.push( "<li id='" + key + "'>" + val + "</li>" );

        if (key == "features") {
            //features = val;
            $.each(val, function(key, value) {
                /*console.log("in");
                console.log(key + ": " + value);*/
                buffered.push(turf.buffer(value, 35, unit));
            });
        }
    });

});
console.log("before");

$.each(features, function(key, value) {
    console.log("in");
    alert(key + ": " + value);
});
console.log("after");

//var buffered = turf.buffer(features, 35, unit);

var formater = new ol.format.GeoJSON({
    defaultDataProjection: 'EPSG:4326',
    projection: 'EPSG:4326'
});

var vectorSource = new ol.source.Vector({
    features: formater.readFeatures(buffered)
});

var vectorLayer = new ol.layer.Vector({
    source: vectorSource
});

map.addLayer(vectorLayer);

// create buffer zone for each pointer

// add the buffer layer to map
