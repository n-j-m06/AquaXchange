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

  // ================= FORM STATE =================

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ================= REQUEST STATE =================

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ================= LIGHTNING EFFECT =================

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

  // ================= LOGIN =================

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      /*
        FastAPI uses OAuth2PasswordRequestForm.

        Therefore the request MUST be sent as
        application/x-www-form-urlencoded,
        not JSON.
      */

      const formData = new URLSearchParams();

      formData.append("username", email);
      formData.append("password", password);

      const response = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail ||
            "Invalid email or password."
        );
      }

      // ================= STORE LOGIN SESSION =================

      localStorage.setItem(
        "aquaxchange_token",
        data.access_token
      );

      localStorage.setItem(
        "aquaxchange_user",
        JSON.stringify({
          user_id: data.user_id,
          name: data.name,
          email: data.email,
          role: data.role,
        })
      );

      // ================= GO TO DASHBOARD =================

      window.location.href = "/dashboard";
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "Unable to connect to the AquaXchange server."
        );
      }
    } finally {
      setLoading(false);
    }
  };

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

          {Array.from({ length: 145 }).map(
            (_, i) => (

              <span
                key={i}
                style={{
                  left: `${(i * 17.31) % 100}%`,
                  animationDelay: `${
                    (i * 0.087) % 4
                  }s`,
                  animationDuration: `${
                    0.65 +
                    ((i * 13) % 15) / 10
                  }s`,
                }}
              />

            )
          )}

        </div>


        {/* LIGHTNING */}

        <div className="lightning-flash lightning-flash-one" />

        <div className="lightning-flash lightning-flash-two" />


        <div className="lightning-bolt bolt-one">

          <svg viewBox="0 0 160 500">

            <path
              d="M105 0 L62 145 L92 145 L25 315 L61 315 L15 500"
            />

          </svg>

        </div>


        <div className="lightning-bolt bolt-two">

          <svg viewBox="0 0 160 500">

            <path
              d="M105 0 L62 145 L92 145 L25 315 L61 315 L15 500"
            />

          </svg>

        </div>


        <div className="storm-mist mist-one" />
        <div className="storm-mist mist-two" />

      </div>


      {/* =====================================================
          MAIN CONTAINER
          ===================================================== */}

      <div className="login-container">


        {/* =================================================
            LEFT SIDE
            ================================================= */}

        <section className="login-visual">


          {/* BRAND */}

          <a
            href="/"
            className="login-brand"
          >

            <div className="login-brand-icon">
              <Droplets size={21} />
            </div>

            <div>

              <strong>
                AquaXchange
              </strong>

              <span>
                Water Intelligence
              </span>

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

              <em>
                Intelligence leads.
              </em>

            </h1>


            <p>

              Connect water sources, cities,
              industries and agriculture through
              AI-powered allocation and
              intelligent decision support.

            </p>


            {/* NETWORK */}

            <div className="login-network">


              <div className="network-orbit orbit-one" />

              <div className="network-orbit orbit-two" />


              <svg
                className="network-lines"
                viewBox="0 0 500 300"
                preserveAspectRatio="none"
              >

                <path d="M80 70 C160 80 190 130 250 150" />

                <path d="M420 65 C340 85 315 125 250 150" />

                <path d="M80 235 C160 220 190 175 250 150" />

                <path d="M420 235 C340 215 315 175 250 150" />

              </svg>


              <div className="network-node node-reservoir">

                <Droplets size={17} />

                <span>
                  Water Source
                </span>

              </div>


              <div className="network-node node-city">

                <div className="node-dot" />

                <span>
                  Municipality
                </span>

              </div>


              <div className="network-node node-industry">

                <div className="node-dot" />

                <span>
                  Industry
                </span>

              </div>


              <div className="network-node node-farm">

                <div className="node-dot" />

                <span>
                  Agriculture
                </span>

              </div>


              <div className="network-ai-core">

                <div className="ai-core-ring ring-a" />

                <div className="ai-core-ring ring-b" />

                <Sparkles size={21} />

                <span>
                  AI
                </span>

              </div>


            </div>

          </div>


          {/* FOOTER */}

          <div className="login-footer">

            <ShieldCheck size={15} />

            Secure infrastructure • Intelligent allocation

          </div>


        </section>


        {/* =================================================
            RIGHT SIDE
            ================================================= */}

        <section className="login-form-section">


          <div className="login-card">


            {/* STATUS */}

            <div className="login-status">

              <span className="login-status-dot" />

              SYSTEM ONLINE

            </div>


            {/* MOBILE BRAND */}

            <div className="mobile-brand">

              <div className="login-brand-icon">

                <Droplets size={20} />

              </div>

              <strong>
                AquaXchange
              </strong>

            </div>


            {/* HEADING */}

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

            <form onSubmit={handleLogin}>


              {/* EMAIL */}

              <div className="login-field">

                <label htmlFor="email">
                  Email
                </label>


                <div className="login-input">

                  <div className="login-input-icon">

                    <span />

                  </div>


                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
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
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    required
                  />


                  <button
                    type="button"
                    className="password-toggle"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
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


              {/* ERROR */}

              {error && (

                <div
                  style={{
                    marginBottom: "15px",
                    padding: "10px 12px",
                    borderRadius: "9px",
                    background:
                      "rgba(255, 70, 70, 0.08)",
                    border:
                      "1px solid rgba(255, 90, 90, 0.18)",
                    color: "#ff8f8f",
                    fontSize: "11px",
                  }}
                >

                  {error}

                </div>

              )}


              {/* SIGN IN */}

              <button
                type="submit"
                className="login-submit"
                disabled={loading}
              >

                <span>

                  {loading
                    ? "Signing in..."
                    : "Enter AquaXchange"}

                </span>

                <ArrowRight size={17} />

              </button>


            </form>


            {/* SIGN UP */}

            <div className="signup-text">

              Don't have an account?

              <a href="/signup">
                {" "}Create one
              </a>

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