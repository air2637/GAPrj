// attachEvntListenToDynamicBUfferForm.js
var user_buffer_layer;

function add_user_data_buffer(radius, unit, another_selector) {
    var user_added_data_layer = user_added_layers[another_selector.split('_')[0].substring(1)];

    var geojson = new ol.format.GeoJSON();
    var user_added_data_layer_obj = geojson.writeFeaturesObject(user_added_data_layer.getSource().getFeatures());

    var buffer_arr = []; //this will be 'features' in layer json
    $.each(user_added_data_layer_obj.features, function(index, val) {
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


    window.user_buffer_layer = new ol.layer.Vector({
        source: vectorSource
    });

    map.addLayer(window.user_buffer_layer);
    return window.user_buffer_layer;

    /*$.getJSON("data/communityCenter.geojson", function(data) {


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

        map.addLayer(window.cc_buffer_layer);
        return window.cc_buffer_layer;

    });*/
}

function attachEvntListenToDynamicBUfferForm(another_selector) {

    // update buffer radius
    $('#tmp_buffer_radius').on('input propertychange paste', function() {
        
        radius = $('#tmp_buffer_radius').val();
        if ($.isNumeric(radius) && radius > 0) {
            map.removeLayer(window.user_buffer_layer);
            // var another_selector = '#' + $('#label_radius').text().split(' ')[0] +'_user_buffer_layer';
            window.user_buffer_layer = add_user_data_buffer(radius, unit, another_selector);
        }
    });
    // update buffer unit
    $('#tmp_buffer_unit').change(function() {
        map.removeLayer(cc_buffer_layer);
        unit = $('#tmp_buffer_unit').val();
        // var another_selector = '#' + $('#label_radius').text().split(' ')[0] +'_user_buffer_layer';
        window.user_buffer_layer = add_user_data_buffer(radius, unit, another_selector);
    });


}
