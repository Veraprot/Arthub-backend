const Conversation = require('../models/Conversation');
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
    io.getIO().emit('conversation', {action: 'create', data: conversation})
    res.json({conversation})
   });
}