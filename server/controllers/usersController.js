// Load User model
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretOrKey = process.env.SECRET_OR_KEY;

exports.testRoute = (req, res) => {
    res.json({mes: 'what do you want'})
}

exports.registerUser = (req, res) => {
  const {name, email, password, avatar} = req.body
  
  // let user = new User({name, email, password, avatar})
  // user.save() 
  //   .then(result => {
  //     res.json({result})
  //   })
  //   .catch(err => {
  //     res.json(err)
  //   })
  User.findOne({ email }).then(user => {
    if (user) {
      return res.status(400).json({error: 'Email already exists'});
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
}

exports.loginUser = (req, res) => {
  const {email, password} = req.body

  User.findOne({email}).then(user => {
    // Check for user
    if (!user) {
      return res.status(404).json({error: 'User not found'});
    }

    console.log(user)
    // check password 

    bcrypt.compare(password, user.password)
      .then(isMatch => {
        if (isMatch) {
          // User Matched
          const payload = { id: user.id, name: user.name, avatar: user.avatar }; // Create JWT Payload
  
          // Sign Token
          jwt.sign(
            payload,
            secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token
              });
            }
          );
        } else {
          errors.password = 'Password incorrect';
          return res.status(400).json(errors);
        }
      })
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
