var mongoose = require('mongoose');
var stop = require('./stop');
var ObjectId = mongoose.Schema.Types.ObjectId;


var tripSchema = new mongoose.Schema({
  created: { type: Date, default: Date.now },
  tripDate: Date,
  route: String,
  stops:[{type: ObjectId, ref: 'Stop'}],
});

module.exports = mongoose.model('Trip', tripSchema);

