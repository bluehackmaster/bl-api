var config = require('../config.json');
var Image = require('../models/image');

function addImage (data) {
  console.log('addImage')
  console.log(data)

  return new Promise((resolve, reject) => {
    var image = new Image({
      host_url: data.host_url,
      host_code: data.host_code,
      host_name: data.host_name,
      tags: data.tags,
      product_name: data.product_name,
      parent_image_raw: data.parent_image_raw,
      parent_image_mobile: data.parent_image_mobile,
      parent_image_mobile_thumb: data.parent_image_mobile_thumb,
      class_code: data.class_code,
      format: data.format,
      product_price: data.product_price,
      currency_unit: data.currency_unit,
      product_url: data.product_url,
      product_no: data.product_no,
      main: data.main,
      nation: data.nation
    })
    console.log('image =>' + image);
    image.save(function (err, result) {
      if (err) {
        console.log('Saving image err =>' + err);
        reject(err);
      }
      console.log(result)
      resolve(result)
    })
  })
}

function getImage (imageId) {
  return new Promise((resolve, reject) => {
    Image.findOne({"_id": imageId})
      .exec(function(err, image) {
          if (err) {
            console.error(err)
            reject(err)
          }
          console.log("res: getImage")
          console.log(image)
          image.image = 's3://' + config.s3.OBJECT_IMG_BUCKET + '/' + image.class_code + '/' + image._id + '.' + image.format
          resolve(image)
        }
      )
  })
}


var fetch_unix_timestamp = function() {
  return Math.floor(new Date().getTime() / 1000);
}



exports.addImage = addImage
exports.getImage =getImage
