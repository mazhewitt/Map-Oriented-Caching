//Testing JSHints
/*global sandbox: true, describe:true, beforeEach:true, afterEach:true, waitsFor:true, expect:true, it:true, runs:true, sinon:true,  */

//Geocaching JSHints
/*global Geocache:true, GeocacheDownloader:true, Coordinate:true, GeocacheDatabase:true, GeocachingDotCom:true, GeocacheController:true, $:true GeocacheMapView:true */

'use strict';
describe("GeocacheMapView", function() {

    beforeEach(function() {
        sandbox({
            id: 'test-map'
        });
    });

    it("a sandbox should be added to the test", function() {
        expect($('<div id="sandbox"></div>')).toBe('div#sandbox');
    });
    
    it("should add a leaflet map to the div when intialised", function() {
        GeocacheMapView.init('test-map');
        expect($('div#test-map')).toContain('div.leaflet-layer');
    });

});