
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var User = require('../models/user');


// verify function
passport.use(new GoogleStrategy({
    clientID: '187202830332-de6qsmv9teur65jc9a9848ocf7ae42bj.apps.googleusercontent.com',
    clientSecret: 'cW9MKQeMfEeOA3ptuOfFEwDo',
    callbackURL: 'http://localhost:3000/oauth2callback'
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOne({ 'googleId': profile.id }, function(err, user) {
      if (err) return cb(err);
      if (user) {
        return cb(null, user);
      } else {
        // we have a new student via OAuth!
        var newUser = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id
        });
        newUser.save(function(err) {
          if (err) return cb(err);
          return cb(null, newUser);
        });
      }
    });
  }
));


// serialize function
passport.serializeUser(function(user, done){
  done(null, user.id);
});

// deserialize function
passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user);
  });
});
