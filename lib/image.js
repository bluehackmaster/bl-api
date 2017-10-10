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
      image: data.image,
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

function checkedProject (projectId, body) {
  console.log('updateProject')
  console.log(projectId)

  return new Promise((resolve, reject) => {
    console.log('body export = >' + body.exports.length)
    if (body.exports.length === 0) {
      updateProject(projectId, body)
        .then( (result) => {
          resolve(result);
        })
    } else {
      updateExport(body)
        .then( (data) => updateProject(projectId, data))
        .then( (result) => {
          resolve(result);
        })
    }
  });
}

function updateExport(body) {
  return new Promise((resolve, reject) => {

    var createAt = fetch_unix_timestamp();
    var createExport = new Export({
      uri: body.exports.uri,
      format: body.exports.format,
      createAt: createAt
    })
    createExport.save(function (err, result) {
      if (err) {
        console.log('createExport err =>' + err);
        reject(err);
      }
      var exportId = result._id;
      console.log('exportId=>' + exportId);

      body.exports = exportId;
      console.log('updateExport body =>' + JSON.stringify(body));
      resolve(body);
    })
  });
}

var fetch_unix_timestamp = function() {
  return Math.floor(new Date().getTime() / 1000);
}

function updateProject(projectId, body) {
  return new Promise((resolve, reject) => {
    Project.findOneAndUpdate(
      {"_id": projectId
      },
      {$set: body
      },
      {upsert: false, new: true},
      function(err, data) {
        if (err) {
          console.error(err)
          reject(err)
        }
        // console.log('updateInstance done: ' + instance._id)
        resolve(data)
        // if (data.status == "PASS" || data.status == "FAIL" || data.status == "BROKEN") {
        //   sendNotification(instance)
        // }
      })
  })
}

function updateConnectS3 (projectId, connect) {
  console.log(projectId)
  return new Promise((resolve, reject) => {
    Project.findOneAndUpdate(
      {"_id": projectId},
      {$set: { connect: connect }},
      {upsert: true, new: true},
      function(err, data) {
        if (err) {
          console.error(err)
          reject(err)
        }
        resolve(data)
      })
  })
}

function deleteMember (projectId, userId) {
  return new Promise((resolve, reject) => {
    Project.update({"_id": projectId},
      { "$pull": { "member": userId}},
      { safe: true, multi:true },
      function(err, obj) {
        if (err) {
          reject(err)
        } else {
          console.log(obj)
          let res = {}
          res.msg = `${userId} is successfully deleted`
          res.status = "SUCCESS"
          if (obj.nModified == 0) {
            res.status = "FAIL"
            res.msg = `Can not find ${email}`
          }
          resolve(res)
        }
      });
  })
}

function addMember (projectId, user) {
  return new Promise((resolve, reject) => {
    Project.findOneAndUpdate(
      {"_id": projectId
      },
      {$addToSet: {member: user}
      },
      {upsert: true, new: true},
      function(err, data) {
        if (err) {
          console.error(err)
          reject(err)
        }
        resolve(data)
      })
  })
}

function getProjectByProjectId (id) {
  return new Promise((resolve, reject) => {
    Project.findOne(
      {"_id": id},
      function(err, project) {
        if (err) {
          console.error(err)
          reject(err)
        }
        console.log(project)
        resolve(project)
      }
    )
  })
}

function deleteProjectByProjectId (id) {
  return new Promise((resolve, reject) => {
    Project.findByIdAndRemove(id, function (err, res) {
      if (err) {
        console.error(err)
        reject(err)
      }
      resolve()
    });
  })
}

function getProjectsByUserId (id) {
  return new Promise((resolve, reject) => {
    Project.find(
      {"owner._id": id},
      function(err, projects) {
        if (err) {
          console.error(err)
          reject(err)
        }
        console.log(projects)
        resolve(projects)
      }
    )
  })
}



exports.addImage = addImage
