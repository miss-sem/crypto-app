import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import coinbaseLogo from "../assets/coinbaseLogoNavigation-4.svg";

export default function SignIn() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1 = email, 2 = password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleContinue(e) {
    e.preventDefault();
    if (email.trim()) setStep(2);
  }

  function handleSignIn(e) {
    e.preventDefault();
    // Cosmetic — just navigate home
    navigate("/");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top-left logo */}
      <div style={{ padding: "1.5rem 2rem" }}>
        <Link to="/">
          <img
            src={coinbaseLogo}
            alt="Coinbase"
            style={{
              width: "2.25rem",
              height: "2.25rem",
              filter: "brightness(0) invert(1)",
            }}
          />
        </Link>
      </div>

      {/* Centered form */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 1rem 4rem",
        }}
      >
        <div style={{ width: "100%", maxWidth: "400px" }}>
          <h1
            style={{
              fontSize: "1.65rem",
              fontWeight: 700,
              color: "#ffffff",
              marginBottom: "1.75rem",
              textAlign: "left",
            }}
          >
            Sign in to Coinbase
          </h1>

          {step === 1 ? (
            <>
              {/* Email form */}
              <form onSubmit={handleContinue} style={{ marginBottom: "1.25rem" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    color: "#ffffff",
                    marginBottom: "0.5rem",
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                  required
                  style={{
                    width: "100%",
                    padding: "0.85rem 1rem",
                    background: "#1a1a1a",
                    border: "1px solid #2e2e2e",
                    borderRadius: "0.75rem",
                    fontSize: "0.95rem",
                    color: "#ffffff",
                    outline: "none",
                    boxSizing: "border-box",
                    marginBottom: "1rem",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#3d5bf0")}
                  onBlur={(e) => (e.target.style.borderColor = "#2e2e2e")}
                />
                <button
                  type="submit"
                  style={{
                    width: "100%",
                    padding: "0.85rem",
                    background: "#3d5bf0",
                    color: "white",
                    border: "none",
                    borderRadius: "9999px",
                    fontSize: "1rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.target.style.background = "#2f4de0")}
                  onMouseLeave={(e) => (e.target.style.background = "#3d5bf0")}
                >
                  Continue
                </button>
              </form>

              {/* OR divider */}
              <Divider />

              {/* Social buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", marginBottom: "1.75rem" }}>
                <SocialButton icon={<PasskeyIcon />} label="Sign in with Passkey" />
                <SocialButton icon={<GoogleIcon />} label="Sign in with Google" />
                <SocialButton icon={<AppleIcon />} label="Sign in with Apple" />
              </div>
            </>
          ) : (
            <>
              {/* Step 2 — password */}
              {/* Show locked email */}
              <div
                style={{
                  padding: "0.85rem 1rem",
                  background: "#1a1a1a",
                  border: "1px solid #2e2e2e",
                  borderRadius: "0.75rem",
                  fontSize: "0.9rem",
                  color: "#9ca3af",
                  marginBottom: "1rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>{email}</span>
                <button
                  onClick={() => setStep(1)}
                  style={{ background: "none", border: "none", color: "#3d5bf0", cursor: "pointer", fontSize: "0.82rem", fontWeight: 600, padding: 0 }}
                >
                  Edit
                </button>
              </div>

              <form onSubmit={handleSignIn} style={{ marginBottom: "1.25rem" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    color: "#ffffff",
                    marginBottom: "0.5rem",
                  }}
                >
                  Password
                </label>
                <div style={{ position: "relative", marginBottom: "1rem" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoFocus
                    required
                    style={{
                      width: "100%",
                      padding: "0.85rem 3rem 0.85rem 1rem",
                      background: "#1a1a1a",
                      border: "1px solid #2e2e2e",
                      borderRadius: "0.75rem",
                      fontSize: "0.95rem",
                      color: "#ffffff",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#3d5bf0")}
                    onBlur={(e) => (e.target.style.borderColor = "#2e2e2e")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    style={{
                      position: "absolute",
                      right: "0.85rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#6b7280",
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>

                <button
                  type="submit"
                  style={{
                    width: "100%",
                    padding: "0.85rem",
                    background: "#3d5bf0",
                    color: "white",
                    border: "none",
                    borderRadius: "9999px",
                    fontSize: "1rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    marginBottom: "0.75rem",
                  }}
                  onMouseEnter={(e) => (e.target.style.background = "#2f4de0")}
                  onMouseLeave={(e) => (e.target.style.background = "#3d5bf0")}
                >
                  Sign in
                </button>

                <div style={{ textAlign: "center" }}>
                  <a
                    href="#"
                    style={{ fontSize: "0.85rem", color: "#3d5bf0", textDecoration: "none", fontWeight: 500 }}
                  >
                    Forgot password?
                  </a>
                </div>
              </form>
            </>
          )}

          {/* Don't have an account */}
          <p style={{ textAlign: "center", fontSize: "0.9rem", color: "#ffffff", marginBottom: "1.25rem" }}>
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "#4f87f5", fontWeight: 600, textDecoration: "none" }}>
              Sign up
            </Link>
          </p>

          {/* Privacy note */}
          <p style={{ textAlign: "center", fontSize: "0.78rem", color: "#6b7280", lineHeight: 1.5 }}>
            Not your device? Use a private window. See our{" "}
            <a href="#" style={{ color: "#6b7280", textDecoration: "underline" }}>
              Privacy Policy
            </a>{" "}
            for more info.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function Divider() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        marginBottom: "1.25rem",
      }}
    >
      <div style={{ flex: 1, height: "1px", background: "#2e2e2e" }} />
      <span style={{ fontSize: "0.8rem", color: "#6b7280", fontWeight: 500 }}>OR</span>
      <div style={{ flex: 1, height: "1px", background: "#2e2e2e" }} />
    </div>
  );
}

function SocialButton({ icon, label }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.75rem",
        padding: "0.8rem 1rem",
        background: hovered ? "#222222" : "#1a1a1a",
        border: "1px solid #2e2e2e",
        borderRadius: "9999px",
        color: "#ffffff",
        fontSize: "0.95rem",
        fontWeight: 600,
        cursor: "pointer",
        transition: "background 0.15s",
      }}
    >
      {icon}
      {label}
    </button>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────
function PasskeyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.32 2.99-2.53 4-.01.01-.01.01 0 0zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );
}
