//Geocaching JSHints
/*global Geocache:true, GeocacheDownloader:true, Coordinate:true, GeocacheDatabase:true, GeocachingDotCom:true, GeocacheController:true, $:true */

"use strict";

var Coordinate;


(function() {
 	// private variables
	var dd_reg = /^([NS\+\-]?)\s?(\d{1,2})[., ](\d+)[ °',]{0,2}([EOW\+\-]?)\s?(\d{1,3})[., ](\d+)[ °',]{0,2}$/i;
    var dm_reg = /^([NS\+\-]?)\s?(\d{1,2})[ °]{0,2}(\d\d?\d?)[.,](\d+)['\s,]+([EOW\+\-]?)\s?(\d{1,3})[ °']{0,2}(\d{1,3})[.,](\d+)?[\s']*$/i;
    var dm_match = /[NS\+\-]?\s?\d{1,2}[ °]{0,2}\d{1,3}[., ]\d+['\s,]+[EOW\+\-]?\s?\d{1,3}[ °]{0,2}\d{1,3}[.,]\d+?[\s']*/g;

	

 	// contructor
    Coordinate = function() {};
    // properties
    Coordinate.prototype = {
		get lat(){
            return this._lat;
        },
        set lat(val){
            this._lat = val;
        },
		get lon(){
            return this._lon;
        },
        set lon(val){
            this._lon = val;
        }
    };
	

    Coordinate.prototype.SQLROW = {
        lat: 'REAL',
        lon: 'REAL',
        name: 'TEXT'
    };

    Coordinate.prototype.RADIUS_EARTH = 6371000.0;
    Coordinate.prototype.FORMAT_D = 0;
    Coordinate.prototype.FORMAT_DM = 1;
    Coordinate.prototype.DEGREES = "\u00B0";


    Coordinate.prototype.from_d = function(lat_v, lon_v) {
        this.lat = lat_v;
        this.lon = lon_v;
    };

    Coordinate.prototype.from_dm = function(lat_degrees, lat_minutes, lon_degrees, lon_minutes) {
        this.from_d(lat_degrees + (lat_minutes / 60), lon_degrees + (lon_minutes / 60));
    };

    Coordinate.prototype.to_dm = function() {
        var deg_lat = this.lat - (this.lat % 1);
        var deg_lon = this.lon - (this.lon % 1);
        var min_lat = (this.lat % 1) * 60;
        var min_lon = (this.lon % 1) * 60;

        return [deg_lat, min_lat, deg_lon, min_lon];
    };

    Coordinate.prototype.to_dm_array = function() {
        var dma = this.to_dm()
        var lat_d = dma[0];
        var lat_m = dma[1];
        var lon_d = dma[2];
        var lon_m = dma[3];

        var sign_lat = lat_d > 0 ? 1 : -1;
        lat_d = Math.abs(lat_d);
        lat_m = Math.abs(lat_m);

        var lat_array = [];

        var lat_string = lat_d.numberFormat("00") + " " + lat_m.toFixed(5);
        var lat_to_dm_array = /^(\d)(\d) (\d?)(\d)\.(\d)(\d)(\d)(\d)(\d)$/
        var lat_match = lat_to_dm_array.exec(lat_string);
        for (var i = 0; i < 8; i++) {
            lat_array[i] = Number(lat_match[i + 1] === "" ? 0 : lat_match[i + 1]);
        }

        var sign_lon = lon_d > 0 ? 1 : -1;
        lon_d = Math.abs(lon_d);
        lon_m = Math.abs(lon_m);
        var lon_string = lon_d.numberFormat("000") + " " + lon_m.toFixed(5);
        var lon_array = [];
        var lon_to_dm_array = /^(\d)(\d)(\d) (\d?)(\d)\.(\d)(\d)(\d)(\d)(\d)$/
        var lon_match = lon_to_dm_array.exec(lon_string);
        for (var i = 0; i < 9; i++) {
            lon_array[i] = Number(lon_match[i + 1] === "" ? 0 : lon_match[i + 1]);
        }
        return [sign_lat, lat_array, sign_lon, lon_array];
    };

    Coordinate.prototype.from_dm_array = function(sign_lat, lat_v, sign_lon, lon_v) {
        lat_v = blank_array(lat_v, 6);
        lon_v = blank_array(lon_v, 7);
        var lat_degrees = sign_lat * (lat_v[0] * 10 + lat_v[1]);
        var lat_minutes = sign_lat * (String(lat_v[2]) + String(lat_v[3]) + "." + String(lat_v[4]) + String(lat_v[5]) + String(lat_v[6]));
        var lon_degrees = sign_lon * (lon_v[0] * 100 + lon_v[1] * 10 + lon_v[2]);
        var lon_minutes = sign_lon * (String(lon_v[3]) + String(lon_v[4]) + "." + String(lon_v[5]) + String(lon_v[6]) + String(lon_v[7]));

        this.from_dm(lat_degrees, lat_minutes, lon_degrees, lon_minutes);
    };

    Coordinate.prototype.to_d_array = function() {
        var sign_lat = this.lat > 0 ? 1 : -1;
        var sign_lon = this.lon > 0 ? 1 : -1;
        var lon_str = Math.abs(this.lon).numberFormat("000.00000");
        var lat_str = Math.abs(this.lat).numberFormat("00.00000");

        var lat_parser = /^(\d)(\d)\.(\d)(\d)(\d)(\d)(\d)$/
        var lon_parser = /^(\d)(\d)(\d)\.(\d)(\d)(\d)(\d)(\d)$/
        var lat_match = lat_parser.exec(lat_str);
        var lon_match = lon_parser.exec(lon_str);

        var lat_array = [];
        var lon_array = [];

        for (var i = 0; i < 7; i++) {
            lat_array[i] = Number(lat_match[i + 1]);
        }

        for (var i = 0; i < 8; i++) {
            lon_array[i] = Number(lon_match[i + 1]);
        }

        return [sign_lat, lat_array, sign_lon, lon_array];


    };

    Coordinate.prototype.from_d_array = function(sign_lat, lat, sign_lon, lon) {
        lat = blank_array(lat, 6);
        lon = blank_array(lon, 7);
        var latitude = sign_lat * (lat.slice(0, 2).join('') + '.' + lat.slice(2, 7).join(''));
        var longitude = sign_lon * (lon.slice(0, 3).join('') + '.' + lon.slice(3, 8).join(''));
        this.from_d(latitude, longitude);
    };


    Coordinate.prototype.from_str = function(text) {
        text = text.replace(/^\s+||\s+$/g, '');
        var sign_lat, sign_lon;
        var match = text.match(dd_reg);
        if (match !== null) {

            if (/[sS\-]/.test(match[1])) sign_lat = -1;
            else sign_lat = 1;

            if (/[wW\-]/.test(match[4])) sign_lon = -1;
            else sign_lon = 1;

            // not using math magic here: this is more error-free :-)
            var latitude = sign_lat * (match[2] + '.' + match[3]);
            var longitude = sign_lon * (match[5] + '.' + match[6]);
            this.from_d(latitude, longitude);
        }
        else {
            match = text.match(dm_reg);

            if (match !== null) {

                if (/[sS\-]/.test(match[1])) sign_lat = -1;
                else sign_lat = 1;

                if (/[wW\-]/.test(match[5])) sign_lon = -1;
                else sign_lon = 1;

                var lat_degrees = sign_lat * match[2];
                var lat_minutes = sign_lat * (match[3] + '.' + match[4]);
                var lon_degrees = sign_lon * match[6];
                var lon_minutes = sign_lon * (match[7] + '.' + match[8]);

                this.from_dm(lat_degrees, lat_minutes, lon_degrees, lon_minutes);
            }
            else {
                throw "Could not parse this input as a coordinate: " + text + "\nExample Input: N49 44.111 E6 12.123";
            }
        }
    };


    Coordinate.search_coordinates = function(text){
        var found_coordinates = [];
        var dm_list = text.match(dm_match);
        for (var c in dm_list){
          var coord = new Coordinate();
          coord.from_str(dm_list[c])
          found_coordinates.push(coord);   
        }
        return found_coordinates;
    };


    Coordinate.prototype.bearing_to = function(target) {
        var lat1 = radians(this.lat);
        var lat2 = radians(target.lat);

        var dlon = radians(target.lon - this.lon);

        var y = Math.sin(dlon) * Math.cos(lat2);
        var x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dlon);
        var bearing = degrees(Math.atan2(y, x));
        return Number((360 + bearing) % 360);

    };

    Coordinate.prototype.transform = function(bearing, distance) {
        // expect distance in meters and bearing in degrees
        var lat1 = radians(this.lat);
        var lon1 = radians(this.lon);
        var brng = radians(bearing);
        var d_R = distance / this.RADIUS_EARTH;

        var lat2 = Math.asin(Math.sin(lat1) * Math.cos(d_R) + Math.cos(lat1) * Math.sin(d_R) * Math.cos(brng));
        var lon2 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(d_R) * Math.cos(lat1), Math.cos(d_R) - Math.sin(lat1) * Math.sin(lat2));

        var retcon = new Coordinate();
        retcon.name = this.name;
        retcon.from_d(degrees(lat2), degrees(lon2));
        return retcon;
    };


    Coordinate.prototype.get_lat = function(format) {
        var l = Math.abs(this.lat);
        var c;
        if (this.lat > 0) c = 'N';
        else c = 'S';
        if (format === this.FORMAT_D) return c + l.numberFormat("00.00000") + this.DEGREES;
        else if (format === this.FORMAT_DM) {
            //[deg_lat, min_lat, deg_lon, min_lon]
            var dm = this.to_dm();
            return c + " " + Math.abs(dm[0]).numberFormat("00") + this.DEGREES + " " + Math.abs(dm[1]).numberFormat("00.000");
        }
    }

    Coordinate.prototype.get_lon = function(format) {
        var l = Math.abs(this.lon);
        var c;
        if (this.lon > 0) c = 'E';
        else c = 'W';
        if (format === this.FORMAT_D) return c + l.numberFormat("000.00000") + this.DEGREES;
        else if (format === this.FORMAT_DM) {
            //[deg_lat, min_lat, deg_lon, min_lon]
            var dm = this.to_dm();
            return c + " " + Math.abs(dm[2]).numberFormat("000") + this.DEGREES + " " + Math.abs(dm[3]).numberFormat("00.000");
        }
    }

    Coordinate.prototype.get_latlon = function(format) {
        return this.get_lat(format) + " " + this.get_lon(format);
    }

    Coordinate.prototype.serialize = function(self) {
        return {
            'lat': this.lat,
            'lon': this.lon,
            'name': this.name
        };
    }

    Coordinate.prototype.unserialize = function(data) {
        this.lat = data.lat;
        this.lon = data.lon;
        this.name = data.name;
    }

    Coordinate.prototype.distance_to = function(tlat, tlon) {
        var lat = this.lat;
        var lon = this.lon;
        var dlat = Math.pow(Math.sin((tlat - lat) * (Math.PI / 180.0) / 2), 2)
        var dlon = Math.pow(Math.sin((tlon - lon) * (Math.PI / 180.0) / 2), 2)
        var a = dlat + Math.cos(lat * (Math.PI / 180.0)) * Math.cos(tlat * (Math.PI / 180.0)) * dlon;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return 6371000.0 * c;
    }



    // this private function puts 0 in each undefined spot in an array up to the indicated number

    function blank_array(array, num_to_blank) {
        for (var x = 0; x <= num_to_blank; x++) {
            array[x] === undefined ? 0 : array[x];
        }
        return array;
    }

    var pi_180 = Math.PI / 180;

    function radians(num) {
        return num * pi_180;
    }

    function degrees(num) {
        return num / pi_180;
    }


}());