const express = require('express')
const router = express.Router({ mergeParams: true })
const Trade = require('../models/trades');
const middleware = require('../middleware/isLoggedIn.js')
const moment = require('moment')
const user = require('../models/user')
const CCXT = require('ccxt')
require('dotenv').config()

//object for connecting
const ftx = new CCXT.ftx({
  apiKey: process.env.API_KEY,
  secret: process.env.API_SECRET
})


router.get('/', middleware.isLoggedIn, (req, res) => {
  Trade.find({ "author.id": req.user._id }, function (err) {
    const p = (async () => {
      let pos = await ftx.private_get_positions()
      return pos
    })();
    if (err) {
      console.log(err)
    } else {
      async function awaitp(p) {
        let ap = await p
        let newap = []
        for (let i = 0; i < 3; i++) {
          if (ap.result[i].size > 0) {
            newap.push(ap.result[i])
          }
        }
        console.log(newap)
        res.render('trade-management/index', { pos: newap })
      }
      awaitp(p)
    }
  })
})


module.exports = router;