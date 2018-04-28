const Validator = require('validator');       //require the validator module to control the input text
const isEmpty = require('./isEmpty');              //import the isEmpty function to check if empty

module.exports = function validateEduInput(data) {
  let errors = {};                          //set errors to an empty object

  //check empty input
  data.school = !isEmpty(data.school) ? data.school : '';          //the isEmpty we create to test, and if empty, set it to a empty string
  data.degree = !isEmpty(data.degree) ? data.degree : '';
  data.major = !isEmpty(data.major) ? data.major : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  //check other requirement
  if(Validator.isEmpty(data.school)) {                         //this is the validator isEmpty function and only check empty strings
    errors.school = 'School name is required';
  }
  if(Validator.isEmpty(data.degree)) {
    errors.degree = 'Degree title is required';
  }
  if(Validator.isEmpty(data.major)) {
    errors.major = 'Major field is required';
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
