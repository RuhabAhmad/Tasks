import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import fetch from "node-fetch";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/mernViteDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  apiData: Object
});

const User = mongoose.model("User", userSchema);

// Route
app.post("/api/users", async (req, res) => {
  try {
    const { name, email } = req.body;

    // Fetch external API data
    const apiRes = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const apiData = await apiRes.json();

    // Save to MongoDB
    const user = new User({
      name,
      email,
      apiData
    });

    await user.save();

    res.json({ message: "Saved", user });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Server start
app.listen(5000, () => console.log("Server running on port 5000"));