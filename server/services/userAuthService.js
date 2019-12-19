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

  signToken(user) {
    return new Promise((resolve, reject) => {
      const payload = {_id: user.id}
      jwt.sign(
        payload, 
        secretOrKey, 
        {expiresIn: 3600}, 
        (err, token) => {
          if(err) {
            reject(err)
          }
          resolve({
            success: true,
            token: 'Bearer ' + token,
            user
          })
        }
      )
    })
  }

  authorizeLogin(password, user) {
    return bcrypt.compare(password, user.password)
      .then(async isMatch => {
        if (isMatch) {
          return await this.signToken(user)
        } else {
          return {password: "password incorrect"}
        }
      })
  }

  async login(email, password) {
    let user = await User.findOne({email})
      if (!user) {
        return res.status(404).json({email: 'User not found'});
      } 
    return this.authorizeLogin(password, user)
      .then(signature => {
        return signature
      })
      .catch(err => {
        return err
      })
  }
}

module.exports = new UserAuthService()
