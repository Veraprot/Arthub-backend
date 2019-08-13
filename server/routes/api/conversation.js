const express = require('express');
const router = express.Router({ mergeParams : true });

const conversations = require('../../controllers/conversationsController')

router.post('/create', conversations.create)

router.get('/', conversations.getUserConversations)

module.exports = router