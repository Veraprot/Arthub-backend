const Kraken = require('kraken')
const fs = require('fs');
const path = require('path');
const request = require('request');

exports.compressImage = (imageUrl, cb) => {
  const kraken = new Kraken({
    api_key: process.env.KRAKEN_API_KEY,
    api_secret: process.env.KRAKEN_API_SECRET
  });

  const filePath = path.join(__dirname, '..', imageUrl);

  const options = {
    file: fs.createReadStream(filePath), 
    wait: true,
    resize: {
      width: 100,
      height: 75,
      strategy: 'crop'
    }
  }
  console.log(imageUrl)

  kraken.upload(options, (err, data) => {
    if (err) {
        console.log('Failed. Error message: %s', err);
    } else {
        console.log('Success. Optimized image URL: %s', data.kraked_url);
        download(data.kraked_url, imageUrl, () => {
          console.log('done')
        })
    }
    cb()
  });
}

const download = function(uri, filePath, callback){
  request.head(uri, function(err, res, body){
    request(uri).pipe(fs.createWriteStream(filePath)).on('close', callback);
  });
};
