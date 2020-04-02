const middlewareObj = {}

middlewareObj.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.render('login')
  }
}

module.exports = middlewareObj