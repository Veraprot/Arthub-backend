const Conversation = require('../models/Conversation');
const User = require('../models/User');
const Message = require('../models/Message');

const io = require('../socket')

exports.addMessage = async (req, res) => {
  const {content} = req.body
  const {userId, conversationId} = req.params

  let message = new Message({
    content, 
    user: userId, 
    conversation: conversationId
  })
  message.save()

  Conversation.findById(conversationId)
    .then(conversation => {
      conversation.messages.push(message._id)
      conversation.save()
    })
  
  Message.populate(
    message, 
    {
      path: "user", 
      select: ["_id", "name", "email", "avatar"]
    }, 
    
    function(err, message) {
      if(err) {
        console.log(err)
        return
      }
      io.getIO().emit('message', message)
      res.json({message})
    }
  )
}

exports.getMessages = (req, res) => {
  const {conversationId} = req.params
  Conversation.findById(conversationId)
    .populate('messages', ['content', 'user'])
    .exec((err, conversation) => {
      res.json(conversation.messages)
    })
}