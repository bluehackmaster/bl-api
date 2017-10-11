var express = require('express');
var router = express.Router();
var db = require('../utils/db')
var Response = require('../utils/response');
var RESP = require('../utils/response_values');
var response = new Response();
var libImage = require('../lib/image');

router.post('/', function (req, res) {
  db.connectDB()
    .then( () => libImage.addImage(req.body))
    .then( (result) => {
      response.responseStatus = RESP.SUCCESS
      response.responseMessage = "Successfully Saved"
      response.data = result
      res.json(response)
    }).catch( function (error) {
    console.error(error)
    response.responseStatus = RESP.FAIL;
    response.responseMessage = error;
    res.json(response)
  })
})

module.exports = router;
