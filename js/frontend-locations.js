var currentLocationsArray;
var currentLocationsInfoArray;
var currentSelectedLocationsArray = [];
var currentSelectedLocationsInfoArray = [];
var currentSelectedItem;
var currentSelectedItemInfo;
var currentLine;

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
            icon: new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|009900")
        });
        var newLocationInfo = val;
        currentLocationsInfoArray[newKey] = newLocationInfo;
        currentLocationsArray[newKey] = newLocation;
        google.maps.event.addListener(newLocation, 'click', function() {
            currentSelectedItem = newLocation;
            currentSelectedItemInfo = newLocationInfo;
            infoWindow.setContent(buildContent(newLocation, newLocationInfo));
            infoWindow.open(map, currentLocationsArray[newKey]);
            addMoreInfo(newLocation, newLocationInfo);
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
                infoWindow.open(map, newLocation);
                addMoreInfo(newLocation, newLocationInfo);
            });
        }
    });
}

function buildContent(item, itemInfo)
{
    res = '<div><strong>' + itemInfo.name + '</strong>&nbsp;&nbsp;';
    if (isInSelected(item.getTitle())) {
        res += '<a href="javascript:unselectCurrent()" id="button42" class="btn btn-danger btn-small">Remove</a></div>';
    } else {
        res += '<a href="javascript:selectCurrent()" id="button42" class="btn btn-success btn-small">Add</a></div>';
    }
    res += '<div style="height: 200px" id="infoWindowDetails' + itemInfo.reference + '"><div class="flickrimages"></div></div>';
    return res;
}

function addMoreInfo(item, itemInfo)
{
    $.ajax({
        dataType: 'json',
//        url: 'file:///Users/asarturas/Sites/TourPlanner/fixtures/sample.json',
        url: 'http://query.yahooapis.com/v1/public/yql',
        data: {
            q: 'select * from flickr.photos.search where api_key="5ce0a696481d9149ea9269ea3ba00d98" and has_geo="true" and lat=' + item.getPosition().lat() + ' and lon=' + item.getPosition().lng() + ' and accuracy=11 and radius=0.1 and min_upload_date="2005-01-01"',
            format: 'json',
            diagnostics: 'true',
            env: 'store://datatables.org/alltableswithkeys'
        },
        success: function(data) {
            var div = $('#infoWindowDetails' + itemInfo.reference);
            div.find('.flickrimages').html(
                data.query.results.photo.map(
                    function(elem) {
                        return '<img src="http://farm' + elem.farm + '.staticflickr.com/' + elem.server + '/' + elem.id + '_' + elem.secret + '_t.jpg">';
                    }
                ).join('')
            );
            console.log(data.query.results.photo.map(
                function(elem) {
                    return '<img src="http://farm' + elem.farm + '.staticflickr.com/' + elem.server + '/' + elem.id + '_' + elem.secret + '_t.jpg"';
                }
            ).join());
        }
    });

    console.log($('#infoWindowDetails' + itemInfo.reference));

//    $('#infoWindowDetails' + itemInfo.reference).html(
//        '<img src="https://maps.googleapis.com/maps/api/place/photo?key=8186a63d136a6ce1302a2d5297980ffd&photoreference=' + itemInfo.photos.photo_reference + '&sensor=true&maxwidth=256"/>'
//    );
}

function selectCurrent()
{
    currentSelectedItem.setIcon(new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|009900"));
    currentSelectedLocationsArray[currentSelectedLocationsArray.length] = currentSelectedItem;
    currentSelectedLocationsInfoArray[currentSelectedLocationsInfoArray.length] = currentSelectedItemInfo;
    $('#button42').attr('href', 'javascript:unselectCurrent()').toggleClass('btn-success').toggleClass('btn-danger').html('Remove');
    drawPolylineThroughItems(currentSelectedLocationsArray);
}

function unselectCurrent()
{
    currentSelectedItem.setIcon(null);
    for (var i in currentSelectedLocationsArray) {
        if (currentSelectedLocationsArray[i] === currentSelectedItem) {
            currentSelectedLocationsArray.splice(i, 1);
        }
    }
    $('#button42').attr('href', 'javascript:selectCurrent()').toggleClass('btn-danger').toggleClass('btn-success').html('Add');
    drawPolylineThroughItems(currentSelectedLocationsArray);
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

function drawPolylineThroughItems(items)
{
    var lineCoordinates = [];
    lineCoordinates = GeoPlanner.findShortestPath(
        items.map(function(item) {
            return item.getPosition();
        }),
        currentPosition.getPosition(),
        function(pos) {
            return {lat: pos.lat(), long: pos.lng()};
        }
    );
    if (currentLine) {
        currentLine.setPath(lineCoordinates);
    } else {
        currentLine = new google.maps.Polyline({
            path: lineCoordinates,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2,
            map: map
        });
    }
}