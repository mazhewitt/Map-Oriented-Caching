//Geocaching JSHints
/*global Geocache:true, GeocacheDownloader:true, Coordinate:true, GeocacheDatabase:true, GeocachingDotCom:true, GeocacheController:true, $:true*/
// Leaflet JSHints
/*global L:true */
/*jshint es5:true*/

'use strict';


var GeocacheMapUILayer;


(function() {
    GeocacheMapUILayer = function(geocache) {
        this._geocacheLayerGroup = new L.LayerGroup();
        this.geocache = geocache;
    };

    GeocacheMapUILayer.prototype = {

        _waypointMarkers: [],

        get geocache() {
            return this._geocache;
        },

        set geocache(cache) {
            this._geocache = cache;
            this._initWaypoints();
        },

        get map() {
            return this._map;
        },

        set map(map) {
            this._map = map;
        },

        _initWaypoints: function() {
            var waypoints = this._geocache.waypoints;
            this._geocacheLayerGroup.clearLayers();
            for (var i = 0; i < waypoints.length; i++) {
                var waypointMarkerOptions = {
                    icon: new L.Icon.Default(),
                    title: waypoints[i].name,
                    clickable: true,
                    draggable: false,
                    zIndexOffset: 0,
                    opacity: 1
                };

                var latLng = new L.LatLng(waypoints[i].coordinate.lat, waypoints[i].coordinate.lon);

                this._geocacheLayerGroup.addLayer(new L.Marker(latLng, waypointMarkerOptions));
            }


        },

        addToMap: function() {
            this._geocacheLayerGroup.addTo(this.map);
        },

    };

})();
