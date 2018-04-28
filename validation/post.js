const Validator = require('validator');       //require the validator module to control the input text
const isEmpty = require('./isEmpty');              //import the isEmpty function to check if empty

module.exports = function validatePostInput(data) {
  let errors = {};                          //set errors to an empty object

  //check empty input
  data.text = !isEmpty(data.text) ? data.text : '';          //the isEmpty we create to test, and if empty, set it to a empty string


  if(!Validator.isLength(data.text, {min : 1, max : 1000})) { //check the length of the name
    errors.text = 'Maximum length of the text is 1000 characters';
  }

  //check empty string
  if(Validator.isEmpty(data.text)) {                         //this is the validator isEmpty function and only check empty strings
    errors.text = 'No text submitted';
  }

  //return all the errors
  return {
    errors,
    isValid : isEmpty(errors)
  };
};
