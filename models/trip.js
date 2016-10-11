var mongoose = require('mongoose');
var stop = require('./stop');
var ObjectId = mongoose.Schema.Types.ObjectId;

var activitiesSchema = new mongoose.Schema({
  type: String,
  name: String,
  businessId: String,
  location: {
    lat: Number,
    lng: Number
  }
});

var stopSchema = new mongoose.Schema({
  name: String,
  location: {
    lat: Number,
    lng: Number
  },
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

