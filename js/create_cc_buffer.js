// create_cc_buffer.js

var unit = 'meters';
var radius = 35;
var cc_buffer_layer;
var testNum = 0;

function add_buffer_to_cc(radius, unit) {
    $.getJSON("data/communityCenter.geojson", function(data) {

        //approach 1: create buffer in one go
        /*
                // console.log(JSON.stringify(data));
                var buffer_object = turf.buffer(data, radius, unit);
                // console.log(JSON.stringify(buffer_object));

                var formater = new ol.format.GeoJSON({
                    defaultDataProjection: 'EPSG:4326',
                    projection: 'EPSG:4326'
                });

                var vectorSource = new ol.source.Vector({
                    features: formater.readFeatures(buffer_object)
                });


                window.cc_buffer_layer = new ol.layer.Vector({
                    source: vectorSource
                });

                map.addLayer(window.cc_buffer_layer);
                return window.cc_buffer_layer;*/

        //approach 2: create buffer for each cc one by one

        var buffer_arr = []; //this will be 'features' in layer json
        $.each(data.features, function(index, val) {
            var buffer_ele = turf.buffer(val, radius, unit);
            buffer_ele.features[0].properties = { 'name': val.properties.name + " _buffer" };
            buffer_arr.push(buffer_ele.features[0]);
        });
        var buffer_layer_collection = {
            'type': 'FeatureCollection',
            'features': buffer_arr
        };

        var formater = new ol.format.GeoJSON({
            defaultDataProjection: 'EPSG:4326',
            projection: 'EPSG:4326'
        });

        var vectorSource = new ol.source.Vector({
            features: formater.readFeatures(buffer_layer_collection)
        });


        window.cc_buffer_layer = new ol.layer.Vector({
            source: vectorSource
        });

        buffer_layers['cc_buffer_layer'] = window.cc_buffer_layer; 
        map.addLayer(window.cc_buffer_layer);
        return window.cc_buffer_layer;

    });
}
// show menu if buffer selection box is checked
/*$("#cc_buffer_layer").change(function() {
    if ($("#cc_buffer_layer").prop('checked') == true) {
        cc_buffer_layer = add_buffer_to_cc(radius, unit);
        $("#cc_buffer_form").slideDown();
    } else {
        map.removeLayer(cc_buffer_layer);
        $("#cc_buffer_form").hide();
    }
});*/

// update cc buffer radius
$('#cc_buffer_radius').on('input propertychange paste', function() {
    radius = $('#cc_buffer_radius').val();
    if ($.isNumeric(radius) && radius > 0) {
        map.removeLayer(cc_buffer_layer);
        cc_buffer_layer = add_buffer_to_cc(radius, unit);
    }
});
// update cc buffer unit
$('#cc_buffer_unit').change(function() {
    map.removeLayer(cc_buffer_layer);
    unit = $('#cc_buffer_unit').val();
    cc_buffer_layer = add_buffer_to_cc(radius, unit);
});
