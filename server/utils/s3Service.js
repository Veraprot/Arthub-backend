let AWS = require('aws-sdk');
AWS.config.update({
  region: process.env.REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

exports.S3Upload = (ACL = "public-read", bucket, filename, file) => {
  let s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: {Bucket: bucket},
  });

  let uploadObj = {
    Key: filename,
    Body: file,
    ContentType: "image/jpg", 
    ACL: "public-read"
  };

  s3.upload(uploadObj, function(err, data) {
    if (err) {
      // console.log("error", err)
      reject(null);
    }
    // console.log("data", data)
    resolve(data);
  });
}