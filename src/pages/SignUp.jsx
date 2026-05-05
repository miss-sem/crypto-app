import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import coinbaseLogo from "../assets/coinbaseLogoNavigation-4.svg";
import { useAuth } from "../context/AuthContext";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

// ─── Icons ────────────────────────────────────────────────────────────────────
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
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.32 2.99-2.53 4zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
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

// ─── Shared styles ────────────────────────────────────────────────────────────
const inputStyle = {
  width: "100%",
  padding: "0.85rem 1rem",
  background: "#1a1a1a",
  border: "1px solid #2e2e2e",
  borderRadius: "0.75rem",
  fontSize: "0.95rem",
  color: "#ffffff",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle = {
  display: "block",
  fontSize: "0.875rem",
  fontWeight: 500,
  color: "#ffffff",
  marginBottom: "0.45rem",
};

function SocialButton({ icon, label }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
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

function Divider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
      <div style={{ flex: 1, height: "1px", background: "#2e2e2e" }} />
      <span style={{ fontSize: "0.8rem", color: "#6b7280", fontWeight: 500 }}>OR</span>
      <div style={{ flex: 1, height: "1px", background: "#2e2e2e" }} />
    </div>
  );
}

function FormField({ label, type = "text", placeholder, value, onChange, required, autoFocus }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        autoFocus={autoFocus}
        style={inputStyle}
        onFocus={(e) => (e.target.style.borderColor = "#3d5bf0")}
        onBlur={(e) => (e.target.style.borderColor = "#2e2e2e")}
      />
    </div>
  );
}

function PasswordField({ label, value, onChange, placeholder, required }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <div style={{ position: "relative" }}>
        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          style={{ ...inputStyle, paddingRight: "3rem" }}
          onFocus={(e) => (e.target.style.borderColor = "#3d5bf0")}
          onBlur={(e) => (e.target.style.borderColor = "#2e2e2e")}
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          style={{ position: "absolute", right: "0.85rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#6b7280", padding: 0, display: "flex", alignItems: "center" }}
        >
          {show ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
    </div>
  );
}

// ─── Step 1: Account type ─────────────────────────────────────────────────────
function PersonalIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <circle cx="22" cy="16" r="9" fill="#3b82f6" />
      <path d="M4 44c0-9.941 8.059-18 18-18s18 8.059 18 18" fill="#3b82f6" />
      <rect x="30" y="30" width="18" height="14" rx="3" fill="#1e3a8a" />
      <rect x="32" y="32" width="14" height="10" rx="2" fill="#2563eb" />
      <path d="M36 37.5l2.5 2.5 4-4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BusinessIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <circle cx="16" cy="15" r="7" fill="#6b7280" />
      <path d="M2 40c0-7.732 6.268-14 14-14" fill="#6b7280" />
      <circle cx="28" cy="13" r="6" fill="#9ca3af" />
      <path d="M22 40c0-7.18 5.82-13 13-13" fill="#9ca3af" />
      <circle cx="38" cy="36" r="11" fill="#f59e0b" />
      <circle cx="38" cy="36" r="8" fill="#d97706" />
      <text x="38" y="40" textAnchor="middle" fill="white" fontSize="11" fontWeight="800" fontFamily="system-ui">$</text>
    </svg>
  );
}

function DeveloperIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <path d="M26 4L48 16L26 22L4 16Z" fill="#2563eb" />
      <path d="M26 22L48 28L26 36L4 28Z" fill="#60a5fa" />
      <path d="M26 34L48 42L26 48L4 42Z" fill="#bfdbfe" />
    </svg>
  );
}

const ACCOUNT_TYPES = [
  { id: "personal",   label: "Personal",   desc: "Trade crypto as an individual.",                                                          Icon: PersonalIcon },
  { id: "business",   label: "Business",   desc: "Manage teams and portfolios, accept crypto payments, access APIs, and more",              Icon: BusinessIcon },
  { id: "developer",  label: "Developer",  desc: "Build onchain using developer tooling.",                                                   Icon: DeveloperIcon },
];

