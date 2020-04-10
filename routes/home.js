const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const moment = require('moment')

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
    username: req.body.username,
    joinDate: moment().format('L')
  });
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      console.log(err)
      return res.render("home")
    }
    passport.authenticate('local')(req, res, function () {
      res.redirect("/reports")
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
    successRedirect: '/trade-management',
    failureRedirect: "/login"
  }));

//Logout Route
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
