const express = require("express");
const session = require("express-session");

require("./db");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "mysecretkey123",
    resave: false,
    saveUninitialized: false,
  }),
);

app.use("/", authRoutes);

app.listen(3000, function () {
  console.log("server is running on port 3000");
});
