// Load User model
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretOrKey = process.env.SECRET_OR_KEY;

exports.registerUser = (req, res) => {
  const {name, email, password, avatar} = req.body

  User.findOne({ email }).then(user => {
    if (user) {
      return res.status(400).json({error: 'Email already exists'});
    } else {
      const newUser = new User({
        name,
        email,
        avatar,
        password
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
  User.findOne({email})
  .select('-conversations')
  .populate('friends.user', ['name', 'email', 'avatar'])
  .exec((err, user) => {
    // Check for user
    if (!user) {
      return res.status(404).json({error: 'User not found'});
    }

    // check password 
    bcrypt.compare(password, user.password)
      .then(isMatch => {
        if (isMatch) {
          // User Matched
          const payload = { user }; // Create JWT Payload
  
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
  const user = await User.findById(req.body.id)

  for( key in req.body) {
    user[key] = req.body[key]
  }

  user.save()
  .then(user => {
    res.json({user})
  })
}

exports.addFriend = async (req, res) => {
  let {id, friendId} = req.body

  let user = await User.findById(id)
  let friend = await User.findById(friendId)

  user.friends.unshift({ user: friendId, status: 'requested' });
  let updatedUser = user.save()


  friend.friends.unshift({user: id, status: 'pending'})
  let updatedFriend = friend.save()
  
  Promise.all([updatedUser, updatedFriend])
    .then(() => {
      res.json({
        message: 'friend request sent'
      })
    })
}


exports.acceptFriend = async (req, res) => {
  // please refactor this 
  // also you can accept friend request yourself right now which defeats the purpose of all this IDIOT
  let {id, friendId} = req.body

  let user = await User.findById(id)
  let friend = await User.findById(friendId)

  let userFriendRef = user.friends.find(userFriends => userFriends.user.toString() === friendId)

  let friendsFriendRef = friend.friends.find(friend => friend.user.toString() === id)

  userFriendRef.status = 'accepted'
  friendsFriendRef.status = 'accepted'

  updatedUser = user.save()
  updatedFriend = friend.save()

  Promise.all([updatedUser, updatedFriend])
  .then(() => {
    res.json({
      message: 'friend request accepted'
    })
  })
}

exports.getFriends = async (req, res) => {
  let {id} = req.body

  User.findById(id)
    .populate('friends.user', ['name', 'email', 'avatar'])
    .exec((error, user) => {
      res.json({user})
  })
}
