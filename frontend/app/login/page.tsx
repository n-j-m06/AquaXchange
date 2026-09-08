"use client";

import {
  ArrowRight,
  Droplets,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [lightning, setLightning] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const flash = () => {
      setLightning(true);

      setTimeout(() => {
        setLightning(false);
      }, 180);

      timeout = setTimeout(
        flash,
        5000 + Math.random() * 8000
      );
    };

    timeout = setTimeout(
      flash,
      3000 + Math.random() * 5000
    );

    return () => clearTimeout(timeout);
  }, []);

  return (
    <main
      className={`login-page ${
        lightning ? "lightning-active" : ""
      }`}
    >
      {/* =====================================================
          ATMOSPHERE
          ===================================================== */}
      <div className="login-atmosphere">
        <div className="storm-cloud cloud-one" />
        <div className="storm-cloud cloud-two" />

        <div className="login-glow glow-one" />
        <div className="login-glow glow-two" />

        <div className="login-grid" />

        {/* RAIN */}
        <div className="login-rain">
          {Array.from({ length: 145 }).map((_, i) => (
            <span
              key={i}
              style={{
                left: `${(i * 17.31) % 100}%`,
                animationDelay: `${(i * 0.087) % 4}s`,
                animationDuration: `${
                  0.65 + ((i * 13) % 15) / 10
                }s`,
              }}
            />
          ))}
        </div>

        {/* LIGHTNING */}
        <div className="lightning-flash lightning-flash-one" />
        <div className="lightning-flash lightning-flash-two" />

        <div className="lightning-bolt bolt-one">
          <svg viewBox="0 0 160 500">
            <path d="M105 0 L62 145 L92 145 L25 315 L61 315 L15 500" />
          </svg>
        </div>

        <div className="lightning-bolt bolt-two">
          <svg viewBox="0 0 160 500">
            <path d="M105 0 L62 145 L92 145 L25 315 L61 315 L15 500" />
          </svg>
        </div>

        <div className="storm-mist mist-one" />
        <div className="storm-mist mist-two" />
      </div>

      {/* =====================================================
          MAIN LOGIN CONTAINER
          ===================================================== */}
      <div className="login-container">

        {/* ===================================================
            LEFT SIDE — BRAND + AI WATER VISUAL
            =================================================== */}
        <section className="login-visual">

          {/* BRAND */}
          <a href="/" className="login-brand">
            <div className="login-brand-icon">
              <Droplets size={21} />
            </div>

            <div>
              <strong>AquaXchange</strong>
              <span>Water Intelligence</span>
            </div>
          </a>

          {/* VISUAL CONTENT */}
          <div className="login-visual-content">

            <div className="login-eyebrow">
              <span />
              INTELLIGENT WATER MANAGEMENT
            </div>

            <h1>
              Water moves.
              <br />
              <em>Intelligence leads.</em>
            </h1>

            <p>
              Connect water sources, cities, industries and
              agriculture through AI-powered allocation and
              intelligent decision support.
            </p>

            {/* =============================================
                AI NETWORK VISUAL
                ============================================= */}
            <div className="login-network">

              <div className="network-orbit orbit-one" />
              <div className="network-orbit orbit-two" />

              <svg
                className="network-lines"
                viewBox="0 0 500 300"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M80 70 C160 80 190 130 250 150" />
                <path d="M420 65 C340 85 315 125 250 150" />
                <path d="M80 235 C160 220 190 175 250 150" />
                <path d="M420 235 C340 215 315 175 250 150" />
              </svg>

              {/* WATER SOURCE */}
              <div className="network-node node-reservoir">
                <Droplets size={17} />
                <span>Water Source</span>
              </div>

              {/* MUNICIPALITY */}
              <div className="network-node node-city">
                <div className="node-dot" />
                <span>Municipality</span>
              </div>

              {/* INDUSTRY */}
              <div className="network-node node-industry">
                <div className="node-dot" />
                <span>Industry</span>
              </div>

              {/* AGRICULTURE */}
              <div className="network-node node-farm">
                <div className="node-dot" />
                <span>Agriculture</span>
              </div>

              {/* AI CORE */}
              <div className="network-ai-core">
                <div className="ai-core-ring ring-a" />
                <div className="ai-core-ring ring-b" />

                <Sparkles size={21} />
                <span>AI</span>
              </div>

            </div>
          </div>

          {/* FOOTER */}
          <div className="login-footer">
            <ShieldCheck size={15} />
            Secure infrastructure • Intelligent allocation
          </div>
        </section>


        {/* ===================================================
            RIGHT SIDE — LOGIN FORM
            =================================================== */}
        <section className="login-form-section">

          <div className="login-card">

            {/* SYSTEM STATUS */}
            <div className="login-status">
              <span className="login-status-dot" />
              SYSTEM ONLINE
            </div>

            {/* MOBILE BRAND */}
            <div className="mobile-brand">
              <div className="login-brand-icon">
                <Droplets size={20} />
              </div>

              <strong>AquaXchange</strong>
            </div>

            {/* =================================================
                LOGIN HEADING
                ================================================= */}
            <div className="login-card-heading">

              <span className="card-label">
                WELCOME BACK
              </span>

              <h2>
                Sign in<span>.</span>
              </h2>

              <p>
                Enter your credentials to access the
                AquaXchange intelligence platform.
              </p>

            </div>


            {/* =================================================
                LOGIN FORM
                ================================================= */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = "/dashboard";
              }}
            >

              {/* USERNAME */}
              <div className="login-field">

                <label htmlFor="username">
                  Username
                </label>

                <div className="login-input">

                  <div className="login-input-icon">
                    <span />
                  </div>

                  <input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    required
                  />

                </div>
              </div>


              {/* PASSWORD */}
              <div className="login-field">

                <label htmlFor="password">
                  Password
                </label>

                <div className="login-input">

                  <LockKeyhole size={17} />

                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter your password"
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>

                </div>
              </div>


              {/* SIGN IN BUTTON */}
              <button
                type="submit"
                className="login-submit"
              >
                <span>Enter AquaXchange</span>
                <ArrowRight size={17} />
              </button>

            </form>


            {/* SIGN UP */}
            <div className="signup-text">
              Don't have an account?
              <a href="/signup"> Create one</a>
            </div>


            {/* SECURITY */}
            <div className="login-security">
              <ShieldCheck size={13} />
              Protected by AquaXchange intelligence
            </div>

          </div>

        </section>

      </div>
    </main>
  );
}