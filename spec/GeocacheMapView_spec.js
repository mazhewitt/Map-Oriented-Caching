//Testing JSHints
/*global sandbox: true, describe:true, beforeEach:true, afterEach:true, waitsFor:true, expect:true, it:true, runs:true, sinon:true,  */

//Geocaching JSHints
/*global Geocache:true, GeocacheDownloader:true, Coordinate:true, GeocacheDatabase:true, GeocachingDotCom:true, GeocacheController:true, $:true */

'use strict';
describe("GeocacheMapView", function() {


    beforeEach(function() {
        sandbox({
            id: 'my-id'
        });
    });

    it("should add a map to the document when initialised", function() {
        expect($('<div id="sandbox"></div>')).toBe('div#sandbox');
    });

});