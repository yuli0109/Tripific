var Trip = require('../models/trip');

module.exports = {
  create: create,
  delete: del
};

function create(req, res) {
  Trip.findById(req.params.tripId, function(err, trip){
    trip.stops.push(req.body);
    trip.save(function(err){
      res.json(trip);
    })
 })
}

function del(req, res) {
  Trip.findById(req.params.tripId, function(err, trip){
    trip.stops.pop();
    trip.save(function(err){
      res.json(trip);
    })
  })
}
