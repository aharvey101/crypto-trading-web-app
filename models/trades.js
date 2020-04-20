const mongoose = require('mongoose')


//Trade Schema
const tradeSchema = new mongoose.Schema({
  pair: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String,
  },
  timeframe: String,
  entryDate: String,
  tradeType: String,
  entryPrice: Number,
  stopPrice: Number,
  invalidationPrice: Number,
  portfolioSize: Number,
  riskPercentage: Number,
  direction: String,
  entryShots: [],
  exitShots: [],
  Checklist: {
    essential: {},
    bonus: {}
  },
  entryNotes: String,
  perfectEntry: String,
  perfectManagement: String,
  tradeTaken: Boolean,
  scaledOut: Boolean,
  stoppedOut: Boolean,
  status: String,
})


module.exports = mongoose.model('Trade', tradeSchema)

