const Kraken = require('kraken')
const fs = require('fs');
const path = require('path');
const request = require('request');

exports.compressImage = (imageUrl, cb) => {
  console.log('this runs')
  const kraken = new Kraken({
    api_key: process.env.KRAKEN_API_KEY,
    api_secret: process.env.KRAKEN_API_SECRET
  });

  const filePath = path.join(__dirname, '..', imageUrl);

  const options = {
    file: fs.createReadStream(filePath), 
    wait: true,
    resize: [
      {
            id: "small",
            strategy: "fit",
            width: 100,
            height: 100
        },
        {
            id: "medium",
            strategy: "fit",
            width: 300,
            height: 300
        },
        {
          id: "large",
          strategy: "square",
          size:400
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

