const Validator = require('validator');       //require the validator module to control the input text
const isEmpty = require('./isEmpty');              //import the isEmpty function to check if empty

module.exports = function validateProfileInput(data) {
  let errors = {};                          //set errors to an empty object

  //check empty input
  data.handle = !isEmpty(data.handle) ? data.handle : '';          //if empty, set it to a empty string
  data.status = !isEmpty(data.status) ? data.status : '';
  data.skills = !isEmpty(data.skills) ? data.skills : '';

  //check for handle
  if(!Validator.isLength(data.handle, { min : 2, max : 40 })) {       //check for the handle length
    errors.handle = 'Handle needs to be between 2 and 40 characters';
  }
  if(Validator.isEmpty(data.handle)) {                                //check for the handle empty
    errors.handle = 'Profile handle is required';
  }
  //check for status
  if(Validator.isEmpty(data.status)) {                                //check for the status empty
    errors.status = 'Status field is required';
  }
  //check for skills
  if(Validator.isEmpty(data.skills)) {                                //check for the skills empty
    errors.skills = 'Skills field is required';
  }
  if(!isEmpty(data.website)) {                                        //check for the url validation but url might not be existed
    if(!Validator.isURL(data.website)) {
      errors.website = 'Not a valid webURL';
    }
  }
  if(!isEmpty(data.youtube)) {
    if(!Validator.isURL(data.youtube)) {
      errors.youtube = 'Not a valid webURL';
    }
  }
  if(!isEmpty(data.twitter)) {
    if(!Validator.isURL(data.twitter)) {
      errors.twitter = 'Not a valid webURL';
    }
  }
  if(!isEmpty(data.facebook)) {
    if(!Validator.isURL(data.facebook)) {
      errors.facebook = 'Not a valid webURL';
    }
  }
  if(!isEmpty(data.instagram)) {
    if(!Validator.isURL(data.instagram)) {
      errors.instagram = 'Not a valid webURL';
    }
  }
  if(!isEmpty(data.linkedin)) {
    if(!Validator.isURL(data.linkedin)) {
      errors.linkedin = 'Not a valid webURL';
    }
  }
  if(!isEmpty(data.tumblr)) {
    if(!Validator.isURL(data.tumblr)) {
      errors.tumblr = 'Not a valid webURL';
    }
  }
  if(!isEmpty(data.pinterest)) {
    if(!Validator.isURL(data.pinterest)) {
      errors.pinterest = 'Not a valid webURL';
    }
  }
  if(!isEmpty(data.github)) {
    if(!Validator.isURL(data.github)) {
      errors.github = 'Not a valid webURL';
    }
  }
  if(!isEmpty(data.personal)) {
    if(!Validator.isURL(data.personal)) {
      errors.personal = 'Not a valid webURL';
    }
  }
  //return all the errors
  return {
    errors,
    isValid : isEmpty(errors)
  };
};
