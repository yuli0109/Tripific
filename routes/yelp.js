var express = require('express');
var router = express.Router();
var YelpFind = require('../controllers/yelp-business.js');

/* GET home page. */

router.get('/yelp/search', YelpFind.businessSearch);

router.get('/yelp/business', YelpFind.businessFind);

module.exports = router;
