var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var ObjectId = Schema.Types.ObjectId;

var schema = new Schema({
  name: String,
  host_url: String,
  host_code: String,
  host_name: String,
  tags: [String],
  product_name: String,
  parent_image_raw: String,
  parent_image_mobile: String,
  parent_image_mobile_thumb: String,
  image: String,
  class_code: String,
  bucket: String,
  storage: String,
  format: String, //jpg, png
  product_price: String,
  currency_unit: String,
  product_url: String,
  product_no: String,
  main: Number,
  nation: String
});

class DummyClass {
  // example
  // // `fullName` becomes a virtual
  // get fullName() {
  //   return `${this.firstName} ${this.lastName}`;
  // }
  //
  // set fullName(v) {
  //   const firstSpace = v.indexOf(' ');
  //   this.firstName = v.split(' ')[0];
  //   this.lastName = firstSpace === -1 ? '' : v.substr(firstSpace + 1);
  // }
  //
  // // `getFullName()` becomes a document method
  // getFullName() {
  //   return `${this.firstName} ${this.lastName}`;
  // }
  //
  // // `findByFullName()` becomes a static
  // static findByFullName(name) {
  //   const firstSpace = name.indexOf(' ');
  //   const firstName = name.split(' ')[0];
  //   const lastName = firstSpace === -1 ? '' : name.substr(firstSpace + 1);
  //   return this.findOne({ firstName, lastName });
  // }
}

schema.loadClass(DummyClass);
module.exports = schema;
