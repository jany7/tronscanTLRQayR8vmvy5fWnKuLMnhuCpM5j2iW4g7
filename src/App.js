import React, { useState } from "react";

export default function App() {
  const [activeTab, setActiveTab] = useState("transfers");

  const tx = {
    hash:
      "f9a1b2c3d4e5f60718293a4b5c6d7e8f9a0b1c2d3e4f5061728394a5b6c7d8e9",
    status: "PENDING",
    from: "TQ9sZk8Yp4d1xF2mJt7qB9uX3cP5sL8aVr",
    to: "TLRQayR8vmvy5fWnKuLMnhuCpM5j2iW4g7",
    amount: 6500,
    symbol: "USDT",
    timestamp: "2026-04-23 13:38:00 UTC",
    block: "Pending",
    fee: 12.6,
    confirmations: 0,
    energy: 28500,
    bandwidth: 345
  };

  const short = (str) =>
    str.slice(0, 10) + "..." + str.slice(-10);

  return (
    <div className="app">
      {/* NAVBAR */}
      <div className="navbar">
        <div className="logo">
          <span className="triangle"></span>
          TRONSCAN
        </div>

        <div className="search">
          <input placeholder="Search by Address / Txn Hash / Block" />
          <button>Search</button>
        </div>
      </div>

      <div className="container">
        <h2 className="page-title">Transaction Details</h2>

        {/* MAIN CARD */}
        <div className="card">
          <Row label="Transaction Hash" value={<span className="hash">{tx.hash}</span>} />

          <Row
            label="Status"
            value={
              <span className="status pending">
                <span className="dot"></span> Pending confirmation
              </span>
            }
          />

          <Row label="Block" value={tx.block} />
          <Row label="Timestamp" value={tx.timestamp} />
          <Row label="Confirmations" value={tx.confirmations} />
        </div>

        {/* TABS */}
        <div className="tabs">
          {["transfers", "internal", "events"].map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* TAB CONTENT */}
        <div className="card">
          {activeTab === "transfers" && (
            <>
              <h3>TRC20 Token Transfer</h3>

              <Row
                label="From"
                value={
                  <span className="address">
                    <Icon type="out" /> {short(tx.from)}
                  </span>
                }
              />

              <Row
                label="To"
                value={
                  <span className="address">
                    <Icon type="in" /> {short(tx.to)}
                  </span>
                }
              />

              <Row
                label="Amount"
                value={
                  <span>
                    {tx.amount.toLocaleString(undefined, {
                      minimumFractionDigits: 2
                    })}{" "}
                    {tx.symbol}
                  </span>
                }
              />
            </>
          )}

          {activeTab === "internal" && (
            <p className="empty">No internal transactions</p>
          )}

          {activeTab === "events" && (
            <p className="empty">No events found</p>
          )}
        </div>

        {/* RESOURCES */}
        <div className="card">
          <h3>Resources</h3>

          <Row
            label="Network Fee"
            value={
              <span>
                <Icon type="energy" /> {tx.fee} TRX
              </span>
            }
          />

          <Row label="Energy Used" value={tx.energy} />
          <Row label="Bandwidth Used" value={tx.bandwidth} />
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-top">
          <div>
            <h3>TRON</h3>
            <p>The best blockchain explorer of TRON</p>
          </div>

          <div className="footer-cols">
            <div>
              <h4>Preferences</h4>
              <a href="#">About Us</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>

            <div>
              <h4>Services & Support</h4>
              <a href="#">API</a>
              <a href="#">Advertise</a>
              <a href="#">Contact Us</a>
            </div>

            <div>
              <h4>Resources</h4>
              <a href="#">TRON ETF</a>
              <a href="#">TRON Architecture</a>
              <a href="#">TRON Whitepaper V2.1</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          Copyright © 2017–2026 tronscan.org
        </div>
      </footer>
    </div>
  );
}

/* REUSABLE ROW */
function Row({ label, value }) {
  return (
    <div className="row">
      <span className="label">{label}</span>
      <span className="value">{value}</span>
    </div>
  );
}

/* SIMPLE ICON SYSTEM */
function Icon({ type }) {
  if (type === "out") return <span className="icon">↗</span>;
  if (type === "in") return <span className="icon">↘</span>;
  if (type === "energy") return <span className="icon">⚡</span>;
  return null;
}