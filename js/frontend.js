function centerMe(center) {
    var coords = new google.maps.LatLng(
        center.coords.latitude,
        center.coords.longitude
    );
    map.panTo(coords);
}
var map;
$(document).ready(function () {
    var mapOptions = {
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(centerMe);
    } else {
        alert("You don't support this");
    }

    $('.slider').slider().on('slide', function(slide) {
        $('#radiusvalue').html(slide.value);
    });
});
