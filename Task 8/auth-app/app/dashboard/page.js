/**
 * app/dashboard/page.js  — Server Component
 *
 * Protected route: reads the session cookie server-side.
 * If no valid session → redirect to /login.
 * Otherwise renders the dashboard with the user's info.
 */

import { redirect } from "next/navigation";
import { getSession, logoutUser } from "@/actions/auth";
import BrandIcon from "@/components/BrandIcon";

export default async function DashboardPage() {
  // ── Route Protection ──────────────────────────────────────
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  // ── Derived user info ─────────────────────────────────────
  const email    = session.email ?? "Unknown";
  const initial  = email.charAt(0).toUpperCase();
  const loginAt  = new Date(session.iat).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const memberSince = new Date(session.iat).toLocaleDateString("en-US", {
    year: "numeric", month: "long",
  });

  return (
    <div className="dashboard-page">

      {/* ── Header ─────────────────────────────────────────── */}
      <header className="dashboard-header">
        <div className="header-brand">
          <BrandIcon size={32} className="header-brand-icon" />
          <span className="header-brand-name">
            Aurum<span>Auth</span>
          </span>
        </div>

        <div className="header-right">
          <div className="header-user">
            <div className="user-avatar" aria-hidden="true">
              {initial}
            </div>
            <span className="user-email">{email}</span>
          </div>

          {/* Logout — Server Action via form */}
          <form action={logoutUser}>
            <button type="submit" className="btn btn-ghost" style={{ padding: "0.55rem 1rem" }}>
              Sign Out
            </button>
          </form>
        </div>
      </header>

      {/* ── Main Content ────────────────────────────────────── */}
      <main className="dashboard-main">

        {/* Welcome */}
        <section className="welcome-section">
          <p className="welcome-label">Dashboard</p>
          <h2 className="welcome-heading">
            Welcome back,<br />
            <em>{email.split("@")[0]}</em>
          </h2>
          <p className="welcome-sub">
            Your session is active and secure.
          </p>
        </section>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🔐</div>
            <div className="stat-value">Active</div>
            <div className="stat-label">Session Status</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📬</div>
            <div className="stat-value" style={{ fontSize: "1.1rem", marginTop: "0.25rem" }}>
              {email}
            </div>
            <div className="stat-label">Verified Email</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🛡️</div>
            <div className="stat-value">bcrypt</div>
            <div className="stat-label">Password Encryption</div>
          </div>
        </div>

        {/* Session Info Panel */}
        <div className="info-panel">
          <h3 className="info-panel-title">Session Details</h3>

          <div className="info-row">
            <span className="info-key">Email Address</span>
            <span className="info-val">{email}</span>
          </div>

          <div className="info-row">
            <span className="info-key">User ID</span>
            <span className="info-val" style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "var(--text-muted)" }}>
              {session.userId}
            </span>
          </div>

          <div className="info-row">
            <span className="info-key">Signed In At</span>
            <span className="info-val">{loginAt}</span>
          </div>

          <div className="info-row">
            <span className="info-key">Session Storage</span>
            <span className="info-val">HTTP-only Cookie</span>
          </div>

          <div className="info-row">
            <span className="info-key">Session Status</span>
            <span className="badge badge-success">
              ● Authenticated
            </span>
          </div>

          <div className="info-row">
            <span className="info-key">Cookie Expires</span>
            <span className="info-val">7 days from login</span>
          </div>
        </div>
      </main>

      {/* ── Footer (unique logo + copyright) ────────────────── */}
      <footer className="dashboard-footer">
        <div className="footer-logo">
          <BrandIcon size={22} className="footer-logo-icon" />
          <span className="footer-logo-text">AurumAuth</span>
        </div>
        <span className="footer-divider">·</span>
        <span className="footer-copy">
          © {new Date().getFullYear()} AurumAuth. All rights reserved.
        </span>
        <span className="footer-divider">·</span>
        <span className="footer-copy">Built with Next.js &amp; MongoDB</span>
      </footer>

    </div>
  );
}
