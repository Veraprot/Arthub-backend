const express = require('express');
const router = express.Router();

const conversations = require('../../controllers/conversationsController')

router.post('/create', conversations.create)

module.exports = router