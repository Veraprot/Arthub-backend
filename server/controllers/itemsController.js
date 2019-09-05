const Item = require('../models/Item');
const User = require('../models/User');
const imagePath = require('../utils/imagePath')

exports.userItems = async (req, res) => {

  User.findById(req.params.id)
  .populate('items', ['description', 'user', 'image'])
  .exec((err, user)=> {
    res.json(user.items)
  })
}

exports.createItem = async (req, res) => {
  const userId = req.params.id
  const image = req.file
  const description = req.body.description

  if(image) {
    const newItem = new Item({
      image: image.path,
      description,
      user: userId, 
      reviews: []
    });
    
    const user = await User.findById(req.params.id)
    user.items.unshift(newItem)
    user.save()

    newItem.save()
      .then(item => {
        res.json(item)
      })
  }
}