const express = require("express");
const router = express.Router();

const User = require("../models/User");
const checkLogin = require("../middleware/authMiddleware");

router.post("/register", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const newUser = new User(username, password);
  const result = await newUser.register();

  res.send(result.message);
});

router.post("/login", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const thisUser = new User(username, password);
  const result = await thisUser.login();

  if (result.success == false) {
    return res.send(result.message);
  }

  req.session.user = username;

  res.send("Login successful");
});

router.get("/dashboard", checkLogin, function (req, res) {
  const name = req.session.user;
  res.send("Welcome " + name);
});

router.get("/logout", function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      return res.send("could not logout, try again");
    }
    res.send("Logout successful");
  });
});

module.exports = router;
