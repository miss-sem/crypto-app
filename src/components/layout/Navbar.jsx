import { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import coinbaseLogo from "../../assets/coinbaseLogoNavigation-4.svg";
import navigationUpsell from "../../assets/navigation-upsell.png";
import onchainPayment from "../../assets/onchain_payment_protocol.png";
import institutionsUpsell from "../../assets/institutions_upsell.png";
import developersUpsell from "../../assets/developers_upsell_cdxv2_2.jpg";
import companyUpsell from "../../assets/company_upsell.png";

// ─── Icon helpers ────────────────────────────────────────────────────────────
const Icon = ({ d, className = "w-5 h-5", style }) => (
  <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const icons = {
  coinbaseOne: "M12 2a10 10 0 100 20A10 10 0 0012 2zm0 4v12M8 12h8",
  privateClient: "M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z",
  onchain: "M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71",
  learn: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  wealth: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z",
  creditCard: "M1 4h22v16H1zM1 9h22",
  debitCard: "M2 7a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V7zm0 4h20",
  business: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z",
  commerce: "M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0",
  tokenManager: "M3 12a9 9 0 1018 0 9 9 0 00-18 0zm9-4v4l3 3",
  payments: "M12 1v22M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6",
  assetListings: "M12 2a10 10 0 100 20A10 10 0 0012 2zm0 8v4m0 4h.01",
  trading: "M18 20V10M12 20V4M6 20v-6",
  custody: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  staking: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  onchainWallet: "M3 3h18v18H3zM9 9h6v6H9z",
  exchange: "M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4",
  intlExchange: "M12 2a10 10 0 100 20A10 10 0 0012 2zm-2 0C8.4 5.8 8 8.8 8 12s.4 6.2 2 10m4-20c1.6 3.8 2 6.8 2 10s-.4 6.2-2 10M2 12h20",
  derivatives: "M3 18l6-6 4 4 8-8",
  verifiedPools: "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z",
  devPlatform: "M16 18l6-6-6-6M8 6l-6 6 6 6",
  devPayments: "M12 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10zm0-14v4l-3 3",
  devTrading: "M2 2l20 20M2 22 22 2",
  wallets: "M2 7a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V7zm0 4h20",
  stablecoins: "M12 1v22M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6",
  banks: "M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3m4-3v3m4-3v3",
  paymentFirms: "M22 12h-4l-3 9L9 3l-3 9H2",
  startups: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18",
  about: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  affiliates: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8zm7 2a4 4 0 110 8 4 4 0 010-8m6 10v-2a4 4 0 00-3-3.87",
  blog: "M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z",
  careers: "M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zm-9-4h-2v4h2V3zm4 0h-2v4h2V3z",
  support: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z",
  security: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
};

// ─── Dropdown data ────────────────────────────────────────────────────────────
const NAV_DATA = [
  {
    id: "cryptocurrencies",
    label: "Cryptocurrencies",
    dropdown: null,
    to: "/explore",
  },
  {
    id: "individuals",
    label: "Individuals",
    dropdown: {
      type: "simple",
      leftItems: [
        { icon: icons.coinbaseOne, label: "Coinbase One", desc: "Get zero trading fees and more" },
        { icon: icons.privateClient, label: "Private Client", desc: "For trusts, family offices, UHNWIs" },
        { icon: icons.onchain, label: "Onchain", desc: "Dive into the world of onchain apps" },
        { icon: icons.learn, label: "Learn", desc: "Crypto tips and guides", href: "/learn" },
      ],
      rightItems: [
        { icon: icons.wealth, label: "Coinbase Wealth", desc: "Institutional-grade services for UHNW" },
        { icon: icons.creditCard, label: "Credit Card", desc: "Earn up to 4% bitcoin back" },
        { icon: icons.debitCard, label: "Debit Card", desc: "Spend crypto, get crypto back" },
      ],
      upsell: {
        image: navigationUpsell,
        title: "One app. All of crypto.",
        subtitle: "Buy, sell, trade, and earn crypto all in one place.",
        cta: "Create account",
      },
    },
  },
  {
    id: "businesses",
    label: "Businesses",
    dropdown: {
      type: "simple",
      leftItems: [
        { icon: icons.business, label: "Business", desc: "Crypto trading and payments for startups and SMBs" },
        { icon: icons.commerce, label: "Commerce", desc: "Start accepting crypto payments" },
        { icon: icons.tokenManager, label: "Token Manager", desc: "The platform for token distributions, vesting, and lockups" },
      ],
      rightItems: [
        { icon: icons.payments, label: "Payments", desc: "The stablecoin payments stack for commerce platforms" },
        { icon: icons.assetListings, label: "Asset Listings", desc: "List your asset on Coinbase" },
      ],
      upsell: {
        image: onchainPayment,
        title: "Commerce Payments Protocol",
        subtitle: "A new standard for onchain payments.",
        cta: "Go to Payments",
      },
    },
  },
  {
    id: "institutions",
    label: "Institutions",
    dropdown: {
      type: "sectioned",
      sections: [
        {
          heading: "Prime",
          headingLink: true,
          items: [
            { icon: icons.trading, label: "Trading and Financing", desc: "Professional prime brokerage services" },
            { icon: icons.custody, label: "Custody", desc: "Securely store all your digital assets" },
            { icon: icons.staking, label: "Staking", desc: "Explore staking across our products" },
            { icon: icons.onchainWallet, label: "Onchain Wallet", desc: "Institutional-grade wallet to get onchain" },
          ],
        },
        {
          heading: "Markets",
          items: [
            { icon: icons.exchange, label: "Exchange", desc: "Spot markets for high-frequency trading" },
            { icon: icons.intlExchange, label: "International Exchange", desc: "Access perpetual futures markets" },
            { icon: icons.derivatives, label: "Derivatives Exchange", desc: "Trade an accessible futures market" },
            { icon: icons.verifiedPools, label: "Verified Pools", desc: "Transparent, verified liquidity pools" },
          ],
        },
      ],
      upsell: {
        image: institutionsUpsell,
        title: "Our clients",
        subtitle: "Trusted by institutions and government.",
        cta: "Learn more",
      },
    },
  },
  {
    id: "developers",
    label: "Developers",
    dropdown: {
      type: "sectioned",
      sections: [
        {
          heading: "Coinbase Developer Platform",
          headingLink: true,
          items: [
            { icon: icons.devPayments, label: "Payments", desc: "Fast and global stablecoin payments with a single integration" },
            { icon: icons.devTrading, label: "Trading", desc: "Launch crypto trading and custody for your users" },
            { icon: icons.wallets, label: "Wallets", desc: "Deploy customizable and scalable wallets for your business" },
            { icon: icons.stablecoins, label: "Stablecoins", desc: "Access USDC and Coinbase Custom Stablecoins" },
          ],
        },
        {
          heading: "Solutions for any company",
          items: [
            { icon: icons.banks, label: "Banks & Brokerages", desc: "Secure, regulated offerings for retail, private banking, & institutional clients" },
            { icon: icons.paymentFirms, label: "Payment Firms", desc: "Near-instant, low-cost, global payment rails for modern providers" },
            { icon: icons.startups, label: "Startups", desc: "Launch your business with the world's leader in crypto" },
          ],
        },
      ],
      upsell: {
        image: developersUpsell,
        title: "World class crypto infrastructure.",
        subtitle: "Discover Coinbase's complete crypto-as-a-service platform.",
        cta: "Learn more",
      },
    },
  },
  {
    id: "company",
    label: "Company",
    dropdown: {
      type: "simple",
      leftItems: [
        { icon: icons.about, label: "About", desc: "Powering the crypto economy" },
        { icon: icons.affiliates, label: "Affiliates", desc: "Help introduce the world to crypto" },
        { icon: icons.blog, label: "Blog", desc: "Read the latest from Coinbase" },
      ],
      rightItems: [
        { icon: icons.careers, label: "Careers", desc: "Work with us" },
        { icon: icons.support, label: "Support", desc: "Find answers to your questions" },
        { icon: icons.security, label: "Security", desc: "The most trusted & secure" },
      ],
      upsell: {
        image: companyUpsell,
        title: "Learn all about Coinbase",
        subtitle: "We're building the open financial system.",
        cta: "Create your account",
      },
    },
  },
];

// ─── Menu item row ────────────────────────────────────────────────────────────
function MenuItem({ icon, label, desc, href = "#" }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "0.75rem",
        padding: "0.65rem 0.75rem",
        borderRadius: "0.75rem",
        backgroundColor: hovered ? "#f3f4f6" : "transparent",
        transition: "background-color 0.15s",
        textDecoration: "none",
      }}
    >
      <div
        style={{
          width: "2.25rem",
          height: "2.25rem",
          minWidth: "2.25rem",
          borderRadius: "0.5rem",
          backgroundColor: hovered ? "#e5e7eb" : "#f3f4f6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "background-color 0.15s",
        }}
      >
        <Icon d={icon} style={{ width: "1.1rem", height: "1.1rem", color: hovered ? "#111827" : "#4b5563" }} />
      </div>
      <div style={{ minWidth: 0 }}>
        <p style={{ fontSize: "1rem", fontWeight: 600, color: "#111827", lineHeight: "1.3" }}>{label}</p>
        <p style={{ fontSize: "0.8rem", color: hovered ? "#374151" : "#6b7280", marginTop: "0.2rem", lineHeight: "1.4", transition: "color 0.15s" }}>{desc}</p>
      </div>
    </a>
  );
}

