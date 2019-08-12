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

  conversation.save()
  Conversation.populate(
    conversation, 
    {
      path: "recipients.recipient", 
      select: ["name", "email", "avatar"]
    }, 

    function(err, conversation) {
    if(err) {
      console.log(err)
      return;
    }
    res.json({conversation})
   });
}