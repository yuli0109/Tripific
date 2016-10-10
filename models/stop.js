var mongoose = require('mongoose');

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

module.exports = mongoose.model('Stop', stopSchema);
