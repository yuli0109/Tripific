var express = require('express');
var router = require('express').Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


router.get('/new_user', function(req, res, next) {
  res.render('app');
});


module.exports = router;
