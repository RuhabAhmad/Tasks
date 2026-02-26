const express = require('express');
const router = express.Router();

// Setting Session Data
router.get('/', (req, res) => {
    req.session.name = "hello";
    req.session.ban = true;
    res.send("Session data set.");
});

// Retrieve session data
router.get('/sessions', (req, res) => {
    console.log(req.session);
    res.send(`Session Data: ${JSON.stringify(req.session)}`);
});

module.exports = router;