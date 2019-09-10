const Kraken = require('kraken')
const fs = require('fs');
const path = require('path');
const request = require('request');

const kraken = new Kraken({
  api_key: process.env.KRAKEN_API_KEY,
  api_secret: process.env.KRAKEN_API_SECRET
});

exports.compressImage = (imageUrl, cb) => {
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
            storage_path: 'small'
        },
        {
            id: "medium",
            strategy: "fit",
            width: 300,
            height: 300, 
            storage_path: 'medium'
        },
        {
          id: "large",
          strategy: "square",
          size:400, 
          storage_path: 'large'
        }
      ]
  }

  kraken.upload(options, async (err, data) => {
    if (err) {
        console.log('Failed. Error message: %s', err);
        cb({err})
    } else {
      let responsePromises = []
      
      for(let key in data.results) {
        responsePromises.push(getImage(key, data))
      }

      Promise.all(responsePromises)
        .then(results => cb(results))
    }
  });
}

const getImage = async (key, data) => {
  return new Promise((resolve, reject) => {
    request(
      {
        url: data.results[`${key}`].kraked_url, 
        encoding: 'binary'
      }, 
      (err, res, body) => {
        if (!err && res.statusCode === 200) {
          body = new Buffer(body, 'binary');
          
          // rename contentType late to match image file types 
          resolve({
              size: key, 
              data: body, 
              contentType: 'jpg'
          })
        } else {
          reject(Error(request.statusText))
        }
      }
    );
  })
}


