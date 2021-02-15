// this folder holds all the new methods we are making to be passed into the code
const { matches, isEmpty, isEmail } = require("validator");

// function is using regular expressions to check for any special characters 
function checkForSymbol(target) {
  if (matches(target, /[!@#$%^&*()\[\],.?":;{}|<>]/g)) {
    return true;
  } else {
    return false;
  }
}

// function is used to check if whatever is passed in as "target" is empty or not
function checkIsEmpty(target) {
  if (isEmpty(target)) {
    return true;
  } else {
    return false;
  }
}

// function is used to check if the inputted email meets the requirements of a legitimate email address
function checkIsEmail(target) {
  if (isEmail(target)) {
    return true;
  } else {
    return false;
  }
}

// exporting all of these methods so that we can grab require them into any folder we need to use them in
module.exports = {
  checkForSymbol,
  checkIsEmpty,
  checkIsEmail,
};
