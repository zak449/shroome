"use client";

import { useState, useEffect } from "react";

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("shroome_sticky_cta_dismissed") === "1") {
      setDismissed(true);
      return;
    }

    const onScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dismiss = () => {
    setDismissed(true);
    sessionStorage.setItem("shroome_sticky_cta_dismissed", "1");
  };

  const show = visible && !dismissed;

  return (
    <>
      <style>{`
        .sticky-cta-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 150;
          background: #C8FF3A;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          transform: translateY(100%);
          transition: transform 0.35s cubic-bezier(0.23, 1, 0.32, 1);
          box-shadow: 0 -4px 20px rgba(27, 31, 59, 0.15);
        }
        .sticky-cta-bar.sticky-cta-visible {
          transform: translateY(0);
        }
        .sticky-cta-link {
          font-family: 'Syne', system-ui, sans-serif;
          font-size: 14px;
          font-weight: 800;
          color: #1B1F3B;
          text-decoration: none;
          letter-spacing: 0.02em;
          white-space: nowrap;
        }
        .sticky-cta-dismiss {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: rgba(27, 31, 59, 0.4);
          font-size: 18px;
          line-height: 1;
          cursor: pointer;
          padding: 4px 6px;
          transition: color 0.2s;
        }
        .sticky-cta-dismiss:hover {
          color: #1B1F3B;
        }
        /* Only show on mobile */
        @media (min-width: 769px) {
          .sticky-cta-bar {
            display: none !important;
          }
        }
      `}</style>

      <div
        className={`sticky-cta-bar${show ? " sticky-cta-visible" : ""}`}
        style={{ pointerEvents: show ? "auto" : "none" }}
      >
        <a href="/#signup" className="sticky-cta-link">
          Get 20% off + Free Shipping &rarr;
        </a>
        <button
          className="sticky-cta-dismiss"
          onClick={dismiss}
          aria-label="Dismiss"
        >
          &times;
        </button>
      </div>
    </>
  );
}
