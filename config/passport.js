const JwtStrategy = require('passport-jwt').Strategy;   //bring in jwt Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;  //bring in extract Strategy
const mongoose = require('mongoose');                   //require mongoose to verify the user
const User = mongoose.model('Users');                   //bring in the User database schema
const keys = require('../config/keys');                 //require the keys used for json web token

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = (passport) => {                      //our passport jwt Strategy
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      //console.log(jwt_payload);                     //get the token detail and get the user info
      User.findById(jwt_payload.id)
          .then(user => {
            if(user) {                                //if user found, return that user
              return done(null, user);
            } else {                                  //if user not found, return false
              return done(null, false);
            }
          }).catch(error => console.log(error));
    }));
};
