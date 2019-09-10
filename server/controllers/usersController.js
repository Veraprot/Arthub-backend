// Load User model
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const krakenService = require('../utils/krakenService')

const secretOrKey = process.env.SECRET_OR_KEY;

exports.registerUser = (req, res) => {
  const {name, email, password} = req.body
  User.findOne({ email }).then(user => {
    if (user) {
      return res.status(400).json({error: 'Email already exists'});
    } else {
      const newUser = new User({
        name,
        email,
        avatar: '',
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

const findUserBy = (userAttr) => {
  return User.findOne(userAttr)
  .select('-conversations, -items')
  .populate('friends.user', ['name', 'email', 'avatar'])
  .then(user => {
    if (!user) {
      return {error: 'User not found'};
    }

    return user
  })
}

exports.getUser = async (req, res) => {
  const responce = await findUserBy({_id: req.params.id})

  if (!responce.error) {
    res.json(responce);

  } else {
    res.status(404).json(responce);
  }
}

exports.loginUser = (req, res) => {
  const {email, password} = req.body
  User.findOne({email})
  .select('-conversations, -items')
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
          errors.password = 'Password incorrect';
          return res.status(400).json(errors);
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
    //   user.avatar = image.path
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
    krakenService.compressImage(image.path, responce => {
      user.coverPhoto = responce

      user.save()
      .then(user => {
        // undo hardcoded value later 
        // delete file from uploads folder after its saved to db
        res.json({_id: user.id, coverPhoto: user.coverPhoto[2]})
      })
    })    
  }
}

// exports.getCoverPhoto = async (req, res) => {
//   const user = await User.findById(req.params.id)
//   let data = fs.readFileSync(user.coverPhoto[0].data)
//   console.log(data)
// }

exports.addFriend = async (req, res) => {
  let {id} = req.params
  let {friendId} = req.body

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
  const {id} = req.params
  let {friendId} = req.body

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
  let {id} = req.params

  User.findById(id)
    .populate('friends.user', ['name', 'email', 'avatar'])
    .exec((error, user) => {
      res.json({user})
  })
}
