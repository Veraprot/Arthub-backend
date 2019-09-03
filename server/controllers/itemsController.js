const Item = require('../models/Item');
const User = require('../models/User');

exports.userItems = (req, res) => {
  console.log(req)
}

exports.createItem = (req, res) => {
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

    newItem.save()
      .then(item => {
        res.json(item)
      })
  }
}