//scalculateointsInBufferZone.js

function getPointJsonFileDir(pointLayer) {
    //below example shows find atm points in a lib buffer zone

    var point_json_file_dir = '';
    switch (pointLayer) {
        case 'Cafe':
            point_json_file_dir = 'data/cafe.geojson';
            break;
        case 'ATM':
            point_json_file_dir = 'data/atm.geojson';
            break;
        case 'FB':
            point_json_file_dir = 'data/food_beverage.geojson';
            break;
        case 'Parking':
            point_json_file_dir = 'data/parking.geojson';
            break;
        case 'Taxi':
            point_json_file_dir = 'data/taxi.geojson';
            break;
        default:
            //do nothing
    }

    return point_json_file_dir;


}

function displayBufferTable(table_col) {
    /*$.each(table_col, function(index, value){
        console.log(JSON.stringify(value));
    });*/
    console.log(JSON.stringify(table_col));
}

$("#lib_buffer_button").click(function() {
    var table_col = [],
        _lib_buffer_for = [],
        _point_json_file_dir = [];

    if ($("#cafe_in_lib_buffer").prop('checked')) {
        _point_json_file_dir.push(getPointJsonFileDir("Cafe"));
        _lib_buffer_for.push("cafe");
    }
    if ($("#atm_in_lib_buffer").prop('checked')) {
        _point_json_file_dir.push(getPointJsonFileDir("ATM"));
        _lib_buffer_for.push("atm");
    }
    if ($("#foodBeverage_in_lib_buffer").prop('checked')) {
        _point_json_file_dir.push(getPointJsonFileDir("FB"));
        _lib_buffer_for.push("food_beverage");
    }
    if ($("#parking_in_lib_buffer").prop('checked')) {
        _point_json_file_dir.push(getPointJsonFileDir("Parking"));
        _lib_buffer_for.push("parking");
    }
    if ($("#taxi_in_lib_buffer").prop('checked')) {
        _point_json_file_dir.push(getPointJsonFileDir("Taxi"));
        _lib_buffer_for.push("taxi");
    }

    var geojson = new ol.format.GeoJSON();
    var polygon_obj = geojson.writeFeaturesObject(lib_buffer_layer.getSource().getFeatures());
    var tmp = 0;
    var counted, point_obj;
    var _lib_buffer_for_sub;
    //while reading cafe point data and do the count computation with polygon
    $.each(_point_json_file_dir, function(index, value) {
        $.getJSON(value, function(data) {
            
            point_obj = data;

            //the following code to check what json file currently is loaded
            $.each(_lib_buffer_for, function(sub_index, sub_value){
                if(value.indexOf(sub_value)>-1){
                    _lib_buffer_for_sub = sub_value;
                    return false;
                }
            })
            
            //counted is the polygon object with pt_count attribute attached
            counted = turf.count(polygon_obj, point_obj, 'num_of_'+ _lib_buffer_for_sub);
            //note that aft running turf.count, polygon_object will has 'pt_count' property

            /*var resultFeatures = point_obj.features.concat(counted.features);
            var result = {
                "type": "FeatureCollection",
                "features": resultFeatures
            };*/
            //console.log(JSON.stringify(result));
            //table_col.push(counted);
            tmp ++;

            if(tmp == _lib_buffer_for.length){
                displayBufferTable(counted);
            }
            
        });

    });

});
