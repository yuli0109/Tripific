console.log('linked!');

//AIzaSyCCSPeNs4RKje84chLxyLJKBdv_kf9gY7E

var chicago = {lat: 41.85, lng: -87.65};

function initMap() {
  //Array of marker object
  var markers = [];
  //Array Id counter
  var markerId = 0;
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: chicago
  });

  //Define the drawing manager
  var drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.MARKER,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: ['marker']
    },
    markerOptions: {
      animation: google.maps.Animation.DROP
    }
  });
  //Initialize the drawing manager on map
  drawingManager.setMap(map);
  //Add listener to markers after drawn
  google.maps.event.addListener(drawingManager, 'markercomplete', function(marker) {
    //Assign id to the marker
    marker.uid = markerId;
    //Add listener to left click on marker
    google.maps.event.addListener(marker, 'click', function(mouseEvent) {
      //Remove marker object in marker array
      markers = markers.filter(function(elm){
        return elm.marker.uid != marker.uid
      })
      //Remove marker on map
      this.setMap(null);
      console.log(markers);
    });
    //Add listener to right click on marker
    google.maps.event.addListener(marker, 'rightclick', function(mouseEvent) {
      alert('Right click triggered');
    });
    //Push the marker object to markers array
    markers.push({
      id: markerId++,
      marker: marker
    });
    console.log(`Latitude: ${marker.getPosition().lat()}, Longitude: ${marker.getPosition().lng()}`);
    console.log(markers);
  });
}


  // var directionsDisplay = new google.maps.DirectionsRendere({
  //   map: map
  // });

  // // Set destination, origin and travel mode.
  // var request = {
  //   destination: indianapolis,
  //   origin: chicago,
  //   travelMode: 'DRIVING'
  // };

  // // Pass the directions request to the directions service.
  // var directionsService = new google.maps.DirectionsService();
  //   directionsService.route(request, function(response, status) {
  //     if (status == 'OK') {
  //     // Display the route on the map.
  //     directionsDisplay.setDirections(response);
  //     }
  //   });

