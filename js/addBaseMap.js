//initiate OSM base map
var layersOSM = new ol.layer.Group({
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ]
});

// initiate a dark theme base map
var layersDark = new ol.layer.Group({
    layers: [
        new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: 'http://{1-4}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
                attributions: [new ol.Attribution({
                    html: ['&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>']
                })]
            })
        })
    ]
});

var layerOSM = new ol.layer.Tile({
    source: new ol.source.OSM()
})

var layerDark = new ol.layer.Tile({
    source: new ol.source.XYZ({
        url: 'http://{1-4}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        attributions: [new ol.Attribution({
            html: ['&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>']
        })]
    })
})


var map = new ol.Map({
    
    layers: [
        layerOSM,
        layerDark
    ],
    target: 'map',
    view: new ol.View({
        center: //ol.proj.fromLonLat([103.85, 1.29]),
         ol.proj.transform([103.82, 1.35], 'EPSG:4326', 'EPSG:4326'),
        zoom: 11,
        maxZoom: 20,
        minZoom: 10,
        projection: 'EPSG:4326'
    })
});


function setMapType(newType) {
    if (newType == 'OSM') {
        layerOSM.setVisible(true);
        layerDark.setVisible(false);
    } else if (newType == 'Dark') {
        layerOSM.setVisible(false);
        layerDark.setVisible(true);
    }
}
