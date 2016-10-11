var Trip = require('../models/trip');

module.exports = {
  create: create,
  update: update,
  delete: del
};


function create(req, res) {
  Trip.findById(req.params.tripId, function(err, trip){
    trip.stops.push(req.body);
    trip.save(function(err){
      res.json(trip);
    });
 });
}

function addActivity(req, res) {
  Trip.findBy({userId: req.user.id}).where('stops').in(req.params.stopId).exec(function(err,trip){
    // trip.stop.name = req.body.trip.stop.name;
    // trip.stop.location = req.body.trip.stop.location;
    trip.stop.activities.push({
      type: req.body.businessType,
      name: req.body.businessName
    })
    trip.save(function(err){
      res.json(trip)
    });
  });
}

// function removeActivity(req, res) {

// }

function del(req, res) {
  Trip.findBy({userId: req.user.id}).where('stops').in(req.params.stopId).exec(function(err, trip){
    trip.stops.id(req.params.stopId).remove();
    trip.save(function(err){
      res.json(trip);
    });
  });
}
