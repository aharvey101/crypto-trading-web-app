var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//Home Page
router.get('/', function (req, res) {
  req.user
  res.render('home');
})
/////////////
//Auth Routes
/////////////
router.post('/', (req, res) => {
  let newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username
  });
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      console.log(err)
      return res.render("home")
    }
    passport.authenticate('local')(req, res, function () {
      res.redirect("/trade/trades")
    })
  })
});

//Login Page
router.get('/login', (req, res) => {
  res.render('login')
});
//handling Login Logic
router.post('/login', passport.authenticate('local',
  {
    successRedirect: '/trade',
    failureFlash: true,
    failureRedirect: "/login"
  }));

//Logout Route
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
