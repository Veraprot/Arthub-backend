const Conversation = require('../models/Conversation');
const User = require('../models/User');
const Message = require('../models/Message');

const io = require('../socket')

exports.addMessage = async (req, res) => {
  const {content} = req.body
  const {userId, conversationId} = req.params

  console.log(content)
  let message = new Message({
    content, 
    user: userId, 
    conversation: conversationId
  })
  message.save()
  io.getIO().emit('message', message)
  res.json(message)
  console.log(message)
}