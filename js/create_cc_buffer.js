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

        map.addLayer(window.cc_buffer_layer);
        return window.cc_buffer_layer;

    });
}
// show menu if buffer selection box is checked
$("#cc_buffer_layer").change(function() {
    if ($("#cc_buffer_layer").prop('checked') == true) {
        /*radius = 35;
        unit = 'meters';
         cc_buffer_layer = add_buffer_to_cc(radius, unit);
         $('#cc_buffer_radius').val(35);
         $('#cc_buffer_unit').val('meters');
         $("#cc_buffer_form").slideDown();*/

        var name = "Community Clubs";

        radius = 35;
        unit = 'meters';
        $('#tmp_buffer_radius').val(35);
        $('#tmp_buffer_unit').val('meters');

        window.user_buffer_layer = add_user_data_buffer(radius, unit, "#cc_buffer_layer");

        // create dynamic form
        window.user_buffer_table = $('#template_buffer_form').clone();

        //modify the template buffer form, but in this case, no need, as I user assume to use one buffer form at a time only
        /*window.user_buffer_table.attr('id', window.current_layer_name+'_buffer_form');
        window.user_buffer_table.find('#tmp_buffer_radius').attr()*/
        window.user_buffer_table.attr('id', 'current_form');
        window.user_buffer_table.find("#label_radius").text(name + " buffer radius:");
        window.user_buffer_table.find("#label_unit").text(name + " buffer unit:");


        //attach event listener to form elements
        // update buffer radius
        window.user_buffer_table.find('#tmp_buffer_radius').on('input propertychange paste', function() {
            radius = $(this).val();
            if ($.isNumeric(radius) && radius > 0) {
                map.removeLayer(window.user_buffer_layer);
                window.user_buffer_layer = add_user_data_buffer(radius, unit, "#cc_buffer_layer");
            }
        });
        // update buffer unit
        window.user_buffer_table.find('#tmp_buffer_unit').on('change', function() {
            map.removeLayer(window.user_buffer_layer);
            unit = $(this).val();
            window.user_buffer_layer = add_user_data_buffer(radius, unit, "#cc_buffer_layer");
        });

        // show buffer table
        window.user_buffer_table.find('#tmp_buffer_button').on('click', function() {
            createUserDataBufferTable($(this));
        });


        $('#analysis_tools').append(window.user_buffer_table);
        window.user_buffer_table.show();



    } else {
        /*   map.removeLayer(cc_buffer_layer);
           $("#cc_buffer_form").hide();*/
        window.user_buffer_table.remove();
        map.removeLayer(window.user_buffer_layer);
    }
});

/*// update cc buffer radius
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
*/

function load_cc() {
    $.getJSON("data/communityCenter.geojson", function(data) {

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

        user_added_layers["cc"] = window.cc_buffer_layer;

    });
};
