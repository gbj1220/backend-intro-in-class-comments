// requiring in our authMethods file so that we can use the methods within this file
const { checkIsEmpty, checkIsEmail } = require("./authMethods.js");

// this is middleware that we created to check if any login fields are empty
function checkLoginEmptyMiddleware(req, res, next) {

  // declaring a new object 
  let errorObj = {};
  
  // setting checkedEmail variable to false
  let checkedEmail = false;
  
  // refactoring object, basically adding req.body to the beginning of whatever is passed in the curly brackets
  const { email, password } = req.body;
  
  // if checkIsEmpty comes back true, an error message will be displayed that the email cannot be empty
  if (checkIsEmpty(email)) {
    errorObj.email = "Email cannot be empty";
    
    // setting checkEmail variable to true
    checkedEmail = true;
  }
  
  // doing the same as above except this time is checking if the password field is empty
  if (checkIsEmpty(password)) {
    errorObj.password = "Password cannot be empty";
  }
  
  // saying if checkedEmail is false, send the user back an error message telling the to format the email correctly
  if (!checkedEmail) {
    if (!checkIsEmail(email)) {
      errorObj.email = "It must be in email format!";
    }
  }
  
  // saying that if any of the objects keys have an error, send back an error with the errorObj
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
function checkEmailFormat(req, res, next) {
  next();
  // let errorObj = {};
  // const { email } = req.body;
  // if (!checkIsEmail(email)) {
  //   errorObj.email = "It must be in email format!";
  // }

  // if (Object.keys(errorObj).length > 0) {
  //   res.status(500).json({
  //     message: "Error",
  //     data: errorObj,
  //   });
  // } else {
  //   //It means go to the next function
  //   next();
  // }
}

module.exports = {
  checkLoginEmptyMiddleware,
  checkEmailFormat,
};
