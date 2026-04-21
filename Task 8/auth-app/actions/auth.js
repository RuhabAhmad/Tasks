/**
 * actions/auth.js
 *
 * Next.js Server Actions for:
 *  - signupUser   – create account
 *  - loginUser    – authenticate & set cookie
 *  - logoutUser   – clear session cookie
 *  - getSession   – read current session from cookie
 */

"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

// ─── Constants ────────────────────────────────────────────────
const COOKIE_NAME = "auth_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds
const SALT_ROUNDS = 12;

// ─── Signup ───────────────────────────────────────────────────
/**
 * Create a new account.
 * @param {FormData} formData
 * @returns {{ error: string } | void}  Returns error object on failure,
 *                                       redirects to /login on success.
 */
export async function signupUser(formData) {
  const email    = formData.get("email")?.toString().trim().toLowerCase();
  const password = formData.get("password")?.toString();

  // ── Basic validation ──────────────────────────────────────
  if (!email || !password) {
    return { error: "Email and password are required." };
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return { error: "Please enter a valid email address." };
  }
  if (password.length < 6) {
    return { error: "Password must be at least 6 characters." };
  }

  try {
    await connectToDatabase();

    // ── Duplicate email check ─────────────────────────────
    const existing = await User.findOne({ email });
    if (existing) {
      return { error: "An account with this email already exists." };
    }

    // ── Hash password & persist ───────────────────────────
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    await User.create({ email, password: hashedPassword });
  } catch (err) {
    console.error("Signup error:", err);
    return { error: "Something went wrong. Please try again." };
  }

  // Redirect outside try/catch so Next.js redirect() works correctly
  redirect("/login?registered=1");
}

// ─── Login ────────────────────────────────────────────────────
/**
 * Authenticate user and set a session cookie.
 * @param {FormData} formData
 * @returns {{ error: string } | void}
 */
export async function loginUser(formData) {
  const email    = formData.get("email")?.toString().trim().toLowerCase();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  try {
    await connectToDatabase();

    // ── Find user ─────────────────────────────────────────
    const user = await User.findOne({ email });
    if (!user) {
      return { error: "Invalid email or password." };
    }

    // ── Compare hashed password ───────────────────────────
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { error: "Invalid email or password." };
    }

    // ── Build minimal session payload ─────────────────────
    const sessionPayload = JSON.stringify({
      userId: user._id.toString(),
      email:  user.email,
      iat:    Date.now(),
    });

    // ── Set HTTP-only cookie ──────────────────────────────
    cookies().set(COOKIE_NAME, sessionPayload, {
      httpOnly: true,          // not accessible from JS
      secure:   process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge:   COOKIE_MAX_AGE,
      path:     "/",
    });
  } catch (err) {
    console.error("Login error:", err);
    return { error: "Something went wrong. Please try again." };
  }

  redirect("/dashboard");
}

// ─── Logout ───────────────────────────────────────────────────
/**
 * Clear the session cookie and redirect to login.
 */
export async function logoutUser() {
  cookies().set(COOKIE_NAME, "", {
    httpOnly: true,
    secure:   process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge:   0,      // immediately expire
    path:     "/",
  });

  redirect("/login");
}

// ─── Get Session ──────────────────────────────────────────────
/**
 * Read the current session from the cookie.
 * @returns {{ userId: string, email: string, iat: number } | null}
 */
export async function getSession() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get(COOKIE_NAME);

  if (!sessionCookie?.value) return null;

  try {
    return JSON.parse(sessionCookie.value);
  } catch {
    return null;
  }
}
