const Conversation = require('../models/Conversation');
const User = require('../models/User');

const io = require('../socket')

exports.getUserConversations = (req, res) => {
  const {id} = req.body
  console.log('here', req.params.userId)
  User.findById(id)
    .then(user => console.log(user))
}

exports.create = (req, res) => {
  const{name, recipient} = req.body
  let users = [req.params.userId, ...recipient]
  let conversation = new Conversation({
    name, 
    users: []
  });

  users.forEach(user => {
    conversation.users.push({user})

    User.findById(user)
      .then(user => {
        user.conversations.push({conversation})
        user.save()
      })
  })

  conversation.save()
  Conversation.populate(
    conversation, 
    {
      path: "users.user", 
      select: ["name", "email", "avatar"]
    }, 

    function(err, conversation) {
    if(err) {
      console.log(err)
      return
    }
    io.getIO().emit('conversation', {conversation: conversation})
    res.json({conversation})
   });
}