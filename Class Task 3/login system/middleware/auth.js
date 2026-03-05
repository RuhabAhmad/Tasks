const authMiddleware = (req, res, next) => {
  if (!req.session.user) {
    return res.send("Access denied. Please login.");
  }
  next();
};

module.exports = authMiddleware;