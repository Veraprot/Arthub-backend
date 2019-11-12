const express = require('express');
const router = express.Router({ mergeParams : true });
const auth = require("../utils/auth");

const users = require('../controllers/usersController')
const conversations = require('../controllers/conversationsController')
const messages = require('../controllers/messagesController')
const items = require('../controllers/itemsController')

const {
  getUser,
  editUser,
  registerUser,
  loginUser,
  updateCoverPhoto,
  addFriend,
  acceptFriend,
  getFriends
} = require('../controllers/usersController')
//USER 

router.route('/users')
  .post(registerUser)
  
router.post('/users/register', users.registerUser)
router.post('/users/login', loginUser)

// router.get('/users/:id', auth, users.getUser)
router.route('/users/:id') 
  .get(getUser)
  .patch(users.editUser)

router.patch('/users/:id/updateCoverPhoto',auth, users.updateCoverPhoto)

// Adding Friends 
router.patch('/users/:id/add-friend', auth, users.addFriend)
router.patch('/users/:id/accept-friend', auth, users.acceptFriend)
router.get('/users/:id/friends', auth, users.getFriends)

// CONVERSATION  
router.post('/users/:userId/conversations/create', auth, conversations.create)
router.get('/users/:userId/conversations/', auth, conversations.getUserConversations)

// MESSAGES  
router.post('/conversations/:conversationId/messages/create', auth, messages.addMessage)
router.get('/conversations/:conversationId/messages/', auth, messages.getMessages)

// ITEMS
router.get('/users/:id/items', items.userItems)
router.post('/users/:id/items', items.createItem)

module.exports = router
