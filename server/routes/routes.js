const express = require('express');
const router = express.Router({ mergeParams : true });
const auth = require("../utils/auth");

const users = require('../controllers/usersController')
const conversations = require('../controllers/conversationsController')
const messages = require('../controllers/messagesController')

//user routes
router.post('/users/register', users.registerUser)
router.post('/users/login', users.loginUser)
router.get('/users/:id', auth, users.getUser)
router.patch('/users/:id/edit', auth, users.editUser)
router.patch('/users/:id/updateCoverPhoto',auth, users.updateCoverPhoto)
router.patch('/users/:id/users/add-friend',auth, users.addFriend)
router.patch('/users/:id/users/accept-friend', auth, users.acceptFriend)
router.get('/users/:id/friends', users.getFriends)

// conversation routes 
router.post('/users/:userId/conversations/create', auth, conversations.create)
router.get('/users/:userId/conversations/', auth, conversations.getUserConversations)

// messages routes 
router.post('/conversations/:conversationId/messages/create', auth, messages.addMessage)
router.get('/conversations/:conversationId/messages/', auth, messages.getMessages)

module.exports = router
