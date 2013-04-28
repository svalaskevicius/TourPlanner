
var GeoPlanner = (function(self) {

  self.findShortestPath = function(listOfPoints, startingPoint, itemAdapter) {
    if (!itemAdapter) {
      itemAdapter = function(el) {return el;}
    }
    var pointDistance = function(p1, p2) {
      var _p1 = itemAdapter(p1);
      var _p2 = itemAdapter(p2);
      return distance(_p1.lat, _p1.long, _p2.lat, _p2.long);
    };

    var findClosestPoint = function(listOfPoints, target) {
      var startIdx = -1;
      var minDist = 1e10;
      for (var i in listOfPoints) {
        var dist = pointDistance(target, listOfPoints[i]);
        if (dist < minDist) {
          minDist = dist;
          startIdx = i;
        }
      }
      return startIdx;
    };

    var swapToTheStart = function(list, idx) {
      var temp = list[0];
      list[0] = list[idx];
      list[idx] = temp;
      return list;
    };

    var moveFirstToStart = function(listOfPoints, startingPoint) {
      var startIdx = findClosestPoint(listOfPoints, startingPoint);
      if (startIdx >= 0) {
        return swapToTheStart(listOfPoints, startIdx);
      }
      return listOfPoints;
    };

    /**
     * leaves the first item as the starting point,
     * and only sorts the rest of the list
     */
    var travelingSalesman = function(listOfPoints) {
      if (1 >= listOfPoints.length) {
        return listOfPoints;
      }
      var theRest = listOfPoints;
      var first = theRest.splice(0, 1)[0];
      var closestIdx = findClosestPoint(theRest, first);
      if (closestIdx >= 0) {
        var nextNode = listOfPoints[closestIdx];
        return [first].concat(
          travelingSalesman(
            swapToTheStart(
              listOfPoints, closestIdx
        )
        )
        );
      } else {
        return listOfPoints;
      }
    };

    return travelingSalesman(
      moveFirstToStart(listOfPoints, startingPoint)
    );
  };

  return self;
}(GeoPlanner || {}));

