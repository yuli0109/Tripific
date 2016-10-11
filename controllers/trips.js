var User = require('../models/user');

module.exports = {
  create: create,
  delete: del
};

 //need to use populate('').exec(function(err, user))

function create(req, res) {
User.findById(req.user.id, function(err, user){
  user.trips.push({trips: req.body.trip });
  user.save(function(err){
    res.json(user);
  })
 })
}

function del(req, res) {
  User.findById(req.user.id, function(err, user){
    user.trips.pop();
    user.save(function(err){
      res.json(user);
    })
  })
}
