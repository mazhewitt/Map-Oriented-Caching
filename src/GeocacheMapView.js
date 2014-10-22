//Geocaching JSHints
/*global Geocache:true, GeocacheDownloader:true, Coordinate:true, GeocacheDatabase:true, GeocachingDotCom:true, GeocacheController:true, $:true, EventEmitter:true, L:true*/
/*jshint es5:true*/

var GeocacheMapView = (function() {


    var map;
    var osm;

    var initmap = function(div_target) {

        // create the tile layer with correct attribution
        var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        var osmAttrib = 'Map data © OpenStreetMap contributors';
        map = L.map(div_target);
        osm = new L.TileLayer(osmUrl, {
            minZoom: 8,
            maxZoom: 12,
            attribution: osmAttrib
        });

        // start the map in South-East England
        map.setView(new L.LatLng(51.3, 0.7), 9);
        map.addLayer(osm);
        map.locate();
        
    };

    var init = function(div_id) {
        initmap(div_id);
    };

    var public_interface = {
        init: init,
        get map(){
            return map;
        }
    };
    return public_interface;

})();