const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const express = require('express'),
      app = express(), 
      bodyParser = require('body-parser');
      mongoose = require('mongoose')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS config
var whitelist = ['http://localhost:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// Then pass them to cors:
app.use(cors(corsOptions));

const user = require('./routes/api/user');
app.use('/users', user)

const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.json({ msg: 'hii' })
})

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })

