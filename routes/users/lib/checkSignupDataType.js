// destructuring object and requiring "validator" to matches & isStrongPassword
const { matches, isStrongPassword } = require("validator");

// destructuring object and requiring "authMethods" to checkForSymbol & checkIsEmail 
const { checkForSymbol, checkIsEmail } = require("./authMethods");

// function used to check if any string contains numbers // REGEX!!!
function checkIfHaveNumber(target) {
  if (matches(target, /[0-9]/g)) {
    return true;
  } else {
    return false;
  }
}

// function used to check the input of the user into the sign up box
function checkSignupDataType(req, res, next) {
  // creating an object to add any future errors to
  let errorObj = {};

  // destructuring object firstName,  lastName, email, and password
  const { firstName, lastName, email, password } = req.body;

  /* using regEx to see if string contains any numbers or special characters  */
  // if (matches(firstName, /[0-9]|[!@#$%^&*()\[\],.?":;{}|<>]/g)) {
  //   errorObj.firstName =
  //     "First Name cannot contains numbers and special characters";
  // }

  /* doing same as about but for lastName instead of firstName */
  // if (matches(lastName, /[0-9]|[!@#$%^&*()\[\],.?":;{}|<>]/g)) {
  //   errorObj.lastName =
  //     "Last Name cannot contains numbers and special characters";
  // }

  // checks if firstName contains any numbers
  if (checkIfHaveNumber(firstName)) {
    errorObj.firstName = "First Name cannot contains numbers";
  }

  // checks if lastName contains any numbers 
  if (checkIfHaveNumber(lastName)) {
    errorObj.lastName = "Last Name cannot contains numbers";
  }

  // checks if firstName contains any special characters
  if (checkForSymbol(firstName)) {
    errorObj.firstName = "First Name cannot contains  special characters";
  }

  // checks if lastName contains any special characters
  if (checkForSymbol(lastName)) {
    errorObj.lastName = "Last Name cannot contains  special characters";
  }

  // checks to make sure the entered email is in the proper email format
  if (!checkIsEmail(email)) {
    errorObj.email = "Email must be in email format!";
  }

  // checks if password is a valid password meeting all criteria
  if (!isStrongPassword(password)) {
    errorObj.password =
      "password must minimum 8 characters and must contain an uppercase, a lower case, a number and special character !@#$%^&*()<>{}";
  }

  // if any of the above become true, the errorObj array will be greater than 0 causing an error message to be sent to the user
  if (Object.keys(errorObj).length > 0) {
    res.status(500).json({
      message: "Error",
      data: errorObj,
    });

  } else {
    //It means go to the next function
    next();
  }
}

// exporting file to be used in other files
module.exports = {
  checkSignupDataType,
};
