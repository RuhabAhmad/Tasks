/**
 * models/User.js
 *
 * Mongoose User schema.
 *  - email  : unique, required, trimmed, lowercased
 *  - password: required (stored as bcrypt hash – never plain text)
 */

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,           // enforces a unique index in MongoDB
      trim: true,
      lowercase: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
  },
  {
    timestamps: true,         // createdAt & updatedAt
  }
);

/**
 * Prevent model re-compilation during Next.js hot-reloads.
 * If the model already exists in mongoose.models, reuse it.
 */
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
