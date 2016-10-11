var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
// The factSchema is used to embedded docs in as tudent doc.
// There is no model and no 'facts' collection

var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  googleId: String,
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
