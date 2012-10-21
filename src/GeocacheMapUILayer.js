//Geocaching JSHints
/*global Geocache:true, GeocacheDownloader:true, Coordinate:true, GeocacheDatabase:true, GeocachingDotCom:true, GeocacheController:true, $:true*/
// Leaflet JSHints
/*global L:true */
/*jshint es5:true*/

'use strict';


var GeocacheMapUILayer = L.Class.extend({
    includes: L.Mixin.Events,

    options: {
        opacity: 1
    },

    _waypointMarkers: [],

    getGeocache: function() {
        return this._geocache;
    },

    setGeocache: function(cache) {
        this._geocache = cache;
        this._initWaypoints();
    },

    initialize: function(gc) {
        this.setGeocache(gc);
    },

    _initWaypoints: function() {
        var waypoints = this._geocache.waypoints;
        this._waypointMarkers = [];

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

            this._waypointMarkers[i] = new L.Marker(latLng, waypointMarkerOptions);
        }
    },


    addTo: function(map) {
        map.addLayer(this);
        return this;
    },

    onAdd: function(map) {
        this._map = map;
        var waypoints = this._geocache.waypoints;
        for (var i = 0; i < waypoints.length; i++) {
            this._waypointMarkers[i].addTo(map);
        }
    },

    onRemove: function(map) {
        // remove layer's DOM elements and listeners
        var waypoints = this._geocache.waypoints;
        for (var i = 0; i < waypoints.length; i++) {
            map.removeFrom(map);
        }
    }


});
