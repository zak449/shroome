"use client";

import { useEffect } from "react";
import Image from "next/image";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function FoundersSuccess() {
  useEffect(() => {
    window.gtag?.("event", "purchase", {
      event_category: "ecommerce",
      event_label: "founders_batch",
      currency: "USD",
    });
  }, []);

  return (
    <>
      <style>{`
        .fs-wrap{min-height:100vh;background:var(--brand-ink);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0;padding:60px 24px;text-align:center}
        .fs-logo{display:flex;align-items:center;gap:10px;text-decoration:none;color:var(--brand-canvas);margin-bottom:40px}
        .fs-logo span{font-family:var(--brand-font-display);font-size:28px;font-weight:700;font-style:normal}
        .fs-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(var(--brand-accent-rgb),0.12);border:1px solid rgba(var(--brand-accent-rgb),0.3);border-radius:24px;padding:8px 20px;margin-bottom:24px}
        .fs-badge-dot{width:8px;height:8px;border-radius:50%;background:var(--brand-accent);box-shadow:0 0 10px rgba(var(--brand-accent-rgb),0.6)}
        .fs-badge span{font-family:var(--brand-font-mono);font-size:11px;font-weight:600;letter-spacing:.15em;text-transform:uppercase;color:var(--brand-accent)}
        .fs-heading{font-family:var(--brand-font-display);font-size:clamp(40px,7vw,64px);font-weight:700;font-style:normal;color:var(--brand-canvas);margin:0 0 16px;line-height:1.05}
        .fs-sub{font-family:var(--brand-font-body);font-size:16px;color:rgba(var(--brand-canvas-rgb),0.55);margin:0 0 48px;max-width:480px;line-height:1.6}
        .fs-details{display:flex;flex-direction:column;gap:12px;margin-bottom:48px;max-width:360px;width:100%}
        .fs-detail{display:flex;align-items:center;justify-content:space-between;padding:14px 18px;background:rgba(var(--brand-canvas-rgb),0.05);border-radius:10px;border:1px solid rgba(var(--brand-canvas-rgb),0.08)}
        .fs-detail-label{font-family:var(--brand-font-mono);font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:rgba(var(--brand-canvas-rgb),0.35)}
        .fs-detail-val{font-family:var(--brand-font-body);font-size:14px;font-weight:600;color:var(--brand-canvas)}
        .fs-ctas{display:flex;flex-direction:column;gap:10px;align-items:center}
        .fs-cta-primary{display:inline-block;padding:14px 40px;border-radius:8px;background:var(--brand-accent);color:var(--brand-ink);font-family:var(--brand-font-mono);font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;text-decoration:none;transition:transform .15s}
        .fs-cta-primary:hover{transform:scale(1.03)}
        .fs-cta-secondary{font-family:var(--brand-font-body);font-size:13px;color:rgba(var(--brand-canvas-rgb),0.4);text-decoration:none}
        .fs-cta-secondary:hover{color:rgba(var(--brand-canvas-rgb),0.7)}
      `}</style>
      <div className="fs-wrap">
        <a href="/" className="fs-logo">
          <Image src="/brand/symbol-sheep-solid.png" alt="shroomé" width={36} height={36} />
          <img src="/brand/wordmark.png" alt="shroomé" style={{ height: 22, width: "auto" }} />
        </a>

        <div className="fs-badge">
          <div className="fs-badge-dot" />
          <span>Number Locked</span>
        </div>

        <h1 className="fs-heading">You&apos;re a Founder.</h1>
        <p className="fs-sub">
          Your box is numbered and reserved. You&apos;ll get a confirmation email shortly.
          Your box ships on launch day — June 15, 2026.
        </p>

        <div className="fs-details">
          <div className="fs-detail">
            <span className="fs-detail-label">Discount</span>
            <span className="fs-detail-val">30% off locked</span>
          </div>
          <div className="fs-detail">
            <span className="fs-detail-label">Ships</span>
            <span className="fs-detail-val">June 15, 2026</span>
          </div>
          <div className="fs-detail">
            <span className="fs-detail-label">Shipping</span>
            <span className="fs-detail-val">Free</span>
          </div>
        </div>

        <div className="fs-ctas">
          <a href="/refer" className="fs-cta-primary">Refer Friends — Earn Up to $15 Credit →</a>
          <a href="/" className="fs-cta-secondary">Back to shroomé</a>
        </div>
      </div>
    </>
  );
}