function AccountTypeStep({ onSelect }) {
  const [hovered, setHovered] = useState(null);
  return (
    <div style={{ width: "100%", maxWidth: "460px" }}>
      <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#ffffff", marginBottom: "1.75rem", lineHeight: 1.25 }}>
        What kind of account are you creating?
      </h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {ACCOUNT_TYPES.map(({ id, label, desc, Icon }) => (
          <button
            key={id}
            onClick={() => onSelect(id)}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: "flex", alignItems: "center", gap: "1rem",
              padding: "1.1rem 1.25rem",
              background: hovered === id ? "#1a1f2e" : "#141414",
              border: `1px solid ${hovered === id ? "#3d5bf0" : "#2a2a2a"}`,
              borderRadius: "0.875rem",
              cursor: "pointer", textAlign: "left",
              transition: "all 0.15s", width: "100%",
            }}
          >
            <div style={{ flexShrink: 0, width: "52px", height: "52px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "#ffffff", margin: "0 0 0.2rem" }}>{label}</p>
              <p style={{ fontSize: "0.82rem", color: "#9ca3af", margin: 0, lineHeight: 1.45 }}>{desc}</p>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        ))}
      </div>
      <p style={{ textAlign: "center", fontSize: "0.875rem", color: "#ffffff", marginTop: "1.5rem" }}>
        Already have an account?{" "}
        <Link to="/signin" style={{ color: "#4f87f5", fontWeight: 600, textDecoration: "none" }}>Sign in</Link>
      </p>
    </div>
  );
}

