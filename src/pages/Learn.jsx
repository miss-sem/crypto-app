import { useState, useMemo } from "react";
import { Link } from "react-router-dom";

// ─── Data ─────────────────────────────────────────────────────────────────────
const CATEGORIES = ["All", "Crypto basics", "Advanced", "DeFi", "Web3", "Tips & tutorials", "Market updates"];

const CAT_STYLE = {
  "Crypto basics":    { bg: "#eff6ff", text: "#1652f0" },
  "Advanced":         { bg: "#f5f3ff", text: "#7c3aed" },
  "DeFi":             { bg: "#f0fdf4", text: "#16a34a" },
  "Web3":             { bg: "#eef2ff", text: "#4f46e5" },
  "Tips & tutorials": { bg: "#fff7ed", text: "#ea580c" },
  "Market updates":   { bg: "#f0f9ff", text: "#0891b2" },
};

const ARTICLES = [
  {
    id: 1, featured: true,
    category: "Crypto basics",
    title: "What is cryptocurrency? A beginner's guide",
    desc: "Cryptocurrency is a digital or virtual form of currency secured by cryptography. Unlike traditional currencies issued by governments, most cryptocurrencies operate on decentralized networks using blockchain technology.",
    readTime: "5 min read",
    gradient: "linear-gradient(135deg, #1652f0 0%, #0ea5e9 100%)",
    icon: "₿",
  },
  {
    id: 2,
    category: "Crypto basics",
    title: "What is Bitcoin?",
    desc: "Bitcoin is the world's first and most recognized cryptocurrency, created in 2009.",
    readTime: "7 min read",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
    icon: "₿",
  },
  {
    id: 3,
    category: "Crypto basics",
    title: "What is Ethereum?",
    desc: "Ethereum is a decentralized platform that enables smart contracts and decentralized applications.",
    readTime: "6 min read",
    gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    icon: "Ξ",
  },
  {
    id: 4,
    category: "Crypto basics",
    title: "What is a blockchain?",
    desc: "A blockchain is a distributed ledger that records transactions across many computers.",
    readTime: "5 min read",
    gradient: "linear-gradient(135deg, #10b981 0%, #14b8a6 100%)",
    icon: "⛓",
  },
  {
    id: 5,
    category: "Tips & tutorials",
    title: "How to buy cryptocurrency for the first time",
    desc: "Step-by-step guide to purchasing your first crypto — from choosing a wallet to making your first trade.",
    readTime: "8 min read",
    gradient: "linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)",
    icon: "🛒",
  },
  {
    id: 6,
    category: "DeFi",
    title: "What is DeFi? Decentralized finance explained",
    desc: "DeFi refers to financial services built on blockchain networks that operate without centralized intermediaries.",
    readTime: "6 min read",
    gradient: "linear-gradient(135deg, #16a34a 0%, #0ea5e9 100%)",
    icon: "⚡",
  },
  {
    id: 7,
    category: "Tips & tutorials",
    title: "How to set up a crypto wallet",
    desc: "A crypto wallet stores your private keys. Learn the difference between hot and cold wallets.",
    readTime: "5 min read",
    gradient: "linear-gradient(135deg, #0891b2 0%, #6366f1 100%)",
    icon: "👛",
  },
  {
    id: 8,
    category: "Web3",
    title: "What is Web3? The future of the internet",
    desc: "Web3 is the next evolution of the internet built on blockchain, aiming to return ownership to users.",
    readTime: "7 min read",
    gradient: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
    icon: "🌐",
  },
  {
    id: 9,
    category: "Advanced",
    title: "What is crypto staking and how does it work?",
    desc: "Staking allows you to earn rewards by participating in the validation of blockchain transactions.",
    readTime: "6 min read",
    gradient: "linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)",
    icon: "🔒",
  },
  {
    id: 10,
    category: "Tips & tutorials",
    title: "How to keep your crypto safe",
    desc: "Security best practices every crypto holder should know — from 2FA to hardware wallets.",
    readTime: "9 min read",
    gradient: "linear-gradient(135deg, #dc2626 0%, #ea580c 100%)",
    icon: "🛡",
  },
  {
    id: 11,
    category: "Advanced",
    title: "What is an NFT? Non-fungible tokens explained",
    desc: "NFTs are unique digital assets verified using blockchain technology that represent ownership of digital content.",
    readTime: "5 min read",
    gradient: "linear-gradient(135deg, #ec4899 0%, #f59e0b 100%)",
    icon: "🎨",
  },
  {
    id: 12,
    category: "Tips & tutorials",
    title: "Understanding crypto taxes",
    desc: "Learn how cryptocurrency transactions are taxed and how to stay compliant with your local tax authority.",
    readTime: "10 min read",
    gradient: "linear-gradient(135deg, #374151 0%, #6b7280 100%)",
    icon: "📋",
  },
  {
    id: 13,
    category: "Advanced",
    title: "What is a smart contract?",
    desc: "Smart contracts are self-executing code stored on a blockchain that automatically enforces agreement terms.",
    readTime: "6 min read",
    gradient: "linear-gradient(135deg, #0891b2 0%, #16a34a 100%)",
    icon: "📝",
  },
  {
    id: 14,
    category: "Market updates",
    title: "Bull vs bear markets in crypto: what they mean",
    desc: "Understanding market cycles helps you make better decisions about when to buy, hold, or sell crypto.",
    readTime: "7 min read",
    gradient: "linear-gradient(135deg, #0891b2 0%, #1652f0 100%)",
    icon: "📈",
  },
  {
    id: 15,
    category: "DeFi",
    title: "What is yield farming?",
    desc: "Yield farming lets you earn passive income by providing liquidity to decentralized protocols.",
    readTime: "8 min read",
    gradient: "linear-gradient(135deg, #16a34a 0%, #6366f1 100%)",
    icon: "🌾",
  },
];

