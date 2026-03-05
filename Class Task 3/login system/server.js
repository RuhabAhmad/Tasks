const express = require("express");
const session = require("express-session");
const connectDB = require("./config/db");
const User = require("./classes/User");
const authMiddleware = require("./middleware/auth");

const app = express();
connectDB();

app.use(express.json());

app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: true
  })
);

/* REGISTER */
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = new User(username, password);
  const result = await user.register();

  res.send(result.message);
});

/* GET */
app.get("/", (req, res) => {
  res.send("Server is working 🚀");
});

/* LOGIN */
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = new User(username, password);
  const result = await user.login();

  if (!result.success) {
    return res.send(result.message);
  }

  req.session.user = username;
  res.send("Login successful");
});

/* PROTECTED DASHBOARD */
app.get("/dashboard", authMiddleware, (req, res) => {
  res.send(`Welcome ${req.session.user}`);
});

/* LOGOUT */
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.send("Logout successful");
});

app.listen(3000, () => console.log("Server running on port 3000"));