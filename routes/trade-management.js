const express = require('express')
const router = express.Router({ mergeParams: true })
const Trade = require('../models/trades');
const User = require('../models/user')

// Trade Management Page: shows all trades from that user
router.get('/', isLoggedIn, (req, res) => {
  // Get trades that belong to the user from the DB
  Trade.find({ author: req.user._id }, function (err, usersTrades) {
    if (err) {
      console.log(err)
    } else {
      res.render('trade-management', { trades: usersTrades })
    }
  })
});


//Show more info about a trade
router.get('/:id', isLoggedIn, function (req, res) {
  //find the Trade with the id
  Trade.findById(req.params.id).exec(function (err, foundTrade) {
    if (err) {
      console.log(err)
    } else {
      //render show template with that Trade
      res.render('trade', { trade: foundTrade })
    }
  })
})

//Middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.render('login')
  }
}

module.exports = router;