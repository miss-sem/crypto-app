import { Link } from "react-router-dom";
import coinbaseLogo from "../../assets/coinbaseLogoNavigation-4.svg";

const COLUMNS = [
  {
    heading: "Company",
    links: ["About","Careers","Affiliates","Blog","Press","Security","Investors","Vendors","Legal & privacy","Cookie policy","Cookie preferences","Digital Asset Disclosures"],
  },
  {
    sections: [
      {
        heading: "Individuals",
        links: ["Buy & sell","Earn free crypto","Base App","Coinbase One","Debit Card"],
      },
      {
        heading: "Learn",
        links: ["Explore","Market statistics","Coinbase Bytes newsletter","Crypto basics","Tips & tutorials","Crypto glossary","Market updates","What is Bitcoin?","What is crypto?","What is a blockchain?","How to set up a crypto wallet?","How to send crypto?","Taxes"],
      },
    ],
  },
  {
    sections: [
      {
        heading: "Businesses",
        links: ["Asset Listings","Coinbase Business","Payments","Commerce","Token Manager"],
      },
      {
        heading: "Institutions",
        links: ["Prime","Staking","Exchange","International Exchange","Derivatives Exchange","Verified Pools"],
      },
    ],
  },
  {
    heading: "Developers",
    links: ["Developer Platform","Base","Server Wallets","Embedded Wallets","Base Accounts (Smart Wallets)","Onramp & Offramp","x402","Trade API","Paymaster","OnchainKit","Data API","Verifications","Node","AgentKit","Staking","Faucet","Exchange API","International Exchange API","Prime API","Derivatives API"],
  },
  {
    sections: [
      {
        heading: "Support",
        links: ["Help center","Contact us","Create account","ID verification","Account information","Payment methods","Account access","Supported crypto","Status"],
      },
      {
        heading: "Asset prices",
        links: ["Bitcoin price","Ethereum price","Solana price","XRP price"],
      },
      {
        heading: "Stock prices",
        links: ["NVIDIA price","Apple price","Microsoft price","Amazon price"],
      },
    ],
  },
];

const linkStyle = {
  fontSize: "0.82rem",
  color: "#6b7280",
  textDecoration: "none",
  display: "block",
  marginBottom: "0.55rem",
  cursor: "pointer",
};

const headingStyle = {
  fontSize: "0.82rem",
  fontWeight: 700,
  color: "#111827",
  marginBottom: "0.75rem",
  marginTop: 0,
};

const ROUTE_MAP = {
  "Explore": "/explore",
};

function LinkGroup({ heading, links }) {
  return (
    <div style={{ marginBottom: "1.75rem" }}>
      <p style={headingStyle}>{heading}</p>
      {links.map((link) =>
        ROUTE_MAP[link] ? (
          <Link key={link} to={ROUTE_MAP[link]} style={linkStyle}>{link}</Link>
        ) : (
          <a key={link} href="#" style={linkStyle}>{link}</a>
        )
      )}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="footer-wrapper" style={{ background: "#f3f4f6" }}>

      {/* Main grid */}
      <div className="footer-grid">

        {/* Col 1 — Logo only */}
        <div>
          <img src={coinbaseLogo} alt="Coinbase" style={{ width: "2.75rem", height: "2.75rem", filter: "brightness(0) saturate(100%) invert(27%) sepia(98%) saturate(1500%) hue-rotate(210deg)" }} />
        </div>

        {/* Col 2 — Company + Learn */}
        <div>
          <LinkGroup heading="Company" links={COLUMNS[0].links} />
          {COLUMNS[1].sections.filter(s => s.heading === "Learn").map((s) => <LinkGroup key={s.heading} heading={s.heading} links={s.links} />)}
        </div>

        {/* Col 3 — Individuals + Businesses + Institutions */}
        <div>
          {COLUMNS[1].sections.filter(s => s.heading === "Individuals").map((s) => <LinkGroup key={s.heading} heading={s.heading} links={s.links} />)}
          {COLUMNS[2].sections.map((s) => <LinkGroup key={s.heading} heading={s.heading} links={s.links} />)}
        </div>

        {/* Col 4 — Developers */}
        <div>
          <LinkGroup heading="Developers" links={COLUMNS[3].links} />
        </div>

        {/* Col 5 — Support + Asset prices + Stock prices */}
        <div>
          {COLUMNS[4].sections.map((s) => <LinkGroup key={s.heading} heading={s.heading} links={s.links} />)}
        </div>
      </div>

      {/* Social icons */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
        {/* X (Twitter) */}
        <a href="#" style={{ color: "#6b7280", display: "flex", alignItems: "center" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        {/* LinkedIn */}
        <a href="#" style={{ color: "#6b7280", display: "flex", alignItems: "center" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </a>
        {/* Instagram */}
        <a href="#" style={{ color: "#6b7280", display: "flex", alignItems: "center" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
        </a>
        {/* TikTok */}
        <a href="#" style={{ color: "#6b7280", display: "flex", alignItems: "center" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.79 1.53V6.75a4.85 4.85 0 01-1.02-.06z"/></svg>
        </a>
      </div>

      {/* Bottom bar */}
      <div
        className="footer-bottom"
        style={{
          borderTop: "1px solid #e5e7eb",
          padding: "1.25rem 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", fontSize: "0.8rem", color: "#6b7280" }}>
          <span>© 2026 Coinbase</span>
          <span>•</span>
          <a href="#" style={{ color: "#6b7280", textDecoration: "none" }}>Privacy</a>
          <span>•</span>
          <a href="#" style={{ color: "#6b7280", textDecoration: "none" }}>Terms & Conditions</a>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", color: "#6b7280" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
          <span>Global</span>
          <span>•</span>
          <span>English</span>
        </div>
      </div>
    </footer>
  );
}
