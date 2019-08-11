const express = require('express');
const router = express.Router();

const users = require('../../controllers/usersController')

router.post('/register', users.registerUser)

router.post('/login', users.loginUser)

router.patch('/edit', users.editUser)

router.patch('/add-friend', users.addFriend)

router.patch('/accept-friend', users.acceptFriend)

router.get('/friends', users.getFriends)

module.exports = router