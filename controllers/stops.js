var Trip = require('../models/trip');

module.exports = {
  createStop: createStop,
  addActivity: addActivity,
  removeActivity: removeActivity,
  removeStop: removeStop
};


function createStop(req, res) {
  Trip.findById(req.params.tripId, function(err, trip){
    trip.stops.push(req.body);
    trip.activities = [];
    trip.save(function(err){
      res.json(trip);
    });
 });
}

function addActivity(req, res) {
  Trip.findOne({userId: req.user.id}).where('stops._id').in(req.params.stopId).exec(function(err,trip){
    trip.stops.id(req.params.stopId).activities.push({
      type: req.body.businessType,
      name: req.body.businessName,
      businessId: req.body.businessId,
      location: {
        lat: req.body.lat,
        lng: req.body.lng
      }
    })
    trip.save(function(err){
      res.json(trip)
    });
  });
}

function removeActivity(req, res) {
  Trip.findOne({userId: req.user.id}).where('activities._id').in(req.params.activityId).exec(function(err,trip){
    trip.stop.activities.id(req.params.activityId).remove();
    trip.save(function(err){
      res.json(trip);
    });
  });
}

function removeStop(req, res) {
  Trip.findOne({userId: req.user.id}).where('stops._id').in(req.params.stopId).exec(function(err, trip){
    trip.stops.id(req.params.stopId).remove();
    trip.save(function(err){
      res.json(trip);
    });
  });
}
