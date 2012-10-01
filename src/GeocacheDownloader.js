//Geocaching JSHints
/*global Geocache:true, GeocacheDownloader:true, Coordinate:true, GeocacheDatabase:true, GeocachingDotCom:true, GeocacheController:true, $:true */


"use strict";

var GeocachingDotCom = {};

GeocachingDotCom.GeocacheDownloader = (function() {

    var downloadCacheXMLByGCCode = function(cacheGCCode) {
            return lookupGUIDByGCCode(cacheGCCode).pipe(downloadCacheXMLByGUID);
        };

    var downloadListOfCacheGuids = function(latitude, longitude, dist) {
            var url = "http://www.geocaching.com/seek/nearest.aspx?t=k&origin_lat="+latitude+"&origin_long="+longitude+"&dist="+dist+"&submit3=Search";
            

            var retreivingList = new $.Deferred();

            $.ajax({
                type: "GET",
                url: url,
                data: "",
                dataType: "html"
            }).done(function(data, textStatus, jqXHR) {
                listDownloadSucceeded(data, textStatus, jqXHR, retreivingList);
            }).fail(function(data, textStatus, jqXHR) {
                downloadFailed(data, textStatus, jqXHR, retreivingList);
            });
            return retreivingList.promise();

        };

    var listDownloadSucceeded = function(data, textStatus, jqXHR, retreivingList){
            var listOfGuids = extractGUIDSFromCachePage(data);
            retreivingList.resolve(listOfGuids);
        };

    var extractGUIDSFromCachePage = function(html) {
            var matcher = /guid=[\d\w\-]+\"/g;
            var extract = /guid=([\d\w\-]+)\"/;
            var matches = html.match(matcher);
            var guids = matches.map(function (m){return m.match(extract)[1];});
			var uniq_guids = _.uniq(guids);
            return uniq_guids;
        };

    var lookupGUIDByGCCode = function(GCCode, handle) {
            var lookingUpGuid = new $.Deferred();
            var url = "http://www.geocaching.com/seek/cache_details.aspx?wp=" + GCCode;
            $.ajax({
                type: "GET",
                url: url,
                dataType: "html"
            }).done(function(data, textStatus, jqXHR) {
                extractGUIDFromGCHTML(jqXHR.responseText, lookingUpGuid);
            }).fail(function(data, textStatus, jqXHR) {
                lookingUpGuid.reject("cannot lookup geoCache");
            });
            return lookingUpGuid.promise();
        };



    var extractGUIDFromGCHTML = function(html, deferred) {
            var matcher = /guid=([\d\w\-]+)\"/;
            if (matcher.test(html)) {
                var matches = matcher.exec(html);
                deferred.resolve(matches[1]);
            }
            else {
                deferred.reject("Cannot find Geocache");
            }
        };


    var downloadCacheXMLByGUID = function(gcGUID) {

            var url = "http://www.geocaching.com/seek/cache_details.aspx?guid=" + gcGUID;
            var data = {
                __EVENTTARGET: "",
                __EVENTARGUMENT: "",
                __VIEWSTATE: "",
                __VIEWSTATE1: "",
                __VIEWSTATEFIELDCOUNT: "2",
                ctl00$ContentBody$btnGPXDL: "GPX file"
            };

            var extractingGC = new $.Deferred();

            $.ajax({
                type: "POST",
                url: url,
                data: data,
                dataType: "xml"
            }).done(function(data, textStatus, jqXHR) {
                cacheDownloadSucceeded(data, textStatus, jqXHR, extractingGC);
            }).fail(function(data, textStatus, jqXHR) {
                downloadFailed(data, textStatus, jqXHR, extractingGC);
            });
            return extractingGC.promise();
        };

    var cacheDownloadSucceeded = function(data, textStatus, jqXHR, extractingGC) {
            if (jqXHR.status === 200) {
                extractingGC.resolve(jqXHR.responseText, "Geocache XML Downloaded");
            }
            else {
                extractingGC.reject("geocache download failed : " + textStatus);
            }
        };

    var downloadFailed = function(data, textStatus, jqXHR, extractingGC) {
            if (data.responseText.match(/Sign In/i)) {
                extractingGC.reject("Login to Geocaching.com required");
            }
            else {
                extractingGC.reject("geocaching.com download failed : " + textStatus);
            }
        };


    var public_interface = {
        downloadCacheXMLByGUID: downloadCacheXMLByGUID,
        downloadCacheXMLByGCCode: downloadCacheXMLByGCCode,
        downloadListOfCacheGuids: downloadListOfCacheGuids 
    };


    return public_interface;


})();