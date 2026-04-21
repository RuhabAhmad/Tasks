"use client";

import { useState } from "react";
import Link from "next/link";
import { signupUser } from "@/actions/auth";
import BrandIcon from "@/components/BrandIcon";

export default function SignupPage() {
  const [error, setError]     = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const result = await signupUser(formData);
      if (result?.error) {
        setError(result.error);
      }
      // On success the server action redirects to /login?registered=1
      // so we never need to handle the success case here.
    } catch (err) {
      // Next.js redirect() throws internally — ignore NEXT_REDIRECT
      if (!err?.message?.includes("NEXT_REDIRECT")) {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-center">
      <div className="card">
        {/* Brand */}
        <div className="brand">
          <BrandIcon size={52} className="brand-icon" />
          <h1 className="brand-title">
            Aurum<span>Auth</span>
          </h1>
          <p className="brand-subtitle">Secure Access Portal</p>
        </div>

        <div className="divider">Create your account</div>

        {/* Error alert */}
        {error && (
          <div className="alert alert-error" style={{ marginBottom: "1rem" }}>
            {error}
          </div>
        )}

        {/* Signup Form */}
        <form className="form" onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              disabled={loading}
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Min. 6 characters"
              autoComplete="new-password"
              required
              minLength={6}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ width: "100%" }}
          >
            {loading ? (
              <>
                <span className="spinner" />
                Creating Account…
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Link to login */}
        <p className="text-center text-sm" style={{ marginTop: "1.5rem" }}>
          Already have an account?{" "}
          <Link href="/login" className="text-link">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
