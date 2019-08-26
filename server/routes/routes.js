const express = require('express');
const router = express.Router({ mergeParams : true });

const users = require('../controllers/usersController')
const conversations = require('../controllers/conversationsController')
const messages = require('../controllers/messagesController')

//user routes
router.post('/users/register', users.registerUser)
router.post('/users/login', users.loginUser)
router.patch('/users/edit', users.editUser)
router.patch('/users/:id/users/add-friend', users.addFriend)
router.patch('/users/:id/users/accept-friend', users.acceptFriend)
router.get('/users/:id/friends', users.getFriends)


// conversation routes 
router.post('/users/:userId/conversations/create', conversations.create)
router.get('/users/:userId/conversations/', conversations.getUserConversations)

// messages routes 
router.post('/conversations/:conversationId/messages/create', messages.addMessage)
router.get('/conversations/:conversationId/messages/', messages.getMessages)

module.exports = router
