//Testing JSHints
/*global describe:true, beforeEach:true, afterEach:true, waitsFor:true, expect:true, it:true, runs:true, sinon:true,  */

//Geocaching JSHints
/*global Geocache:true, GeocacheDownloader:true, Coordinate:true, GeocacheDatabase:true, GeocachingDotCom:true, GeocacheController:true, $:true */

'use strict'
describe("Coordinate", function() {
    it("can parse Northen hemispehere coordinates in Degree Decimal Minutes", function() {
        var coordinate = "N 47\u00B0 19.686 E 008\u00B0 34.361";
        var latitude = 47.3281;
        var longitude = 8.5727;
        var coord = new Coordinate();
        coord.from_str(coordinate);
        expect(coord.lat.toFixed(4) === latitude.toFixed(4)).toBeTruthy();
        expect(coord.lon.toFixed(4) === longitude.toFixed(4)).toBeTruthy();
    });

    it("can parse Southern hemispehere coordinates in Degree Decimal Minutes", function() {
        var coordinate = "S 11\u00B0 53.771 W 076\u00B0 39.515";
        var latitude = -11.89618;
        var longitude = -76.65858;
        var coord = new Coordinate();
        coord.from_str(coordinate);
        expect(coord.lat.toFixed(4) === latitude.toFixed(4)).toBeTruthy();
        expect(coord.lon.toFixed(4) === longitude.toFixed(4)).toBeTruthy();
    });

    it("can parse Southern hemispehere coordinates in Degree Decimal ", function() {
        var coordinate = "-11.89618\u00B0 -76.65858\u00B0";
        var latitude = -11.89618;
        var longitude = -76.65858;
        var coord = new Coordinate();
        coord.from_str(coordinate);
        expect(coord.lat.toFixed(4) === latitude.toFixed(4)).toBeTruthy();
        expect(coord.lon.toFixed(4) === longitude.toFixed(4)).toBeTruthy();
    });


    it("can convert to and from DDM array", function() {
        var coordinate = "S 11\u00B0 53.771 W 076\u00B0 39.515";

        var coord1 = new Coordinate();
        coord1.from_str(coordinate);
        var ddm_array = coord1.to_dm_array();

        var coord2 = new Coordinate();
        coord2.from_dm_array(ddm_array[0], ddm_array[1], ddm_array[2], ddm_array[3]);

        expect(coord1.lat.toFixed(4) === coord2.lat.toFixed(4)).toBeTruthy();
        expect(coord1.lon.toFixed(4) === coord2.lon.toFixed(4)).toBeTruthy();
    });

    it("can convert to and from DD array", function() {
        var coordinate = "S 11\u00B0 53.771 W 076\u00B0 39.515";

        var coord1 = new Coordinate();
        coord1.from_str(coordinate);
        var dd_array = coord1.to_d_array();

        var coord2 = new Coordinate();
        coord2.from_d_array(dd_array[0], dd_array[1], dd_array[2], dd_array[3]);

        expect(coord1.lat.toFixed(4) === coord2.lat.toFixed(4)).toBeTruthy();
        expect(coord1.lon.toFixed(4) === coord2.lon.toFixed(4)).toBeTruthy();
    });

    it("can calaculate an inital baring to another point", function() {
        var coordinate = "S 11\u00B0 53.771 W 076\u00B0 39.515";

        var coord1 = new Coordinate();
        coord1.from_str(coordinate);


        var coord2 = new Coordinate();
        coord2.from_d(40.7486, -73.9864);

        var bearing = coord1.bearing_to(coord2);

        expect(bearing.toFixed(4) === 2.5447.toFixed(4)).toBeTruthy();

    });

    it("can transform to another location", function() {
        var coord1 = new Coordinate();
        coord1.from_d(51, -0.59);
        var coord2 = coord1.transform(358.205556, 22250);
        expect(coord2.lat.toFixed(4)).toEqual("51.2000");
        expect(coord2.lon.toFixed(4)).toEqual("-0.6000");
    });

    it("can format the latitude string in Degrees", function() {

        var coord1 = new Coordinate();
        var latitude = -11.89618;
        var longitude = -76.65858;
        coord1.from_d(latitude, longitude);
        var lat_d = coord1.get_lat(coord1.FORMAT_D);

        expect(lat_d).toEqual("S11.89618\u00B0");
    });

    it("can format the latitude string in Degrees Minutes", function() {

        var coord1 = new Coordinate();
        var latitude = -11.89618;
        var longitude = -76.65858;
        coord1.from_d(latitude, longitude);
        var lat_d = coord1.get_lat(coord1.FORMAT_DM);

        expect(lat_d).toEqual("S 11\u00B0 53.771");
    });

    it("can format the longitude string in Degrees", function() {

        var coord1 = new Coordinate();
        var latitude = -11.89618;
        var longitude = -76.65858;
        coord1.from_d(latitude, longitude);
        var lat_d = coord1.get_lon(coord1.FORMAT_D);

        expect(lat_d).toEqual("W076.65858\u00B0");
    });

    it("can format the longitude string in Degrees Minutes", function() {

        var coord1 = new Coordinate();
        var latitude = -11.89618;
        var longitude = -76.65858;
        coord1.from_d(latitude, longitude);
        var lat_d = coord1.get_lon(coord1.FORMAT_DM);

        expect(lat_d).toEqual("W 076\u00B0 39.515");
    });

    it("can format the coordinate string in Degrees Minutes", function() {

        var coord1 = new Coordinate();
        var latitude = -11.89618;
        var longitude = -76.65858;
        coord1.from_d(latitude, longitude);
        var coord_str = coord1.get_latlon(coord1.FORMAT_DM);

        expect(coord_str).toEqual("S 11\u00B0 53.771 W 076\u00B0 39.515");
    });

    it("can serialise and unserialise", function() {
        var coordinate = "S 11\u00B0 53.771 W 076\u00B0 39.515";

        var coord1 = new Coordinate();
        coord1.from_str(coordinate);
        var serialised = coord1.serialize();

        var coord2 = new Coordinate();
        coord2.unserialize(serialised);

        expect(coord1.lat.toFixed(4) === coord2.lat.toFixed(4)).toBeTruthy();
        expect(coord1.lon.toFixed(4) === coord2.lon.toFixed(4)).toBeTruthy();
    });

    it("can calculate the distance to another point", function() {


        var coord1 = new Coordinate
        coord1.from_d(51, -0.59);
        var distance = coord1.distance_to(51.2000, -0.6000);

        expect(distance.toFixed(0)).toEqual('22250');
    });

    it("can find coordinates in a block of text", function() {

        var cache_text = "\nGo to\nCLUE 1\nN 53 32.778 W 1 21.734 and get the number was used. ABC\n\nGo to\nCLUE 2\nS 53 32.819 W 1 21.908 and get the following Data";
        var coords = Coordinate.search_coordinates(cache_text);
        expect(coords.length).toEqual(2);
        var coord1 = coords[0];
        var coord2 = coords[1];
        expect(coord1.lat.numberFormat("00.000")).toEqual("53.546");
        expect(coord1.lon.numberFormat("0.000")).toEqual("-1.362");
        expect(coord2.lat.numberFormat("00.000")).toEqual("-53.547");
        expect(coord2.lon.numberFormat("0.000")).toEqual("-1.365");
        

    });
});