// ─── Upsell card ─────────────────────────────────────────────────────────────
function UpsellCard({ upsell }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        gap: "1.25rem",
        width: "22rem",
        flexShrink: 0,
        padding: "0.75rem",
        borderRadius: "0.75rem",
        backgroundColor: hovered ? "#f3f4f6" : "transparent",
        transition: "background-color 0.15s",
        cursor: "pointer",
      }}
    >
      {/* Square image */}
      <img
        src={upsell.image}
        alt=""
        style={{
          width: "7.5rem",
          height: "7.5rem",
          objectFit: "cover",
          borderRadius: "0.875rem",
          flexShrink: 0,
        }}
      />
      {/* Text content */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", paddingTop: "0.25rem" }}>
        <p style={{ fontSize: "20px", fontWeight: 700, color: "#111827", lineHeight: "1.2" }}>
          {upsell.title}
        </p>
        <p style={{ fontSize: "20px", color: "#111827", lineHeight: "1.3" }}>
          <span style={{ textTransform: "capitalize" }}>{upsell.subtitle.charAt(0)}</span>{upsell.subtitle.slice(1).toLowerCase()}
        </p>
        <a
          href="#"
          style={{
            fontSize: "0.85rem",
            fontWeight: 600,
            color: "#111827",
            textDecoration: "underline",
            textUnderlineOffset: "2px",
            marginTop: "0.15rem",
          }}
        >
          {upsell.cta}
        </a>
      </div>
    </div>
  );
}

