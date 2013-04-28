$(document).ready(function() {

});

function callForLocations() {
    $.ajax({
        dataType: 'json',
        url: 'http://pipes.yahoo.com/pipes/pipe.run',
        data: {
            _id: '8186a63d136a6ce1302a2d5297980ffd',
            _render: 'json',
            radius: $('#radiusvalue').html(),
            location: currentPosition.getPosition().lat() + ',' + currentPosition.getPosition().lng(),
            googleApiKey: 'AIzaSyC2L22kbDS3QqQlFb5r0Yc5TgnnhratbCA'
        },
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
    $.each(data.value.items, function (key, val) {
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