/**
 * lib/mongodb.js
 *
 * Singleton MongoDB connection using Mongoose.
 * The module caches the connection promise so that
 * Next.js hot-reloads (in dev) and serverless invocations
 * don't open a new connection on every request.
 */

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable in .env.local"
  );
}

/**
 * Global cache – survives Next.js module hot-reload in dev.
 * @type {{ conn: mongoose.Connection | null, promise: Promise<mongoose.Connection> | null }}
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Returns a cached Mongoose connection (or creates one).
 */
export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("✅ MongoDB connected");
      return mongoose.connection;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
