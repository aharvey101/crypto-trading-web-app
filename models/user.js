const mongoose = require('mongoose');

const passportLocalMongoose = require('passport-local-mongoose');
mongoose.connect('mongodb://localhost/usertest', { useNewUrlParser: true })

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  joinDate: String,
})

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', userSchema)
