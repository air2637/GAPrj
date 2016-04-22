// create_library_buffer.js

var unit = 'meters';
var radius = 35;
var lib_buffer_layer;
var testNum = 0;

function add_buffer_to_lib(radius, unit) {
    $.getJSON("data/library.geojson", function(data) {

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


                window.lib_buffer_layer = new ol.layer.Vector({
                    source: vectorSource
                });

                map.addLayer(window.lib_buffer_layer);
                return window.lib_buffer_layer;*/

        //approach 2: create buffer for each lib one by one

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


        window.lib_buffer_layer = new ol.layer.Vector({
            source: vectorSource
        });

        map.addLayer(window.lib_buffer_layer);
        return window.lib_buffer_layer;

    });
}
// show menu if buffer selection box is checked
/*$("#lib_buffer_layer").change(function() {
    if ($("#lib_buffer_layer").prop('checked') == true) {
        

        var name = "Library";

        radius = 35;
        unit = 'meters';
        $('#tmp_buffer_radius').val(35);
        $('#tmp_buffer_unit').val('meters');

        window.user_buffer_layer = add_user_data_buffer(radius, unit, "#lib_buffer_layer");

        // create dynamic form
        window.user_buffer_table = $('#template_buffer_form').clone();
        window.user_buffer_table.attr('id', 'current_form');
        
        //modify the template buffer form, but in this case, no need, as I user assume to use one buffer form at a time only
       
        window.user_buffer_table.find("#label_radius").text(name + " buffer radius:");
        window.user_buffer_table.find("#label_unit").text(name + " buffer unit:");


        //attach event listener to form elements
        // update buffer radius
        window.user_buffer_table.find('#tmp_buffer_radius').on('input propertychange paste', function() {
            radius = $(this).val();
            if ($.isNumeric(radius) && radius > 0) {
                map.removeLayer(window.user_buffer_layer);
                window.user_buffer_layer = add_user_data_buffer(radius, unit, "#lib_buffer_layer");
            }
        });
        // update buffer unit
        window.user_buffer_table.find('#tmp_buffer_unit').on('change', function() {
            map.removeLayer(window.user_buffer_layer);
            unit = $(this).val();
            window.user_buffer_layer = add_user_data_buffer(radius, unit, "#lib_buffer_layer");
        });

        // show buffer table
        window.user_buffer_table.find('#tmp_buffer_button').on('click', function() {
            createUserDataBufferTable($(this));
        });


        $('#analysis_tools').append(window.user_buffer_table);
        window.user_buffer_table.show();



    } else {
        
        window.user_buffer_table.remove();
        map.removeLayer(window.user_buffer_layer);
    }
});*/
/*
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
*/

function load_lib() {

    $.getJSON("data/library.geojson", function(data) {


        //approach 2: create buffer for each lib one by one

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


        window.lib_buffer_layer = new ol.layer.Vector({
            source: vectorSource
        });

        user_added_layers["lib"] = window.lib_buffer_layer;

    });
};
