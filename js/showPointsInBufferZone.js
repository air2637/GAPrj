//scalculateointsInBufferZone.js
var _cc_buffer_for = [], 
    _point_json_file_dir = [];

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

function highlightThisObject(buffer_layer, index, last_index, last_index_bol) {

    //console.log(buffer_layer);
    var _feature = buffer_layer.getSource().getFeatures()[index];
    var _style = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'yellow',
            width: 1
        }),
        fill: new ol.style.Fill({
            color: 'rgba(249, 241, 68, 0.55)'
        })
    });

    if (last_index_bol != false) {
        var _default_style = _feature.getStyle();
        var _last_feature = buffer_layer.getSource().getFeatures()[last_index];
        _last_feature.setStyle(_default_style);
    }

    _feature.setStyle(_style);
    return index;

}


function displayBufferTable(buffer_layer, counted_obj) {

    // console.log(JSON.stringify(counted_obj));
    var _last_index = 0,
        _last_index_bol = false;
    $(".dataTables_wrapper").remove();

    var row_num = counted_obj.features.length;
    var col_num = Object.keys(counted_obj.features[0].properties).length;
    // console.log("row: " + row_num + ", col: " + col_num);

    // var table = $('<table data-sortable></table>').addClass('buffer_table sortable-theme-bootstrap');
    //make the table sortable

    var table = $('<table></table>').addClass('buffer_table sortable-theme-bootstrap');


    var header = $('<thead></thead>');
    var row = $('<tr></tr>');
    for (i = 0; i < col_num; i++) {
        var cell = $('<th></th>').text(Object.keys(counted_obj.features[0].properties)[i]);
        row.append(cell);
    }
    header.append(row);
    table.append(header);

    var body = $('<tbody></tbody>');

    // the following is to attach real data into the table
    for (j = 0; j < row_num; j++) {
        var row = $('<tr></tr>');
        row.data("id", j);

        var target = counted_obj.features[j].properties;
        // console.log(JSON.stringify(target));
        for (var k in target) {
            if (target.hasOwnProperty(k)) {
                //alert("Key is " + k + ", value is" + target[k]);
                var cell = $('<td></td>').text(target[k]);
                row.append(cell);
            }
        }

        row.attr("title", "Click to locate the buffer zone");
        row.attr("data-toggle", "tooltip");
        row.tooltip();
        //adding tooltip feature

        row.on("click", function() {
            var _j = ($(this).data('id'));
            var coordinate = counted_obj.features[_j].geometry.coordinates;
            //console.log(JSON.stringify(coordinate));
            var _this_buffer_zone_feature = counted_obj.features[_j];

            _last_index = highlightThisObject(buffer_layer, _j, _last_index, _last_index_bol);
            _last_index_bol = true;

            moveToHere(coordinate[0][0]); //by right, should find the centroid of the polygon


            countPointDistanceinBufferZone(window._point_json_file_dir, window._cc_buffer_for, counted_obj.features[_j]);

        });

        body.append(row);
    }

    table.append(body);

    $('#analysis_results').append(table);
    //Sortable.init();
    $('.buffer_table').DataTable();

}

function moveToHere(coordinate) {
    //console.log(JSON.stringify(coordinate));
    var view = window.map.getView();
    var center = ol.proj.fromLonLat(coordinate, 'EPSG:4326');
    //animation
    var duration = 2000;
    var start = +new Date();
    var pan = ol.animation.pan({
        duration: duration,
        source: /** @type {ol.Coordinate} */ (view.getCenter()),
        start: start
    });
    var bounce = ol.animation.bounce({
        duration: duration,
        resolution: 4 * view.getResolution(),
        start: start
    });
    map.beforeRender(pan, bounce);
    //end of animation
    view.setCenter(center);
    view.setZoom(16);
    window.map.setView(view);
}

