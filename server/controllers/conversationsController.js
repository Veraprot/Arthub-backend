const Conversation = require('../models/Conversation');

exports.create = (req, res) => {
  const{name, friend} = req.body
  console.log(friend)

  let conversation = new Conversation({
    name, 
    recipients: []
  });

  friend.forEach(recipient => {
    conversation.recipients.push({recipient})
  })

  console.log(conversation)
  conversation.save()
    .then(() => res.json({
      conversation
    }))
}