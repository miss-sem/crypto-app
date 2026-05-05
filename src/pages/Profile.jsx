import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

function formatDate(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? "—" : d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function initials(name = "") {
  return name.split(" ").slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");
}

// ─── Icons ─────────────────────────────────────────────────────────────────────
const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const ShieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const GearIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
  </svg>
);
const BellIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>
  </svg>
);
const CardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
  </svg>
);
const SignOutIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);
const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6"/>
  </svg>
);
const VerifyShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
  </svg>
);

// ─── Sidebar item ──────────────────────────────────────────────────────────────
function SidebarItem({ icon, label, active = false }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: "0.85rem 1.25rem",
        background: active ? "#eff6ff" : hovered ? "#f9fafb" : "transparent",
        border: "none",
        borderLeft: active ? "3px solid #2563eb" : "3px solid transparent",
        cursor: "pointer",
        textAlign: "left",
        transition: "background 0.12s",
      }}
    >
      <span style={{ color: active ? "#2563eb" : "#6b7280" }}>{icon}</span>
      <span style={{ fontSize: "0.95rem", fontWeight: active ? 700 : 500, color: active ? "#2563eb" : "#374151" }}>{label}</span>
    </button>
  );
}

// ─── Info row ──────────────────────────────────────────────────────────────────
function InfoRow({ label, value, last = false }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 0" }}>
        <div>
          <p style={{ fontSize: "0.8rem", color: "#9ca3af", marginBottom: "0.25rem" }}>{label}</p>
          <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "#111827" }}>{value || "—"}</div>
        </div>
        <ChevronRight />
      </div>
      {!last && <div style={{ height: "1px", background: "#f3f4f6" }} />}
    </div>
  );
}

// ─── Form field ────────────────────────────────────────────────────────────────
function FormField({ label, placeholder, value, onChange, type = "text", step }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: "1.25rem" }}>
      <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#111827", marginBottom: "0.4rem" }}>{label}</label>
      <input
        type={type}
        step={step}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          padding: "0.75rem 1rem",
          border: `1.5px solid ${focused ? "#2563eb" : "#e5e7eb"}`,
          borderRadius: "0.75rem",
          fontSize: "0.95rem",
          color: "#111827",
          outline: "none",
          boxSizing: "border-box",
          background: "#fff",
          transition: "border-color 0.15s",
        }}
      />
    </div>
  );
}

// ─── Add Crypto View ───────────────────────────────────────────────────────────
function AddCryptoView({ onBack }) {
  const [form, setForm] = useState({ name: "", symbol: "", price: "", image: "", change24h: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (key) => (val) => setForm((f) => ({ ...f, [key]: val }));

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API}/crypto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: form.name,
          symbol: form.symbol.toUpperCase(),
          price: parseFloat(form.price),
          image: form.image,
          change24h: parseFloat(form.change24h),
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || "Failed to add asset."); return; }
      setSuccess("Asset listed successfully!");
      setTimeout(() => onBack(), 1500);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f5f7fa", padding: "2.5rem 1.5rem" }}>
      <div style={{ maxWidth: "520px", margin: "0 auto" }}>
        <button
          onClick={onBack}
          style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "none", border: "none", cursor: "pointer", fontSize: "0.9rem", color: "#374151", fontWeight: 500, marginBottom: "1.75rem", padding: 0 }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
          Back to Settings
        </button>

        <div style={{ background: "#fff", borderRadius: "0.875rem", padding: "2rem 2.25rem", boxShadow: "0 1px 3px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.04)" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827", marginBottom: "0.5rem" }}>List a new asset</h1>
          <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "1.75rem", lineHeight: 1.5 }}>
            Provide the details below to add a new cryptocurrency to the market index.
          </p>

          {error && <p style={{ color: "#ef4444", fontSize: "0.875rem", marginBottom: "1rem" }}>{error}</p>}
          {success && <p style={{ color: "#16a34a", fontSize: "0.875rem", marginBottom: "1rem" }}>{success}</p>}

          <form onSubmit={handleSubmit}>
            <FormField label="Asset Name" placeholder="e.g. Bitcoin" value={form.name} onChange={set("name")} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <FormField label="Symbol" placeholder="BTC" value={form.symbol} onChange={set("symbol")} />
              <FormField label="24h Change (%)" placeholder="2.5" value={form.change24h} onChange={set("change24h")} type="number" step="0.01" />
            </div>
            <FormField label="Current Price (USD)" placeholder="64000.00" value={form.price} onChange={set("price")} type="number" step="0.01" />
            <FormField label="Icon URL" placeholder="https://..." value={form.image} onChange={set("image")} />

            <button
              type="submit"
              disabled={loading}
              style={{ width: "100%", padding: "0.9rem", background: loading ? "#93c5fd" : "#2563eb", color: "#fff", border: "none", borderRadius: "9999px", fontWeight: 700, fontSize: "1rem", cursor: loading ? "not-allowed" : "pointer", marginTop: "0.25rem" }}
            >
              {loading ? "Listing…" : "List Asset"}
            </button>
            <button
              type="button"
              onClick={onBack}
              style={{ width: "100%", padding: "0.75rem", background: "none", border: "none", color: "#6b7280", fontWeight: 500, fontSize: "0.95rem", cursor: "pointer", marginTop: "0.25rem" }}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ─── Main Profile / Settings ───────────────────────────────────────────────────
