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

const conversation = require('./routes/api/conversation');
app.use('/users/:userId/conversations', conversation)

const message = require('./routes/api/message');
app.use('/conversations/:conversationId/messages', message)

const port = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    const server = app.listen(port, () => console.log(`Server running on port ${port}`));
    const io = require('./socket').init(server)
    const socketOps = require('./socketOps')
    socketOps.allSocketOps(io)

  })
  .catch(err => console.log(err))

