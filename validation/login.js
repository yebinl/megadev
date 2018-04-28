const Validator = require('validator');       //require the validator module to control the input text
const isEmpty = require('./isEmpty');              //import the isEmpty function to check if empty

module.exports = function validateLoginInput(data) {
  let errors = {};                          //set errors to an empty object

  //check empty input
  data.email = !isEmpty(data.email) ? data.email : '';          //the isEmpty we create to test, and if empty, set it to a empty string
  data.password = !isEmpty(data.password) ? data.password : '';

  //check other requirement
  if(!Validator.isEmail(data.email)) {                       //check for the email address
    errors.email = 'Invalid Email address';
  }
  if(!Validator.isLength(data.password, {min : 8, max : 50})) { //check the length of the name
    errors.password = 'Password must be at least 8 characters long';
  }

  //check empty string
  if(Validator.isEmpty(data.email)) {                         //this is the validator isEmpty function and only check empty strings
    errors.email = 'Email field is required';
  }
  if(Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  //return all the errors
  return {
    errors,
    isValid : isEmpty(errors)
  };
};
