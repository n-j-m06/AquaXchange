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

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [lightning, setLightning] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("MUNICIPALITY");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Request state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

  const handleSignup = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Check passwords
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8000/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            role,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Registration failed."
        );
      }

      setSuccess(
        "Account created successfully! Redirecting..."
      );

      setTimeout(() => {
        window.location.href = "/login";
      }, 1200);
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
      className={`signup-page ${
        lightning ? "lightning-active" : ""
      }`}
    >
      {/* ================= BACKGROUND ================= */}

      <div className="signup-atmosphere">
        <div className="storm-cloud cloud-one" />
        <div className="storm-cloud cloud-two" />

        <div className="signup-glow glow-one" />
        <div className="signup-glow glow-two" />

        <div className="signup-grid" />

        <div className="signup-rain">
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

      {/* ================= MAIN CONTAINER ================= */}

      <div className="signup-container">

        {/* ================= LEFT VISUAL ================= */}

        <section className="signup-visual">

          <a href="/" className="signup-brand">
            <div className="signup-brand-icon">
              <Droplets size={21} />
            </div>

            <div>
              <strong>AquaXchange</strong>
              <span>Water Intelligence</span>
            </div>
          </a>

          <div className="signup-visual-content">

            <div className="signup-eyebrow">
              <span />
              INTELLIGENT WATER MANAGEMENT
            </div>

            <h1>
              Shape the future.
              <br />
              <em>One drop at a time.</em>
            </h1>

            <p>
              Join AquaXchange and connect water sources,
              cities, industries and agriculture through
              AI-powered allocation and intelligent
              decision support.
            </p>

            {/* ================= NETWORK ================= */}

            <div className="signup-network">

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
                <span>Water Source</span>
              </div>

              <div className="network-node node-city">
                <div className="node-dot" />
                <span>Municipality</span>
              </div>

              <div className="network-node node-industry">
                <div className="node-dot" />
                <span>Industry</span>
              </div>

              <div className="network-node node-farm">
                <div className="node-dot" />
                <span>Agriculture</span>
              </div>

              <div className="network-ai-core">
                <div className="ai-core-ring ring-a" />
                <div className="ai-core-ring ring-b" />

                <Sparkles size={21} />

                <span>AI</span>
              </div>

            </div>
          </div>

          <div className="signup-footer">
            <ShieldCheck size={15} />
            Secure infrastructure • Intelligent allocation
          </div>

        </section>

        {/* ================= SIGNUP FORM ================= */}

        <section className="signup-form-section">

          <div className="signup-card">

            <div className="signup-status">
              <span className="signup-status-dot" />
              SYSTEM ONLINE
            </div>

            {/* MOBILE BRAND */}

            <div className="mobile-brand">
              <div className="signup-brand-icon">
                <Droplets size={20} />
              </div>

              <strong>AquaXchange</strong>
            </div>

            {/* HEADING */}

            <div className="signup-card-heading">

              <span className="card-label">
                GET STARTED
              </span>

              <h2>
                Create account<span>.</span>
              </h2>

              <p>
                Create your AquaXchange account and enter
                the intelligent water management platform.
              </p>

            </div>

            {/* ================= FORM ================= */}

            <form onSubmit={handleSignup}>

              {/* FULL NAME */}

              <div className="signup-field">

                <label htmlFor="name">
                  Full Name
                </label>

                <div className="signup-input">

                  <div className="signup-input-icon">
                    <span />
                  </div>

                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    required
                  />

                </div>

              </div>

              {/* EMAIL */}

              <div className="signup-field">

                <label htmlFor="email">
                  Email
                </label>

                <div className="signup-input">

                  <span
                    style={{
                      fontSize: "15px",
                      color:
                        "rgba(190, 230, 240, 0.38)",
                    }}
                  >
                    @
                  </span>

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

              {/* ROLE */}

              <div className="signup-field">

                <label htmlFor="role">
                  Role
                </label>

                <div className="signup-input">

                  <select
                    id="role"
                    value={role}
                    onChange={(e) =>
                      setRole(e.target.value)
                    }
                    required
                  >
                    <option value="MUNICIPALITY">
                      Municipality
                    </option>

                    <option value="INDUSTRY">
                      Industry
                    </option>

                    <option value="FARMER">
                      Farmer
                    </option>

                    <option value="GOVERNMENT">
                      Government
                    </option>
                  </select>

                </div>

              </div>

              {/* PASSWORD */}

              <div className="signup-field">

                <label htmlFor="password">
                  Password
                </label>

                <div className="signup-input">

                  <LockKeyhole size={17} />

                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    required
                    minLength={6}
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

              {/* CONFIRM PASSWORD */}

              <div className="signup-field">

                <label htmlFor="confirmPassword">
                  Confirm Password
                </label>

                <div className="signup-input">

                  <LockKeyhole size={17} />

                  <input
                    id="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(
                        e.target.value
                      )
                    }
                    required
                    minLength={6}
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    aria-label={
                      showConfirmPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>

                </div>

              </div>

              {/* TERMS */}

              <div className="signup-terms">

                <input
                  id="terms"
                  type="checkbox"
                  required
                />

                <label htmlFor="terms">
                  I agree to the AquaXchange platform
                  terms and conditions.
                </label>

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

              {/* SUCCESS */}

              {success && (
                <div
                  style={{
                    marginBottom: "15px",
                    padding: "10px 12px",
                    borderRadius: "9px",
                    background:
                      "rgba(67, 230, 177, 0.08)",
                    border:
                      "1px solid rgba(67, 230, 177, 0.18)",
                    color: "#67e8b5",
                    fontSize: "11px",
                  }}
                >
                  {success}
                </div>
              )}

              {/* SUBMIT */}

              <button
                type="submit"
                className="signup-submit"
                disabled={loading}
              >
                <span>
                  {loading
                    ? "Creating account..."
                    : "Create AquaXchange Account"}
                </span>

                <ArrowRight size={17} />
              </button>

            </form>

            {/* LOGIN LINK */}

            <div className="login-text">
              Already have an account?
              <a href="/login"> Sign in</a>
            </div>

            {/* SECURITY */}

            <div className="signup-security">
              <ShieldCheck size={13} />
              Protected by AquaXchange intelligence
            </div>

          </div>

        </section>

      </div>
    </main>
  );
}