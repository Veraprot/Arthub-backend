const dotenv = require('dotenv');
const cors = require('cors');
const imagePath = require('./utils/imagePath')
const krakenService = require('./utils/krakenService')
dotenv.config();
const path = require('path');

const express = require('express'),
      app = express(), 
      bodyParser = require('body-parser');
      mongoose = require('mongoose');
      multer = require('multer')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    console.log(imagePath.generate(file.originalname))
    cb(null, imagePath.generate(file.originalname))
  }
})

const fileFilter = (req, file, cb) => {
  if ( 
    file.mimetype == "image/png" || 
    file.mimetype == "image/jpg" || 
    file.mimetype == "image/jpeg" 
  ) {
    cb(null, true)
  } else {
    cb(null, false)

  }
}

app.use(multer({storage: fileStorage, fileFilter}).single('image'))

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 
}

app.use(cors(corsOptions));

const routes = require('./routes/routes');
app.use('/api/', routes)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
