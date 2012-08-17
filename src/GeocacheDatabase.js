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
        var storingGeocache = new $.Deferred();
        
        var loadPromise = loadByGCCode(geocache.GCCode).done(function(gc){
            saveToDatabase(geocache, true).done(function(){
                storingGeocache.resolve();
            });
        }).fail(function(code, err){
            if (code === GEOCACHE_NOT_FOUND) {
                saveToDatabase(geocache, false).done(function(){
                    storingGeocache.resolve();
                });
            }
            else {
                storingGeocache.reject(code, err);
            }
        });
        
        return storingGeocache.promise();
    };
    
    var saveToDatabase = function(geocache, shouldUpdate){
        var savingGeocache = new $.Deferred();
        database.transaction(function(tx){
            if (shouldUpdate) {
                tx.executeSql('UPDATE geocache set GUID=?, lat=?, lon=?, GPXFile=? where GCCode = ?', [geocache.GUID, geocache.mainCoordinate.lat, geocache.mainCoordinate.lon, geocache.gpxFile, geocache.GCCode]);
            }
            else {
                tx.executeSql('INSERT INTO geocache(GUID, GCCode, lat, lon, GPXFile) VALUES (?,?,?,?,?)', [geocache.GUID, geocache.GCCode, geocache.mainCoordinate.lat, geocache.mainCoordinate.lon, geocache.gpxFile]);
            }
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
            }), function(err){
                loadingGeocache.reject(DATABASE_ERROR, err.message);
            }
        });
        return loadingGeocache.promise();
    };
    
    
    var public_interface = {
        init: init,
        store: store,
        loadByGCCode: loadByGCCode,
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
