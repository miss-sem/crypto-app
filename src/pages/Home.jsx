import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImg from "../assets/hero_1-DSCRzViz.webp";
import CryptoSection from "../components/crypto/CryptoSection";
import AdvancedTrader from "../components/crypto/AdvancedTrader";
import ZeroFees from "../components/crypto/ZeroFees";
import BaseApp from "../components/crypto/BaseApp";
import LearnCrypto from "../components/crypto/LearnCrypto";
import TakeControl from "../components/crypto/TakeControl";

export default function Home() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    if (email) navigate("/signup");
  };

  return (
    <main>
      {/* Hero Section */}
      <section
        className="hero-section grid grid-cols-1 lg:grid-cols-2 bg-white"
        style={{ height: "calc(100vh - 68px)" }}
      >
        {/* Left — hero image aligned with navbar logo */}
        <div
          className="hero-left h-full w-full flex flex-col justify-center bg-white"
          style={{ paddingLeft: "max(2rem, calc((100vw - 1200px) / 2))", paddingRight: "1rem", paddingTop: "1.5rem", paddingBottom: "1.5rem" }}
        >
          <img
            src={heroImg}
            alt="Crypto trading hero"
            className="w-full object-cover"
            style={{
              borderRadius: "1.5rem",
              border: "1.5px solid #e5e7eb",
              flex: 1,
              minHeight: 0,
            }}
          />
          <p style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: "0.5rem" }}>
            Stocks and prediction markets not available in your jurisdiction.
          </p>
        </div>

        {/* Right — white panel with CTA */}
        <div className="hero-right flex items-center bg-white" style={{ padding: "2rem 8rem 2rem 2rem" }}>
          <div className="hero-right-inner" style={{ width: "75%" }}>
            <h1
              className="hero-h1 font-bold text-gray-900"
              style={{ fontSize: "clamp(3.5rem, 5.5vw, 5rem)", lineHeight: 1.05, marginBottom: "1rem" }}
            >
              The future of finance is here.
            </h1>
            <p className="text-gray-500" style={{ fontSize: "1rem", marginBottom: "2rem" }}>
              Trade crypto and more on a platform you can trust.
            </p>

            {/* Email + Sign up form */}
            <form onSubmit={handleSignUp} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="selormsem48@gmail.com"
                className="flex-1 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{ padding: "0.75rem 1.25rem", border: "1px solid #d1d5db", borderRadius: "9999px" }}
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors whitespace-nowrap"
                style={{ padding: "0.75rem 1.75rem", borderRadius: "9999px" }}
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </section>

      <CryptoSection />
      <AdvancedTrader />
      <ZeroFees />
      <BaseApp />
      <LearnCrypto />
      <TakeControl />

      {/* Disclaimer */}
      <div
        className="home-disclaimer"
        style={{
          padding: "3rem 8rem",
          textAlign: "center",
          background: "#ffffff",
        }}
      >
        <p style={{ fontSize: "0.82rem", color: "#6b7280", marginBottom: "1rem" }}>
          DEX trading is offered by Coinbase Bermuda Technologies Ltd.
        </p>
        <p style={{ fontSize: "0.82rem", color: "#6b7280", maxWidth: "820px", margin: "0 auto", lineHeight: 1.7 }}>
          Products and features may not be available in all regions. Information is for or informational
          purposes only, and is not (i) an offer, or solicitation of an offer, to invest in, or to buy or
          sell, any interests or shares, or to participate in any investment or trading strategy or (ii)
          intended to provide accounting, legal, or tax advice, or investment recommendations. Trading
          cryptocurrency comes with risk.
        </p>
      </div>
    </main>
  );
}
