var express = require('express');
var router = require('express').Router();
var passport = require('passport');

var Trip = require("../models/trip");
var User = require("../models/user");

var tripsCtrl = require('../controllers/trips')
var stopsCtrl = require('../controllers/stops')
var usersCtrl = require('../controllers/users')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {user: req.user});
});

// get trips for a user
router.get('/trips/:id', tripsCtrl.show)


router.post('/stops' , stopsCtrl.createStop)

// Delete Stop route
router.delete('/stops/:id', stopsCtrl.removeStop)

// Trip Create Route
router.post('/trips' , tripsCtrl.create)

// Trip Delete Route
router.delete('/trips/:id',  tripsCtrl.delete)

// Itnerary route
// // router.get('/', function (req,res){
// //   res.
// })

// router.get('/itinerary', function(req,res){
//   var trip = {
//     origin: 'Los Angeles',
//     destination: 'Las Vegas',
//     tripDate: '10/13/2016',
//     stops: [{
//       name: 'fake stop',
//       activities: [{
//         type: 'dining',
//         name: 'fake activity'
//       },
//       {
//         type: 'dining',
//         name: 'fake activity'
//       }]
//     },
//     {
//       name: 'fake stop',
//       activities: [{
//         type: 'dining',
//         name: 'fake activity'
//       },
//       {
//         type: 'dining',
//         name: 'fake activity'
//       }]
//     }]
//   };
//   res.render('itinerary', {trip: trip})
// })

module.exports = router;
