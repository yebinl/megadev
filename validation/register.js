const Validator = require('validator');       //require the validator module to control the input text
const isEmpty = require('./isEmpty');              //import the isEmpty function to check if empty

module.exports = function validateRegisterInput(data) {
  let errors = {};                          //set errors to an empty object

  //check empty input
  data.name = !isEmpty(data.name) ? data.name : '';   //the isEmpty we create to test, and if empty, set it to a empty string
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  //check other requirement
  if(!Validator.isLength(data.name, {min : 2, max : 30})) { //check the length of the name
    errors.name = 'Name must be between 2 and 30 characters';
  }
  if(!Validator.isEmail(data.email)) {                       //check for the email address
    errors.email = 'Invalid Email address';
  }
  if(!Validator.isLength(data.password, {min : 8, max : 50})) { //check the length of the name
    errors.password = 'Password must be at least 8 characters long';
  }
  if(!Validator.equals(data.password, data.password2)) { //check the length of the name
    errors.password2 = 'Passwords don\'t match';
  }

  //check empty string
  if(Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';           //this is the validator isEmpty function and only check empty strings
  }
  if(Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }
  if(Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }
  if(Validator.isEmpty(data.password2)) {
    errors.password2 = 'Password confirm field is required';
  }

  //return all the errors
  return {
    errors,
    isValid : isEmpty(errors)
  };
};
