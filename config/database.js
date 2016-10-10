var mongoose = require('mongoose');

mongoose.Promise = Promise;

var NODE_ENV = process.env.NODE_ENV || 'development'

//todo check database URL has been set on Heroku
var url = process.env.DATABASE_URL

mongoose.connect(url);

// database connection event
mongoose.connection.once('open', function () {
  console.log(`Mongoose connected to: ${url}`);
});

module.exports = mongoose;
