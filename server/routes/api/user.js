const express = require('express');
const router = express.Router({ mergeParams : true });

const users = require('../../controllers/usersController')

router.post('/register', users.registerUser)

router.post('/login', users.loginUser)

router.patch('/edit', users.editUser)

router.patch('/:id/add-friend', users.addFriend)

router.patch('/:id/accept-friend', users.acceptFriend)

router.get('/friends', users.getFriends)

// router.get('/test', users.test)
module.exports = router