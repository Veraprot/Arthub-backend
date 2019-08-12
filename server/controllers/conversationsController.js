const Conversation = require('../models/Conversation');
const User = require('../models/User');

const io = require('../socket')

exports.create = (req, res) => {
  const{name, recipient} = req.body
  console.log(recipient)

  let conversation = new Conversation({
    name, 
    users: []
  });

  recipient.forEach(user => {
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