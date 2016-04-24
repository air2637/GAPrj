//countPointDistanceinBufferZone.js

function countPointDistanceinBufferZone(point_json_file_dir, buffer_for, sub_feature) {
/*

    console.log(point_json_file_dir);
    console.log(buffer_for);
    console.log(sub_feature);*/




    var point_obj;
    var tmp = 0;
    var pts_within_arr = [];
    var _tmp_wrapper = { "type": "FeatureCollection", "features": [sub_feature] };
    // get centroid ready	
    var _centroid_pt = turf.centroid(sub_feature);

    $.each(point_json_file_dir, function(index, value) {
        $.getJSON(value, function(data) {

            point_obj = data;

            // find pts_within for each sub feature



            // get pts_within ready, do some appending to make it as featureCollection so that within can process

            var _pts_within = turf.within(point_obj, _tmp_wrapper);
            // console.log(JSON.stringify(_tmp_wrapper));

            // console.log(JSON.stringify(_pts_within));

            // if pts_within has 1 or more point feature
            if (_pts_within.features.length > 0) {
                // pair the centroid of sub feature with pts_within
                var _tmp_pair = {
                        "point_type": value.split("/")[1].split(".")[0],
                        "centroid": _centroid_pt,
                        "pts_within": _pts_within
                    }
                    // add the pair into an array
                pts_within_arr.push(_tmp_pair);
            }



            tmp++;

            if (tmp == buffer_for.length) {
                // console.log(JSON.stringify(pts_within_arr));

                // execute turfjs within function


                // get centroid 

                // console.log("hello");
                // calculate the distance btw those filtered points and current buffer centroid 
                $.each(pts_within_arr, function(ind, chart_obj) {
                    var centr = chart_obj.centroid;
                    var units = "kilometers";
                    var distances = [];
                    var chart_title = "Distances of " + chart_obj.point_type + " within the Range";

                    $.each(chart_obj.pts_within.features, function(sub_ind, pts_within_obj) {
                        var distance = turf.distance(centr, pts_within_obj, units);
                        distances.push(distance);
                    });
                    distances.sort();


                    var dataPoints = [];
                    $.each(distances, function(label, y) {
                        var col = { "label": "Place Point " + label, "y": y };
                        dataPoints.push(col);
                    });

                    var id = "chartContainer" + chart_obj.point_type;

                    var chart_div = $('<div />').attr('id',id).css({"height": "300px", "width": "40%"}).addClass("col-md-3");
                    $('#chartContainer').append(chart_div);

                    var chart = new CanvasJS.Chart(id, {
                        theme: "theme2", //theme1
                        title: {
                            text: chart_title
                        },
                        axisX:{
                             title: "Places",
                             titleFontSize: 14
                        },
                        axisY:{
                              title: "Distance (km)",
                             titleFontSize: 14
                        },
                        animationEnabled: false, // change to true
                        data: [{
                            // Change type to "bar", "area", "spline", "pie",etc.
                            type: "scatter",
                            dataPoints: dataPoints
                        }]
                    });

                    chart.render();

                });

                // display the distance in a chart
            }

        });

    });

    // get all point feature


};
