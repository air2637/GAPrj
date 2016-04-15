//showPointsInBufferZone.js

function showPointsInBufferZone(pointLayer, polygonLayer) {
    //below example shows find atm points in a lib buffer zone

    // convert lib_buffer multipolygon to a collection of polygons

    //var polygonLayer = lib_buffer_layer;
    var geojson = new ol.format.GeoJSON();
    var polygon_obj = geojson.writeFeaturesObject(polygonLayer.getSource().getFeatures());
    //console.log(JSON.stringify(polygon_obj));


/* //the following steps are for converting multipolygon to a collection of polygons
    var features=[];
    polygon_obj.features[0].geometry.coordinates.forEach(function(coords){
    	var geometry = {'type':'Polygon', 'coordinates':coords}; 
    	var properties = {};
    	var feature_element = {'type':'Feature','properties':properties,'geometry':geometry};
    	features.push(feature_element);
    });
    var polygons_obj = {'type': 'FeatureCollection', 'features': features};*/

    var point_json_file_dir = '';
    switch(pointLayer){
        case 'Cafe':
            point_json_file_dir = 'data/cafe.geojson';
            break;
        case 'ATM':
             point_json_file_dir = 'data/atm.geojson';
            break;
        case 'F&B':
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

    //while reading cafe point data and do the count computation with polygon
    $.getJSON(point_json_file_dir, function(data) {
        var point_obj = data;
        //counted is the polygon object with pt_count attribute attached
        var counted = turf.count(polygon_obj, point_obj, 'pt_count');
        console.log(JSON.stringify(counted));

        var resultFeatures = point_obj.features.concat(counted.features);
        var result = {
            "type": "FeatureCollection",
            "features": resultFeatures
        };
        //console.log(JSON.stringify(result));
    });

}


$("#lib_buffer_button").click(function() {
    showPointsInBufferZone("ATM", lib_buffer_layer);
});
