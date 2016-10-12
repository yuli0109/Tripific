var Yelp = require("yelp-v3");

module.exports={
  businessFind: businessFind,
  businessSearch: businessSearch
}

function businessFind (req, res, next) {
  var yelp = new Yelp({
    access_token: process.env.YELP_TOKEN
  });
  yelp.businesses(req.query.id, function(error, data) {
    console.log(data);
    res.status(200).json(data);
  });
}

function businessSearch (req, res, next) {
  var yelp = new Yelp({
    access_token: process.env.YELP_TOKEN
  });
  yelp.search({price: req.query.price, term: req.query.term, latitude: req.query.location.lat, longitude: req.query.location.lng, limit: 25}, function(error, data) {
    console.log(data.businesses);
    var searchResults = data.businesses.map(function(el){
        return {text:el.name, id: el.id, img_url: el.image_url, price: el.price, rating: el.rating, address: `${el.location.address1}, ${el.location.city}, ${el.location.state} ${el.location.zip_code}`}
    })
    console.log(searchResults)
    res.status(200).json(searchResults);
  });
}
