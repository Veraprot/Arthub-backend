const Conversation = require('../models/Conversation');
const Message = require('../models/Message');

const io = require('../socketUtils/socket')

exports.addMessage = async (req, res) => {
  const {userId, content} = req.body
  const {conversationId} = req.params

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
      select: ["_id"]
    }, 
    
    function(err, message) {
      if(err) {
        return
      }

      io.getIO().in(conversationId).emit('message', message)

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