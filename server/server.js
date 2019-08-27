const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const express = require('express'),
      app = express(), 
      bodyParser = require('body-parser');
      mongoose = require('mongoose')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 
}

app.use(cors(corsOptions));

const routes = require('./routes/routes');
app.use('/api/', routes)

const port = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    const server = app.listen(port);
    const io = require('./socketUtils/socket').init(server)
    const socketOps = require('./socketUtils/socketOps')
    socketOps.allSocketOps(io)

  })
  .catch(err => console.log(err))

  // todo notes 
  // add auth on backend 
  // add message batches 
  // add friends functionality on front end 
  // upload images
  // search people
  // deploy?
