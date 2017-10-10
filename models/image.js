var mongoose = require('mongoose');
var schema = require('../schemas/image');

var MODEL = 'Image'

mongoose.Promise = global.Promise;
module.exports = mongoose.model(MODEL, schema);
