var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var schema = require('../schemas/test');

module.exports = mongoose.model('Test', schema);
