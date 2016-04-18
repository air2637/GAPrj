// create_nature_buffer.js

var unit = 'meters';
var radius = 35;
var nature_buffer_layer;
var testNum = 0;

function add_buffer_to_nature(radius, unit) {
    $.getJSON("data/natural2.geojson", function(data) {

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


                window.nature_buffer_layer = new ol.layer.Vector({
                    source: vectorSource
                });

                map.addLayer(window.nature_buffer_layer);
                return window.nature_buffer_layer;*/

        //approach 2: create buffer for each nature one by one

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


        window.nature_buffer_layer = new ol.layer.Vector({
            source: vectorSource
        });
        
        buffer_layers['nature_buffer_layer'] = window.nature_buffer_layer; 
        map.addLayer(window.nature_buffer_layer);
        return window.nature_buffer_layer;

    });
}


// show menu if buffer selection box is checked
/*$("#nature_buffer_layer").change(function() {
    if ($("#nature_buffer_layer").prop('checked') == true) {
        $("#nature_buffer_form").slideDown();
        nature_buffer_layer = add_buffer_to_nature(radius, unit);
        
    } else {
        $("#nature_buffer_form").hide();
        map.removeLayer(nature_buffer_layer);
        
    }
});*/

// update nature buffer radius
$('#nature_buffer_radius').on('input propertychange paste', function() {
    radius = $('#nature_buffer_radius').val();
    if ($.isNumeric(radius) && radius > 0) {
        map.removeLayer(nature_buffer_layer);
        nature_buffer_layer = add_buffer_to_nature(radius, unit);
    }
});
// update nature buffer unit
$('#nature_buffer_unit').change(function() {
    map.removeLayer(nature_buffer_layer);
    unit = $('#nature_buffer_unit').val();
    nature_buffer_layer = add_buffer_to_nature(radius, unit);
});
