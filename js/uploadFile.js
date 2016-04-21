// uploadFile.js
var user_added_layers = {};
var current_layer_name;
var markers = ['m1.svg', 'm2.svg', 'm3.svg', 'm4.svg', 'm5.svg', 'm6.svg', 'm7.svg', 'm8.svg', 'm9.svg',
    'm10.svg', 'm11.svg', 'm12.svg'
];
var user_buffer_faci_data_layers = [];
var user_buffer_table;


function handleFileSelect(evt) {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
}

function onReaderLoad(event) {
    var obj = JSON.parse(event.target.result);
    processObj(obj);
}

function processObj(obj) {
    // console.log(JSON.stringify(obj));
    var formater = new ol.format.GeoJSON({
        defaultDataProjection: 'EPSG:4326',
        projection: 'EPSG:4326'
    });

    var vectorSource = new ol.source.Vector({
        features: formater.readFeatures(obj)
    });

    var source_file = "";
    var _data_layer;

    if (markers.length > 0 && obj.features[0].geometry.type == "Point") {
        source_file = markers[Math.floor(Math.random() * 12) + 1]; // randome a num

        var layerStyle = new ol.style.Style({
            image: new ol.style.Icon(({
                opacity: 0.75,
                scale: 0.05,
                src: 'data/' + source_file
            }))
        });


        _data_layer = new ol.layer.Vector({
            source: vectorSource,
            style: layerStyle
        });
    } else {
        _data_layer = new ol.layer.Vector({
            source: vectorSource
        });
    }

    user_added_layers["" + window.current_layer_name] = _data_layer;
}

function uploadFile(evt) {
    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        // Great success! All the File APIs are supported.
        handleFileSelect(evt);

    } else {
        alert('The File APIs are not fully supported in this browser.');
    }
}


$('#pub_file').on('change', function() {
    window.current_layer_name = $('#pub_file').val().split('\\').pop().split('.')[0];
    // console.log(window.current_layer_name);

    //add new item to html page: pub div and analysis tool div
    var _parent_div = $(this).parent();
    _parent_div.children('.pub_check_items').append('<label class="checkbox-inline"><input type="checkbox" id="' + window.current_layer_name + '_user_pub_data_layer"> ' + window.current_layer_name + '</label>');

    $('.buffer_check_items').append('<label class="checkbox-inline"><input type="checkbox" id="' + window.current_layer_name + '_user_buffer_layer"> ' + window.current_layer_name + '</label>');

    // upload layer content and instantiate the layer
    uploadFile();

    // attach a event listener: pub div and analysis tool div
    var _selector = "#" + window.current_layer_name + "_user_pub_data_layer";

    $(_selector).change(function() {
        if ($(_selector).prop('checked') == true) {

            // console.log($(this).prop('id'));
            // console.log(user_added_layers[$(this).prop('id').split('_')[0]]);

            map.addLayer(user_added_layers[$(this).prop('id').split('_')[0]]);

        } else {
            map.removeLayer(user_added_layers[$(this).prop('id').split('_')[0]]);
        }
    });

    var _another_selector = "#" + window.current_layer_name + "_user_buffer_layer";

    $(_another_selector).change(function() {
        if ($(_another_selector).prop('checked') == true) {
            radius = 35;
            unit = 'meters';
            $('#tmp_buffer_radius').val(35);
            $('#tmp_buffer_unit').val('meters');

            // create dynamic form
            window.user_buffer_table = $('#template_buffer_form').clone();

            //modify the template buffer form, but in this case, no need, as I user assume to use one buffer form at a time only
            /*window.user_buffer_table.attr('id', window.current_layer_name+'_buffer_form');
            window.user_buffer_table.find('#tmp_buffer_radius').attr()*/
            window.user_buffer_table.attr('id', 'current_form');
            window.user_buffer_table.find("#label_radius").text(window.current_layer_name + " buffer radius:");
            window.user_buffer_table.find("#label_unit").text(window.current_layer_name + " buffer unit:");


            //attach event listener to form elements
            // attachEvntListenToDynamicBUfferForm(_another_selector);
            // update buffer radius
            window.user_buffer_table.find('#tmp_buffer_radius').on('input propertychange paste', function() {
                radius = $(this).val();
                if ($.isNumeric(radius) && radius > 0) {
                    map.removeLayer(window.user_buffer_layer);
                    window.user_buffer_layer = add_user_data_buffer(radius, unit, _another_selector);
                }
            });
            // update buffer unit
            window.user_buffer_table.find('#tmp_buffer_unit').on('change', function() {
                map.removeLayer(window.cc_buffer_layer);
                unit = $(this).val();
                window.user_buffer_layer = add_user_data_buffer(radius, unit, _another_selector);
            });

            // show buffer table
            window.user_buffer_table.find('#tmp_buffer_button').on('click', function() {
                createUserDataBufferTable(_another_selector);
            });


            $('#analysis_tools').append(window.user_buffer_table);
            window.user_buffer_table.show();



            window.user_buffer_layer = add_user_data_buffer(radius, unit, _another_selector);

        } else {
            // remove the form created
            window.user_buffer_table.remove();
            map.removeLayer(window.user_buffer_layer);
        }
    });
});

$('#faci_file').on('change', function() {
    window.current_layer_name = $('#faci_file').val().split('\\').pop().split('.')[0];
    console.log(window.current_layer_name);

    //add new item to html page
    var _parent_div = $(this).parent();
    _parent_div.children('.faci_check_items').append('<label class="checkbox-inline"><input type="checkbox" id="' + window.current_layer_name + '_user_faci_data_layer"> ' + window.current_layer_name + '</label>');
    $('.faci_buffer_check_items').append('<label class="checkbox-inline"><input type="checkbox" id="' + window.current_layer_name + '_user_buffer_faci_data_layer"> ' + window.current_layer_name + '</label>');

    // upload layer content and instantiate the layer
    uploadFile();

    // attach a event listener 
    var _selector = "#" + window.current_layer_name + "_user_faci_data_layer";

    $(_selector).change(function() {
        if ($(_selector).prop('checked') == true) {

            // console.log($(this).prop('id'));
            map.addLayer(user_added_layers[$(this).prop('id').split('_')[0]]);

        } else {
            map.removeLayer(user_added_layers[$(this).prop('id').split('_')[0]]);
        }
    });

    var _another_selector = "#" + window.current_layer_name + "_user_buffer_faci_data_layer";


  


    $('body').delegate( _another_selector, "click", function() {
    //$('#current_form').find(_another_selector).live("click", function() {
        if ($('#current_form').find(_another_selector).prop('checked') == true) {
            alert("YES");
            user_buffer_faci_data_layers.push(_another_selector.substring(1));

        } else {
            alert("no");
            user_buffer_faci_data_layers = jQuery.grep(user_buffer_faci_data_layers, function(value) {
                return value != _another_selector.substring(1);
            });
        }
    });
});
