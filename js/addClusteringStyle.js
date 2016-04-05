var addClusteringStyleTo = function(layerGeojsonSource, layerStyle) { //layerSource is a Geojson file

    // a clustered source is configured with another vector source that it
    // operates on
    var clusterSource = new ol.source.Cluster({
        source: layerGeojsonSource
    });

    // it needs a layer too
    var clusterLayer = new ol.layer.Vector({
        source: clusterSource,
        style: layerStyle
    });

    return clusterLayer;
  };
