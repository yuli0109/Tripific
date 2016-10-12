console.log('linked!');

//AIzaSyCCSPeNs4RKje84chLxyLJKBdv_kf9gY7E

var los_angeles = {lat: 34.06, lng: -118.24};
var waypts = [];
var currentMark = {lat: 34.08, lng: -118.14};
var searchBusinessResult = [];
var currentTrip = {};
var currentStopId = "";

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
  //Saving the trip on user
  $("#goBtn").on('click', function(event) {
    $.ajax({
    url: '/trips',
    dataType: 'json',
    method: "POST",
    data: {
      tripDate: $("#dt-picker").val(),
      origin: $("#origin").val(),
      destination: $("#dest").val()
      }
    })
    .done(function(data) {
      currentTrip = data;
      console.log("The marker are now all on trip_id:" + currentTrip);
    })
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
    //Sending post request to save stops on the current trip
    $.ajax({
        url: `/trips/${currentTrip._id}/stops`,
        dataType: 'json',
        method: "POST",
        data: {
          name: "stop1",
          location: {
            lat: marker.getPosition().lat(),
            lng: marker.getPosition().lng()
          }
        }
      })
      .done(function(data) {
        console.log(data);
        markers.forEach(function(marker, i){
          marker.stopId = data.stops[i]._id;
        })
        currentStopId = data._id;
        console.log(markers);
      })
    //Add listener to left click on marker
    google.maps.event.addListener(marker, 'rightclick', function(mouseEvent) {
      markToDelete = markers.filter(function(elm) {
        return elm.marker.uid == marker.uid;
      });
      //Remove stops in database
      $.ajax({
        url: `/stops/${markToDelete[0].stopId}`,
        dataType: 'json',
        method: "DELETE"
      })
      .done(function(data) {
        console.log(data);
      })
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
    google.maps.event.addListener(marker, 'click', function(mouseEvent) {
      currentMark = {
        lat: marker.getPosition().lat(),
        lng: marker.getPosition().lng()
      }
      console.log(currentMark);
      $('#activities_modal').modal('toggle');
    });
    //Push the marker object to markers array
    markers.push({
      id: markerId++,
      marker: marker,
      stopId: currentStopId
    });
    console.log(markers);
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


//Import the select2 Library for select bar
$(".js-example-basic-multiple").select2();

//Add Event Listener to pagenation buttons
$("li > a.page-numbers").on('click', function(event) {
  $("li > a.page-numbers").closest("li").removeClass('active');
  $("#previousBtn, #nextBtn").removeClass('disabled');
  $(this).closest("li").addClass('active');
  if ($(this).text() == '1(current)') {
    $("#previousBtn").addClass('disabled');
  }
  if ($(this).text() == '5(current)') {
    $("#nextBtn").addClass('disabled');
  }
});

//Function for searching business
function searchBusiness (term) {
  // console.log(term);
  console.log($("#price_selection").val().join());
  $.ajax({
    url: '/yelp/search',
    dataType: 'json',
    data: {
      term: term,
      location: currentMark,
      price: $("#price_selection").val().join()
    }
  })
  .done(function(data) {
    searchBusinessResult = [];
    data.forEach(function(elm){
      searchBusinessResult.push(elm);
    });
    renderBusiness(1);
  })
}

//Function for rendering business depending on pagenation
function renderBusiness (pageNumb) {
  switch (pageNumb) {
    case 1:
      for (let i = 0; i < 5; i++) {
        $(`#media${i+1} > * img.img-flag`).attr('src', searchBusinessResult[i].img_url);
        $(`#media${i+1} > * h4`).text(searchBusinessResult[i].text);
        $(`#media${i+1} > * td.select_address`).text(searchBusinessResult[i].address);
        $(`#media${i+1} > * td.select_price`).text(searchBusinessResult[i].price);
        renderRating(i+1, searchBusinessResult[i].rating)
      }
      break;
    case 2:
      for (let i = 0, j=5; i < 5; i++, j++) {
        $(`#media${i+1} > * img.img-flag`).attr('src', searchBusinessResult[j].img_url);
        $(`#media${i+1} > * h4`).text(searchBusinessResult[j].text);
        $(`#media${i+1} > * td.select_address`).text(searchBusinessResult[j].address);
        $(`#media${i+1} > * td.select_price`).text(searchBusinessResult[j].price);
        renderRating(i+1, searchBusinessResult[j].rating)
      }
      break;
    case 3:
      for (let i = 0, j = 10; i < 5; i++, j++) {
        $(`#media${i+1} > * img.img-flag`).attr('src', searchBusinessResult[j].img_url);
        $(`#media${i+1} > * h4`).text(searchBusinessResult[j].text);
        $(`#media${i+1} > * td.select_address`).text(searchBusinessResult[j].address);
        $(`#media${i+1} > * td.select_price`).text(searchBusinessResult[j].price);
        renderRating(i+1, searchBusinessResult[j].rating)
      }
      break;
    case 4:
      for (let i = 0, j = 15; i < 5; i++, j++) {
        $(`#media${i+1} > * img.img-flag`).attr('src', searchBusinessResult[j].img_url);
        $(`#media${i+1} > * h4`).text(searchBusinessResult[j].text);
        $(`#media${i+1} > * td.select_address`).text(searchBusinessResult[j].address);
        $(`#media${i+1} > * td.select_price`).text(searchBusinessResult[j].price);
        renderRating(i+1, searchBusinessResult[j].rating)
      }
      break;
    case 5:
      for (let i = 0, j = 20; i < 5; i++, j++) {
        $(`#media${i+1} > * img.img-flag`).attr('src', searchBusinessResult[j].img_url);
        $(`#media${i+1} > * h4`).text(searchBusinessResult[j].text);
        $(`#media${i+1} > * td.select_address`).text(searchBusinessResult[j].address);
        $(`#media${i+1} > * td.select_price`).text(searchBusinessResult[j].price);
        renderRating(i+1, searchBusinessResult[j].rating)
      }
    }
}

//Function for rendering rating
function renderRating (mediaNum, rating) {
  switch (rating) {
    case 1:
        $(`#media${mediaNum} > *img.select_rating_1`).attr("src", '/images/review_stars/iOS/10X10_1@3x.png');
        break;
    case 1.5:
        $(`#media${mediaNum} > *img.select_rating_1`).attr("src", '/images/review_stars/iOS/10X10_1@3x.png');
        $(`media${mediaNum} > *img.select_rating_2`).attr("src", '/images/review_stars/iOS/10X10_1-5@3x.png');
        $(`media${mediaNum} > *img.select_rating_3, media${mediaNum} > * img.select_rating_4， media${mediaNum} > * img.select_rating_5`).attr("src", '/images/review_stars/iOS/10X10_0@3x.png');
        break;
    case 2:
        $(`media${mediaNum} > *img.select_rating_1, media${mediaNum} > * img.select_rating_2`).attr("src", '/images/review_stars/iOS/10X10_2@3x.png');
        break;
    case 2.5:
        $(`media${mediaNum} > *img.select_rating_1, media${mediaNum} > * img.select_rating_2`).attr("src", '/images/review_stars/iOS/10X10_2@3x.png');
        $(`media${mediaNum} > *img.select_rating_3`).attr("src", '/images/review_stars/iOS/10X10_2-5@3x.png');
        $(`media${mediaNum} > * img.select_rating_4， media${mediaNum} > * img.select_rating_5`).attr("src", '/images/review_stars/iOS/10X10_0@3x.png');
        break;
    case 3:
        $(`media${mediaNum} > *img.select_rating_1, media${mediaNum} > * img.select_rating_2, media${mediaNum} > * img.select_rating_3`).attr("src", '/images/review_stars/iOS/10X10_3@3x.png');
        break;
    case 3.5:
        $(`media${mediaNum} > *img.select_rating_1, media${mediaNum} > * img.select_rating_2, media${mediaNum} > * img.select_rating_3`).attr("src", '/images/review_stars/iOS/10X10_3@3x.png');
        $(`media${mediaNum} > *img.select_rating_4`).attr("src", '/images/review_stars/iOS/10X10_3-5@3x.png');
        $(`media${mediaNum} > *img.select_rating_5`).attr("src", '/images/review_stars/iOS/10X10_0@3x.png');
        break;
    case 4:
        $(`#media${mediaNum} > * img.select_rating_1, #media${mediaNum} > * img.select_rating_2, #media${mediaNum} > * img.select_rating_3, #media${mediaNum} > * img.select_rating_4`).attr("src", '/images/review_stars/iOS/10X10_4@3x.png');
        $(`#media${mediaNum} > * img.select_rating_5`).attr("src", '/images/review_stars/iOS/10X10_0@3x.png');
        break;
    case 4.5:
        $(`#media${mediaNum} > * img.select_rating_1, #media${mediaNum} > * img.select_rating_2, #media${mediaNum} > * img.select_rating_3, #media${mediaNum} > * img.select_rating_4`).attr("src", '/images/review_stars/iOS/10X10_4@3x.png');
        $(`#media${mediaNum} > * img.select_rating_5`).attr("src", '/images/review_stars/iOS/10X10_4-5@3x.png');
        break;
    case 5:
        $(`#media${mediaNum} > * img.select_rating_1, #media${mediaNum} > * img.select_rating_2, #media${mediaNum} > * img.select_rating_3, #media${mediaNum} > * img.select_rating_4, #media${mediaNum} > * img.select_rating_5`).attr("src", '/images/review_stars/iOS/10X10_5@3x.png');
  }
}

//Function for toggleing restaurant modal
function reataurantToggle(){
  $('#restaurant_modal').modal('toggle')
}

