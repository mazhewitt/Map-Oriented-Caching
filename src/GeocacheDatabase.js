'use strict';

var GeocacheDatabase = (function(){

    var database = null;
    var _initialised = false;
    
    var init = function(){
        return initialiseDatabase().pipe(createTable());
    };
    
    var initialiseDatabase = function(){
        var initialisingDatabase = new $.Deferred();
        if (!_initialised) {
            var dbSize = 20 * 1024 * 1024;
            database = openDatabase("Geocaches", "1.0", "Geocaching Store", dbSize);
            _initialised = true;
            initialisingDatabase.resolve()
        }
        else {
            initialisingDatabase.resolve();
        }
        return initialisingDatabase.promise();
    };
    
    var createTable = function(){
        var creatingTable = new $.Deferred();
        database.transaction(function(tx){
            tx.executeSql("CREATE TABLE IF NOT EXISTS " +
            "geocache(GUID TEXT, GCCode TEXT, lat REAL, lon REAL, GPXFile TEXT)", []);
        }, function(tx, err){
            creatingTable.fail(err);
        }, function(tx, err){
            creatingTable.resolve();
        });
    };
    
    var store = function(geocache){
        var savingGeocache = new $.Deferred();
        database.transaction(function(tx){
            tx.executeSql('INSERT INTO geocache(GUID, GCCode, lat, lon, GPXFile) VALUES (?,?,?,?,?)', [geocache.GUID, geocache.GCCode, geocache.mainCoordinate.lat, geocache.mainCoordinate.lon, geocache.gpxFile]);
        }, function(err){
            savingGeocache.reject(err.message);
        }, function(tx, err){
            savingGeocache.resolve();
        });
        return savingGeocache;
    };
    
    
    var public_interface = {
        init: init,
        store: store
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