// ─── Dropdown panels ──────────────────────────────────────────────────────────
function SimpleDropdown({ data }) {
  return (
    <div style={{ display: "flex", gap: "2.5rem", alignItems: "flex-start" }}>
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1.5rem" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {data.leftItems.map((item) => (
            <MenuItem key={item.label} {...item} />
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {data.rightItems.map((item) => (
            <MenuItem key={item.label} {...item} />
          ))}
        </div>
      </div>
      <UpsellCard upsell={data.upsell} />
    </div>
  );
}

function SectionedDropdown({ data }) {
  return (
    <div style={{ display: "flex", gap: "2.5rem", alignItems: "flex-start" }}>
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1.5rem" }}>
        {data.sections.map((section) => (
          <div key={section.heading}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", padding: "0 0.75rem", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em" }}>{section.heading}</span>
              {section.headingLink && (
                <svg viewBox="0 0 24 24" style={{ width: "0.75rem", height: "0.75rem", color: "#9ca3af" }} fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {section.items.map((item) => (
                <MenuItem key={item.label} {...item} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <UpsellCard upsell={data.upsell} />
    </div>
  );
}

// ─── Mobile accordion item ────────────────────────────────────────────────────
function MobileNavItem({ navItem, onClose }) {
  const [open, setOpen] = useState(false);
  const items = navItem.dropdown.type === "simple"
    ? [...navItem.dropdown.leftItems, ...navItem.dropdown.rightItems]
    : navItem.dropdown.sections.flatMap((s) => s.items);

  return (
    <div style={{ borderBottom: "1px solid #f3f4f6" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.35rem 1.25rem",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        <span style={{ fontSize: "1.1rem", fontWeight: 600, color: "#111827" }}>{navItem.label}</span>
        <svg
          viewBox="0 0 24 24"
          style={{
            width: "1.1rem", height: "1.1rem", color: "#9ca3af", flexShrink: 0,
            transform: open ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
          fill="none" stroke="currentColor" strokeWidth="2"
        >
          <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div style={{ paddingBottom: "0.75rem", paddingLeft: "0.75rem", paddingRight: "0.75rem" }}>
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href || "#"}
              onClick={onClose}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.85rem",
                padding: "0.75rem 0.85rem",
                borderRadius: "0.75rem",
                textDecoration: "none",
                transition: "background-color 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "#f9fafb"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
            >
              <div style={{
                width: "2.25rem", height: "2.25rem", minWidth: "2.25rem",
                borderRadius: "0.5rem", backgroundColor: "#f3f4f6",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <Icon d={item.icon} style={{ width: "1rem", height: "1rem", color: "#4b5563" }} />
              </div>
              <div style={{ paddingTop: "0.1rem" }}>
                <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#111827", lineHeight: 1.3 }}>{item.label}</p>
                <p style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: "0.2rem", lineHeight: 1.4 }}>{item.desc}</p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────
export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [signinHovered, setSigninHovered] = useState(false);
  const [searchHovered, setSearchHovered] = useState(false);
  const [globeHovered, setGlobeHovered] = useState(false);
  const closeTimer = useRef(null);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  const openDropdown = useCallback((id) => {
    clearTimeout(closeTimer.current);
    setActiveDropdown(id);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 120);
  }, []);

  const cancelClose = useCallback(() => {
    clearTimeout(closeTimer.current);
  }, []);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="navbar-inner w-full" style={{height:"4.25rem", padding:"0 3rem"}}>
      <div style={{ maxWidth:"1200px", margin:"0 auto", height:"100%", display:"flex", alignItems:"center", justifyContent:"space-between" }}>

        {/* Left group: Logo + Nav links */}
        <div className="flex items-center h-full">
          <Link to="/" className="flex items-center shrink-0 mr-0 lg:mr-12" style={{ marginLeft: "-1rem" }}>
            <img src={coinbaseLogo} alt="Coinbase" className="h-11 w-11" />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center h-full gap-6">
            {NAV_DATA.map((nav) => (
              <div
                key={nav.id}
                className="relative h-full flex items-center cursor-pointer"
                onMouseEnter={() => nav.dropdown && openDropdown(nav.id)}
                onMouseLeave={() => nav.dropdown && scheduleClose()}
                onClick={() => nav.dropdown && setActiveDropdown(activeDropdown === nav.id ? null : nav.id)}
              >
                {nav.to ? (
                  <Link
                    to={nav.to}
                    style={{ paddingLeft:"1rem", paddingRight:"1rem", paddingTop:"0.4rem", paddingBottom:"0.4rem", textDecoration:"none" }}
                    className="flex items-center rounded-full transition-all duration-150 whitespace-nowrap hover:bg-blue-50"
                  >
                    <span className="text-base font-medium select-none text-gray-900">{nav.label}</span>
                  </Link>
                ) : (
                  <div
                    style={{paddingLeft:"1rem", paddingRight:"1rem", paddingTop:"0.4rem", paddingBottom:"0.4rem"}}
                    className={`flex items-center rounded-full transition-all duration-150 whitespace-nowrap ${
                      activeDropdown === nav.id ? "bg-blue-50" : "hover:bg-blue-50"
                    }`}
                  >
                    <span className="text-base font-medium select-none text-gray-900">
                      {nav.label}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Search — pill */}
          <button
            className="hidden sm:flex items-center justify-center rounded-full text-gray-700"
            style={{ backgroundColor: searchHovered ? "#eff6ff" : "#e5e7eb", padding: "0.5rem", transition: "background-color 0.15s" }}
            onMouseEnter={() => setSearchHovered(true)}
            onMouseLeave={() => setSearchHovered(false)}
          >
            <svg viewBox="0 0 24 24" style={{ width: "1.25rem", height: "1.25rem" }} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
          {/* Globe — pill */}
          <button
            className="hidden sm:flex items-center justify-center rounded-full text-gray-700"
            style={{ backgroundColor: globeHovered ? "#eff6ff" : "#e5e7eb", padding: "0.5rem", transition: "background-color 0.15s" }}
            onMouseEnter={() => setGlobeHovered(true)}
            onMouseLeave={() => setGlobeHovered(false)}
          >
            <svg viewBox="0 0 24 24" style={{ width: "1.25rem", height: "1.25rem" }} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
            </svg>
          </button>
          {/* Sign in — pill */}
          <Link
            to="/signin"
            onMouseEnter={() => setSigninHovered(true)}
            onMouseLeave={() => setSigninHovered(false)}
            style={{ paddingLeft:"1.5rem", paddingRight:"1.5rem", paddingTop:"0.6rem", paddingBottom:"0.6rem", backgroundColor: signinHovered ? "#eff6ff" : "#e5e7eb", borderRadius:"9999px", fontWeight:"600", fontSize:"1rem", color:"#111827", textDecoration:"none", transition:"background-color 0.15s" }}
            className="hidden lg:inline-flex items-center"
          >
            Sign in
          </Link>
          {/* Sign up — blue pill */}
          <Link
            to="/signup"
            style={{paddingLeft:"1.5rem", paddingRight:"1.5rem", paddingTop:"0.6rem", paddingBottom:"0.6rem", backgroundColor:"#2563eb", borderRadius:"9999px", fontWeight:"600", fontSize:"1rem", color:"#ffffff", textDecoration:"none"}}
            className="inline-flex items-center transition-colors hover:opacity-90"
          >
            Sign up
          </Link>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 ml-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileOpen
                ? <path d="M6 18L18 6M6 6l12 12" />
                : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
              }
            </svg>
          </button>
        </div>
      </div>
      </div>

      {/* ── Desktop Mega-dropdown ──────────────────────────────────────────── */}
      {activeDropdown && (
        <div
          className="hidden lg:block absolute left-0 right-0 bg-white border-b border-gray-100 shadow-xl"
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          <div className="max-w-350 mx-auto" style={{ padding: "2.5rem 3rem" }}>
            {NAV_DATA.map((nav) => {
              if (nav.id !== activeDropdown) return null;
              return nav.dropdown.type === "simple"
                ? <SimpleDropdown key={nav.id} data={nav.dropdown} />
                : <SectionedDropdown key={nav.id} data={nav.dropdown} />;
            })}
          </div>
        </div>
      )}

      {/* ── Mobile menu (full-screen overlay) ────────────────────────────── */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed left-0 right-0 bottom-0 bg-white mobile-menu-slide"
          style={{ top: "4.25rem", zIndex: 45, display: "flex", flexDirection: "column" }}
        >
          {/* Scrollable nav items */}
          <div style={{ flex: 1, overflowY: "auto" }}>
            {NAV_DATA.map((nav) =>
              nav.dropdown ? (
                <MobileNavItem key={nav.id} navItem={nav} onClose={() => setMobileOpen(false)} />
              ) : (
                <Link
                  key={nav.id}
                  to={nav.to}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1.35rem 1.25rem",
                    borderBottom: "1px solid #f3f4f6",
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    color: "#111827",
                    textDecoration: "none",
                  }}
                >
                  {nav.label}
                </Link>
              )
            )}
          </div>

          {/* Bottom bar — always pinned at bottom via flex */}
          <div style={{
            flexShrink: 0,
            padding: "0.85rem 1.25rem",
            background: "white",
            borderTop: "1px solid #f3f4f6",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}>
            <button style={{
              width: "2.5rem", height: "2.5rem",
              borderRadius: "9999px",
              backgroundColor: "#e5e7eb",
              border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <svg viewBox="0 0 24 24" style={{ width: "1.15rem", height: "1.15rem", color: "#374151" }} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
              </svg>
            </button>
            <Link
              to="/signin"
              onClick={() => setMobileOpen(false)}
              style={{
                padding: "0.55rem 1.5rem",
                backgroundColor: "transparent",
                border: "1.5px solid #d1d5db",
                borderRadius: "9999px",
                fontWeight: 600,
                fontSize: "0.95rem",
                color: "#111827",
                textDecoration: "none",
              }}
            >
              Sign in
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
