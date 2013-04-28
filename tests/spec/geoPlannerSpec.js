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
    var ret = GeoPlanner.findShortestPath(
      [
          {lat:51.506926 , long: -0.142608}, // green park
          {lat:51.516354 , long: -0.130548}, // TCR
          {lat:51.517556 , long: -0.120463}, // holborn
          {lat:51.514939 , long: -0.142136}, // oxford circus
          {lat:51.524712 , long: -0.138316}, // warren street
          {lat:51.520493 , long: -0.13393},  // goodge street
          {lat:51.501263 , long: -0.125012}, // westminster
          {lat:51.522870 , long: -0.124197}, // russel sq
      ],
      {lat:51.511214, long:-0.119824} // strand / waterloo bridge
    );
    expect(ret).toEqual(
      [
          {lat:51.517556 , long: -0.120463}, // holborn
          {lat:51.522870 , long: -0.124197}, // russel sq
          {lat:51.520493 , long: -0.13393},  // goodge street
          {lat:51.516354 , long: -0.130548}, // TCR
          {lat:51.514939 , long: -0.142136}, // oxford circus
          {lat:51.506926 , long: -0.142608}, // green park
          {lat:51.501263 , long: -0.125012}, // westminster
          {lat:51.524712 , long: -0.138316}, // warren street
      ]
    );
  });

  it("should accepts item position adapter", function() {
    var ret = GeoPlanner.findShortestPath(
      [
          {l:51.513149 , lg: -0.12454},  // covent garden
          {l:51.516354 , lg: -0.130548}, // TCR
      ],
      {l:51.511214, lg:-0.119824}, // strand / waterloo bridge
      function (item) {return {lat:item.l, long:item.lg};}
    );
    expect(ret[0]).toEqual({l:51.513149 , lg: -0.12454});
  });
});

