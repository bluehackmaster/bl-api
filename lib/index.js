var Test = require('../models/test');

function insertTest(body) {
  return new Promise((resolve, reject) => {
    var test = new Test({
      test: body.test
    })
    test.save(function (err, result) {
      if (err) {
        console.log('test err =>' + err);
        reject(err);
      }
      console.log('result=>' + result);
      resolve(result);
    })
  })
}

function getTestByTestId(id) {
  return new Promise((resolve, reject) => {
    Test.findOne({
      "_id": id
    }).exec(function (err, data) {
      if (err) {
        console.error(err)
        reject(err)
      }

      console.log('data =>' + data);
      if (data == null) {
        reject('testId is null in test');
      }
      resolve(data)
    })
  })
}

function updateTest(testId, body) {
  return new Promise((resolve, reject) => {
    Test.findOneAndUpdate(
      {
        "_id": testId
      },
      {
        $set: body
      },
      {upsert: true, new: true},
      function (err, data) {
        if (err) {
          console.error(err)
          reject(err);
        } else {
          resolve({testId: testId});
        }
      })
  })
}

function deleteTestByTestId (id) {
  return new Promise((resolve, reject) => {
    Test.findByIdAndRemove(id, function (err, result) {
      if (err) {
        console.error(err)
        reject(err)
      }
      resolve({testId:id});
    });
  })
}

exports.insertTest = insertTest;
exports.getTestByTestId = getTestByTestId;
exports.updateTest = updateTest;
exports.deleteTestByTestId = deleteTestByTestId;