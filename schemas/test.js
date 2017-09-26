var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scheduleSchema = new Schema({
  test: String,
});

module.exports = scheduleSchema;
