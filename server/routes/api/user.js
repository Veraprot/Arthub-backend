const express = require('express');
const router = express.Router();

// Load User model
const User = require('../../models/User');

router.get('/', (req, res) => {
  res.json({mes: 'what do you want'})
})

router.post('/register', (req, res) => {
  // add validation later 
  const {name, email, password, avatar} = req.body

  let user = new User({name, email, password, avatar})
  user.save() 
    .then(result => {
      res.json({result})
    })
    .catch(err => {
      res.json(err)
    })
})

router.patch('/edit', async (req, res) => {
  let { ...args } = req.body
  const user = await User.findById(req.body.id)

  for( key in req.body) {
    user[key] = req.body[key]
  }

  user.save()
  .then(user => {
    res.json({user})
  })
})

module.exports = router