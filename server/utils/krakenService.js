const Kraken = require('kraken')
const fs = require('fs');
const path = require('path');
// const request = require('request');

const kraken = new Kraken({
  api_key: process.env.KRAKEN_API_KEY,
  api_secret: process.env.KRAKEN_API_SECRET
});

exports.compressImage = (imageUrl, S3BasePath, cb) => {
  console.log('this runs')
  const filePath = path.join(__dirname, '..', imageUrl);

  const options = {
    file: fs.createReadStream(filePath), 
    wait: true,
    s3_store: {
      key: process.env.AWS_ACCESS_KEY_ID,
      secret: process.env.AWS_SECRET_ACCESS_KEY,
      bucket: "arthubstore",
      region: process.env.REGION
    },
    resize: [
      {
        id: "small",
        strategy: "fit",
        width: 100,
        height: 100, 
        storage_path: `${S3BasePath}/small`
      },
      {
        id: "medium",
        strategy: "fit",
        width: 300,
        height: 300, 
        storage_path: `${S3BasePath}/medium`
      },
      {
        id: "large",
        strategy: "square",
        size:400, 
        storage_path: `${S3BasePath}/large`
      }
    ]
  }

  kraken.upload(options, async (err, data) => {
    if (err) {
        console.log('Failed. Error message: %s', err);
        cb({err})
    } else {
      let responce = []
      for(let key in data.results) {
        responce.push({
          contentSize: key,
          S3Key: data.results[`${key}`].kraked_url 
        })
      }
      
      cb(responce)
    }
  });
}



