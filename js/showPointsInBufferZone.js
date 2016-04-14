//showPointsInBufferZone.js

function showPointsInBufferZone(pointLayer, polygonLayer) {
    //below example shows find atm points in a lib buffer zone

    // convert lib_buffer multipolygon to a collection of polygons

    var polygonLayer = lib_buffer_layer;
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


    //while reading cafe point data and do the count computation with polygon
    $.getJSON('data/cafe.geojson', function(data) {
        var point_obj = data;
        //counted is the polygon object with pt_count attribute attached
        var counted = turf.count(polygon_obj, point_obj, 'pt_count');
        console.log(JSON.stringify(counted));
        
        var resultFeatures = point_obj.features.concat(counted.features);
        var result = {
            "type": "FeatureCollection",
            "features": resultFeatures
        };
        console.log(JSON.stringify(result));
    });

}


$("#lib_buffer_button").click(function() {
    showPointsInBufferZone(0, 0);
});
