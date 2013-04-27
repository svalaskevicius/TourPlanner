describe("GeoPlanner", function() {

  it("should return an array", function() {
    var ret = GeoPlanner.findShortestPath([]);
    expect(ret instanceof Array).toBeTruthy();
  });


  it("should start closest to the starting point", function() {
    var ret = GeoPlanner.findShortestPath(
      [
          {lat:51.516354 , long: -0.130548}, // TCR
          {lat:51.513149 , long: -0.12454},  // covent garden
      ],
      {lat:51.511214, long:-0.119824} // strand / waterloo bridge
    );
    expect(ret[0]).toEqual({lat:51.513149 , long: -0.12454});
  });


  it("should return the same amount of points", function() {
    var ret = GeoPlanner.findShortestPath(
      [
          {lat:51.516354 , long: -0.130548}, // TCR
          {lat:51.513149 , long: -0.12454},  // covent garden
      ],
      {lat:51.511214, long:-0.119824} // strand / waterloo bridge
    );
    expect(ret.length).toEqual(2);
  });


  it("should calculate the shortest path given a straight line", function() {
    var ret = GeoPlanner.findShortestPath(
      [
          {lat:51.516354 , long: -0.130548}, // TCR
          {lat:51.513149 , long: -0.12454},  // covent garden
          {lat:51.524712 , long: -0.138316}, // warren street
          {lat:51.520493 , long: -0.13393},  // goodge street
      ],
      {lat:51.511214, long:-0.119824} // strand / waterloo bridge
    );
    expect(ret).toEqual(
      [
          {lat:51.513149 , long: -0.12454},  // covent garden
          {lat:51.516354 , long: -0.130548}, // TCR
          {lat:51.520493 , long: -0.13393},  // goodge street
          {lat:51.524712 , long: -0.138316}, // warren street
      ]
    );
  });

  it("should calculate the shortest path given a circle", function(){
    expect("pending").toEqual("");
  });
});

