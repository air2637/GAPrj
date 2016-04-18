// uploadFile.js
var user_added_layers = {};
var current_layer_name;
var markers = ['m1.svg', 'm2.svg', 'm3.svg', 'm4.svg', 'm5.svg', 'm6.svg', 'm7.svg', 'm8.svg', 'm9.svg',
    'm10.svg', 'm11.svg', 'm12.svg'
];

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
    }else{
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


// document.getElementById('file').addEventListener('change', uploadFile);
$('#pub_file').on('change', function() {
    window.current_layer_name = $('input[type=file]').val().split('\\').pop().split('.')[0];
    // console.log(window.current_layer_name);

    //add new item to html page
    var _parent_div = $(this).parent();
    _parent_div.children('.pub_check_items').append('<label class="checkbox-inline"><input type="checkbox" id="' + window.current_layer_name + '_user_data_layer" value="communityCentre"> ' + window.current_layer_name + '</label>');

    // upload layer content and instantiate the layer
    uploadFile();

    // attach a event listener 
    var _selector = "#" + window.current_layer_name + "_user_data_layer";

    $(_selector).change(function() {
        if ($(_selector).prop('checked') == true) {

            // console.log($(this).prop('id'));
            map.addLayer(user_added_layers[$(this).prop('id').split('_')[0]]);

        } else {
            map.removeLayer(user_added_layers[$(this).prop('id').split('_')[0]]);
        }
    });
});
