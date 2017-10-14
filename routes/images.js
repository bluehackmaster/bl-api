var express = require('express');
var router = express.Router();
var db = require('../utils/db')
var BlResponse = require('../utils/BlResponse');
var libImage = require('../lib/image');

router.post('/', function (req, res) {
  var response = new BlResponse();
  db.connectDB()
    .then( () => libImage.addImage(req.body))
    .then( (data) => {
      response.code = 200;
      response.data = data;
      res.json(response.create())
    }).catch( function (error) {
    console.error(error)
    response.code = 500;
    response.message = error;
    res.json(response.create())
  })
})

router.get('/:imageId', function(req, res){

  var imageId = req.params.imageId;
  console.log('imageId =>' + imageId);
  var response = new BlResponse();

  if (imageId == null || imageId == undefined) {
    response.code = 400;
    response.message = "imageId is undefined";
    res.json(response.create())
    return
  }

  db.connectDB()
    .then( () => libImage.getImage(req.params.imageId))
    .then( (data) => {
      response.code = 200;
      response.data = data;
      res.json(response.create())
    }).catch( function (error) {
      console.error(error)
      response.code = 500;
      response.message = error;
      res.json(response.create())
  })
});

module.exports = router;
