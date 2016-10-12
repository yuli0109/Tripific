var express = require('express');
var router = require('express').Router();
var passport = require('passport');

var Trip = require("../models/trip");
var User = require("../models/user");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {user: req.user});
});


router.get('/new', function(req, res, next) {
  res.render('app');
});

// // Create Stop route
// router.post('/stops', createstop)

// // Delete Stop route
// router.delete('/stops/:id', removestop)

// // Trip Create Route
// router.post('/trips', create)

// // Trip Delete Route
// router.delete('/trips/:id', del)

// // Itnerary route
// // router.get('/', function (req,res){
// //   res.
// // })

module.exports = router;
