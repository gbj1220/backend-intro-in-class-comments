// requiring in our authMethods to be used in this file
const { checkIsEmpty } = require("./authMethods");

// declaring function
const checkSignupInputIsEmpty = (req, res, next) => {
  
  // declaring new errorObj
  let errorObj = {};

  // destructuring object to have req.body entered before what is in the curly braces
  const { firstName, lastName, email, password } = req.body;

  // running checkIsEmpty method on firstName parameter to find if the string is empty
  if (checkIsEmpty(firstName)) {
    errorObj.firstName = "First Name cannot be empty";
  }

  // running checkIsEmpty method on lastName parameter to find if the string is empty
  if (checkIsEmpty(lastName)) {
    errorObj.lastName = "Last Name cannot be empty";
  }

  // running checkIsEmpty method on email parameter to find if the string is empty
  if (checkIsEmpty(email)) {
    errorObj.email = "email cannot be empty";
  }

  // running checkIsEmpty method on password parameter to find if the string is empty
  if (checkIsEmpty(password)) {
    errorObj.password = "password cannot be empty";
  }

  // checking if the object has anything in it. If the length is more than 0 an error message will be sent back to the user
  if (Object.keys(errorObj).length > 0) {
    res.status(500).json({
      message: "Error",
      data: errorObj,
    });
  } else {
    //It means go to the next function
    next();
  }
};

// exporting our checks so we can access them in other files
module.exports = {
  checkSignupInputIsEmpty,
};