const TOPICS = [
  { label: "Bitcoin",    icon: "₿",  color: "#f59e0b", bg: "#fffbeb" },
  { label: "Ethereum",   icon: "Ξ",  color: "#6366f1", bg: "#eef2ff" },
  { label: "DeFi",       icon: "⚡", color: "#16a34a", bg: "#f0fdf4" },
  { label: "NFTs",       icon: "🎨", color: "#ec4899", bg: "#fdf2f8" },
  { label: "Web3",       icon: "🌐", color: "#4f46e5", bg: "#eef2ff" },
  { label: "Staking",    icon: "🔒", color: "#7c3aed", bg: "#f5f3ff" },
  { label: "Wallets",    icon: "👛", color: "#0891b2", bg: "#f0f9ff" },
  { label: "Security",   icon: "🛡", color: "#dc2626", bg: "#fef2f2" },
];

const GLOSSARY_TERMS = [
  { term: "Altcoin",       def: "Any cryptocurrency other than Bitcoin." },
  { term: "Blockchain",    def: "A distributed digital ledger of transactions." },
  { term: "Cold wallet",   def: "Offline crypto storage, not connected to the internet." },
  { term: "DeFi",          def: "Decentralized finance — financial services on blockchain." },
  { term: "Gas fee",       def: "Transaction fee paid to process operations on Ethereum." },
  { term: "HODL",          def: "Strategy of holding crypto long-term regardless of price." },
  { term: "Liquidity",     def: "How easily an asset can be converted to cash." },
  { term: "Market cap",    def: "Total value of a cryptocurrency in circulation." },
  { term: "NFT",           def: "Non-fungible token — a unique digital asset on blockchain." },
  { term: "Private key",   def: "A secret code giving access to your crypto wallet." },
  { term: "Smart contract",def: "Self-executing code stored on a blockchain." },
  { term: "Staking",       def: "Locking crypto to support a network and earn rewards." },
];

