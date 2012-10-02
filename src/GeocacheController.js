//Geocaching JSHints
/*global Geocache:true, GeocacheDownloader:true, Coordinate:true, GeocacheDatabase:true, GeocachingDotCom:true, GeocacheController:true, $:true, EventEmitter:true*/


var GeocacheController = (function() {

    var cacheDownloader = GeocachingDotCom.GeocacheDownloader;

    var eventServer = new EventEmitter();

    var GEOCACHE_DOWNLOADED = "GeocacheController.GEOCACHE_DOWNLOADED";
    var GEOCACHE_DOWNLOAD_FAILED = "GeocacheController.GEOCACHE_DOWNLOAD_FAILED";


    var loadGeocacheByGCCodeFromGeocachingDotCom = function(gcCode) {
        cacheDownloader.downloadCacheXMLByGCCode(gcCode).done(function(gc, message) {
            var geocache = new Geocache();
            geocache.init(gc);
            GeocacheDatabase.store(gc);
            eventServer.emit(GEOCACHE_DOWNLOADED, geocache, message);
        }).fail(function(err) {
            eventServer.emit(GEOCACHE_DOWNLOAD_FAILED, err);
        });
    };

    var loadCachesByGUIDFromGeocachingDotCom = function(guidList) {
        var failCallback = function(err) {
                eventServer.emit(GEOCACHE_DOWNLOAD_FAILED, err);
            };
        var successCallback = function(gc, message) {
                var geocache = new Geocache();
                geocache.init(gc);
                GeocacheDatabase.store(gc);
                eventServer.emit(GEOCACHE_DOWNLOADED, geocache, message);
            };
        for (var i = 0; i < guidList.length; i++) {
            cacheDownloader.downloadCacheXMLByGUID(guidList[i]).done(successCallback).fail(failCallback);
        }
    };

    var loadGeocachesByCoordinateFromGeoCachingDotCom = function(lat, lon, dist) {
        cacheDownloader.downloadListOfCacheGuids(lat, lon, dist).done(loadCachesByGUIDFromGeocachingDotCom).fail(function(err) {
            eventServer.emit(GEOCACHE_DOWNLOAD_FAILED, err);
        });
    };


    var public_interface = {
        loadGeocacheByGCCodeFromGeocachingDotCom: loadGeocacheByGCCodeFromGeocachingDotCom,
        loadGeocachesByCoordinateFromGeoCachingDotCom: loadGeocachesByCoordinateFromGeoCachingDotCom,
        GEOCACHE_DOWNLOADED: GEOCACHE_DOWNLOADED,
        GEOCACHE_DOWNLOAD_FAILED: GEOCACHE_DOWNLOAD_FAILED,
        eventServer: eventServer

    };
    return public_interface;

})();
