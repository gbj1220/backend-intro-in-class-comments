// requiring in express
var express = require('express');
// setting express.Router() to a variable to use
var router = express.Router();

/* GET home page. */
// sets the pathway to get to the homepage 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// exporting router to be used in different files
module.exports = router;
