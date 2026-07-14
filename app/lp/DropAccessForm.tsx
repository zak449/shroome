"use client";

import { useState, useEffect, useRef, useCallback } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: Record<string, unknown>) => string;
      remove: (widgetId: string) => void;
    };
    gtag?: (...args: unknown[]) => void;
  }
}

interface DropAccessFormProps {
  /** e.g. "lp-ritual" — sent as `source` in the waitlist POST + gtag label. */
  source: string;
  /** Render on a dark (Navy) background. */
  dark?: boolean;
  /** Button label — defaults to the drop CTA. */
  buttonLabel?: string;
  /** Microcopy under the email field. */
  microcopy?: string;
}

export default function DropAccessForm({
  source,
  dark = false,
  buttonLabel = "get drop access",
  microcopy,
}: DropAccessFormProps) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState<"email" | "captcha" | "phone" | "done">("email");
  const [loading, setLoading] = useState(false);
  const [referredBy, setReferredBy] = useState<string | null>(null);
  const captchaRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  // ── Detect referral code from URL (same contract as homepage) ──
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref && ref.length >= 4) {
      setReferredBy(ref.toUpperCase());
    }
  }, []);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || loading) return;
    window.gtag?.("event", "begin_checkout", {
      items: [{ item_name: "waitlist_signup" }],
      lp_segment: source,
    });
    setStep("captcha");
  };

  const onTurnstileSuccess = useCallback(
    async (token: string) => {
      setLoading(true);
      try {
        const res = await fetch("/api/waitlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, turnstileToken: token, ref: referredBy, source }),
        });
        const data = await res.json();
        if (data.closed) {
          setStep("done");
          setLoading(false);
          return;
        }
      } catch {}
      setLoading(false);
      setStep("phone");
      window.gtag?.("event", "sign_up", {
        method: "waitlist",
        event_category: "engagement",
        event_label: source,
        lp_segment: source,
      });
      window.gtag?.("event", "generate_lead", {
        currency: "USD",
        value: 5.0,
        lp_segment: source,
      });
    },
    [email, referredBy, source]
  );

  // ── Load Turnstile script + render widget on captcha step ──
  useEffect(() => {
    if (step !== "captcha") return;
    const renderWidget = () => {
      if (!captchaRef.current || !window.turnstile) return;
      if (widgetIdRef.current) {
        try { window.turnstile.remove(widgetIdRef.current); } catch {}
      }
      widgetIdRef.current = window.turnstile.render(captchaRef.current, {
        sitekey:
          process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY &&
          !process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY.startsWith("REPLACE")
            ? process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
            : "1x00000000000000000000AA",
        callback: onTurnstileSuccess,
        "error-callback": () => { onTurnstileSuccess(""); },
        theme: dark ? "dark" : "light",
      });
    };
    if (window.turnstile) {
      renderWidget();
    } else {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.onload = renderWidget;
      document.head.appendChild(script);
    }
  }, [step, onTurnstileSuccess, dark]);

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim() || loading) return;
    setLoading(true);
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone, ref: referredBy, source }),
      });
    } catch {}
    setLoading(false);
    setStep("done");
    window.gtag?.("event", "sign_up", {
      method: "waitlist_phone",
      event_category: "engagement",
      event_label: source,
      lp_segment: source,
    });
  };

  const skipPhone = () => {
    setStep("done");
    window.gtag?.("event", "sign_up", {
      method: "waitlist_email_only",
      event_category: "engagement",
      event_label: source,
      lp_segment: source,
    });
  };

  const strong = dark ? "#FDF4EE" : "#1B1F3B";
  const faint = dark ? "rgba(253,244,238,0.6)" : "rgba(27,31,59,0.6)";
  const fainter = dark ? "rgba(253,244,238,0.4)" : "rgba(27,31,59,0.4)";

  if (step === "done") {
    return (
      <div style={{ maxWidth: 440 }}>
        <p style={{ fontFamily: "'Syne', system-ui, sans-serif", fontWeight: 700, fontSize: "1rem", color: strong, margin: 0 }}>
          ✓ you&apos;re in. drop access locked — 20% off + free shipping.
        </p>
        <p style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: "0.78rem", color: faint, marginTop: 8 }}>
          we&apos;ll send the drop 002 link the moment it&apos;s live.
        </p>
      </div>
    );
  }

  if (step === "captcha") {
    return (
      <div style={{ maxWidth: 440 }}>
        <p style={{ fontFamily: "'Syne', system-ui, sans-serif", fontWeight: 600, fontSize: "0.82rem", color: strong, marginBottom: 14 }}>
          quick verification for {email}
        </p>
        <div ref={captchaRef} style={{ marginBottom: 8 }} />
        {loading && (
          <p style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: "0.72rem", color: fainter }}>
            submitting...
          </p>
        )}
      </div>
    );
  }

  if (step === "phone") {
    return (
      <div style={{ maxWidth: 440 }}>
        <p style={{ fontFamily: "'Syne', system-ui, sans-serif", fontWeight: 700, fontSize: "0.85rem", color: strong, marginBottom: 4 }}>
          ✓ drop access locked in.
        </p>
        <p style={{ fontFamily: "'Syne', system-ui, sans-serif", fontWeight: 600, fontSize: "0.82rem", color: faint, marginBottom: 12 }}>
          the text list gets the drop link 10 minutes before everyone else — plus an extra 10% off.
        </p>
        <form onSubmit={handlePhoneSubmit}>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(555) 123-4567"
            aria-label="Phone number"
            style={{
              width: "100%",
              padding: "16px 20px",
              border: "2px solid #1B1F3B",
              background: "#fff",
              color: "#1B1F3B",
              fontFamily: "'Syne', system-ui, sans-serif",
              fontSize: "0.95rem",
              fontWeight: 500,
              marginBottom: 10,
            }}
          />
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "16px 32px",
                border: "none",
                background: "#C8FF3A",
                color: "#1B1F3B",
                fontFamily: "'Syne', system-ui, sans-serif",
                fontWeight: 800,
                fontSize: "0.78rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: loading ? "wait" : "pointer",
              }}
            >
              {loading ? "…" : "text me the link →"}
            </button>
            <button
              type="button"
              onClick={skipPhone}
              style={{
                padding: "16px 12px",
                border: "none",
                background: "transparent",
                color: fainter,
                fontFamily: "'Syne', system-ui, sans-serif",
                fontWeight: 600,
                fontSize: "0.72rem",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              skip
            </button>
          </div>
        </form>
        <p style={{ margin: "8px 0 0", fontSize: "0.6rem", color: fainter, lineHeight: 1.4, maxWidth: 400, fontFamily: "'Syne', system-ui, sans-serif" }}>
          by providing your phone number, you agree to receive marketing texts from shroomé — one text per drop. msg &amp; data rates may apply. reply STOP to opt out.
        </p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 440 }}>
      <form onSubmit={handleEmailSubmit} style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          aria-label="Email address"
          style={{
            flex: "1 1 220px",
            minWidth: 0,
            padding: "16px 20px",
            border: "2px solid #1B1F3B",
            background: "#fff",
            color: "#1B1F3B",
            fontFamily: "'Syne', system-ui, sans-serif",
            fontSize: "0.95rem",
            fontWeight: 500,
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "16px 28px",
            border: "none",
            background: "#C8FF3A",
            color: "#1B1F3B",
            fontFamily: "'Syne', system-ui, sans-serif",
            fontWeight: 800,
            fontSize: "0.78rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: loading ? "wait" : "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {loading ? "…" : `${buttonLabel} →`}
        </button>
      </form>
      {microcopy && (
        <p style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: "0.72rem", color: faint, marginTop: 10 }}>
          {microcopy}
        </p>
      )}
    </div>
  );
}
