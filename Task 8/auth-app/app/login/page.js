"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { loginUser } from "@/actions/auth";
import BrandIcon from "@/components/BrandIcon";
import { Suspense } from "react";

function LoginForm() {
  const [error, setError]     = useState(null);
  const [loading, setLoading] = useState(false);
  const searchParams          = useSearchParams();
  const justRegistered        = searchParams.get("registered") === "1";

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const result = await loginUser(formData);
      if (result?.error) {
        setError(result.error);
      }
      // On success the server action sets cookie and redirects to /dashboard
    } catch (err) {
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

        <div className="divider">Sign in to your account</div>

        {/* Success banner after registration */}
        {justRegistered && (
          <div className="alert alert-success" style={{ marginBottom: "1rem" }}>
            ✓ Account created successfully. Please sign in.
          </div>
        )}

        {/* Error alert */}
        {error && (
          <div className="alert alert-error" style={{ marginBottom: "1rem" }}>
            {error}
          </div>
        )}

        {/* Login Form */}
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
              placeholder="Your password"
              autoComplete="current-password"
              required
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
                Signing In…
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Link to signup */}
        <p className="text-center text-sm" style={{ marginTop: "1.5rem" }}>
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-link">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="page-center"><div className="card" /></div>}>
      <LoginForm />
    </Suspense>
  );
}
