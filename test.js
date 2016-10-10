var db = require('./config/database');
var User = require('./models/user');


// clean out test db
Promise.all([
  User.remove()
]).then(function(){
  // we can instatiate and save a user to the db.
  var user = new User({
    name: 'Victoria'
  })
  return user.save()
}).then(function(){
  // find user in db
  return User.findOne({})
}).then(function(user){
  // username should be db if it saved.
  console.log(user.name, 'Victoria');
})
.catch(console.log)
.then(process.exit)
