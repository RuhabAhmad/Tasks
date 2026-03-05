const express = require("express");
const router = express.Router();

router.get("/com", (req, res) => res.json({ ok: true }));

module.exports = router;