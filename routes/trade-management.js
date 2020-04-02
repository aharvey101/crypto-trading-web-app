const express = require('express')
const router = express.Router({ mergeParams: true })
const Trade = require('../models/trades');
const middleware = require('../middleware/isLoggedIn.js')

// Trade Management Page: shows all trades from that user
router.get('/', middleware.isLoggedIn, (req, res) => {
  // Get trades that belong to the user from the DB
  Trade.find({ "author.id": req.user._id }, function (err, usersTrades) {
    if (err) {
      console.log(err)
    } else {
      res.render('trade-management', { trades: usersTrades })
    }
  })
});


//Show more info about a trade
router.get('/:id', middleware.isLoggedIn, function (req, res) {
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
module.exports = router;