var mongoose = require('mongoose');

mongoose.Promise = Promise;
var node_env = process.env.NODE_ENV || 'development'

//todo check database URL has been set on Heroku
var url = process.env.DATABASE_URL || `mongodb://localhost/tripific_${process.env.NODE_ENV}`;

mongoose.connect(url);

// database connection event
mongoose.connection.once('open', function () {
  console.log(`Mongoose connected to: ${process.env.DATABASE_URL}`);
});

module.exports = mongoose;