export default function Profile() {
  const { user: ctxUser, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [view, setView] = useState("settings");

  useEffect(() => {
    if (!ctxUser) { navigate("/signin"); return; }
    fetch(`${API}/profile`, { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => { if (data?.success) setProfile(data.user); })
      .catch(() => {});
  }, [ctxUser, navigate]);

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  if (view === "addCrypto") return <AddCryptoView onBack={() => setView("settings")} />;

  const data = profile || ctxUser;

  return (
    <div style={{ minHeight: "100vh", background: "#f5f7fa", padding: "2.5rem 1.5rem" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto", display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>

        {/* ── Sidebar ── */}
        <div style={{ width: "230px", flexShrink: 0 }}>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#111827", marginBottom: "1.25rem", paddingLeft: "0.25rem" }}>Settings</h1>
          <div style={{ background: "#fff", borderRadius: "0.875rem", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.07)" }}>
            <SidebarItem icon={<UserIcon />} label="Profile" active />
            <SidebarItem icon={<ShieldIcon />} label="Security" />
            <SidebarItem icon={<GearIcon />} label="Preferences" />
            <SidebarItem icon={<BellIcon />} label="Notifications" />
            <SidebarItem icon={<CardIcon />} label="Payment methods" />
            <div style={{ height: "1px", background: "#f3f4f6" }} />
            <button
              onClick={handleLogout}
              style={{ width: "100%", display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.85rem 1.25rem", background: "none", border: "none", borderLeft: "3px solid transparent", cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#fff5f5")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <SignOutIcon />
              <span style={{ fontSize: "0.95rem", fontWeight: 600, color: "#ef4444" }}>Sign out</span>
            </button>
          </div>
        </div>

        {/* ── Main content ── */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ background: "#fff", borderRadius: "0.875rem", boxShadow: "0 1px 3px rgba(0,0,0,0.07)", overflow: "hidden" }}>

            {/* Header row */}
            <div style={{ padding: "1.5rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #f3f4f6" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ width: "3.25rem", height: "3.25rem", borderRadius: "9999px", background: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                  {initials(data?.name)}
                </div>
                <div>
                  <p style={{ fontSize: "1.15rem", fontWeight: 700, color: "#111827" }}>{data?.name || "—"}</p>
                  <p style={{ fontSize: "0.85rem", color: "#6b7280", marginTop: "0.1rem" }}>{data?.email || "—"}</p>
                </div>
              </div>
              <button
                onClick={() => setView("addCrypto")}
                style={{ display: "flex", alignItems: "center", gap: "0.45rem", padding: "0.6rem 1.25rem", background: "#2563eb", color: "#fff", border: "none", borderRadius: "9999px", fontWeight: 600, fontSize: "0.875rem", cursor: "pointer", whiteSpace: "nowrap" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#1d4ed8")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#2563eb")}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Add Cryptocurrency
              </button>
            </div>

            {/* Personal Information */}
            <div style={{ padding: "1.25rem 2rem 0" }}>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#111827", marginBottom: "0.25rem" }}>Personal Information</h2>
              <InfoRow label="Legal name" value={data?.name} />
              <InfoRow label="Email address" value={data?.email} />
              <InfoRow
                label="Account status"
                value={
                  <span style={{ display: "inline-block", padding: "0.2rem 0.65rem", background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.04em" }}>
                    VERIFIED
                  </span>
                }
              />
              <InfoRow label="Joined Crypto App" value={formatDate(data?.createdAt)} last />
            </div>

            {/* Identity Verification */}
            <div style={{ padding: "1.25rem 2rem" }}>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#111827", marginBottom: "0.75rem" }}>Identity Verification</h2>
              <div style={{ background: "#f9fafb", borderRadius: "0.75rem", padding: "1rem 1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                  <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "9999px", background: "#dbeafe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <VerifyShieldIcon />
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: "0.9rem", color: "#111827" }}>Level 2 Account</p>
                    <p style={{ fontSize: "0.8rem", color: "#6b7280", marginTop: "0.1rem" }}>Enabled: Send and receive crypto</p>
                  </div>
                </div>
                <a href="#" style={{ fontSize: "0.875rem", fontWeight: 600, color: "#2563eb", textDecoration: "none" }}>View details</a>
              </div>
            </div>

            {/* Need help */}
            <div style={{ padding: "0 2rem 2rem" }}>
              <div style={{ background: "#111827", borderRadius: "0.875rem", padding: "1.5rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
                <div>
                  <p style={{ fontWeight: 700, fontSize: "1rem", color: "#fff" }}>Need help?</p>
                  <p style={{ fontSize: "0.825rem", color: "#9ca3af", marginTop: "0.25rem" }}>Find answers to your questions in our help center.</p>
                </div>
                <button
                  style={{ padding: "0.6rem 1.25rem", background: "#fff", color: "#111827", border: "none", borderRadius: "9999px", fontWeight: 600, fontSize: "0.875rem", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#f3f4f6")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
                >
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
