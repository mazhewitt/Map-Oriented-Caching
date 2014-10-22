//Testing JSHints
/*global sandbox: true, describe:true, beforeEach:true, afterEach:true, waitsFor:true, expect:true, it:true, runs:true, sinon:true,  setFixtures:true*/

//Geocaching JSHints
/*global Geocache:true, GeocacheDownloader:true, Coordinate:true, GeocacheDatabase:true, GeocachingDotCom:true, GeocacheController:true, $:true GeocacheMapView:true */
 
'use strict';
describe("GeocacheMapView", function() {

    var sinonSandbox = sinon.sandbox.create();

    beforeEach(function() {
        var sb = sandbox({
            id: 'map'
        });
        setFixtures(sb);
        sinonSandbox.stub(navigator.geolocation, "getCurrentPosition", stubGetCurrentPosition);
        sinonSandbox.stub(navigator.geolocation, "watchPosition", stubGetCurrentPosition );
        GeocacheMapView.init('map');
    });
    
    afterEach(function(){
        sinonSandbox.restore();
    });
    

    it ("The sandbox should be added to the dom", function(){
        expect($('div#map')).toHaveId('map');
    });
    
    
    it("should add a leaflet map to the div when intialised", function() {
        expect($('div#map')).toContain('div.leaflet-layer');
    });
    
    it("should display where the user is on the map", function(){

        var located= false;
        var location;
        GeocacheMapView.map.on('locationfound', function(evt){
            located=true;
            location = evt.latlng;
        }, "location not found");
        
        
        waitsFor(function(){
            return located;
        });
        
        runs(function(){
           expect (location).toBeDefined(); 
           expect (location.lat.toFixed(4)).toEqual((52.5150).toFixed(4));
           expect (location.lng.toFixed(4)).toEqual((13.3890).toFixed(4));
        });
        
    });

    var stubGetCurrentPosition = function(success, error){
        setTimeout(function (){
            success(mockPosition);
        }, 10);
    };

    var mockPosition = {
        timestamp: (new Date()).getTime(),
        coords:{
            latitude: 52.5150,
            longitude: 13.3890,
            accuracy: 361,
            altitude: 450,
            altitudeAccuracy:10,
            heading: 25,
            speed: 0
          }
    };

   



});