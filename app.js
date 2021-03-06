
const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  localStrategy = require('passport-local').Strategy,
  methodOverride = require('method-override'),
  port = 3000,
  User = require('./models/user.js');
require('dotenv').config();

//Requiring Routes Files
const homeRoutes = require('./routes/home'),
  reportRoute = require('./routes/reports'),
  tradeManagementRoute = require('./routes/trade-management'),
  userRoute = require('./routes/User')


mongoose.connect(process.env.DB || 'mongodb://localhost/trading-app',
  { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
  .then(() => console.log('DB Connected'))
  .catch(err => {
    console.log(`DB Connection Error: ${err.message}`)
  })


app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));

//Passport Configuration
app.use(
  require('express-session')({
    secret: 'The rain in spain falls mainly on the plain',
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//Current user for all routes
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

//Using Routes
app.use('/', homeRoutes);
app.use('/report', reportRoute);
app.use('/user', userRoute)
app.use('/trade-management', tradeManagementRoute);


//Start Server
app.listen(process.env.PORT || 3000, process.env.IP, function () {
  console.log('The YelpCamp Server Has Started! on port ' + `${port}`);
});