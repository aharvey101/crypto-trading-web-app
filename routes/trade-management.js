const express = require('express')
const router = express.Router({ mergeParams: true })
const Trade = require('../models/trades');
const middleware = require('../middleware/isLoggedIn.js')
const moment = require('moment')
const user = require('../models/user')

router.get('/', middleware.isLoggedIn, (req, res) => {
  res.render('trade-management/index')
})


module.exports = router;