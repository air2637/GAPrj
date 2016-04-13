//showPointsInBufferZone.js

function showPointsInBufferZone(pointLayer, polygonLayer) {
    //below example shows find atm points in a lib buffer zone

    // convert lib_buffer multipolygon to a collection of polygons

    var polygonLayer = lib_buffer_layer;
    var geojson = new ol.format.GeoJSON();
    var polygon_mutipolygon_obj = geojson.writeFeaturesObject(polygonLayer.getSource().getFeatures());

    var features=[];
    polygon_mutipolygon_obj.features[0].geometry.coordinates.forEach(function(coords){
    	var geometry = {'type':'Polygon', 'coordinates':coords}; 
    	var properties = {};
    	var feature_element = {'type':'Feature','properties':properties,'geometry':geometry};
    	features.push(feature_element);
    });
    var polygons_obj = {'type': 'FeatureCollection', 'features': features};
    // console.log(polygons_obj);
    //console.log(JSON.stringify(polygons_obj));




    $.getJSON('data/cafe.geojson', function(data) {
        var point_obj = data;


        var counted = turf.count(polygons_obj, point_obj, 'pt_count');

        var resultFeatures = point_obj.features.concat(counted.features);
        var result = {
            "type": "FeatureCollection",
            "features": resultFeatures
        };
        console.log(JSON.stringify(result));
    });
















/*

    $.getJSON('data/cafe.geojson', function(data) {
        var point_obj = data;


        var counted = turf.count(polygon_obj, point_obj, 'pt_count');

        var resultFeatures = point_obj.features.concat(counted.features);
        var result = {
            "type": "FeatureCollection",
            "featusres": resultFeatures
        };
        console.log(JSON.stringify(result));
    });*/

}


$("#lib_buffer_button").click(function() {
    showPointsInBufferZone(0, 0);
});
