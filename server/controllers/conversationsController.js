const Conversation = require('../models/Conversation');
const User = require('../models/User');

const io = require('../socket')

exports.getUserConversations = async (req, res) => {
  const { userId } = req.params

User.findById(userId)
  .select('conversations')
  .populate({
    path: 'conversations',
    populate: {
      path: 'users',
      select: ['_id', 'name']
    }
  })
  .exec((err, user)=> {
    console.log(user)
    res.json(user.conversations)
  })
}

exports.create = (req, res) => {
  const{name, recipient} = req.body
  let users = [req.params.userId, recipient]
  let conversation = new Conversation({
    name, 
    users: []
  });

  users.forEach(user => {
    conversation.users.push(user)

    User.findById(user)
      .then(user => {
        user.conversations.push(conversation)
        user.save()
        console.log(user.conversations)
      })
  })

  conversation.save()
  Conversation.populate(
    conversation, 
    {
      path: "users", 
      select: ["_id", "name", "email", "avatar"]
    }, 

    function(err, conversation) {
    if(err) {
      console.log(err)
      return
    }
    io.getIO().emit('conversation', conversation)
    res.json({conversation})
   });
}