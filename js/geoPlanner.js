
var GeoPlanner = (function(self) {

  var pointDistance = function(p1, p2) {
    return distance(p1.lat, p1.long, p2.lat, p2.long);
  };

  var moveFirstToStart = function(listOfPoints, startingPoint) {
    var startIdx = -1;
    var minDist = 1e10;
    for (var i in listOfPoints) {
      var dist = pointDistance(startingPoint, listOfPoints[i]);
      if (dist < minDist) {
        minDist = dist;
        startIdx = i;
      }
    }
    if (startIdx >= 0) {
      return [listOfPoints[startIdx]].concat(listOfPoints.splice(startIdx, 1));
    }
    return listOfPoints;
  };

  self.findShortestPath = function(listOfPoints, startingPoint) {
    return moveFirstToStart(listOfPoints, startingPoint);
  };

  return self;
}(GeoPlanner || {}));

