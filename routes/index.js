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

// Post activity route
router.post('/stops/:stopId/activities', stopsCtrl.addActivity)

// Delete Activity route
router.delete('/activities/:activityId', stopsCtrl.removeActivity)

// Create Stop route
router.post('/trips/:tripId/stops', stopsCtrl.createStop)

// Delete Stop route
router.delete('/stops/:stopId', stopsCtrl.removeStop)

// Trip Create Route
router.post('/trips' , tripsCtrl.create)

// Trip Delete Route
router.delete('/trips/:id',  tripsCtrl.delete)

// Itnerary route
// router.get('/', function (req,res){
//   res.
// })

module.exports = router;
