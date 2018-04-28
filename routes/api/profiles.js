const express = require('express');     //require express to require route
const router = express.Router();        //require route module
const mongoose = require('mongoose');   //require mongodb
const passport = require('passport');   //require passport to protect the routes


//load user model
const User = require('../../models/User');
//load profile model
const Profile = require('../../models/Profile');

//load validation
const validateProfileInput = require('../../validation/profile');
const validateExpInput = require('../../validation/experience');
const validateEduInput = require('../../validation/education');


// @route:        GET api/profiles/test
// @description:  Tests profiles route
// @access:       public
router.get('/test', (req, res) => res.json({msg : "Profiles works"}));

// @route:        GET api/profiles/all
// @description:  Get all the profiles
// @access:       public
router.get('/all', (req, res) => {
  const errors = {};                            //create a empty errors object to pass all the error messages
  Profile.find()                                //find everything, not findOne
        .populate('user', ['name', 'avatar'])   //grab the user name and avatar while getting the user id
        .then(profiles => {
          if(!profiles) {                       //if there is no profile
            errors.noprofile = 'There is no profile right now';
            return res.status(404).json(errors);
          } else {                               //if found, return all the profiles
            res.json(profiles);
          }
        }).catch(error => {
          res.status(404).json({noprofile : 'There is no profile right now'});
        });
});

// @route:        GET api/profiles
// @description:  Get current user's profile
// @access:       Private
router.get('/', passport.authenticate('jwt', {session : false}), (req, res) => {
  const errors = {};                            //create a empty errors object to pass all the error messages
  Profile.findOne({ user : req.user.id })       //use profile user schema id to find the user
        .populate('user', ['name', 'avatar'])   //grab the user name and avatar while getting the user id
        .then(profile => {
          if(!profile) {                        //if user not found
            errors.noprofile = 'You don\'t have a profile right now';
            return res.status(404).json(errors);
          } else {
            res.json(profile);                  //if user found, return the profile
          }
        }).catch(error => {
          res.status(404).json(error);
        });
});

// @route:        GET api/profiles/handle/:handle
// @description:  Get profile by handle
// @access:       public
router.get('/handle/:handle', (req, res) => {
  const errors = {};
  Profile.findOne({ handle : req.params.handle })         //use the handle find the user profile
        .populate('user', ['name', 'avatar'])             //grab the user name and avatar while getting the user id
        .then(profile => {
          if (!profile) {                                 //if user not found
            errors.noprofile = 'There is no profile for this user';
            res.status(404).json(errors);
          } else {                                        //if user found, return the profile
            res.json(profile);
          }
        }).catch(error => {
          res.status(404).json({noprofile : 'There is no profile for this user'});
        });
});

// @route:        GET api/profiles/user/:user_id
// @description:  Get profile by user id
// @access:       public
router.get('/user/:user_id', (req, res) => {
  const errors = {};
  Profile.findOne({ user : req.params.user_id })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
          if (!profile) {
            errors.noprofile = 'There is no profile for this user';
            res.status(404).json(errors);
          } else {
            res.json(profile);
          }
        }).catch(error => {
          res.status(404).json({noprofile : 'There is no profile for this user'});
        });
});




// @route:        POST api/profiles
// @description:  Create or edit the user profile for current user
// @access:       Private
router.post('/', passport.authenticate('jwt', {session : false}), (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body);   //get error messages from validator
  //check the validation
  if(!isValid) {
    //return all the errors with 400 status
    return res.status(400).json(errors);
  }

  const profileContent = {};                    //create a empty profileContent object to hold all the profile infos
  profileContent.user = req.user.id;            //get the userid info
  //get all the info that the user submit
  if (req.body.handle) profileContent.handle = req.body.handle;
  if (req.body.company) profileContent.company = req.body.company;
  if (req.body.school) profileContent.school = req.body.school;
  if (req.body.website) profileContent.website = req.body.website;
  if (req.body.location) profileContent.location = req.body.location;
  if (req.body.bio) profileContent.bio = req.body.bio;
  if (req.body.status) profileContent.status = req.body.status;
  if (req.body.githubusername) profileContent.githubusername = req.body.githubusername;
  if (typeof req.body.skills !== 'undefined') {
    profileContent.skills = req.body.skills.split(',');
  }
  //initialize the social object
  profileContent.social = {};
  if (req.body.youtube) profileContent.social.youtube = req.body.youtube;
  if (req.body.facebook) profileContent.social.facebook = req.body.facebook;
  if (req.body.twitter) profileContent.social.twitter = req.body.twitter;
  if (req.body.instagram) profileContent.social.instagram = req.body.instagram;
  if (req.body.tumblr) profileContent.social.tumblr = req.body.tumblr;
  if (req.body.linkedin) profileContent.social.linkedin = req.body.linkedin;
  if (req.body.pinterest) profileContent.social.pinterest = req.body.pinterest;
  if (req.body.github) profileContent.social.github = req.body.github;
  if (req.body.personal) profileContent.social.personal = req.body.personal;

  Profile.findOne({ user : req.user.id })
        .then((profile) => {
          if (profile) {
            //profile found, edit and update the profile infos
            Profile.findOneAndUpdate(
              { user : req.user.id },
              { $set : profileContent },
              { new : true }
            ).then(profile => res.json(profile))    //update and return the profile infos
            .catch(error => console.log(error));
          } else {
            //profile not found, need to create a new profile
            //check if the handle exisits
            Profile.findOne({ handle : profileContent.handle }).then((profile) => {
              if (profile) {
                //handle found and return error
                errors.handle = 'That handle already exists';
                res.status(400).json(errors);
              } else {
                //create and save the new profile
                new Profile(profileContent).save()
                .then((profile) => res.json(profile))
                .catch(error => console.log(error));
              }
            });
          }
        })
});

