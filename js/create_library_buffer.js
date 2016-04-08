// create_library_buffer.js

var unit = 'meters';
var radius = 35;
var lib_buffer_layer;
var testNum = 0;

function add_buffer_to_lib(radius, unit) {
    $.getJSON("data/library.geojson", function(data) {

        var buffer_object = turf.buffer(data, radius, unit);
        //console.log(JSON.stringify(buffer_object));

        var formater = new ol.format.GeoJSON({
            defaultDataProjection: 'EPSG:4326',
            projection: 'EPSG:4326'
        });

        var vectorSource = new ol.source.Vector({
            features: formater.readFeatures(buffer_object)
        });


        window.lib_buffer_layer = new ol.layer.Vector({
            source: vectorSource
        });

        window.testNum = 1;
        map.addLayer(window.lib_buffer_layer);
        return window.lib_buffer_layer;

    });
}

$("#lib_buffer_layer").change(function() {
    if ($("#lib_buffer_layer").prop('checked') == true) {

        lib_buffer_layer = add_buffer_to_lib(radius, unit);

    } else {
        map.removeLayer(lib_buffer_layer);
    }
});
