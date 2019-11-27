// Load User model
const User = require('../models/User');
const UserFriendService = require('../services/userFriendService')
const UserAuthService = require('../services/userAuthService')
const Item = require('../models/Item');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const krakenService = require('../utils/krakenService')

const secretOrKey = process.env.SECRET_OR_KEY;

exports.registerUser = (req, res) => {
  const {name, email, password} = req.body
  let registeredUser = UserAuthService.registerUser(name, email, password)
  res.json({user: registeredUser})
}

exports.getUser = async (req, res) => {
  const responce = await findUserBy({_id: req.params.id})
  if (!responce.error) {
    res.json(responce);

  } else {
    res.status(404).json(responce);
  }
}

exports.loginUser = async (req, res) => {
  const {email, password} = req.body

  User.findOne({email})
  .select('-conversations, -items')
  .exec((err, user) => {
    // Check for user
    if (!user) {
      return res.status(404).json({email: 'User not found'});
    }

    bcrypt.compare(password, user.password)
      .then(isMatch => {
        if (isMatch) {
          // User Matched
          const payload = { _id: user.id }; // Create JWT Payload
          // Sign Token
          jwt.sign(
            payload,
            secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token,
                user
              });
            }
          );
        } else {
          return res.status(400).json({password: "Password Incorrect"});
        }
      })
  })
}

exports.editUser = async (req, res) => {
  const user = await User.findById(req.params.id)

  for( key in req.body) {
    user[key] = req.body[key]
  }  

  const image = req.file

  if(image) {
    // krakenService.compressImage(image.path, () => {
      user.avatar = image.path
    // })    
  }

  user.save()
  .then(user => {
    res.json({user})
  })
}

exports.updateCoverPhoto = async (req, res) => {
  const user = await User.findById(req.params.id)
  const image = req.file
  if(image) {
    let S3BasePath = `users/${user.id}/coverPhoto`
    krakenService.compressImage(image.path, S3BasePath, responce => {
      user.coverPhoto = responce
      user.save()
      .then(user => {
        // undo hardcoded value later 
        // delete file from uploads folder after its saved to db
        res.json({_id: user.id, coverPhoto: user.coverPhoto[1]})
      })
    })    
  }
}

exports.addFriend = async (req, res) => {
  let {id} = req.params
  let {friendId} = req.body
  let addedFriend = await UserFriendService.addFriend(id, friendId)
  console.log('this is', addedFriend)
  res.json({message: addedFriend})
}

exports.acceptFriend = async (req, res) => {
  const {id} = req.params
  let {friendId} = req.body

  let acceptRecord = await UserFriendService.acceptFriend(id, friendId)
  res.json({
    message: acceptRecord
  })
}

exports.rejectFriendRequest = async (req, res) => {
  const {id} = req.params
  let {friendId} = req.body
  const rejection = await UserFriendService.rejectFriendRequest(id, friendId)

  res.json({message: rejection})
}

exports.getFriends = async (req, res) => {
  let {id} = req.params
  let userFriends = await UserFriendService.getFriends(id)

  res.json({
    friends: userFriends
  })
}

const findUserBy = (userAttr) => {
  return User.findOne(userAttr)
  .select('-conversations, -items')
  .then(user => {
    if (!user) {
      return {error: 'User not found'};
    }

    console.log(user.friends)
    return user
  })
  .catch(err => {
    return err
  })
}
