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
  /** Render on a dark (ink) background. */
  dark?: boolean;
  /**
   * Capture tier.
   * "light" (default): email only — find out when the next run goes live —
   * with an upsell link to the deep flow.
   * "deep": the Flock membership move — email, then phone, then an optional
   * name + city step, sold with community benefits.
   * "cart": the BoxBuilder save. Email (required) + first name (optional,
   * single field), then a warm Flock upsell on the success state.
   */
  tier?: "light" | "deep" | "cart";
  /** Where the light tier's "join the Flock" upsell points. */
  upsellHref?: string;
  /** Button label — defaults per tier. */
  buttonLabel?: string;
  /** Microcopy under the email field. */
  microcopy?: string;
}

/** Saved BoxBuilder cart, attached to signups so the CRM knows the build. */
function getSavedBuild(): unknown {
  try {
    const raw = localStorage.getItem("shroome_saved_build");
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
}

export default function DropAccessForm({
  source,
  dark = false,
  tier = "light",
  upsellHref = "/drop#join",
  buttonLabel,
  microcopy,
}: DropAccessFormProps) {
  const label = buttonLabel ?? (tier === "deep" ? "join the flock" : "find out first");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [city, setCity] = useState("");
  const [step, setStep] = useState<"email" | "captcha" | "phone" | "city" | "done">("email");
  const [loading, setLoading] = useState(false);
  const [captchaError, setCaptchaError] = useState("");
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
      setCaptchaError("");
      try {
        const res = await fetch("/api/waitlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, turnstileToken: token, ref: referredBy, source, tier, name: firstName.trim() || undefined, savedBuild: getSavedBuild() }),
        });
        const data = await res.json();
        if (data.closed) {
          setStep("done");
          setLoading(false);
          return;
        }
        if (!res.ok) {
          // e.g. CAPTCHA rejected server-side — back to the email step so a
          // resubmit renders a fresh widget (and a fresh token).
          setCaptchaError(data.error || "verification failed. please try again.");
          setStep("email");
          setLoading(false);
          return;
        }
      } catch {}
      setLoading(false);
      // Light tier stops at email; deep continues into the membership steps.
      setStep(tier === "deep" ? "phone" : "done");
      window.gtag?.("event", "sign_up", {
        method: tier === "deep" ? "waitlist" : "waitlist_email_only",
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
    [email, firstName, referredBy, source, tier]
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
        // Never submit an empty token (the API fails closed) — return to the
        // email step; resubmitting renders a fresh widget with a fresh token.
        "error-callback": () => {
          setCaptchaError("verification failed. please try again.");
          setStep("email");
        },
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
        body: JSON.stringify({ email, phone, ref: referredBy, source, tier, savedBuild: getSavedBuild() }),
      });
    } catch {}
    setLoading(false);
    setStep("city");
    window.gtag?.("event", "sign_up", {
      method: "waitlist_phone",
      event_category: "engagement",
      event_label: source,
      lp_segment: source,
    });
  };

  const skipPhone = () => {
    setStep("city");
    window.gtag?.("event", "sign_up", {
      method: "waitlist_email_only",
      event_category: "engagement",
      event_label: source,
      lp_segment: source,
    });
  };

  const handleCitySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (!firstName.trim() && !city.trim()) {
      setStep("done");
      return;
    }
    setLoading(true);
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: firstName, city, ref: referredBy, source, tier }),
      });
    } catch {}
    setLoading(false);
    setStep("done");
    window.gtag?.("event", "sign_up", {
      method: "waitlist_profile",
      event_category: "engagement",
      event_label: source,
      lp_segment: source,
    });
  };

  const strong = dark ? "var(--brand-canvas)" : "var(--brand-ink)";
  const faint = dark ? "rgba(var(--brand-canvas-rgb),0.6)" : "rgba(var(--brand-ink-rgb),0.6)";
  const fainter = dark ? "rgba(var(--brand-canvas-rgb),0.4)" : "rgba(var(--brand-ink-rgb),0.4)";

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "16px 20px",
    border: "2px solid var(--brand-ink)",
    background: "#fff",
    color: "var(--brand-ink)",
    fontFamily: "var(--brand-font-body)",
    fontSize: "0.95rem",
    fontWeight: 500,
    marginBottom: 10,
  };

  if (step === "done" && tier === "cart") {
    // Beat 3: cart is saved, warm hand-off into the Flock.
    return (
      <div style={{ maxWidth: 440 }}>
        <p style={{ fontFamily: "var(--brand-font-body)", fontWeight: 800, fontSize: "1rem", color: strong, margin: 0 }}>
          ✓ cart saved. it&apos;s waiting for the next run.
        </p>
        <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.78rem", color: faint, marginTop: 8 }}>
          we&apos;ll send your link the moment the run opens, cart intact.
        </p>
        <div style={{ marginTop: 16, border: "2px solid var(--brand-ink)", borderRadius: 18, padding: "16px 18px", background: "rgba(var(--brand-accent-rgb),0.08)" }}>
          <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.8rem", lineHeight: 1.6, color: strong, margin: 0 }}>
            your cart&apos;s safe. want it a day before everyone else? that&apos;s a Flock thing.
          </p>
          <a
            href={upsellHref}
            style={{
              display: "inline-block",
              marginTop: 12,
              padding: "13px 24px",
              borderRadius: 999,
              border: "2px solid var(--brand-ink)",
              background: "var(--brand-accent)",
              color: "var(--brand-canvas)",
              fontFamily: "var(--brand-font-body)",
              fontWeight: 800,
              fontSize: "0.72rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            join the Flock →
          </a>
          <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.68rem", color: fainter, marginTop: 10, marginBottom: 0 }}>
            shop a day early, vote on flavors, member-only merch. or just keep the cart, that&apos;s fine too.
          </p>
        </div>
      </div>
    );
  }

  if (step === "done") {
    return (
      <div style={{ maxWidth: 440 }}>
        <p style={{ fontFamily: "var(--brand-font-body)", fontWeight: 700, fontSize: "1rem", color: strong, margin: 0 }}>
          ✓ you&apos;re in. drop access locked: 20% off + free shipping.
        </p>
        <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.78rem", color: faint, marginTop: 8 }}>
          we&apos;ll send the next run&apos;s link the moment it&apos;s live.
        </p>
        {tier === "light" && (
          <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.75rem", color: faint, marginTop: 12 }}>
            want more than the date?{" "}
            <a href={upsellHref} style={{ color: strong, fontWeight: 700, textDecoration: "underline", textUnderlineOffset: 3 }}>
              join the Flock →
            </a>{" "}
            shop a day early, vote on flavors, member-only merch.
          </p>
        )}
      </div>
    );
  }

  if (step === "captcha") {
    return (
      <div style={{ maxWidth: 440 }}>
        <p style={{ fontFamily: "var(--brand-font-body)", fontWeight: 600, fontSize: "0.82rem", color: strong, marginBottom: 14 }}>
          quick verification for {email}
        </p>
        <div ref={captchaRef} style={{ marginBottom: 8 }} />
        {loading && (
          <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.72rem", color: fainter }}>
            submitting...
          </p>
        )}
      </div>
    );
  }

  if (step === "city") {
    return (
      <div style={{ maxWidth: 440 }}>
        <p style={{ fontFamily: "var(--brand-font-body)", fontWeight: 700, fontSize: "0.85rem", color: strong, marginBottom: 4 }}>
          ✓ you&apos;re in the Flock.
        </p>
        <p style={{ fontFamily: "var(--brand-font-body)", fontWeight: 600, fontSize: "0.82rem", color: faint, marginBottom: 12 }}>
          one last thing, totally optional: tell us who&apos;s pouring and where, so
          your box (and future pop-ups) land close to home.
        </p>
        <form onSubmit={handleCitySubmit}>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="first name (optional)"
            aria-label="First name"
            autoComplete="given-name"
            style={inputStyle}
          />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="city (optional)"
            aria-label="City"
            autoComplete="address-level2"
            style={inputStyle}
          />
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "16px 32px",
                border: "none",
                background: "var(--brand-accent)",
                color: "var(--brand-canvas)",
                fontFamily: "var(--brand-font-body)",
                fontWeight: 800,
                fontSize: "0.78rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: loading ? "wait" : "pointer",
              }}
            >
              {loading ? "…" : "done →"}
            </button>
            <button
              type="button"
              onClick={() => setStep("done")}
              style={{
                padding: "16px 12px",
                border: "none",
                background: "transparent",
                color: fainter,
                fontFamily: "var(--brand-font-body)",
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
      </div>
    );
  }

  if (step === "phone") {
    return (
      <div style={{ maxWidth: 440 }}>
        <p style={{ fontFamily: "var(--brand-font-body)", fontWeight: 700, fontSize: "0.85rem", color: strong, marginBottom: 4 }}>
          ✓ drop access locked in.
        </p>
        <p style={{ fontFamily: "var(--brand-font-body)", fontWeight: 600, fontSize: "0.82rem", color: faint, marginBottom: 12 }}>
          the text list gets the drop link 10 minutes before everyone else, with an upgraded welcome code.
        </p>
        <form onSubmit={handlePhoneSubmit}>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(555) 123-4567"
            aria-label="Phone number"
            style={inputStyle}
          />
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "16px 32px",
                border: "none",
                background: "var(--brand-accent)",
                color: "var(--brand-canvas)",
                fontFamily: "var(--brand-font-body)",
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
                fontFamily: "var(--brand-font-body)",
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
        <p style={{ margin: "8px 0 0", fontSize: "0.6rem", color: fainter, lineHeight: 1.4, maxWidth: 400, fontFamily: "var(--brand-font-body)" }}>
          by providing your phone number, you agree to receive marketing texts from shroomé. one text per drop. msg &amp; data rates may apply. reply STOP to opt out.
        </p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 440 }}>
      <form onSubmit={handleEmailSubmit} style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {tier === "cart" && (
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="first name (optional)"
            aria-label="First name"
            autoComplete="given-name"
            style={{
              flex: "1 1 100%",
              padding: "16px 20px",
              border: "2px solid var(--brand-ink)",
              background: "#fff",
              color: "var(--brand-ink)",
              fontFamily: "var(--brand-font-body)",
              fontSize: "0.95rem",
              fontWeight: 500,
            }}
          />
        )}
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
            border: "2px solid var(--brand-ink)",
            background: "#fff",
            color: "var(--brand-ink)",
            fontFamily: "var(--brand-font-body)",
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
            background: "var(--brand-accent)",
            color: "var(--brand-canvas)",
            fontFamily: "var(--brand-font-body)",
            fontWeight: 800,
            fontSize: "0.78rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: loading ? "wait" : "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {loading ? "…" : `${label} →`}
        </button>
      </form>
      {captchaError && (
        <p role="alert" style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.72rem", color: "#B3261E", marginTop: 10, fontWeight: 600 }}>
          {captchaError}
        </p>
      )}
      {microcopy && (
        <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.72rem", color: faint, marginTop: 10 }}>
          {microcopy}
        </p>
      )}
      {tier === "light" && (
        <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.7rem", color: fainter, marginTop: 8 }}>
          email only, just the date. want more?{" "}
          <a href={upsellHref} style={{ color: faint, fontWeight: 700, textDecoration: "underline", textUnderlineOffset: 3 }}>
            join the Flock →
          </a>
        </p>
      )}
    </div>
  );
}
