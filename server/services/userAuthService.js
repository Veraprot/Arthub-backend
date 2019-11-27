const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretOrKey = process.env.SECRET_OR_KEY;

class UserAuthService {
  register(name, email, password) {
    User.findOne({ email }).then(user => {
      if (user) {
        return res.status(400).json({email: 'Email already exists'});
      } else {
        const newUser = new User({
          name,
          email,
          avatar: '',
          password
        });
  
        return bcrypt.genSalt(10, (_, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => user)
              .catch(err => err);
          });
        });
      }
    });
  }
}

module.exports = new UserAuthService()
