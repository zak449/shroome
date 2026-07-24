"use client";

import { useState, useEffect } from "react";

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Ghost landing pages (/lp/*) are single-CTA — no cross-site CTA bar there
    if (window.location.pathname.startsWith("/lp")) {
      setDismissed(true);
      return;
    }
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
          background: var(--brand-accent);
          padding: 12px 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          transform: translateY(100%);
          transition: transform 0.35s cubic-bezier(0.23, 1, 0.32, 1);
          box-shadow: 0 -4px 20px rgba(var(--brand-ink-rgb), 0.15);
        }
        .sticky-cta-bar.sticky-cta-visible {
          transform: translateY(0);
        }
        .sticky-cta-link {
          font-family: var(--brand-font-body);
          font-size: 14px;
          font-weight: 800;
          color: var(--brand-canvas);
          text-decoration: none;
          letter-spacing: 0.02em;
          text-align: center;
        }
        .sticky-cta-dismiss {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: rgba(var(--brand-canvas-rgb), 0.6);
          font-size: 18px;
          line-height: 1;
          cursor: pointer;
          padding: 4px 6px;
          transition: color 0.2s;
        }
        .sticky-cta-dismiss:hover {
          color: var(--brand-canvas);
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
          Join the Flock — shop Drop 002 a day early &rarr;
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
