require('dotenv').config();

const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  localStrategy = require('passport-local'),
  methodOverride = require('method-override'),
  port = 3000;



app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));

//Passport Configuration
app.use(
  require('express-session')({
    secret: 'The rain in spain falls mainly on the plain',
    resave: false,
    saveUninitialized: false
  })
);

app.get('/', function (req, res) {
  res.render('home');
})

//Start Server
app.listen(process.env.PORT || 3000, process.env.IP, function () {
  console.log('The YelpCamp Server Has Started! on port ' + `${port}`);
});