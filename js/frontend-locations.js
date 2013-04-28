var currentLocationsArray;
var currentLocationsInfoArray;
var currentSelectedLocationsArray = Array();
var currentSelectedLocationsInfoArray = Array();
var currentSelectedItem;
var currentSelectedItemInfo;

function callForLocations() {
    $.ajax({
        dataType: 'json',
//        url: 'file:///Users/asarturas/Sites/TourPlanner/fixtures/sample.json',
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
    $.each(currentSelectedLocationsInfoArray, function(key, val) {
        var newKey = currentLocationsArray.length;
        var newLocation = new google.maps.Marker({
            position: new google.maps.LatLng(val.geometry.location.lat, val.geometry.location.lng),
            map: map,
            title: val.name,
            icon: new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|009900"),
        });
        var newLocationInfo = val;
        currentLocationsInfoArray[newKey] = newLocationInfo;
        console.log(newLocation.getTitle());
        currentLocationsArray[newKey] = newLocation;
        google.maps.event.addListener(newLocation, 'click', function() {
            currentSelectedItem = newLocation;
            currentSelectedItemInfo = newLocationInfo;
            infoWindow.setContent(buildContent(newLocation, newLocationInfo));
            infoWindow.open(map, currentLocationsArray[newKey])
        });
    });
    $.each(data.value.items, function (key, val) {
        if (!isInSelected(val.name)) {
            var newKey = currentLocationsArray.length;
            var newLocation = new google.maps.Marker({
                position: new google.maps.LatLng(val.geometry.location.lat, val.geometry.location.lng),
                map: map,
                title: val.name
            });
            var newLocationInfo = val;
            currentLocationsInfoArray[newKey] = newLocationInfo;
            currentLocationsArray[newKey] = newLocation;
            google.maps.event.addListener(newLocation, 'click', function() {
                currentSelectedItem = newLocation;
                currentSelectedItemInfo = newLocationInfo;
                infoWindow.setContent(buildContent(newLocation, newLocationInfo));
                infoWindow.open(map, newLocation)
            });
        }
    });
}

function buildContent(item, itemInfo)
{
    res = '<strong>' + itemInfo.name + '</strong>';
    if (isInSelected(item.getTitle())) {
        res += '<div align="right"><a href="javascript:removeCurrent()" class="btn btn-danger btn-small">Remove</a></div>';
    } else {
        res += '<div align="right"><a href="javascript:addCurrent()" class="btn btn-success btn-small">Add</a></div>';
    }
    return res;
}

function addCurrent()
{
    currentSelectedItem.setIcon(new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|009900"));
    currentSelectedLocationsArray[currentSelectedLocationsArray.length] = currentSelectedItem;
    currentSelectedLocationsInfoArray[currentSelectedLocationsInfoArray.length] = currentSelectedItemInfo;
    infoWindow.setContent(buildContent(currentSelectedItem, currentSelectedItemInfo));
}

function isInSelected(title)
{
    var result = false;
    $.each(currentSelectedLocationsArray, function(key, val) {
        if (val.getTitle() == title) {
            result = true;
        }
    });
    return result;
}