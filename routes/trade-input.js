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
    tradeType = req.body.tradeType,
    entryPrice = req.body.entryPrice,
    stopPrice = req.body.stopPrice,
    portfolioSize = req.body.portfolioSize,
    riskPercentage = req.body.riskPercentage,
    entryShots = {
      entryShot1: req.body.entryShot1,
      entryShot2: req.body.entryShot2,
      entryShot3: req.body.entryShot3,
      entryShot4: req.body.entryShot4
    },
    entryNotes = req.body.entryNotes,
    checklist = {
      essential: {
        factor1: req.body.ef1,
        factor2: req.body.ef2,
        factor3: req.body.ef3,
        factor4: req.body.ef4,
        factor5: req.body.ef5,
        factor6: req.body.ef6,
        factor7: req.body.ef7,
        factor8: req.body.ef8,
        factor9: req.body.ef9,
      },
      bonus: {
        factor1: req.body.bf1,
        factor2: req.body.bf2,
        factor3: req.body.bf3,
        factor4: req.body.bf4,
        factor5: req.body.bf5,
        factor6: req.body.bf6,
        factor7: req.body.bf7,
        factor8: req.body.bf8,
        factor9: req.body.bf9,
      }
    }
  perfectEntry = req.body.perfectEntry
  newTrade = {
    pair: pair.toUpperCase(),
    timeframe: timeframe,
    tradeType: tradeType,
    entryPrice: entryPrice,
    stopPrice: stopPrice,
    portfolioSize: portfolioSize,
    riskPercentage: riskPercentage,
    entryShots: entryShots,
    checklist: checklist,
    entryNotes: entryNotes,
    perfectEntry: perfectEntry,
  }
  //Create a new trade and save to database
  Trade.create(newTrade, function (err, trade) {
    if (err) {
      console.log(err)
    } else {
      //add user to trade
      trade.author.id = req.user._id;
      trade.author.username = req.user.username;
      //add date to trade
      trade.entryDate = new Date;
      //save changes
      trade.save();
      console.log(trade)
      res.redirect('/trade-management');
    }
  })
});
module.exports = router;