// ─── Step 2: Email screen (matches screenshot) ────────────────────────────────
function EmailStep({ accountType, onBack, email, setEmail, onContinue }) {
  function handleSubmit(e) {
    e.preventDefault();
    if (email.trim()) onContinue();
  }

  return (
    <div style={{ width: "100%", maxWidth: "400px" }}>
      {/* Back button */}
      <button
        onClick={onBack}
        style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: 0, display: "flex", alignItems: "center", marginBottom: "2rem" }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
      </button>

      <h1 style={{ fontSize: "1.65rem", fontWeight: 700, color: "#ffffff", margin: "0 0 0.5rem" }}>
        Create your account
      </h1>
      <p style={{ fontSize: "0.9rem", color: "#9ca3af", margin: "0 0 1.75rem", lineHeight: 1.5 }}>
        Access all that Coinbase has to offer with a single account.
      </p>

      <form onSubmit={handleSubmit} style={{ marginBottom: "1.25rem" }}>
        <label style={labelStyle}>Email</label>
        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
          required
          style={{ ...inputStyle, marginBottom: "1rem" }}
          onFocus={(e) => (e.target.style.borderColor = "#3d5bf0")}
          onBlur={(e) => (e.target.style.borderColor = "#2e2e2e")}
        />
        <button
          type="submit"
          style={{ width: "100%", padding: "0.85rem", background: "#3d5bf0", color: "white", border: "none", borderRadius: "9999px", fontSize: "1rem", fontWeight: 600, cursor: "pointer" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#2f4de0")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#3d5bf0")}
        >
          Continue
        </button>
      </form>

      <Divider />

      <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", margin: "1.25rem 0 1.75rem" }}>
        <SocialButton icon={<GoogleIcon />} label="Sign up with Google" />
        <SocialButton icon={<AppleIcon />} label="Sign up with Apple" />
      </div>

      <p style={{ textAlign: "center", fontSize: "0.9rem", color: "#ffffff", marginBottom: "1.25rem" }}>
        <strong>Already have an account?</strong>{" "}
        <Link to="/signin" style={{ color: "#4f87f5", fontWeight: 600, textDecoration: "none" }}>Sign in</Link>
      </p>

      <p style={{ textAlign: "center", fontSize: "0.75rem", color: "#6b7280", lineHeight: 1.55 }}>
        By creating an account you certify that you are over the age of 18 and agree to our{" "}
        <a href="#" style={{ color: "#6b7280", textDecoration: "underline" }}>Privacy Policy</a>
        {" "}and{" "}
        <a href="#" style={{ color: "#6b7280", textDecoration: "underline" }}>Cookie Policy</a>.
      </p>
    </div>
  );
}

// ─── Step 3: Full registration form ──────────────────────────────────────────
const TYPE_LABELS = { personal: "Personal", business: "Business", developer: "Developer" };

function DetailsStep({ accountType, onBack, email, formData, setFormData }) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const update = (key) => (e) => setFormData((prev) => ({ ...prev, [key]: e.target.value }));
  const isPersonal = accountType === "personal";
  const isBusiness = accountType === "business";

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const name = isPersonal
      ? `${formData.firstName} ${formData.lastName}`.trim()
      : isBusiness
      ? formData.companyName
      : formData.firstName;

    setLoading(true);
    try {
      const regRes = await fetch(`${API}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password: formData.password }),
      });
      const regData = await regRes.json();
      if (!regRes.ok) { setError(regData.message || "Registration failed."); return; }

      // Auto-login after successful registration
      const loginRes = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password: formData.password }),
      });
      const loginData = await loginRes.json();
      if (loginRes.ok) {
        login(loginData.user);
        navigate("/explore");
      } else {
        navigate("/signin");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ width: "100%", maxWidth: "400px" }}>
      {/* Back + badge */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.75rem" }}>
        <button
          onClick={onBack}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: 0, display: "flex", alignItems: "center" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>
        <span style={{ fontSize: "0.78rem", background: "#1e3a8a", color: "#93c5fd", borderRadius: "9999px", padding: "0.2rem 0.75rem", fontWeight: 600 }}>
          {TYPE_LABELS[accountType]}
        </span>
      </div>

      <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#ffffff", margin: "0 0 0.4rem" }}>
        Complete your profile
      </h1>
      <p style={{ fontSize: "0.85rem", color: "#9ca3af", margin: "0 0 1.5rem" }}>{email}</p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {isPersonal && (
          <div className="name-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <FormField label="First name" placeholder="First name" value={formData.firstName} onChange={update("firstName")} required autoFocus />
            <FormField label="Last name" placeholder="Last name" value={formData.lastName} onChange={update("lastName")} required />
          </div>
        )}
        {isBusiness && (
          <FormField label="Business name" placeholder="Your company name" value={formData.companyName} onChange={update("companyName")} required autoFocus />
        )}
        {accountType === "developer" && (
          <FormField label="Full name" placeholder="Your name" value={formData.firstName} onChange={update("firstName")} required autoFocus />
        )}

        <PasswordField label="Password" value={formData.password} onChange={update("password")} placeholder="Create a password" required />
        <PasswordField label="Confirm password" value={formData.confirmPassword} onChange={update("confirmPassword")} placeholder="Confirm your password" required />

        {isPersonal && (
          <FormField label="Date of birth" type="date" value={formData.dob} onChange={update("dob")} required />
        )}

        <ul style={{ fontSize: "0.75rem", color: "#6b7280", paddingLeft: "1rem", lineHeight: 1.75, margin: 0 }}>
          <li>At least 8 characters long</li>
          <li>Contains a number or special character</li>
        </ul>

        {error && (
          <p style={{ color: "#f87171", fontSize: "0.85rem", textAlign: "center", margin: 0 }}>{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{ width: "100%", padding: "0.85rem", background: loading ? "#5a6fd6" : "#3d5bf0", color: "white", border: "none", borderRadius: "9999px", fontSize: "1rem", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", marginTop: "0.25rem" }}
          onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = "#2f4de0"; }}
          onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = "#3d5bf0"; }}
        >
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p style={{ textAlign: "center", fontSize: "0.78rem", color: "#f87171", marginTop: "1rem" }}>
        Demo app — do not use your real password.
      </p>

      <p style={{ textAlign: "center", fontSize: "0.72rem", color: "#6b7280", marginTop: "0.5rem", lineHeight: 1.55 }}>
        By creating an account, you agree to our{" "}
        <a href="#" style={{ color: "#6b7280", textDecoration: "underline" }}>Terms of Service</a>
        {" "}and{" "}
        <a href="#" style={{ color: "#6b7280", textDecoration: "underline" }}>Privacy Policy</a>.
      </p>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function SignUp() {
  const [step, setStep] = useState(1);         // 1=type, 2=email, 3=details
  const [accountType, setAccountType] = useState(null);
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", password: "", confirmPassword: "", dob: "", companyName: "",
  });

  function selectType(type) {
    setAccountType(type);
    setStep(2);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", display: "flex", flexDirection: "column" }}>
      {/* Logo */}
      <div style={{ padding: "1.5rem 2rem", flexShrink: 0 }}>
        <Link to="/">
          <img src={coinbaseLogo} alt="Coinbase" style={{ width: "2.25rem", height: "2.25rem", filter: "brightness(0) invert(1)" }} />
        </Link>
      </div>

      {/* Centered content */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem 1rem 4rem" }}>
        {step === 1 && <AccountTypeStep onSelect={selectType} />}
        {step === 2 && (
          <EmailStep
            accountType={accountType}
            onBack={() => setStep(1)}
            email={email}
            setEmail={setEmail}
            onContinue={() => setStep(3)}
          />
        )}
        {step === 3 && (
          <DetailsStep
            accountType={accountType}
            onBack={() => setStep(2)}
            email={email}
            formData={formData}
            setFormData={setFormData}
          />
        )}
      </div>
    </div>
  );
}
