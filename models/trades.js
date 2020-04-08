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
  entryShots: [],
  exitShots: [],
  Checklist: {
    essential: {
      factor1: Boolean,
      factor2: Boolean,
      factor3: Boolean,
      factor4: Boolean,
      factor5: Boolean,
      factor6: Boolean,
      factor7: Boolean,
      factor8: Boolean
    },
    bonus: {
      factor1: Boolean,
      factor2: Boolean,
      factor3: Boolean,
      factor4: Boolean,
      factor5: Boolean,
      factor6: Boolean,
      factor7: Boolean,
      factor8: Boolean,
      factor9: Boolean,
    }
  },
  entryNotes: String,
  perfectEntry: String,
  perfectManagement: String,
  tradeTaken: Boolean,
  scaledOut: Boolean,
  stoppedOut: Boolean
})


module.exports = mongoose.model('Trade', tradeSchema)

