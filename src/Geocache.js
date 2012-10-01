//Geocaching JSHints
/*global Geocache:true, GeocacheDownloader:true, Coordinate:true, GeocacheDatabase:true, GeocachingDotCom:true, GeocacheController:true, $:true, Waypoint:true */
/*jshint es5:true*/

'use strict';

var Geocache;


(function() {
    Geocache = function() {};
    // properties
    Geocache.prototype = {
		get name(){
			return this.getName();
		},
		get description(){
			return this.getDescription();
		}, 
		get GCCode(){
			return this.getGCCode();
		},
		get GUID(){
			return this.getGUID();
		},
		get gpxFile(){
			return this._gpxFile;
		},
		set gpxFile(gpxFile){
			this.init(gpxFile);
		},
		get mainCoordinate(){
			return this._wayPoints[0].coordinate;
		}
		
	};

    Geocache.prototype._gpxDocument = null;
	Geocache.prototype._wayPoints = [];
	Geocache.prototype._gpxFile = null;
	
    Geocache.prototype.init = function(gpxFile){
		this._gpxDocument = $(gpxFile);
		this._gpxFile = gpxFile;
		this._wayPoints = extractWaypoints(this._gpxDocument);
	};

    Geocache.prototype.getName = function() {
        var name = this._gpxDocument.find("groundspeak\\:cache > groundspeak\\:name");
		return name[0].innerText;		
    };
	
	Geocache.prototype.getDescription = function() {
        var short_descripion = this._gpxDocument.find("groundspeak\\:cache > groundspeak\\:short_description");
		var long_descripion =this._gpxDocument.find("groundspeak\\:cache > groundspeak\\:long_description");		
		var description = short_descripion[0].innerText + "&lt;br /&gt;" + long_descripion[0].innerText;
		return description;
    };
	
	Geocache.prototype.getGCCode = function() {
		var gcCode = this._gpxDocument.find("wpt > name");
		return gcCode[0].innerText;
	};
	
	Geocache.prototype.getWaypoints = function(){
		return this._wayPoints;
	};
	
	Geocache.prototype.getGUID = function(){
		var url = this._gpxDocument.find("wpt > url")[0].innerText;
		var extract = /guid=([\d\w\-]+)/;
        var guid = extract.exec(url);
		return guid[1];
	};
	
	


	var extractWaypoints = function(gpxDocument) {
		var gpxWayPts = gpxDocument.find("wpt");
		var wayPoints = [];
		for (var i =0; i< gpxWayPts.length; i++){
			wayPoints[i] = new Waypoint();
			wayPoints[i].name = extractWptName(gpxWayPts[i]);
			var lat = Number(gpxWayPts[i].getAttribute("lat"));
			var lon = Number(gpxWayPts[i].getAttribute("lon"));
			wayPoints[i].setCoordinate(lat,lon);
		}
		return wayPoints;
	};

	var extractWptName = function(gpxWpt){
		var name = $(gpxWpt).find("groundspeak\\:cache > groundspeak\\:name");
		if (name.length > 0){
			return name[0].innerText;
		}
		else{
			var desc = $(gpxWpt).find("desc");
			return desc[0].innerText;
		}
	};
	
	


}());