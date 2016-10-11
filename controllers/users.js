var User = require('../models/user');

module.exports = {
  index: index
};

function index(req, res) {
  User.find({}, function(err, users) {
    if (err) return res.status(err.statusCode || 500).json(err);
    res.json(users);
  });
}
