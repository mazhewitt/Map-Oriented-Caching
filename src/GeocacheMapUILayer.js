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

    _waypointElements : [],
    
    get geocache() {
        return this._geocache;
    },
        
    set geocache(cache){
        this._geocache = cache;
        this._initWaypoints();
    },        

    initialize: function(gc) { 
       this.geocache = gc;
    },

    _initWaypoints: function(){
    	var waypoints = this._geocache.waypoints;
    	
    	for (var i =0; i < waypoints.length; i++){
    		this._waypointElements[i] = L.DomUtil.create('div', 'geocache-layer leaflet-zoom-hide');
    	}
    },
    
    
    addTo: function(map) {
        map.addLayer(this);
        return this;
    },  

    onAdd: function (map) {
        this._map = map;
        var waypoints = this._geocache.waypoints;
        for (var i =0; i < waypoints.length; i++){
        	map.getPanes().overlayPane.appendChild(this._waypointElements[i]);
        }
        // add a viewreset event listener for updating layer's position, do the latter
        map.on('viewreset', this._reset, this);
        this._reset();
    },

    onRemove: function (map) {
        // remove layer's DOM elements and listeners
    	 var waypoints = this._geocache.waypoints;
         for (var i =0; i < waypoints.length; i++){
         	map.getPanes().overlayPane.removeChild(this._waypointElements[i]);
         }
        map.off('viewreset', this._reset, this);
    },

    _reset: function () {
        // update layer's position
    	var waypoints = this._geocache.waypoints;
    	for (var i =0; i < waypoints.length; i++){
    		var latlng = new L.LatLng(waypoints[i].lat, waypoints[i].lon);
    		var pos = this._map.latLngToLayerPoint(latlng);
    		L.DomUtil.setPosition(this._waypointElements[i], pos);
    	}
    }


});

