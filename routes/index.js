var express = require('express');
var router = express.Router();
var db = require('../utils/db')
var blIndex = require('../lib/index');
var Response = require('../utils/response');
var BlResponse = require('../utils/BlResponse')

router.post('/', function(req, res){

  db.connectDB()
    .then( () => blIndex.insertTest(req.body))
    .then( (result) => {
      var blResponse = new BlResponse();
      blResponse.code = 200;
      blResponse.data = result;
      res.json(blResponse.create())
    }).catch( function (error) {
    console.error(error)
    var blResponse = new BlResponse();
    blResponse.code = 500;
    blResponse.message = error;
    res.json(blResponse.create())
  })
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:testId', function(req, res) {
  var testId = req.params.testId;
  console.log('testId =>' + testId);

  if (testId == null ||
    testId == undefined) {

    var blResponse = new BlResponse();
    blResponse.code = 400;
    blResponse.message = "testId is invalid";
    res.json(blResponse.create())
  } else {
    db.connectDB()
      .then( () => blIndex.getTestByTestId(testId))
      .then( (result) => {

        var blResponse = new BlResponse();
        blResponse.code = 200;
        blResponse.data = result;
        res.json(blResponse.create())

      }).catch( function (error) {
      console.error(error)
      var blResponse = new BlResponse();
      blResponse.code = 500;
      blResponse.message = error;
      res.json(blResponse.create())
    })
  }
});

router.put('/:testId', function (req, res) {
  var testId = req.params.testId;

  if (testId == null ||
    testId == undefined) {

    var blResponse = new BlResponse();
    blResponse.code = 400;
    blResponse.message = "testId is invalid";
    res.json(blResponse.create())
  }

  db.connectDB()
    .then( () => blIndex.updateTest(testId, req.body))
    .then( (result) => {
      var blResponse = new BlResponse();
      blResponse.code = 200;
      blResponse.data = result;
      res.json(blResponse.create())
    }).catch( function (error) {
    console.error(error)
    var blResponse = new BlResponse();
    blResponse.code = 500;
    blResponse.message = error;
    res.json(blResponse.create())
  })
})

router.delete('/:testId', function(req, res){

  var testId = req.params.testId;
  console.log('testId =>' + testId);

  if (testId == null ||
    testId == undefined) {

    var blResponse = new BlResponse();
    blResponse.code = 400;
    blResponse.message = "testId is invalid";
    res.json(blResponse.create())
  }

  db.connectDB()
    .then( () => blIndex.deleteTestByTestId(testId))
    .then( (data) => {
      var blResponse = new BlResponse();
      blResponse.code = 200;
      blResponse.data = data;
      res.json(blResponse.create())
    }).catch( function (error) {
    console.error(error)
    var blResponse = new BlResponse();
    blResponse.code = 500;
    blResponse.message = error;
    res.json(blResponse.create())
  })
});

module.exports = router;
