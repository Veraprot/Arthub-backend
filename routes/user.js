const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({mes: 'what do you want'})
})

module.exports = router