$("#lib_buffer_button").click(function() {
    var _lib_buffer_for = [],
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
            $.each(_lib_buffer_for, function(sub_index, sub_value) {
                if (value.indexOf(sub_value) > -1) {
                    _lib_buffer_for_sub = sub_value;
                    return false;
                }
            })

            //counted is the polygon object with pt_count attribute attached
            counted = turf.count(polygon_obj, point_obj, 'num_of_' + _lib_buffer_for_sub);
            //note that aft running turf.count, polygon_object will has 'pt_count' property

            /*var resultFeatures = point_obj.features.concat(counted.features);
            var result = {
                "type": "FeatureCollection",
                "features": resultFeatures
            };*/
            // console.log(JSON.stringify(result));
            //table_col.push(counted);
            tmp++;

            if (tmp == _lib_buffer_for.length) {
                displayBufferTable(lib_buffer_layer, counted);
            }

        });

    });

});

$("#cc_buffer_button").click(function() {

    window._cc_buffer_for = [],
        window._point_json_file_dir = [];

    if ($("#cafe_in_cc_buffer").prop('checked')) {
        window._point_json_file_dir.push(getPointJsonFileDir("Cafe"));
        window._cc_buffer_for.push("cafe");
    }
    if ($("#atm_in_cc_buffer").prop('checked')) {
        window._point_json_file_dir.push(getPointJsonFileDir("ATM"));
        window._cc_buffer_for.push("atm");
    }
    if ($("#foodBeverage_in_cc_buffer").prop('checked')) {
        window._point_json_file_dir.push(getPointJsonFileDir("FB"));
        window._cc_buffer_for.push("food_beverage");
    }
    if ($("#parking_in_cc_buffer").prop('checked')) {
        window._point_json_file_dir.push(getPointJsonFileDir("Parking"));
        window._cc_buffer_for.push("parking");
    }
    if ($("#taxi_in_cc_buffer").prop('checked')) {
        window._point_json_file_dir.push(getPointJsonFileDir("Taxi"));
        window._cc_buffer_for.push("taxi");
    }

    //pass data for countPointDistanceinBufferZone to process
    // countPointDistanceinBufferZone(window._point_json_file_dir, window._cc_buffer_for);

    var geojson = new ol.format.GeoJSON();
    var polygon_obj = geojson.writeFeaturesObject(cc_buffer_layer.getSource().getFeatures());

    var tmp = 0;
    var counted, point_obj, pts_within, centroid_point;
    var pts_within_pair_collection = [];
    var _cc_buffer_for_sub;
    //while reading cafe point data and do the count computation with polygon
    $.each(window._point_json_file_dir, function(index, value) {
        $.getJSON(value, function(data) {

            point_obj = data;

            //the following code to check what json file currently is loaded
            $.each(window._cc_buffer_for, function(sub_index, sub_value) {
                if (value.indexOf(sub_value) > -1) {
                    _cc_buffer_for_sub = sub_value;
                    return false;
                }
            })

            //counted is the polygon object with pt_count attribute attached
            counted = turf.count(polygon_obj, point_obj, 'num_of_' + _cc_buffer_for_sub);
            //note that aft running turf.count, polygon_object will has 'pt_count' property

            /*var resultFeatures = point_obj.features.concat(counted.features);
            var result = {
                "type": "FeatureCollection",
                "features": resultFeatures
            };*/
            //console.log(JSON.stringify(result));
            //table_col.push(counted);
            tmp++;

            if (tmp == window._cc_buffer_for.length) {
                displayBufferTable(cc_buffer_layer, counted);
            }

        });

    });

});

