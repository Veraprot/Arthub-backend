const express = require('express');
const router = express.Router();

const users = require('../../controllers/usersController')

router.get('/', users.testRoute)

router.post('/register', users.registerUser)

router.patch('/edit', users.editUser)

module.exports = router