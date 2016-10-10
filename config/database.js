var mongoose = require('mongoose');

mongoose.Promise = Promise;

//todo check database URL has been set on Heroku
var url = process.env.DATABASE_URL || "mongodb://localhost/tripific";

mongoose.connect(url);

// database connection event
mongoose.connection.once('open', function () {
  console.log(`Mongoose connected to: ${process.env.DATABASE_URL}`);
});

module.exports = mongoose;
