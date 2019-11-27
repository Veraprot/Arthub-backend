const ObjectId = mongoose.Types.ObjectId;
const User = require('../models/User');

class UserFriendService {
  async addFriend(id, friend_id) {
    let user = await User.findById(id)
    let friend = await User.findById(friend_id)

    user.friends.unshift({ user: friend_id, status: 1 }); //requested
    let updatedUser = user.save()
    friend.friends.unshift({user: id, status: 2})
    let updatedFriend = friend.save()
    return Promise.all([updatedUser, updatedFriend])
    .then(() => {
      console.log('ok')
      return 'friend request sent'
    })
    .catch(err => err)
  }

  async acceptFriend(id, friend_id) {
    let user = await User.findById(id)
    let friend = await User.findById(friend_id)

    let userFriendRef = user.friends.find(userFriends => userFriends.user.toString() === friend_id)

    let friendsFriendRef = friend.friends.find(friend => friend.user.toString() === id)
  
    userFriendRef.status = 3
    friendsFriendRef.status = 3
  
    let updatedUser = user.save()
    let updatedFriend = friend.save()
  
    return Promise.all([updatedUser, updatedFriend])
    .then(() => {
      return 'friend request accepted'
    })
  }

  async rejectFriendRequest(id, friend_id) {
    let user = await User.findById(id)
    let friend = await User.findById(friend_id)
  
    let userFriendRef = user.friends.find(userFriends => userFriends.user.toString() === friend_id)
  
    let friendsFriendRef = friend.friends.find(friend => friend.user.toString() === id)
  
    userFriendRef.status = 0
    friendsFriendRef.status = 0
  
    updatedUser = user.save()
    updatedFriend = friend.save()
  
    return Promise.all([updatedUser, updatedFriend])
    .then(() => {
       return 'friend request rejected'
    })
    .catch(err => {
      return err
    })
  }

  async getFriends(id) {
    let user = await User.aggregate([
      { "$match": { "_id": ObjectId(id) } },
      { "$lookup": {
        "from": User.collection.name,
        "let": { "friends": "$friends" },
        "pipeline": [
          { "$match": {
            "friends.user": ObjectId(id),
            "friends.status": 3,
          }},
          { "$project": { 
              "name": 1, 
              "email": 1,
              "avatar": 1
            }
          }
        ],
        "as": "friends"
      }}, 
    ])

    return user[0].friends
  }
}

module.exports = new UserFriendService()
