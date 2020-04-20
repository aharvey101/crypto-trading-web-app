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
      res.render('report/index', { trades: usersTrades })
    }
  })
});

//Create - New Trade Form
router.post('/', (req, res) => {
  //get data from form
  const newTrade = {
    pair,
    timeframe,
    tradeType,
    entryPrice,
    stopPrice,
    portfolioSize,
    riskPercentage,
    direction,
    entryShots,
    entryNotes,
    perfectEntry
  } = req.body.trade
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
      res.redirect('/report');
    }
  })
});

//Trade input page
router.get('/new', middleware.isLoggedIn, (req, res) => {
  res.render('report/new')
});

//Show more info about a trade
router.get('/:id', middleware.isLoggedIn, function (req, res) {
  //find the Trade with the id
  Trade.findById(req.params.id).exec(function (err, foundTrade) {
    if (err) {
      console.log(err)
    } else {
      //render show template with that Trade
      res.render('report/show', { trade: foundTrade })
    }
  })
})

//Edit - Edit route
router.get('/:id/edit', middleware.isLoggedIn, (req, res) => {
  Trade.findById(req.params.id, function (err, foundTrade) {
    if (err) {
      console.log(err)
    } else {
      res.render('report/edit', { trade: foundTrade })
    }
  })
});

// UPDATE: Trade ROUTE
router.put("/:id", middleware.isLoggedIn, function (req, res) {
  //add the images to the trade object
  const exitShots = req.body.trade.entryShots

  // find and update the correct trade
  Trade.findByIdAndUpdate(req.params.id, req.body.trade, function (err, updateTrade) {
    if (err) {
      res.redirect("/report/index");
    } else {
      //redirect somewhere(show page)
      req.body.trade.exitShots = exitShots;
      updateTrade.save()
      res.redirect("/report/" + req.params.id);
    }
  });
});




module.exports = router;