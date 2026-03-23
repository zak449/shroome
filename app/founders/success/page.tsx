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
        .fs-wrap{min-height:100vh;background:#1B1F3B;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0;padding:60px 24px;text-align:center}
        .fs-logo{display:flex;align-items:center;gap:10px;text-decoration:none;color:#FDF4EE;margin-bottom:40px}
        .fs-logo span{font-family:'Instrument Serif',Georgia,serif;font-size:28px;font-weight:400;font-style:italic}
        .fs-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(200,255,58,0.12);border:1px solid rgba(200,255,58,0.3);border-radius:24px;padding:8px 20px;margin-bottom:24px}
        .fs-badge-dot{width:8px;height:8px;border-radius:50%;background:#C8FF3A;box-shadow:0 0 10px rgba(200,255,58,0.6)}
        .fs-badge span{font-family:'DM Mono',monospace;font-size:11px;font-weight:600;letter-spacing:.15em;text-transform:uppercase;color:#C8FF3A}
        .fs-heading{font-family:'Instrument Serif',Georgia,serif;font-size:clamp(40px,7vw,64px);font-weight:400;font-style:italic;color:#FDF4EE;margin:0 0 16px;line-height:1.05}
        .fs-sub{font-family:'Syne',system-ui,sans-serif;font-size:16px;color:rgba(253,244,238,0.55);margin:0 0 48px;max-width:480px;line-height:1.6}
        .fs-details{display:flex;flex-direction:column;gap:12px;margin-bottom:48px;max-width:360px;width:100%}
        .fs-detail{display:flex;align-items:center;justify-content:space-between;padding:14px 18px;background:rgba(253,244,238,0.05);border-radius:10px;border:1px solid rgba(253,244,238,0.08)}
        .fs-detail-label{font-family:'DM Mono',monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:rgba(253,244,238,0.35)}
        .fs-detail-val{font-family:'Syne',system-ui,sans-serif;font-size:14px;font-weight:600;color:#FDF4EE}
        .fs-ctas{display:flex;flex-direction:column;gap:10px;align-items:center}
        .fs-cta-primary{display:inline-block;padding:14px 40px;border-radius:8px;background:#C8FF3A;color:#1B1F3B;font-family:'DM Mono',monospace;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;text-decoration:none;transition:transform .15s}
        .fs-cta-primary:hover{transform:scale(1.03)}
        .fs-cta-secondary{font-family:'Syne',system-ui,sans-serif;font-size:13px;color:rgba(253,244,238,0.4);text-decoration:none}
        .fs-cta-secondary:hover{color:rgba(253,244,238,0.7)}
      `}</style>
      <div className="fs-wrap">
        <a href="/" className="fs-logo">
          <Image src="/logo-mark.png" alt="shroomé" width={36} height={36} />
          <span>shroomé</span>
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
            <span className="fs-detail-val">25% off locked</span>
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
          <a href="/refer" className="fs-cta-primary">Stack More Discount — Refer Friends →</a>
          <a href="/" className="fs-cta-secondary">Back to shroomé</a>
        </div>
      </div>
    </>
  );
}
