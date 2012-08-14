var GeocacheController = (function(){

    var cacheDownloader = GeocachingDotCom.GeocacheDownloader;
    
    var eventServer = new EventEmitter();
    
    var GEOCACHE_DOWNLOADED = "GeocacheController.GEOCACHE_DOWNLOADED";
    var GEOCACHE_DOWNLOAD_FAILED = "GeocacheController.GEOCACHE_DOWNLOAD_FAILED";
    
    
    var loadGeocacheByGCCode = function(gcCode){
        cacheDownloader.downloadCacheXMLByGCCode(gcCode).done(function(gc, message){
            var geocache = new Geocache();
            geocache.init(gc);
            eventServer.emit(GEOCACHE_DOWNLOADED, geocache, message);
        }).fail(function(err){
            eventServer.emit(GEOCACHE_DOWNLOAD_FAILED, err);
        });
    };
    
    var loadCachesByGUID = function(guidList){
    	for (var i = 0; i < guidList.length; i++) {
			cacheDownloader.downloadCacheXMLByGUID(guidList[i]).done(function(gc, message){
				var geocache = new Geocache();
				geocache.init(gc);
				eventServer.emit(GEOCACHE_DOWNLOADED, geocache, message);
			}).fail(function(err){
				eventServer.emit(GEOCACHE_DOWNLOAD_FAILED, err);
			});
		}
    };
    
    var loadGeocachesByCoordinate = function(lat, lon, dist){
        cacheDownloader.downloadListOfCacheGuids(lat, lon, dist).done(loadCachesByGUID).fail(function(err){
            eventServer.emit(GEOCACHE_DOWNLOAD_FAILED, err);
        });
        
    };
    
    
    var public_interface = {
        loadGeocacheByGCCode: loadGeocacheByGCCode,
        loadGeocachesByCoordinate: loadGeocachesByCoordinate,
        GEOCACHE_DOWNLOADED: GEOCACHE_DOWNLOADED,
        GEOCACHE_DOWNLOAD_FAILED: GEOCACHE_DOWNLOAD_FAILED,
        eventServer: eventServer
    
    };
    return public_interface;
    
})();