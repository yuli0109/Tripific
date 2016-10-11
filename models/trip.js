var mongoose = require('mongoose');
var stop = require('./stop');
var ObjectId = mongoose.Schema.Types.ObjectId;

var activitiesSchema = new mongoose.Schema({
  type: String,
  name: String,
  location: String
});

var stopSchema = new mongoose.Schema({
  name: String,
  location: String,
  activities: [activitiesSchema]
});

var tripSchema = new mongoose.Schema({
  created: { type: Date, default: Date.now },
  tripDate: Date,
  route: String,
  userId: {type: ObjectId, ref: 'User'},
  stops:[stopSchema],
});

module.exports = mongoose.model('Trip', tripSchema);

