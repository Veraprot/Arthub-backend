const Item = require('../models/Item');
const User = require('../models/User');
const krakenService = require('../utils/krakenService')

exports.userItems = async (req, res) => {

  User.findById(req.params.id)
  .populate('items', ['description', 'user', 'image'])
  .exec((err, user)=> {
    res.json(user.items)
  })
}

exports.createItem = (req, res) => {
  const userId = req.params.id
  const image = req.file
  const description = req.body.description

  if(image) {
    krakenService.compressImage(image.path, async () => {
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
    })   
  }
}