// @route:        POST api/profiles/experience
// @description:  Add experience to the profile
// @access:       Private
router.post('/experience', passport.authenticate('jwt', {session : false}), (req, res) => {
  const { errors, isValid } = validateExpInput(req.body);   //get error messages from validator
  //check the validation
  if(!isValid) {
    //return all the errors with 400 status
    return res.status(400).json(errors);
  }

  Profile.findOne({user : req.user.id})
        .then((profile) => {
          //if there is no such profile
          if (!profile) {
            res.status(400).json({profile : 'Please create your profile first'});
          } else {
            //get all the info and store to the new object
            const newExp = {
              title : req.body.title,
              company : req.body.company,
              location : req.body.location,
              from : req.body.from,
              to : req.body.to,
              current : req.body.current,
              description : req.body.description
            };
            //add to the exp array
            profile.experience.unshift(newExp);
            profile.save().then(profile => res.json(profile));
          }
        });
});

// @route:        POST api/profiles/education
// @description:  Add education to the profile
// @access:       Private
router.post('/education', passport.authenticate('jwt', {session : false}), (req, res) => {
  const { errors, isValid } = validateEduInput(req.body);   //get error messages from validator
  //check the validation
  if(!isValid) {
    //return all the errors with 400 status
    return res.status(400).json(errors);
  }

  Profile.findOne({user : req.user.id})
        .then((profile) => {
          //if there is no such profile
          if (!profile) {
            res.status(400).json({profile : 'Please create your profile first'});
          } else {
            //get all the info and store to the new object
            const newEdu = {
              school : req.body.school,
              degree : req.body.degree,
              major : req.body.major,
              from : req.body.from,
              to : req.body.to,
              current : req.body.current,
              gpa : req.body.gpa,
              description : req.body.description
            };
            //add to the exp array
            profile.education.unshift(newEdu);
            profile.save().then(profile => res.json(profile));
          }
        });
});


// @route:        DELETE api/profiles/experience/:exp_id
// @description:  Delete experience from the profile
// @access:       Private
router.delete('/experience/:exp_id', passport.authenticate('jwt', {session : false}), (req, res) => {
  Profile.findOne({user : req.user.id})
        .then(profile => {
          //get remove index
          const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
          if (removeIndex > -1) {
            //splice out of array
            profile.experience.splice(removeIndex, 1);
          } else if (removeIndex === -1) {
            //no such experience
            return res.status(404).json({ experience : 'There is no experience with this id'});
          }
          //save
          profile.save().then(profile => res.json(profile));
        }).catch(error => res.status(404).json(error));
});

// @route:        DELETE api/profiles/education/:edu_id
// @description:  Delete education from the profile
// @access:       Private
router.delete('/education/:edu_id', passport.authenticate('jwt', {session : false}), (req, res) => {
  Profile.findOne({user : req.user.id})
        .then(profile => {
          //get remove index
          const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);
          if (removeIndex > -1) {
            //splice out of array
            profile.education.splice(removeIndex, 1);
          } else if (removeIndex === -1) {
            //no such experience
            return res.status(404).json({ education : 'There is no education with this id'});
          }
          //save
          profile.save().then(profile => res.json(profile));
        }).catch(error => res.status(404).json(error));
});

// @route:        DELETE api/profiles
// @description:  Delete user and profile
// @access:       Private
router.delete('/', passport.authenticate('jwt', {session : false}), (req, res) => {
  Profile.findOneAndRemove({ user : req.user.id })
        .then(() => {
          User.findOneAndRemove({ _id : req.user.id })
              .then(() => {
                res.json({ success : true });
              });
        });
});

module.exports = router;                //export router to the server.js
