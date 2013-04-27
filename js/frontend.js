var map;
//        function grabMyPosition() {
//            if (navigator.geolocation) {
//                navigator.geolocation.getCurrentPosition(centerMe);
//            } else {
//                alert("You don't support this");
//            }
//        }
function centerMe(center) {
    var coords = new google.maps.LatLng(
        center.coords.latitude,
        center.coords.longitude
    );

    //map.setCenter(coords);
    // or
    map.panTo(coords);
}
YUI({
    //Last Gallery Build of this module
    gallery: 'gallery-2012.09.05-20-01'
}).use('gallery-google-maps-loader', 'node', 'event', function (Y) {
        new Y.GoogleMapsLoader().load({
            language: 'en',
            libraries: [
                'adsense',
                'geometry'
            ],
            region: 'ES',
            sensor: true,
            version: '3.4'
        }).on('success', function () {
                map = new google.maps.Map(Y.Node.getDOMNode(Y.one('#map')), {
                    zoom: 10,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(centerMe);
                } else {
                    alert("You don't support this");
                }
                mapDiv = Y.Node.getDOMNode(Y.one('#map'));
//                mapDiv.style.width = '100%';
//                google.maps.event.trigger(map, 'resize');
            });
    });