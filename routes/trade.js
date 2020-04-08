const express = require('express')
const router = express.Router({ mergeParams: true })
const Trade = require('../models/trades');
const middleware = require('../middleware/isLoggedIn.js')
const moment = require('moment');

//Trade input page
router.get('/new', middleware.isLoggedIn, (req, res) => {
  res.render('trade/new')
});

//Making a new trade
router.post('/', middleware.isLoggedIn, (req, res) => {
  //get data from form
  let
    entryShots = {
      entryShot1: req.body.entryShot1,
      entryShot2: req.body.entryShot2,
      entryShot3: req.body.entryShot3,
      entryShot4: req.body.entryShot4
    }
  newTrade = {
    pair: req.body.trade.pair,
    timeframe: req.body.trade.timeframe,
    tradeType: req.body.trade.tradeType,
    entryPrice: req.body.trade.entryPrice,
    stopPrice: req.body.trade.stopPrice,
    portfolioSize: req.body.trade.portfolioSize,
    riskPercentage: req.body.trade.riskPercentage,
    entryShots: entryShots,
    entryNotes: req.body.trade.entryNotes,
    perfectEntry: req.body.trade.perfectEntry,
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
      trade.entryDate = moment().format('L');
      //save changes
      trade.save();
      res.redirect('/trade');
    }
  })
});

// Trade Management Page: shows all trades from that user
router.get('/', middleware.isLoggedIn, (req, res) => {
  // Get trades that belong to the user from the DB
  Trade.find({ "author.id": req.user._id }, function (err, usersTrades) {
    if (err) {
      console.log(err)
    } else {
      res.render('trade/trades', { trades: usersTrades })
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
      res.render('trade/trade', { trade: foundTrade })
    }
  })
})

//Edit Trade
router.get("/:id/edit", middleware.isLoggedIn, function (req, res) {
  Trade.findById(req.params.id, function (err, foundTrade) {
    res.render("trade/edit", { trade: foundTrade });
  })
})

// Update Trade Route
router.put("/:id", middleware.isLoggedIn, function (req, res) {
  // find and update the correct trade
  Trade.findByIdAndUpdate(req.params.id, req.body.trade, function (err, foundTrade) {
    if (err) {
      res.redirect("/trade/");
    } else {
      //redirect somewhere(show page)
      res.redirect("/trade/" + req.params.id);
    }
  });
});

//Delete Route

module.exports = router;