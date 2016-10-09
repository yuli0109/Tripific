console.log('linked!');

//AIzaSyCCSPeNs4RKje84chLxyLJKBdv_kf9gY7E

var chicago = {lat: 41.85, lng: -87.65};

function CenterControl(controlDiv, map) {

        // Set CSS for the control border.
        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = '2px solid #fff';
        controlUI.style.borderRadius = '3px';
        controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginBottom = '22px';
        controlUI.style.textAlign = 'center';
        controlUI.title = 'Click to recenter the map';
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        var controlText = document.createElement('div');
        controlText.style.color = 'rgb(25,25,25)';
        controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
        controlText.style.fontSize = '16px';
        controlText.style.lineHeight = '38px';
        controlText.style.paddingLeft = '5px';
        controlText.style.paddingRight = '5px';
        controlText.innerHTML = 'Center Map';
        controlUI.appendChild(controlText);

        // Setup the click event listeners: simply set the map to Chicago.
        controlUI.addEventListener('click', function() {
          map.setCenter(chicago);
        });
}


function initMap() {
        var markers = [];

        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: chicago
        });

        var marker = new google.maps.Marker({
          position: {lat: -25.363, lng: 131.044},
          map: map,
          title: 'Hello World!'
        });


        // Create the DIV to hold the control and call the CenterControl()
        // constructor passing in this DIV.
        var centerControlDiv = document.createElement('div');
        var centerControl = new CenterControl(centerControlDiv, map);

        centerControlDiv.index = 1;
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

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
        drawingManager.setMap(map);
        google.maps.event.addListener(drawingManager, 'markercomplete', function(marker) {
          console.log(marker);
          markers.push(1);
          console.log(markers);
        });
}


  // var directionsDisplay = new google.maps.DirectionsRenderer({
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

