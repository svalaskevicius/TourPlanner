function changeCurrentRadius(radius) {
    if (currentRadiusView) {
        currentRadiusView.setRadius(radius);
    }
}
var mapCenter;
var currentPosition;
var currentRadiusView;
var infoWindow;
var map;
$(document).ready(function () {
    var mapOptions = {
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    if (navigator.geolocation) {
        var initloc = function(center) {
            var coords = new google.maps.LatLng(
                center.coords.latitude,
                center.coords.longitude
            );
            mapCenter = coords;
            map.panTo(coords);
            currentPosition = new google.maps.Marker({
                position: coords,
                map: map,
                title: 'Hello World!',
                icon: new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|CCCCCC")
            });
            currentRadiusView = new google.maps.Circle({
                map: map,
                strokeColor: '#FF0000',
                strokeOpacity: 0.2,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.1,
                center: mapCenter,
                radius: $('#radiusvalue').html() * 1
            });
            infoWindow = new google.maps.InfoWindow({
                map: map
            });
            callForLocations();
        }
        navigator.geolocation.getCurrentPosition(
          initloc,
          function(){
            alert("Your browser did not respond with your location.\nWill use a default central London location for DEMO purpose.")
            initloc({coords:{latitude:51.51558,longitude:-0.087891}});
          }
        );
    } else {
        alert("You don't support this");
    }

    slider = $('.slider').slider();
    slider.on('slide', function(slide) {
        $('#radiusvalue').html(slide.value);
        changeCurrentRadius(slide.value * 1);
    });
    slider.on('slideStop', function(slide) {
        callForLocations();
    });
});
