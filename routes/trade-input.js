const express = require('express');
const router = express.Router();
const Trade = require('../models/trades')
const middleware = require('../middleware/isLoggedIn.js')

//Trade input page
router.get('/', middleware.isLoggedIn, (req, res) => {
  res.render('trade-input')
});

router.post('/', (req, res) => {
  //get data from form
  let pair = req.body.pair,
    timeframe = req.body.timeframe,
    newTrade = { pair: pair, timeframe: timeframe };
  //Create a new trade and save to database
  Trade.create(newTrade, function (err, trade) {
    if (err) {
      console.log(err)
    } else {
      //add user to trade
      trade.author.id = req.user._id;
      trade.author.username = req.user.username;
      //save changes
      trade.save();
      console.log(trade)
      res.redirect('/trade-management');
    }
  })
});
module.exports = router;