"use client";

import { useState, useEffect, useRef, useCallback, FormEvent } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function BlogCTA() {
  /* ── shared form state ── */
  const [inlineEmail, setInlineEmail] = useState("");
  const [inlineStatus, setInlineStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [inlineError, setInlineError] = useState("");
  const [inlinePhone, setInlinePhone] = useState("");
  const [inlinePhoneStep, setInlinePhoneStep] = useState(false);
  const [inlinePhoneDone, setInlinePhoneDone] = useState(false);

  const [stickyEmail, setStickyEmail] = useState("");
  const [stickyStatus, setStickyStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [stickyError, setStickyError] = useState("");
  const [stickyPhone, setStickyPhone] = useState("");
  const [stickyPhoneStep, setStickyPhoneStep] = useState(false);
  const [stickyPhoneDone, setStickyPhoneDone] = useState(false);

  /* ── sticky bar visibility ── */
  const [showSticky, setShowSticky] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  /* ── Turnstile CAPTCHA (the API rejects token-less signups when configured) ── */
  const [captchaTarget, setCaptchaTarget] = useState<"inline" | "sticky" | null>(null);
  const inlineCaptchaRef = useRef<HTMLDivElement>(null);
  const stickyCaptchaRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("blog-sticky-dismissed") === "1") {
      setDismissed(true);
    }

    const onScroll = () => {
      setShowSticky(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dismissSticky = useCallback(() => {
    setDismissed(true);
    sessionStorage.setItem("blog-sticky-dismissed", "1");
  }, []);

  /* ── submit helper ── */
  async function submitEmail(
    email: string,
    setStatus: (s: "idle" | "loading" | "success" | "error") => void,
    setError: (s: string) => void,
    source: string,
    turnstileToken: string
  ) {
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, turnstileToken }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
      window.gtag?.('event', 'sign_up', {
        method: 'waitlist',
        event_category: 'engagement',
        event_label: source,
      });
      window.gtag?.('event', 'generate_lead', {
        currency: 'USD',
        value: 5.00,
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  const handleInlineSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inlineEmail || !inlineEmail.includes("@")) {
      setInlineError("Please enter a valid email.");
      setInlineStatus("error");
      return;
    }
    setInlineError("");
    setInlineStatus("idle");
    setCaptchaTarget("inline");
  };

  const handleStickySubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!stickyEmail || !stickyEmail.includes("@")) {
      setStickyError("Please enter a valid email.");
      setStickyStatus("error");
      return;
    }
    setStickyError("");
    setStickyStatus("idle");
    setCaptchaTarget("sticky");
  };

  const onTurnstileSuccess = useCallback((token: string) => {
    if (captchaTarget === "inline") {
      submitEmail(inlineEmail, setInlineStatus, setInlineError, "blog_inline_cta", token);
    } else if (captchaTarget === "sticky") {
      submitEmail(stickyEmail, setStickyStatus, setStickyError, "blog_sticky_bar", token);
    }
    setCaptchaTarget(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [captchaTarget, inlineEmail, stickyEmail]);

  // Load the Turnstile script + render the widget into whichever form is
  // awaiting verification. Same pattern as app/refer/page.tsx — falls back to
  // Cloudflare's always-pass test sitekey when NEXT_PUBLIC_TURNSTILE_SITE_KEY
  // is unset (dev), so the forms keep working without configuration.
  useEffect(() => {
    if (!captchaTarget) return;
    const container = captchaTarget === "inline" ? inlineCaptchaRef.current : stickyCaptchaRef.current;
    const renderWidget = () => {
      if (!container || !window.turnstile) return;
      if (widgetIdRef.current) {
        try { window.turnstile.remove(widgetIdRef.current); } catch {}
      }
      widgetIdRef.current = window.turnstile.render(container, {
        sitekey: (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY.startsWith("REPLACE")) ? process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY : "1x00000000000000000000AA",
        callback: onTurnstileSuccess,
        // Never submit an empty token (the API fails closed) — reset the form;
        // resubmitting renders a fresh widget with a fresh token.
        "error-callback": () => {
          if (captchaTarget === "inline") {
            setInlineError("Verification failed. Please try again.");
            setInlineStatus("error");
          } else {
            setStickyError("Verification failed. Please try again.");
            setStickyStatus("error");
          }
          setCaptchaTarget(null);
        },
        theme: "dark",
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
  }, [captchaTarget, onTurnstileSuccess]);

  const stickyVisible = showSticky && !dismissed;

  return (
    <>
      {/* ════════════════════════════════════════════
          INLINE CTA BANNER
         ════════════════════════════════════════════ */}
      <div
        style={{
          maxWidth: 680,
          margin: "0 auto",
          padding: "0 6% 40px",
        }}
      >
        <div
          style={{
            background: "var(--brand-ink)",
            padding: "48px 36px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* decorative accent line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: "linear-gradient(90deg, var(--brand-accent) 0%, var(--brand-accent-warm) 50%, var(--brand-flavor-functional) 100%)",
            }}
          />

          <p
            style={{
              fontFamily: "var(--brand-font-mono)",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: ".2em",
              textTransform: "uppercase" as const,
              color: "var(--brand-accent)",
              marginBottom: 14,
            }}
          >
            Don&rsquo;t miss out
          </p>

          <h3
            style={{
              fontFamily: "var(--brand-font-display)",
              fontSize: "clamp(24px, 4vw, 32px)",
              fontWeight: 400,
              fontStyle: "italic",
              color: "var(--brand-canvas)",
              lineHeight: 1.15,
              marginBottom: 12,
            }}
          >
            Ready to ditch the crash?
          </h3>

          <p
            style={{
              fontFamily: "var(--brand-font-body)",
              fontSize: 14,
              color: "rgba(var(--brand-canvas-rgb),0.55)",
              lineHeight: 1.6,
              marginBottom: 28,
              fontWeight: 400,
              maxWidth: 440,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Join the waitlist for 20% off + free shipping on the world&rsquo;s first
            ready-to-pour ceremonial matcha latte.
          </p>

          {inlineStatus === "success" ? (
            inlinePhoneDone ? (
              <p style={{ fontFamily: "var(--brand-font-body)", fontSize: 15, fontWeight: 600, color: "var(--brand-accent)" }}>
                You&rsquo;re all set! Check your email{inlinePhone ? " — we'll text you too" : ""}. &#10003;
              </p>
            ) : (
              <div>
                <p style={{ fontFamily: "var(--brand-font-body)", fontSize: 13, fontWeight: 600, color: "var(--brand-accent)", marginBottom: 10 }}>
                  &#10003; 20% off locked in! Add your number to upgrade to 30% (replaces your 20% code):
                </p>
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  if (!inlinePhone.trim()) return;
                  try { await fetch("/api/waitlist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: inlineEmail, phone: inlinePhone }) }); } catch {}
                  window.gtag?.("event", "sign_up", { method: "waitlist_phone", event_label: "blog_inline_cta_phone" });
                  setInlinePhoneDone(true);
                }} style={{ display: "flex", gap: 0, maxWidth: 380, margin: "0 auto", flexWrap: "wrap" as const, justifyContent: "center" }}>
                  <input type="tel" placeholder="(555) 123-4567" value={inlinePhone} onChange={(e) => setInlinePhone(e.target.value)} required style={{ flex: "1 1 200px", padding: "12px 14px", fontFamily: "var(--brand-font-body)", fontSize: 13, color: "var(--brand-ink)", background: "var(--brand-canvas)", border: "2px solid transparent", outline: "none" }} />
                  <button type="submit" style={{ padding: "12px 20px", background: "var(--brand-accent)", color: "var(--brand-ink)", border: "none", fontFamily: "var(--brand-font-body)", fontWeight: 800, fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase" as const, cursor: "pointer" }}>Upgrade it</button>
                </form>
                <button onClick={() => setInlinePhoneDone(true)} style={{ background: "none", border: "none", color: "rgba(var(--brand-canvas-rgb),0.4)", fontSize: 11, fontFamily: "var(--brand-font-body)", cursor: "pointer", marginTop: 8, textDecoration: "underline" }}>Skip</button>
              </div>
            )
          ) : captchaTarget === "inline" ? (
            <div>
              <p style={{ fontFamily: "var(--brand-font-body)", fontSize: 13, color: "rgba(var(--brand-canvas-rgb),0.55)", marginBottom: 10 }}>
                One quick check&hellip;
              </p>
              <div ref={inlineCaptchaRef} style={{ display: "flex", justifyContent: "center", minHeight: 65 }} />
            </div>
          ) : (
            <form
              onSubmit={handleInlineSubmit}
              style={{
                display: "flex",
                gap: 0,
                maxWidth: 420,
                margin: "0 auto",
                flexWrap: "wrap" as const,
                justifyContent: "center",
              }}
            >
              <input
                type="email"
                placeholder="your@email.com"
                value={inlineEmail}
                onChange={(e) => {
                  setInlineEmail(e.target.value);
                  if (inlineStatus === "error") {
                    setInlineStatus("idle");
                    setInlineError("");
                  }
                }}
                required
                style={{
                  flex: "1 1 220px",
                  minWidth: 0,
                  padding: "13px 16px",
                  fontFamily: "var(--brand-font-body)",
                  fontSize: 13,
                  fontWeight: 400,
                  color: "var(--brand-ink)",
                  background: "var(--brand-canvas)",
                  border: "2px solid transparent",
                  borderRight: "none",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                disabled={inlineStatus === "loading"}
                style={{
                  padding: "13px 24px",
                  fontFamily: "var(--brand-font-body)",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: ".08em",
                  textTransform: "uppercase" as const,
                  color: "var(--brand-ink)",
                  background: "var(--brand-accent)",
                  border: "none",
                  cursor: inlineStatus === "loading" ? "wait" : "pointer",
                  opacity: inlineStatus === "loading" ? 0.7 : 1,
                  transition: "background .2s, opacity .2s",
                  whiteSpace: "nowrap" as const,
                }}
              >
                {inlineStatus === "loading" ? "Joining..." : "Join the waitlist →"}
              </button>
            </form>
          )}

          {inlineStatus === "error" && inlineError && (
            <p
              style={{
                fontFamily: "var(--brand-font-body)",
                fontSize: 12,
                color: "var(--brand-accent-warm)",
                marginTop: 10,
              }}
            >
              {inlineError}
            </p>
          )}
        </div>
      </div>

      {/* ════════════════════════════════════════════
          STICKY BOTTOM BAR
         ════════════════════════════════════════════ */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          background: "var(--brand-ink)",
          borderTop: "1px solid rgba(var(--brand-accent-rgb),0.15)",
          padding: "10px 5%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
          flexWrap: "wrap" as const,
          transform: stickyVisible ? "translateY(0)" : "translateY(100%)",
          transition: "transform .35s cubic-bezier(.23,1,.32,1)",
          pointerEvents: stickyVisible ? "auto" as const : "none" as const,
        }}
      >
        {stickyStatus === "success" ? (
          stickyPhoneDone ? (
            <p style={{ fontFamily: "var(--brand-font-body)", fontSize: 13, fontWeight: 600, color: "var(--brand-accent)", margin: 0 }}>
              You&rsquo;re all set! &#10003;
            </p>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" as const, justifyContent: "center" }}>
              <p style={{ fontFamily: "var(--brand-font-body)", fontSize: 12, color: "var(--brand-accent)", fontWeight: 600, margin: 0, whiteSpace: "nowrap" as const }}>&#10003; 20% locked! Add phone for 30%:</p>
              <form onSubmit={async (e) => {
                e.preventDefault();
                if (!stickyPhone.trim()) return;
                try { await fetch("/api/waitlist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: stickyEmail, phone: stickyPhone }) }); } catch {}
                window.gtag?.("event", "sign_up", { method: "waitlist_phone", event_label: "blog_sticky_bar_phone" });
                setStickyPhoneDone(true);
              }} style={{ display: "flex", gap: 0 }}>
                <input type="tel" placeholder="(555) 123-4567" value={stickyPhone} onChange={(e) => setStickyPhone(e.target.value)} required style={{ padding: "8px 12px", fontSize: 12, fontFamily: "var(--brand-font-body)", border: "none", background: "rgba(var(--brand-canvas-rgb),0.15)", color: "var(--brand-canvas)", outline: "none", width: 130 }} />
                <button type="submit" style={{ padding: "8px 14px", background: "var(--brand-accent)", color: "var(--brand-ink)", border: "none", fontFamily: "var(--brand-font-body)", fontWeight: 800, fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase" as const, cursor: "pointer" }}>Add</button>
              </form>
              <button onClick={() => setStickyPhoneDone(true)} style={{ background: "none", border: "none", color: "rgba(var(--brand-canvas-rgb),0.35)", fontSize: 10, cursor: "pointer", textDecoration: "underline", fontFamily: "var(--brand-font-body)" }}>Skip</button>
            </div>
          )
        ) : captchaTarget === "sticky" ? (
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" as const, justifyContent: "center" }}>
            <p style={{ fontFamily: "var(--brand-font-body)", fontSize: 12, color: "rgba(var(--brand-canvas-rgb),0.7)", fontWeight: 600, margin: 0, whiteSpace: "nowrap" as const }}>
              One quick check&hellip;
            </p>
            <div ref={stickyCaptchaRef} style={{ display: "flex", justifyContent: "center", minHeight: 65 }} />
          </div>
        ) : (
          <>
            <p
              style={{
                fontFamily: "var(--brand-font-body)",
                fontSize: 13,
                color: "var(--brand-canvas)",
                margin: 0,
                fontWeight: 400,
                whiteSpace: "nowrap" as const,
              }}
            >
              Get 20% off the world&rsquo;s first ready-to-pour matcha latte
            </p>

            <form
              onSubmit={handleStickySubmit}
              style={{ display: "flex", gap: 0, alignItems: "center" }}
            >
              <input
                type="email"
                placeholder="your@email.com"
                value={stickyEmail}
                onChange={(e) => {
                  setStickyEmail(e.target.value);
                  if (stickyStatus === "error") {
                    setStickyStatus("idle");
                    setStickyError("");
                  }
                }}
                required
                style={{
                  width: 180,
                  padding: "8px 12px",
                  fontFamily: "var(--brand-font-body)",
                  fontSize: 12,
                  fontWeight: 400,
                  color: "var(--brand-ink)",
                  background: "rgba(var(--brand-canvas-rgb),0.92)",
                  border: "none",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                disabled={stickyStatus === "loading"}
                style={{
                  padding: "8px 16px",
                  fontFamily: "var(--brand-font-body)",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "var(--brand-ink)",
                  background: "var(--brand-accent)",
                  border: "none",
                  cursor: stickyStatus === "loading" ? "wait" : "pointer",
                  opacity: stickyStatus === "loading" ? 0.7 : 1,
                  transition: "background .2s",
                  whiteSpace: "nowrap" as const,
                }}
              >
                {stickyStatus === "loading" ? "..." : "Join →"}
              </button>
            </form>

            {stickyStatus === "error" && stickyError && (
              <p
                style={{
                  fontFamily: "var(--brand-font-body)",
                  fontSize: 11,
                  color: "var(--brand-accent-warm)",
                  margin: 0,
                }}
              >
                {stickyError}
              </p>
            )}
          </>
        )}

        {/* Close button */}
        <button
          onClick={dismissSticky}
          aria-label="Close"
          style={{
            position: "absolute",
            right: 14,
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            color: "rgba(var(--brand-canvas-rgb),0.5)",
            fontSize: 20,
            lineHeight: 1,
            cursor: "pointer",
            padding: "4px 6px",
            transition: "color .2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--brand-canvas)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(var(--brand-canvas-rgb),0.5)")}
        >
          &#10005;
        </button>
      </div>

      {/* ── responsive overrides for sticky bar & inline CTA ── */}
      <style>{`
        @media(max-width:640px){
          /* Let sticky bar text wrap on mobile */
        }
        @media(max-width:480px){
          /* Stack the sticky bar vertically is handled by flexWrap */
        }
      `}</style>

    </>
  );
}
