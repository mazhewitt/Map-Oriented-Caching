"use strict"

var Waypoint = {};


(function(){
	
    // contructor
    Waypoint = function(){};
    // properties
    Waypoint.prototype = {
        get name(){
            return this._name;
        },
         set name(val){
            this._name = val;
        },
         get description(){
            return this._description;
        },
        set description(val){
            this._description = val;
        },
		get coordinate(){
            return this._coordinate;
        },
        set coordinate(val){
            this.setCoordinate(val);
        }
    };
    
    Waypoint.prototype.setCoordinate = function(coordinate){
        if (arguments.length === 1) {
            this._coordinate = coordinate;
        }
        else {
            this.coordinate = new Coordinate();
            this._coordinate.lat = arguments[0];
            this._coordinate.lon = arguments[1];
        }
    };
})();
