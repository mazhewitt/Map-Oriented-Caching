describe("Waypoint", function(){
	
	it("has a name", function() {
		var w = new Waypoint();
		w.name = "myName";
		expect (w.name).toEqual("myName");
	});
	
	it("has a description", function() {
		var w = new Waypoint();
		w.description = "myDescription";
		expect (w.description).toEqual("myDescription");
	});
	
	it("has a coordinate", function() {
		var w = new Waypoint();
		w.setCoordinate(50, 40);
		expect (w.coordinate.lat).toEqual(50);
		expect (w.coordinate.lon).toEqual(40);
	});
	

});

