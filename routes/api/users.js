const express = require('express');     //require express to require route
const router = express.Router();        //require route module to route outside
const gravatar = require('gravatar');   //require gravatar module to get the profile pic
const bcrypt = require('bcryptjs');     //require bcryptjs to code the password
const jwt = require('jsonwebtoken');    //require json web token module to auth users
const passport = require('passport');   //require passport to verify users
const keys = require('../../config/keys'); //require the keys used for json web token

// Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User model
const User = require('../../models/User');


// @route:        GET api/users/test
// @description:  Tests users route
// @access:       public
router.get('/test', (req, res) => res.json({msg : "Users works"}));

// @route:        POST api/users/register
// @description:  User registration api
// @access:       public
router.post('/register', (req, res) => {
  //check if the input texts are valid
  const {errors, isValid} = validateRegisterInput(req.body);
  //Check empty or invalid
  if(!isValid) {
    return res.status(400).json(errors);
  }
  //go to mongodb check the email and save
  User.findOne({ email : req.body.email })
      .then(user => {
        if(user) {
          errors.email = "Email already exists";
          return res.status(400).json(errors);
        } else {
          //avatar to grab the profile img with the user email
          const avatar = gravatar.url(req.body.email, {
            s : '200',  //size
            r : 'pg',   //rating
            d : '404'    //default
          });
          //create the new user
          const newUser = new User({
            name : req.body.name,
            email : req.body.email,
            avatar : avatar,
            password : req.body.password
          });
          //generate the password and save the user
          const saltRounds = 10;
          bcrypt.genSalt(saltRounds, (error, salt) => {
            bcrypt.hash(newUser.password, salt, (error, hash) => {
              if(error) throw error;
              newUser.password = hash;
              newUser.save()
                      .then(user => res.json(user))
                      .catch(error => console.log(error));
            })
          });
        }

      });
});

// @route:        POST api/users/login
// @description:  User login api
// @access:       public
router.post('/login', (req, res) => {
  //check if the input texts are valid
  const {errors, isValid} = validateLoginInput(req.body);
  //Check empty or invalid
  if(!isValid) {
    return res.status(400).json(errors);
  }
  //find user by Email
  User.findOne({ email : req.body.email })
      .then(user => {
        //check if there is a users
        if(!user) { //no such user
          errors.email = 'User not found';
          return res.status(404).json(errors);
        }
        //check the password
        bcrypt.compare(req.body.password, user.password)
              .then(isMatch => {
                if(isMatch) {
                  //user matched
                  const payload = {id : user.id, name : user.name, avatar : user.avatar};
                  //sign a json token and give the token back to the respond
                  jwt.sign(
                    payload,
                    keys.secretOrKey,
                    { expiresIn : 86400 },
                    (error, token) => {
                      res.json({
                        success : true,
                        token : 'Bearer ' + token
                      });
                    }
                  );      //include secretkey and expire after 1 day
                } else {
                  errors.password = 'Password incorrect';
                  return res.status(400).json(errors);
                }
              }).catch(error => console.log(error));
      }).catch(error => console.log(error));
});


// @route:        GET api/users/current
// @description:  Return current user
// @access:       private
router.get('/current', passport.authenticate(
    'jwt',
    { session : false }),
    (req, res) => {
      res.json({                                    //only return the id, name and the email
        id : req.user.id,
        name : req.user.name,
        email : req.user.email
      });
    });



module.exports = router;                //export router to the server.js
