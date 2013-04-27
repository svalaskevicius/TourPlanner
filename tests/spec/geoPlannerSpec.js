describe("GeoPlanner", function() {
  it("should return an array", function() {
    var ret = GeoPlanner.findShortestPath([]);
    expect(ret instanceof Array).toBeTruthy();
  });

});
