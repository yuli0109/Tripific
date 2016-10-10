// run this file with npm run test
require('dotenv').config();
var db = require('./config/database');
var User = require('./models/user');
var Trip = require('./models/trip');
var Stop = require('./models/stop');


// clean out test db
Promise.all([
  User.remove(),
  Trip.remove(),
  Stop.remove()
])
.then(function(){
  // we can instatiate and save to the db.
  var user = new User({
    name: 'Victoria'
  })
  var trip = new Trip({
    tripDate: '10/10/2016'
  })
  //should be able to associate users and trips
  user.trips.push(trip);
  var stop = new Stop({
    name: 'Restaurant',
    activities: [{
      type: 'lifestyle'
    }]
  })
  trip.stops.push(stop);
  return Promise.all([
    user.save(),
    trip.save(),
    stop.save()
  ])
})
.then(function([user, trip, stop]){
  // find user in db
  return Promise.all([
    User.findOne({}),
    Trip.findOne({}),
    Stop.findOne({})
  ])
})
.then(function([user, trip, stop]){
  // username should be db if it saved.
  console.log(user.name, trip.tripDate, stop.name, trip.created, user.created);
  console.log('user should have a trip', user.trips);
  console.log('trip should have a stop', trip.stops);
  console.log('stop should have activities', stop.activities)
})
.catch(console.log)
.then(process.exit)


