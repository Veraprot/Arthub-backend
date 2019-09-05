const Kraken = require('kraken')
const fs = require('fs');
const path = require('path');

exports.compressImage = (imageUrl) => {
  const kraken = new Kraken({
    api_key: process.env.KRAKEN_API_KEY,
    api_secret: process.env.KRAKEN_API_SECRET
  });

  var filePath = path.join(__dirname, '..', imageUrl);

  const options = {
    file: fs.createReadStream(filePath), 
    wait: true,
    resize: {
      width: 100,
      height: 75,
      strategy: 'crop'
    }
  }

  kraken.upload(options, (err, data) => {
    if (err) {
        console.log('Failed. Error message: %s', err);
    } else {
        console.log('Success. Optimized image URL: %s', data.kraked_url);
    }
  });
}