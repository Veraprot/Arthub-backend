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

const user = require('./routes/api/user');
app.use('/users', user)

const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.json({ msg: 'hii' })
})

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    const server = app.listen(port, () => console.log(`Server running on port ${port}`));
    const io = require('./socket').init(server)
    io.on('connection', socket => {
      console.log('client connected')
    });
  })
  .catch(err => console.log(err))

