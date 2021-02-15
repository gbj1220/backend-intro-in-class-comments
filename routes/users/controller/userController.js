// require encryption software into file
const bcrypt = require("bcryptjs");
// requiring in User cookie cutter
const User = require("../model/User");

module.exports = {

  //v4 async and await
  // function saying that if an error is thrown, the user will get a message stating the error otherwise if everything goes through, the user will get a success message returning the foundAllUsers array
  getAllUsersCallback: (req, res) => {
    User.find({}, function (err, foundAllUsers) {
      if (err) {
        res.status(500).json({ message: "Failed", errorMessage: err.message });
      } else {
        res.status(200).json({
          message: "success",
          users: foundAllUsers,
        });
      }
    });
  },

  // function to find all the users
  getAllUsers: async (req, res) => {
    try {
      // {} is saying return the entire object
      const foundAllUsers = await User.find({});
      res.status(200).json({
        message: "success",
        users: foundAllUsers,
      });
    } catch (error) {
      res.status(500).json({
        message: "failure",
        errorMessage: error.message,
      });
    }
  },


  signup: async (req, res) => {
    //destructuring
    const { firstName, lastName, email, password } = req.body;

    // encrypting the password for the user using hash and salt
    try {
      const salted = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salted);

      // for every new user use this format as well as trim all white space
      const createdUser = new User({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password: hashedPassword,
      });

      // saving the user
      let savedUser = await createdUser.save();

      res.status(200).json({
        message: "success",
        user: savedUser,
      });
    } catch (error) {
      res.status(500).json({
        message: "error",
        errorMessage: error.message,
      });
    }
  },

  // gives ability to delete a user given their unique ID
  deleteUserByID: async (req, res) => {
    try {
      let deletedUser = await User.findByIdAndDelete({ _id: req.params.id });

      res.status(200).json({
        message: "successfully deleted",
        deletedUser: deletedUser,
      });
    } catch (error) {
      res.status(500).json({
        message: "error",
        errorMessage: error.message,
      });
    }
  },

  // same as deleteUserByID except using email instead
  deleteUserByEmail: async (req, res) => {
    try {
      let deletedUser = await User.findOneAndDelete({ email: req.body.email });

      res.status(200).json({
        message: "successfully deleted",
        deletedUser: deletedUser,
      });
    } catch (error) {
      res.status(500).json({
        message: "error",
        errorMessage: error.message,
      });
    }
  },

  // PUT request updating user by their unique ID
  updateUserByID: async (req, res) => {
    try {
      let updatedUser = await User.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );

      res.status(200).json({
        message: "successfully updated",
        updatedUser: updatedUser,
      });
    } catch (error) {
      res.status(500).json({
        message: "error",
        errorMessage: error.message,
      });
    }
  },

  // PUT request updating users by their email address
  updateUserByEmail: async (req, res) => {
    try {
      let updatedUser = await User.findOneAndUpdate(
        { email: req.body.email },
        req.body,
        { new: true }
      );
      res.status(200).json({
        message: "successfully updated",
        updatedUser: updatedUser,
      });
    } catch (error) {
      res.status(500).json({
        message: "error",
        errorMessage: error.message,
      });
    }
  },

  // handling login process
  login: async (req, res) => {
    try {
      let foundUser = await User.findOne({ email: req.body.email });
      // looking for user in DB
      if (!foundUser) {
        res.status(404).json({
          message: "failure",
        });

        // comparing the user password in the DB to what is entered by the user
      } else {
        let isPasswordTrue = await bcrypt.compare(
          req.body.password,
          foundUser.password
        );

        if (isPasswordTrue) {
          res.json({
            message: "success",
            successMessage: "Logged In!",
          });
        } else {

          res.status(500).json({
            message: "failure",
            successMessage: "please check your email and password",
          });
        }
      }


    } catch (error) {
      res.status(500).json({
        message: "error",
        errorMessage: error.message,
      });
    }

    //step 1 find the user e.g email
    //step 2 if the user doesn't exists tell
    //send a message back saying 'User not found go
    //go sign up
    //step 3 if the user is found
    //compare the password
    //if the password does not match
    //send a message back saying
    //check your email and password
    //if password matches
    //send a message back saying
    //successfully logged In
  },
};


  //v2 callback
  // signup: (body, callback) => {
  //   bcrypt.genSalt(10, function (err, salt) {
  //     if (err) {
  //       return callback(err, null);
  //     } else {
  //       bcrypt.hash(body.password, salt, function (err, hashedPassword) {
  //         if (err) {
  //           return callback(err, null);
  //         } else {
  //           const createdUser = new User({
  //             firstName: body.firstName,
  //             lastName: body.lastName,
  //             email: body.email,
  //             password: hashedPassword,
  //           });

  //           createdUser.save(function (err, userCreatedInfo) {
  //             if (err) {
  //               return callback(err, null);
  //             } else {
  //               return callback(null, userCreatedInfo);
  //             }
  //           });
  //         }
  //       });
  //     }
  //   });
  // },
  // v3 promises
  // signup: (body) => {
  //   return new Promise((resolve, reject) => {
  //     bcrypt
  //       .genSalt(10)
  //       .then((salt) => {
  //         bcrypt
  //           .hash(body.password, salt)
  //           .then((hashedPassword) => {
  //             const createdUser = new User({
  //               firstName: body.firstName,
  //               lastName: body.lastName,
  //               email: body.email,
  //               password: hashedPassword,
  //             });

  //             createdUser
  //               .save()
  //               .then((savedUser) => {
  //                 resolve(savedUser);
  //               })
  //               .catch((error) => {
  //                 reject(error);
  //               });
  //           })
  //           .catch((error) => {
  //             reject(error);
  //           });
  //       })
  //       .catch((error) => {
  //         reject(error);
  //       });
  //   });
  // },