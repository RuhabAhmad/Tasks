function checkLogin(req, res, next) {
  if (!req.session.user) {
    res.send("Access denied. Please login first.");
    return;
  }

  next();
}

module.exports = checkLogin;
