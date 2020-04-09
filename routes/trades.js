const express = require('express')
const router = express.Router({ mergeParams: true })
const Trade = require('../models/trades');
const middleware = require('../middleware/isLoggedIn.js')
const moment = require('moment')

// Index - shows all trades from that user
router.get('/', middleware.isLoggedIn, (req, res) => {
  // Get trades that belong to the user from the DB
  Trade.find({ "author.id": req.user._id }, function (err, usersTrades) {
    if (err) {
      console.log(err)
    } else {
      res.render('trades/index', { trades: usersTrades })
    }
  })
});

//Create - New Trade Form
router.post('/', (req, res) => {
  //get data from form
  let newTrade = {
    pair: req.body.trade.pair,
    timeframe: req.body.trade.timeframe,
    tradeType: req.body.trade.tradeType,
    entryPrice: req.body.trade.entryPrice,
    stopPrice: req.body.trade.stopPrice,
    portfolioSize: req.body.trade.portfolioSize,
    riskPercentage: req.body.trade.riskPercentage,
    entryShots: req.body.trade.entryShots,
    checklist: req.body.trade.checklist,
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
      res.redirect('/trades');
    }
  })
});

//Trade input page
router.get('/new', middleware.isLoggedIn, (req, res) => {
  res.render('trades/new')
});

//Show more info about a trade
router.get('/:id', middleware.isLoggedIn, function (req, res) {
  //find the Trade with the id
  Trade.findById(req.params.id).exec(function (err, foundTrade) {
    if (err) {
      console.log(err)
    } else {
      //render show template with that Trade
      res.render('trades/show', { trade: foundTrade })
    }
  })
})

//Edit - Edit route
router.get('/:id/edit', middleware.isLoggedIn, (req, res) => {
  Trade.findById(req.params.id, function (err, foundTrade) {
    if (err) {
      console.log(err)
    } else {
      res.render('trades/edit', { trade: foundTrade })
    }
  })
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.isLoggedIn, function (req, res) {
  //add the images to the trade object
  // find and update the correct campground
  Trade.findByIdAndUpdate(req.params.id, req.body.trade, function (err, updateTrade) {
    if (err) {
      res.redirect("/trades/index");
    } else {
      //redirect somewhere(show page)
      res.redirect("/trades/" + req.params.id);
    }
  });
});


module.exports = router;