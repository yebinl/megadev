const Validator = require('validator');       //require the validator module to control the input text
const isEmpty = require('./isEmpty');              //import the isEmpty function to check if empty

module.exports = function validateExpInput(data) {
  let errors = {};                          //set errors to an empty object

  //check empty input
  data.title = !isEmpty(data.title) ? data.title : '';          //the isEmpty we create to test, and if empty, set it to a empty string
  data.company = !isEmpty(data.company) ? data.company : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  //check other requirement
  if(Validator.isEmpty(data.title)) {                         //this is the validator isEmpty function and only check empty strings
    errors.title = 'Job title is required';
  }
  if(Validator.isEmpty(data.company)) {
    errors.company = 'Company name is required';
  }
  if(Validator.isEmpty(data.from)) {
    errors.from = 'Start time is required';
  }

  //return all the errors
  return {
    errors,
    isValid : isEmpty(errors)
  };
};
