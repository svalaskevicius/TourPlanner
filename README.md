TourPlanner
===========

Hack project for Y! Hack Europe: London

An app to explore city.
It checks your current location and suggests attractions around.
User then can justify distance and select which attractions are interesting
to her. The app then suggest shortest route, which would let one to visit
all selected attactions in most efficient manner.

Some technical details:
* Twitter bootstrap and google maps javascript api v3 for frontend;
* Javascript integration with yql open data tables (flickr);
* Integration with Google Places API;
* Custom js distance calculation is tested with Jasmine;

Known limitations:
* Doesn't work if location sharing request is refused by user;
* Doesn't actually checks for shortest walking route but rather calculates
  distance mathematically (with straight lines);
* Slider doesn't support sliding on touch screens;
* Needs some styling.