$("#nature_buffer_button").click(function() {
    var _nature_buffer_for = [],
        _point_json_file_dir = [];

    if ($("#cafe_in_nature_buffer").prop('checked')) {
        _point_json_file_dir.push(getPointJsonFileDir("Cafe"));
        _nature_buffer_for.push("cafe");
    }
    if ($("#atm_in_nature_buffer").prop('checked')) {
        _point_json_file_dir.push(getPointJsonFileDir("ATM"));
        _nature_buffer_for.push("atm");
    }
    if ($("#foodBeverage_in_nature_buffer").prop('checked')) {
        _point_json_file_dir.push(getPointJsonFileDir("FB"));
        _nature_buffer_for.push("food_beverage");
    }
    if ($("#parking_in_nature_buffer").prop('checked')) {
        _point_json_file_dir.push(getPointJsonFileDir("Parking"));
        _nature_buffer_for.push("parking");
    }
    if ($("#taxi_in_nature_buffer").prop('checked')) {
        _point_json_file_dir.push(getPointJsonFileDir("Taxi"));
        _nature_buffer_for.push("taxi");
    }

    var geojson = new ol.format.GeoJSON();
    var polygon_obj = geojson.writeFeaturesObject(nature_buffer_layer.getSource().getFeatures());
    var tmp = 0;
    var counted, point_obj;
    var _nature_buffer_for_sub;
    //while reading cafe point data and do the count computation with polygon
    $.each(_point_json_file_dir, function(index, value) {
        $.getJSON(value, function(data) {

            point_obj = data;

            //the following code to check what json file currently is loaded
            $.each(_nature_buffer_for, function(sub_index, sub_value) {
                if (value.indexOf(sub_value) > -1) {
                    _nature_buffer_for_sub = sub_value;
                    return false;
                }
            })

            //counted is the polygon object with pt_count attribute attached
            counted = turf.count(polygon_obj, point_obj, 'num_of_' + _nature_buffer_for_sub);
            //note that aft running turf.count, polygon_object will has 'pt_count' property

            /*var resultFeatures = point_obj.features.concat(counted.features);
            var result = {
                "type": "FeatureCollection",
                "features": resultFeatures
            };*/
            //console.log(JSON.stringify(result));
            //table_col.push(counted);
            tmp++;

            if (tmp == _nature_buffer_for.length) {
                displayBufferTable(nature_buffer_layer, counted);
            }

        });

    });

});


function createUserDataBufferTable(another_selector) {
    window._cc_buffer_for = [],
        window._point_json_file_dir = [];

    if (window.user_buffer_table.find("#cafe_in_tmp_buffer").prop('checked')) {
        window._point_json_file_dir.push(getPointJsonFileDir("Cafe"));
        window._cc_buffer_for.push("cafe");
    }
    if (window.user_buffer_table.find("#atm_in_tmp_buffer").prop('checked')) {
        window._point_json_file_dir.push(getPointJsonFileDir("ATM"));
        window._cc_buffer_for.push("atm");
    }
    if (window.user_buffer_table.find("#foodBeverage_in_tmp_buffer").prop('checked')) {
        window._point_json_file_dir.push(getPointJsonFileDir("FB"));
        window._cc_buffer_for.push("food_beverage");
    }
    if (window.user_buffer_table.find("#parking_in_tmp_buffer").prop('checked')) {
        window._point_json_file_dir.push(getPointJsonFileDir("Parking"));
        window._cc_buffer_for.push("parking");
    }
    if (window.user_buffer_table.find("#taxi_in_tmp_buffer").prop('checked')) {
        window._point_json_file_dir.push(getPointJsonFileDir("Taxi"));
        window._cc_buffer_for.push("taxi");
    }

    //pass data for countPointDistanceinBufferZone to process
    // countPointDistanceinBufferZone(window._point_json_file_dir, window._cc_buffer_for);


    var geojson = new ol.format.GeoJSON();
    var polygon_obj = geojson.writeFeaturesObject(window.user_buffer_layer.getSource().getFeatures());

    var tmp = 0;
    var counted, point_obj, pts_within, centroid_point;
    var pts_within_pair_collection = [];
    var _cc_buffer_for_sub;
    //while reading cafe point data and do the count computation with polygon
    $.each(window._point_json_file_dir, function(index, value) {
        $.getJSON(value, function(data) {

            point_obj = data;

            //the following code to check what json file currently is loaded
            $.each(window._cc_buffer_for, function(sub_index, sub_value) {
                if (value.indexOf(sub_value) > -1) {
                    _cc_buffer_for_sub = sub_value;
                    return false;
                }
            })

            //counted is the polygon object with pt_count attribute attached
            counted = turf.count(polygon_obj, point_obj, 'num_of_' + _cc_buffer_for_sub);
            //note that aft running turf.count, polygon_object will has 'pt_count' property

            /*var resultFeatures = point_obj.features.concat(counted.features);
            var result = {
                "type": "FeatureCollection",
                "features": resultFeatures
            };*/
            //console.log(JSON.stringify(result));
            //table_col.push(counted);
            tmp++;

            if (tmp == window._cc_buffer_for.length) {
                displayBufferTable(window.user_added_data_layer, counted);
            }

        });

    });
}
