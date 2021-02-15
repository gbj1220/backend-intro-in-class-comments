// setting variable to require express into the file
var express = require("express");

// using var from above to assign a new variable to what was required.router to be used later 
var router = express.Router();
// const bcrypt = require("bcryptjs");
// const User = require("./model/User");
// requiring in all of our logic from the userController file
const {

  // function to find all users in database
  getAllUsers,

  // function to check if signup parameters are ok to proceed with
  signup,

  // function to check if login parameters are ok to proceed with
  login,

  // function to find a user by their email address and then delete that user
  deleteUserByEmail,

  // function to find a user by their ID and then delete that user
  deleteUserByID,

  // function to find and update a users information using their unique ID
  updateUserByID,

  // function to find and update a users information using their email address
  updateUserByEmail,
} = require("./controller/userController");

// requiring in checkSignupInputIsEmpty function to be used in this file
const { checkSignupInputIsEmpty } = require("./lib/checkSignup");

// requiring in checkSignupDataType function to be used in this file
const { checkSignupDataType } = require("./lib/checkSignupDataType");

// requiring in checkLoginEmptyMiddleware & checkEmailFormat to be used in this file
const {
  checkLoginEmptyMiddleware,
  checkEmailFormat,
} = require("./lib/checkLogin");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  res.send("something");
});

//v1
// router.post("/create-user", function (req, res) {
//   const createdUser = new User({
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     email: req.body.email,
//     password: req.body.password,
//   });
//   createdUser.save(function (err, userCreated) {
//     if (err) {
//       res.status(400).json({
//         message: "ERROR",
//         errMessage: err.message,
//       });
//     } else {
//       res.status(200).json({
//         message: "User Created",
//         user: userCreated,
//       });
//     }
//   });
// });

//v2 callback
// router.post("/create-user", function (req, res) {
//   userController.signup(req.body, function (err, createdUser) {
//     if (err) {
//       res.status(400).json({
//         message: "ERROR",
//         errMessage: err.message,
//         user: createdUser,
//       });
//     } else {
//       res.status(200).json({
//         message: "User Created",
//         user: createdUser,
//       });
//     }
//   });
// });

//v3 promises
// router.post("/create-user", function (req, res) {
//   userController
//     .signup(req.body)
//     .then((createdUser) => {
//       res.status(200).json({
//         message: "User Created",
//         user: createdUser,
//       });
//     })
//     .catch((error) => {
//       res.status(400).json({
//         message: "ERROR",
//         errMessage: error.message,
//       });
//     });
// });

// setting the get request path to find all the users in the database
router.get("/get-all-users", getAllUsers);

//v4 async and await
// setting the post request path to create a new user. It is using our methods to check for formatting issues
router.post(
  "/create-user",
  checkSignupInputIsEmpty,
  checkSignupDataType,
  signup
);

// login
// setting path for log in
router.post("/login", checkLoginEmptyMiddleware, checkEmailFormat, login);

// delete user by id
// setting path to be able to delete user by their unique ID
router.delete("/delete-user-by-id/:id", deleteUserByID);

// delete user by email
// setting path to be able to delete user by their email address
router.delete("/delete-user-by-email", deleteUserByEmail);

// update user by id
// setting put request route in order to be able to update items in the database using users unique ID
router.put("/update-user-by-id/:id", updateUserByID);

// update user by email
// setting put request route in order to be able to update items in the database using users email
// router.put("/update-user-by-email/:email", userController.updateUserByEmail);
router.put("/update-user-by-email/", updateUserByEmail);

// exporting everything from this page in order to use it in different files
module.exports = router;
