const express = require('express');
const router = express.Router();

const users = require('../../controllers/usersController')

router.post('/register', users.registerUser)

router.post('/login', users.loginUser)

router.patch('/edit', users.editUser)

router.patch('/add-friend', users.addFriend)

router.post('/friends', users.getFriends)

router.patch('/accept-friend', users.acceptFriend)

module.exports = router