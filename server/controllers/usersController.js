// Load User model
const User = require('../models/User');

exports.testRoute = (req, res) => {
    res.json({mes: 'what do you want'})
}

exports.registerUser = (req, res) => {
  const {name, email, password, avatar} = req.body

  let user = new User({name, email, password, avatar})
  user.save() 
    .then(result => {
      res.json({result})
    })
    .catch(err => {
      res.json(err)
    })
}

exports.editUser = async (req, res) => {
  let { ...args } = req.body
  const user = await User.findById(req.body.id)

  for( key in req.body) {
    user[key] = req.body[key]
  }

  user.save()
  .then(user => {
    res.json({user})
  })
}