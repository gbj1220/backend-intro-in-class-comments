// using an API built into node to check for errors and log a message back to user
const createError = require("http-errors");

// requiring in express to be used in file 
const express = require("express");

// requiring in path to be used in file 
const path = require("path");

// requiring in the cookieParser to be used in file
const cookieParser = require("cookie-parser");

// requiring in morgan to be used in file
const logger = require("morgan");

// requiring in mongoose to connect us to mongoDB
const mongoose = require("mongoose");

// using mongoose to actually connect us to the database
mongoose
  .connect("mongodb://localhost:27017/backend-intro", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  // setting a message to be displayed in terminal so we know everything is up and running without any errors
  .then(() => {
    console.log("MONGO DB CONNECTED");
  })

  // using .catch to catch any error and display them to us, the developer
  .catch((e) => {
    console.log(e);
  });

// setting a variable to the path of our index
const indexRouter = require("./routes/index");

// setting a variable to the path of our users.js folder
const usersRouter = require("./routes/users/users");

// setting app variable in order to use express which we already required in at top of the file 
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// tells logger how much information to send to server if I am not mistaken 
app.use(logger("dev"));

// parses json objects so they can be returned to database
app.use(express.json());

// not sure exactly what this does but I know it has something to do with last line
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
