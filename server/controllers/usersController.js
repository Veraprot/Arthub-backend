// Load User model
const ObjectId = mongoose.Types.ObjectId;
const User = require('../models/User');
const Item = require('../models/Item');
const Friend = require('../models/Friend');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const krakenService = require('../utils/krakenService')

const secretOrKey = process.env.SECRET_OR_KEY;

exports.registerUser = (req, res) => {
  const {name, email, password} = req.body
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

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => res.json(err));
        });
      });
    }
  });
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

  let user = await User.findById(id)
  let friend = await User.findById(friendId)

  const docA = await Friend.findOneAndUpdate(
    { requester: user, recipient: friend },
    { $set: { status: 1 }},
    { upsert: true, new: true }
  )
  const docB = await Friend.findOneAndUpdate(
      { recipient: user, requester: friend },
      { $set: { status: 2 }},
      { upsert: true, new: true }
  )
  const updatedUser = await User.findOneAndUpdate(
      { _id: user },
      { $push: { friends: docA._id }}
  )
  const updatedFriend = await User.findOneAndUpdate(
      { _id: friend },
      { $push: { friends: docB._id }}
  )

  Promise.all([updatedUser, updatedFriend])
  .then(() => {
    res.json({
      message: 'friend request accepted'
    })
  })
}

exports.acceptFriend = async (req, res) => {
  const {id} = req.params
  let {friendId} = req.body

  let user = await User.findById(id)
  let friend = await User.findById(friendId)

  updatedUser = Friend.findOneAndUpdate(
    { requester: user, recipient: friend },
    { $set: { status: 3 }}
  )
  updatedFriend = Friend.findOneAndUpdate(
      { recipient: user, requester: friend },
      { $set: { status: 3 }}
  )

  Promise.all([updatedUser, updatedFriend])
  .then(() => {
    res.json({
      message: 'friend request accepted'
    })
  })
}

exports.rejectFriendRequest = async (req, res) => {
  const {id} = req.params
  let {friendId} = req.body

  let user = await User.findById(id)
  let friend = await User.findById(friendId)

  const docA = await Friend.findOneAndRemove(
    { requester: user, recipient: friend }
  )
  const docB = await Friend.findOneAndRemove(
    { recipient: user, requester: friend }
  )
  const updatedUser = await User.findOneAndUpdate(
    { _id: user },
    { $pull: { friends: docA._id }}
  )
  const updatedFriend = await User.findOneAndUpdate(
    { _id: friend },
    { $pull: { friends: docB._id }}
  )

  Promise.all([updatedUser, updatedFriend])
  .then(() => {
    res.json({
      message: 'friend request rejected'
    })
  })
}

// exports.getFriends = async (req, res) => {
//   let {id} = req.params
// aggregate match 3 ==> friends 
//   User.findById(id)
//     .populate('friends', ['name', 'email', 'avatar'])
//     .exec((error, user) => {
//       res.json({user})
//   })
// }

// Get all friends and check whether the logged in user is friend of that user or not
exports.getFriends = async (req, res) => {
  let {id} = req.params
  let user = await User.aggregate([
    { "$lookup": {
      "from": Friend.collection.name,
      "let": { "friends": "$friends" },
      "pipeline": [
        { "$match": {
          "recipient": ObjectId(id),
          "$expr": { "$in": [ "$_id", "$$friends" ] }
        }},
        { "$project": { "status": 1 } }
      ],
      "as": "friends"
    }},
    { "$addFields": {
      "friendsStatus": {
        "$ifNull": [ { "$min": "$friends.status" }, 0 ]
      }
    }}
  ])

  res.json({
    user
  })
  console.log(user)
}

const findUserBy = (userAttr) => {
  return User.findOne(userAttr)
  .select('-conversations, -items')
  .populate('friends.user', ['name', 'email', 'avatar'])
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
