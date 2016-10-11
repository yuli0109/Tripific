console.log('linked!');

//AIzaSyCCSPeNs4RKje84chLxyLJKBdv_kf9gY7E

var los_angeles = {lat: 34.06, lng: -118.24};
var waypts = [];



function initMap() {
  var autocomplete_orgin = new google.maps.places.Autocomplete(document.getElementById('origin'));
  var autocomplete_dest = new google.maps.places.Autocomplete(document.getElementById('dest'));
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  //Array of marker object
  var markers = [];
  //Array Id counter
  var markerId = 0;
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 9,
    center: los_angeles
  });

  directionsDisplay.setMap(map);

  var onClickHandler = function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };

  document.getElementById('goBtn').addEventListener('click', onClickHandler);

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
      // console.log(marker);
      waypts = waypts.filter(function(elm){
        return elm.location.lat != marker.getPosition().lat()
      });
      // console.log(`Waypath after delete: ${waypts}`);
      calculateAndDisplayRoute(directionsService, directionsDisplay)
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
    console.log(marker.getPosition());
    waypts.push({
      location: {
        lat: marker.getPosition().lat(),
        lng: marker.getPosition().lng()
      },
      stopover: false
    });
    // console.log(`Waypath after add: ${waypts}`);
    calculateAndDisplayRoute(directionsService, directionsDisplay)
  });
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  directionsService.route({
    origin: document.getElementById('origin').value,
    destination: document.getElementById('dest').value,
    travelMode: 'DRIVING',
    waypoints: waypts
  }, function(response, status) {
      console.log(response);
      $("#start_loc").text(response.routes[0].legs[0].start_address);
      $("#end_loc").text(response.routes[0].legs[0].end_address);
      $("#cell_duration").text(response.routes[0].legs[0].duration.text);
      $("#cell_milage").text(response.routes[0].legs[0].distance.text);
      if (status === 'OK') {
      directionsDisplay.setDirections(response);
      } else {
      window.alert('Directions request failed due to ' + status);
      }
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

