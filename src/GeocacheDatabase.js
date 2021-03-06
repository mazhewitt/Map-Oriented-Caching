//Geocaching JSHints
/*global Geocache:true, GeocacheDownloader:true, Coordinate:true, GeocacheDatabase:true, GeocachingDotCom:true, GeocacheController:true, $:true */

'use strict';

var GeocacheDatabase = (function(){

    var database = null;
    var _initialised = false;
    
    
    var GEOCACHE_NOT_FOUND = "GEOCACHE_NOT_FOUND";
    var DATABASE_ERROR = "DATABASE_ERROR";
    
    var init = function(){
        return initialiseDatabase().pipe(createTable());
    };
    
    var initialiseDatabase = function(){
        var initialisingDatabase = new $.Deferred();
        if (!_initialised) {
            var dbSize = 20 * 1024 * 1024;
            database = openDatabase("Geocaches", "1.0", "Geocaching Store", dbSize);
            _initialised = true;
            initialisingDatabase.resolve();
        }
        else {
            initialisingDatabase.resolve();
        }
        return initialisingDatabase.promise();
    };
    
    var createTable = function(){
        var creatingConstraint= new $.Deferred();
        database.transaction(function(tx){
            tx.executeSql("CREATE TABLE IF NOT EXISTS " +
            "geocache(GUID TEXT, GCCode TEXT PRIMARY KEY, lat REAL, lon REAL, GPXFile TEXT)");
        }, function(tx, err){
            creatingConstraint.fail(err);
        }, function(tx, err){
            creatingConstraint.resolve();
        });
    };
    
    var store = function(geocache){
        var savingGeocache = new $.Deferred();
        database.transaction(function(tx){
            tx.executeSql('REPLACE INTO geocache(GUID, GCCode, lat, lon, GPXFile) VALUES (?,?,?,?,?)', [geocache.GUID, geocache.GCCode, geocache.mainCoordinate.lat, geocache.mainCoordinate.lon, geocache.gpxFile]);
        }, function(err){
            savingGeocache.reject(DATABASE_ERROR, err.message);
        }, function(tx, results){
            savingGeocache.resolve();
        });
        return savingGeocache.promise();
    };
    
    var loadByGCCode = function(gcCode){
        var loadingGeocache = new $.Deferred();
        database.transaction(function(tx){
            tx.executeSql('SELECT GPXFile from geocache where GCCode = ?', [gcCode], function(tx, results){
                if (results.rows.length < 1) {
                    loadingGeocache.reject(GEOCACHE_NOT_FOUND, gcCode + " not found in database");
                }
                else {
                    var gc = new Geocache();
                    gc.init(results.rows.item(0).GPXFile);
                    loadingGeocache.resolve(gc);
                }
            }, function(err){
                loadingGeocache.reject(DATABASE_ERROR, err.message);
            });
        });
        return loadingGeocache.promise();
    };
    
    
	var loadCaches= function(topLeft, bottomRight){
		var loadingGeocache = new $.Deferred();
        database.transaction(function(tx){
            tx.executeSql('SELECT GPXFile from geocache where lon > ? and lon < ? and lat < ? and lat > ?', [topLeft.lon, bottomRight.lon, topLeft.lat, bottomRight.lat], function(tx, results){
                var gcList = [];
				for (var i = 0; i< results.rows.length; i++){
					gcList[i] = new Geocache();
                    gcList[i].init(results.rows.item(i).GPXFile);
                }
				loadingGeocache.resolve(gcList);
            }, function(err){
                loadingGeocache.reject(DATABASE_ERROR, err.message);
            });
        });
        return loadingGeocache.promise();
		
	};
	
    
    var public_interface = {
        init: init,
        store: store,
        loadByGCCode: loadByGCCode,
		loadCaches : loadCaches,
        GEOCACHE_NOT_FOUND: GEOCACHE_NOT_FOUND,
        DATABASE_ERROR: DATABASE_ERROR
    };
    
    Object.defineProperty(public_interface, "initialised", {
        get: function(){
            return _initialised;
        }
    });
    
    Object.defineProperty(public_interface, "database", {
        get: function(){
            return database;
        }
    });
    
    return public_interface;
    
})();
