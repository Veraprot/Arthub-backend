const express = require('express');
const router = express.Router({ mergeParams : true });

const messages = require('../../controllers/messagesController')

router.post('/create', messages.addMessage)

router.get('/', messages.getMessages)

module.exports = router