// ─── Components ───────────────────────────────────────────────────────────────
function CategoryBadge({ category }) {
  const s = CAT_STYLE[category] || { bg: "#f3f4f6", text: "#374151" };
  return (
    <span style={{ display: "inline-block", background: s.bg, color: s.text, fontSize: "0.7rem", fontWeight: 700, borderRadius: "9999px", padding: "0.2rem 0.65rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>
      {category}
    </span>
  );
}

function ArticleIllustration({ gradient, icon, height = 160 }) {
  return (
    <div style={{ background: gradient, height, display: "flex", alignItems: "center", justifyContent: "center", fontSize: height > 200 ? "4rem" : "2.5rem", userSelect: "none" }}>
      {icon}
    </div>
  );
}

function ArticleCard({ article }) {
  return (
    <div style={{ background: "white", borderRadius: "1rem", border: "1px solid #e5e7eb", overflow: "hidden", display: "flex", flexDirection: "column", cursor: "pointer", transition: "box-shadow 0.15s" }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
    >
      <ArticleIllustration gradient={article.gradient} icon={article.icon} height={150} />
      <div style={{ padding: "1rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <CategoryBadge category={article.category} />
        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#111827", margin: 0, lineHeight: 1.4 }}>{article.title}</h3>
        <p style={{ fontSize: "0.8rem", color: "#6b7280", margin: 0, lineHeight: 1.55, flex: 1 }}>{article.desc}</p>
        <p style={{ fontSize: "0.72rem", color: "#9ca3af", margin: 0, fontWeight: 500 }}>{article.readTime}</p>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function Learn() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [glossaryLetter, setGlossaryLetter] = useState("All");
  const [email, setEmail] = useState("");

  const featured = ARTICLES.find((a) => a.featured);

  const filtered = useMemo(() => {
    let list = ARTICLES.filter((a) => !a.featured);
    if (activeCategory !== "All") list = list.filter((a) => a.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((a) => a.title.toLowerCase().includes(q) || a.desc.toLowerCase().includes(q) || a.category.toLowerCase().includes(q));
    }
    return list;
  }, [activeCategory, search]);

  const filteredGlossary = useMemo(() => {
    if (glossaryLetter === "All") return GLOSSARY_TERMS;
    return GLOSSARY_TERMS.filter((t) => t.term.toUpperCase().startsWith(glossaryLetter));
  }, [glossaryLetter]);

  const glossaryLetters = ["All", ...new Set(GLOSSARY_TERMS.map((t) => t.term[0].toUpperCase()))].sort((a, b) => a === "All" ? -1 : a.localeCompare(b));

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>

      {/* ── Hero ── */}
      <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1652f0 100%)", padding: "4rem 2rem 3rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#93c5fd", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>
            Coinbase Learn
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "#ffffff", margin: "0 0 1rem", lineHeight: 1.15 }}>
            Learn about crypto
          </h1>
          <p style={{ fontSize: "1.05rem", color: "#93c5fd", margin: "0 0 2rem", lineHeight: 1.6 }}>
            Straightforward guides, tips, and market updates to help you navigate the world of cryptocurrency confidently.
          </p>

          {/* Search */}
          <div style={{ position: "relative", maxWidth: "480px", margin: "0 auto" }}>
            <svg style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: "100%", padding: "0.85rem 1rem 0.85rem 2.75rem", borderRadius: "9999px", border: "none", fontSize: "0.95rem", color: "#111827", outline: "none", boxSizing: "border-box" }}
            />
          </div>
        </div>
      </div>

      {/* ── Category tabs ── */}
      <div style={{ borderBottom: "1px solid #e5e7eb", background: "white", position: "sticky", top: "64px", zIndex: 40 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem", display: "flex", gap: "0", overflowX: "auto" }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "1rem 1.1rem",
                border: "none",
                background: "none",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: activeCategory === cat ? "#1652f0" : "#6b7280",
                borderBottom: activeCategory === cat ? "2px solid #1652f0" : "2px solid transparent",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "color 0.15s",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 2rem" }} className="page-pad">

        {/* ── Featured article ── */}
        {!search && activeCategory === "All" && featured && (
          <div style={{ marginBottom: "3rem" }}>
            <div style={{ background: "white", borderRadius: "1.25rem", border: "1px solid #e5e7eb", overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr", cursor: "pointer" }}
              className="learn-featured"
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              <ArticleIllustration gradient={featured.gradient} icon={featured.icon} height={360} />
              <div style={{ padding: "2.5rem", display: "flex", flexDirection: "column", justifyContent: "center", gap: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#1652f0", textTransform: "uppercase", letterSpacing: "0.05em" }}>Featured</span>
                  <span style={{ color: "#e5e7eb" }}>•</span>
                  <CategoryBadge category={featured.category} />
                </div>
                <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#111827", margin: 0, lineHeight: 1.25 }}>
                  {featured.title}
                </h2>
                <p style={{ fontSize: "0.9rem", color: "#6b7280", margin: 0, lineHeight: 1.7 }}>{featured.desc}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <span style={{ fontSize: "0.78rem", color: "#9ca3af", fontWeight: 500 }}>{featured.readTime}</span>
                  <button style={{ background: "#1652f0", color: "white", border: "none", borderRadius: "9999px", padding: "0.5rem 1.25rem", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer" }}>
                    Read article →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Browse by topic ── */}
        {!search && activeCategory === "All" && (
          <div style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#111827", margin: "0 0 1.25rem" }}>Browse by topic</h2>
            <div className="learn-topics-grid">
              {TOPICS.map((t) => (
                <button
                  key={t.label}
                  onClick={() => {
                    const match = CATEGORIES.find((c) => c.toLowerCase().includes(t.label.toLowerCase().split(" ")[0].toLowerCase()));
                    if (match) setActiveCategory(match);
                  }}
                  style={{ background: t.bg, border: `1px solid ${t.bg}`, borderRadius: "0.875rem", padding: "1.1rem 0.75rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", cursor: "pointer", transition: "transform 0.15s", textAlign: "center" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
                >
                  <span style={{ fontSize: "1.75rem" }}>{t.icon}</span>
                  <span style={{ fontSize: "0.82rem", fontWeight: 700, color: t.color }}>{t.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Articles grid ── */}
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.5rem" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#111827", margin: 0 }}>
              {search ? `Results for "${search}"` : activeCategory === "All" ? "Recently published" : activeCategory}
            </h2>
            {filtered.length > 0 && (
              <span style={{ fontSize: "0.82rem", color: "#9ca3af" }}>{filtered.length} article{filtered.length !== 1 ? "s" : ""}</span>
            )}
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem 0", color: "#9ca3af" }}>
              <p style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>No articles found.</p>
              <button onClick={() => { setSearch(""); setActiveCategory("All"); }} style={{ background: "none", border: "none", color: "#1652f0", cursor: "pointer", fontWeight: 600, fontSize: "0.875rem" }}>
                Clear filters
              </button>
            </div>
          ) : (
            <div className="learn-grid">
              {filtered.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </div>

        {/* ── Crypto basics ── */}
        {!search && activeCategory === "All" && (
          <div style={{ background: "#f9fafb", borderRadius: "1.25rem", padding: "2rem", marginBottom: "3rem", border: "1px solid #e5e7eb" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.5rem" }}>
              <div>
                <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#111827", margin: "0 0 0.25rem" }}>Start with the basics</h2>
                <p style={{ fontSize: "0.85rem", color: "#6b7280", margin: 0 }}>New to crypto? These guides will get you started.</p>
              </div>
              <button onClick={() => setActiveCategory("Crypto basics")} style={{ background: "none", border: "1px solid #e5e7eb", borderRadius: "9999px", padding: "0.4rem 1rem", fontSize: "0.8rem", fontWeight: 600, color: "#1652f0", cursor: "pointer", background: "white" }}>
                View all basics →
              </button>
            </div>
            <div className="learn-basics-grid">
              {[
                { q: "What is crypto?",       icon: "💡", color: "#1652f0", bg: "#eff6ff" },
                { q: "What is blockchain?",    icon: "⛓",  color: "#16a34a", bg: "#f0fdf4" },
                { q: "How to buy crypto?",     icon: "🛒",  color: "#ea580c", bg: "#fff7ed" },
                { q: "What is a wallet?",      icon: "👛",  color: "#7c3aed", bg: "#f5f3ff" },
              ].map(({ q, icon, color, bg }) => (
                <button
                  key={q}
                  onClick={() => { setSearch(q.replace("What is ", "").replace("?", "").replace("How to ", "")); }}
                  style={{ background: bg, border: "none", borderRadius: "0.875rem", padding: "1.25rem", display: "flex", alignItems: "center", gap: "0.85rem", cursor: "pointer", textAlign: "left", transition: "transform 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
                >
                  <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>{icon}</span>
                  <span style={{ fontSize: "0.875rem", fontWeight: 700, color }}>{q}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Glossary ── */}
        {!search && activeCategory === "All" && (
          <div style={{ marginBottom: "3rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.5rem" }}>
              <div>
                <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#111827", margin: "0 0 0.25rem" }}>Crypto glossary</h2>
                <p style={{ fontSize: "0.85rem", color: "#6b7280", margin: 0 }}>Plain-English definitions for crypto terms.</p>
              </div>
            </div>

            {/* Letter filter */}
            <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
              {glossaryLetters.map((l) => (
                <button
                  key={l}
                  onClick={() => setGlossaryLetter(l)}
                  style={{
                    padding: "0.3rem 0.65rem",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.375rem",
                    background: glossaryLetter === l ? "#1652f0" : "white",
                    color: glossaryLetter === l ? "white" : "#374151",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {l}
                </button>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "0.75rem" }}>
              {filteredGlossary.map(({ term, def }) => (
                <div key={term} style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "0.75rem", padding: "1rem 1.1rem" }}>
                  <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "#111827", margin: "0 0 0.25rem" }}>{term}</p>
                  <p style={{ fontSize: "0.8rem", color: "#6b7280", margin: 0, lineHeight: 1.5 }}>{def}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Newsletter CTA ── */}
        <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1652f0 100%)", borderRadius: "1.25rem", padding: "2.5rem 2rem", textAlign: "center", color: "white" }}>
          <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#93c5fd", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
            Coinbase Bytes Newsletter
          </p>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, margin: "0 0 0.5rem" }}>Stay ahead of the market</h2>
          <p style={{ fontSize: "0.9rem", color: "#93c5fd", margin: "0 0 1.75rem" }}>
            Get weekly crypto news, market updates, and educational content delivered to your inbox.
          </p>
          <form
            onSubmit={(e) => { e.preventDefault(); setEmail(""); }}
            style={{ display: "flex", gap: "0.75rem", maxWidth: "420px", margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}
          >
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ flex: 1, minWidth: "200px", padding: "0.75rem 1rem", borderRadius: "9999px", border: "none", fontSize: "0.9rem", color: "#111827", outline: "none" }}
            />
            <button
              type="submit"
              style={{ padding: "0.75rem 1.5rem", background: "white", color: "#1652f0", border: "none", borderRadius: "9999px", fontSize: "0.9rem", fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}
            >
              Subscribe
            </button>
          </form>
          <p style={{ fontSize: "0.72rem", color: "#475569", marginTop: "1rem" }}>
            No spam. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
}
