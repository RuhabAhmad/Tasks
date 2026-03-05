const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("All products");
});

module.exports = router;