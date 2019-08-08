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
  User.findOne({email}).then(user => {
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

  user.friendRequests.unshift({ user: friendId });
  let updatedUser = user.save()

  friend.friendInvitations.unshift({user: id})
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
  let {id, invitorId} = req.body

  let user = await User.findById(id)
  let invitor = await User.findById(invitorId)

  const inviteReferenceIndex = user.friendInvitations
    .map(invitation => invitation.user.toString())
    .indexOf(invitorId);

  const inviteReference = user.friendInvitations[inviteReferenceIndex]

  user.friendInvitations.splice(inviteReferenceIndex, 1);
  user.friends.push(inviteReference)

  const requestReferenceIndex = invitor.friendRequests
  .map(request => request.user.toString())
  .indexOf(id);

  const requestReference = invitor.friendRequests[requestReferenceIndex]

  invitor.friendRequests.splice(requestReferenceIndex, 1);
  invitor.friends.push(requestReference)

  let updatedUser = user.save()
  let updatedInvitor = invitor.save()

  Promise.all([updatedUser, updatedInvitor])
  .then(() => {
    res.json({
      message: 'friend request accepted'
    })
  })
}
