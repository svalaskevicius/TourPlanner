$(document).ready(function() {

});

function callForLocations() {
    $.ajax({
        dataType: 'json',
        url: 'file:///Users/asarturas/Sites/TourPlanner/fixtures/sample.json',
        data: {},
        success: receivedLocations
    });
}

function receivedLocations(data) {
    if (currentLocationsArray && currentLocationsArray.length) {
        $.each(currentLocationsArray, function (key, val) {
            val.setMap(null);
        });
    }
    currentLocationsArray = Array();
    currentLocationsInfoArray = Array();
    $.each(data.value.items[0].results, function (key, val) {
        var newKey = currentLocationsArray.length;
        var newLocation = new google.maps.Marker({
            position: new google.maps.LatLng(val.geometry.location.lat, val.geometry.location.lng),
            map: map,
            title: val.name
        });
        currentLocationsInfoArray[newKey] = val;
        console.log(newLocation.getTitle());
        currentLocationsArray[newKey] = newLocation;
        google.maps.event.addListener(newLocation, 'click', function() {
            console.log(currentLocationsArray[newKey].getTitle());
            infoWindow.setContent(currentLocationsArray[newKey].getTitle());
            infoWindow.open(map, currentLocationsArray[newKey])
        });
    });
}