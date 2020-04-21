const express = require('express')
const router = express.Router({ mergeParams: true })
const Trade = require('../models/trades');
const middleware = require('../middleware/isLoggedIn.js')
const moment = require('moment')
const user = require('../models/user')
const CCXT = require('ccxt')
require('dotenv').config()

const ftx = new CCXT.ftx({
  apiKey: process.env.API_KEY,
  secret: process.env.API_SECRET
})

const b = (async () => {
  const balances = await ftx.fetchBalance()
  let usdt = balances.total.USDT + balances.total.USD
  return usdt
})();

router.get('/', middleware.isLoggedIn, function (req, res) {
  async function awaitb(b) {
    let ab = await b
    console.log(ab)
    res.render('user/profile', { balance: ab })
  }
  awaitb(b)
})

module.exports = router;