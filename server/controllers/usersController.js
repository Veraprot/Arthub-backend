// Load User model
const User = require('../models/User');
const passwordConfirmation = require('../utils/validation/passwordHelper')

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

exports.loginUser = (req, res) => {
  const {email, password} = req.body

  User.findOne({email}).then(user => {
    // Check for user
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }

    console.log(user)
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
