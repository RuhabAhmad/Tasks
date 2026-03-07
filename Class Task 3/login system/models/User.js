const mongoose = require("../db");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const UserModel = mongoose.model("users", userSchema);

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  async register() {
    const found = await UserModel.findOne({ username: this.username });

    if (found) {
      return { success: false, message: "User already exists" };
    }

    const userToSave = new UserModel({
      username: this.username,
      password: this.password,
    });

    await userToSave.save();

    return { success: true, message: "User registered successfully" };
  }

  async login() {
    const matchedUser = await UserModel.findOne({
      username: this.username,
      password: this.password,
    });

    if (!matchedUser) {
      return { success: false, message: "Invalid credentials" };
    }

    return { success: true, user: matchedUser };
  }
}

module.exports = User;
