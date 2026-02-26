const express = require('express');
const session = require('express-session');

const sessionRoutes = require('./routes/sessionRoutes');

const app = express();

// Configure session middleware
app.use(session({
  secret: "ggggghhhhh",
  resave: false,
  saveUninitialized: false
}));

app.use(express.json());

app.use('/session', sessionRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});