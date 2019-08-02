const dotenv = require('dotenv');
dotenv.config();

const express = require('express'),
      app = express(), 
      bodyParser = require('body-parser');
      mongoose = require('mongoose')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const user = require('./routes/user');
app.use('/user', user)

const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.json({ msg: 'hii' })
})

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })

