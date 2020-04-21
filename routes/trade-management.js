const express = require('express')
const router = express.Router({ mergeParams: true })
const Trade = require('../models/trades');
const middleware = require('../middleware/isLoggedIn.js')
const moment = require('moment')
const user = require('../models/user')

router.get('/', middleware.isLoggedIn, (req, res) => {
  Trade.find({ "author.id": req.user._id }, function (err, usersTrades) {
    if (err) {
      console.log(err)
    } else {
      res.render('trade-management/index', { trade: usersTrades })
    }
  })
})


module.exports = router;