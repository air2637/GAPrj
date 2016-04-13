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
// show menu if buffer selection box is checked
$("#lib_buffer_layer").change(function() {
    if ($("#lib_buffer_layer").prop('checked') == true) {
        lib_buffer_layer = add_buffer_to_lib(radius, unit);
        $("#lib_buffer_form").slideDown();
    } else {
        map.removeLayer(lib_buffer_layer);
        $("#lib_buffer_form").hide();
    }
});

// update lib buffer radius
$('#lib_buffer_radius').on('input propertychange paste', function() {
    radius = $('#lib_buffer_radius').val();
    if ($.isNumeric(radius) && radius > 0) {
        map.removeLayer(lib_buffer_layer);
        lib_buffer_layer = add_buffer_to_lib(radius, unit);
    }
});
// update lib buffer unit
$('#lib_buffer_unit').change(function() {
    map.removeLayer(lib_buffer_layer);
    unit = $('#lib_buffer_unit').val();
    lib_buffer_layer = add_buffer_to_lib(radius, unit);
});
