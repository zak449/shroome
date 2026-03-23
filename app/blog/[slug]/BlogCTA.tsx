"use client";

import { useState, useEffect, useCallback, FormEvent } from "react";

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
    source: string
  ) {
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, turnstileToken: "" }),
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
    submitEmail(inlineEmail, setInlineStatus, setInlineError, 'blog_inline_cta');
  };

  const handleStickySubmit = (e: FormEvent) => {
    e.preventDefault();
    submitEmail(stickyEmail, setStickyStatus, setStickyError, 'blog_sticky_bar');
  };

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
            background: "#1B1F3B",
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
              background: "linear-gradient(90deg, #C8FF3A 0%, #FF7043 50%, #D4B8E0 100%)",
            }}
          />

          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: ".2em",
              textTransform: "uppercase" as const,
              color: "#C8FF3A",
              marginBottom: 14,
            }}
          >
            Don&rsquo;t miss out
          </p>

          <h3
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: "clamp(24px, 4vw, 32px)",
              fontWeight: 400,
              fontStyle: "italic",
              color: "#FDF4EE",
              lineHeight: 1.15,
              marginBottom: 12,
            }}
          >
            Ready to ditch the crash?
          </h3>

          <p
            style={{
              fontFamily: "'Syne', system-ui, sans-serif",
              fontSize: 14,
              color: "rgba(253,244,238,0.55)",
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
              <p style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: 15, fontWeight: 600, color: "#C8FF3A" }}>
                You&rsquo;re all set! Check your email{inlinePhone ? " — we'll text you too" : ""}. &#10003;
              </p>
            ) : (
              <div>
                <p style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: 13, fontWeight: 600, color: "#C8FF3A", marginBottom: 10 }}>
                  &#10003; 20% off locked in! Add your number for an extra 10%:
                </p>
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  if (!inlinePhone.trim()) return;
                  try { await fetch("/api/waitlist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: inlineEmail, phone: inlinePhone }) }); } catch {}
                  window.gtag?.("event", "sign_up", { method: "waitlist_phone", event_label: "blog_inline_cta_phone" });
                  setInlinePhoneDone(true);
                }} style={{ display: "flex", gap: 0, maxWidth: 380, margin: "0 auto", flexWrap: "wrap" as const, justifyContent: "center" }}>
                  <input type="tel" placeholder="(555) 123-4567" value={inlinePhone} onChange={(e) => setInlinePhone(e.target.value)} required style={{ flex: "1 1 200px", padding: "12px 14px", fontFamily: "'Syne', sans-serif", fontSize: 13, color: "#1B1F3B", background: "#FDF4EE", border: "2px solid transparent", outline: "none" }} />
                  <button type="submit" style={{ padding: "12px 20px", background: "#C8FF3A", color: "#1B1F3B", border: "none", fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase" as const, cursor: "pointer" }}>Stack it</button>
                </form>
                <button onClick={() => setInlinePhoneDone(true)} style={{ background: "none", border: "none", color: "rgba(253,244,238,0.4)", fontSize: 11, fontFamily: "'Syne', sans-serif", cursor: "pointer", marginTop: 8, textDecoration: "underline" }}>Skip</button>
              </div>
            )
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
                  fontFamily: "'Syne', system-ui, sans-serif",
                  fontSize: 13,
                  fontWeight: 400,
                  color: "#1B1F3B",
                  background: "#FDF4EE",
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
                  fontFamily: "'Syne', system-ui, sans-serif",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: ".08em",
                  textTransform: "uppercase" as const,
                  color: "#1B1F3B",
                  background: "#C8FF3A",
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
                fontFamily: "'Syne', system-ui, sans-serif",
                fontSize: 12,
                color: "#FF7043",
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
          background: "#1B1F3B",
          borderTop: "1px solid rgba(200,255,58,0.15)",
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
            <p style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: 13, fontWeight: 600, color: "#C8FF3A", margin: 0 }}>
              You&rsquo;re all set! &#10003;
            </p>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" as const, justifyContent: "center" }}>
              <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, color: "#C8FF3A", fontWeight: 600, margin: 0, whiteSpace: "nowrap" as const }}>&#10003; 20% locked! Add phone for 30%:</p>
              <form onSubmit={async (e) => {
                e.preventDefault();
                if (!stickyPhone.trim()) return;
                try { await fetch("/api/waitlist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: stickyEmail, phone: stickyPhone }) }); } catch {}
                window.gtag?.("event", "sign_up", { method: "waitlist_phone", event_label: "blog_sticky_bar_phone" });
                setStickyPhoneDone(true);
              }} style={{ display: "flex", gap: 0 }}>
                <input type="tel" placeholder="(555) 123-4567" value={stickyPhone} onChange={(e) => setStickyPhone(e.target.value)} required style={{ padding: "8px 12px", fontSize: 12, fontFamily: "'Syne', sans-serif", border: "none", background: "rgba(253,244,238,0.15)", color: "#FDF4EE", outline: "none", width: 130 }} />
                <button type="submit" style={{ padding: "8px 14px", background: "#C8FF3A", color: "#1B1F3B", border: "none", fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase" as const, cursor: "pointer" }}>Add</button>
              </form>
              <button onClick={() => setStickyPhoneDone(true)} style={{ background: "none", border: "none", color: "rgba(253,244,238,0.35)", fontSize: 10, cursor: "pointer", textDecoration: "underline", fontFamily: "'Syne', sans-serif" }}>Skip</button>
            </div>
          )
        ) : (
          <>
            <p
              style={{
                fontFamily: "'Syne', system-ui, sans-serif",
                fontSize: 13,
                color: "#FDF4EE",
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
                  fontFamily: "'Syne', system-ui, sans-serif",
                  fontSize: 12,
                  fontWeight: 400,
                  color: "#1B1F3B",
                  background: "rgba(253,244,238,0.92)",
                  border: "none",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                disabled={stickyStatus === "loading"}
                style={{
                  padding: "8px 16px",
                  fontFamily: "'Syne', system-ui, sans-serif",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#1B1F3B",
                  background: "#C8FF3A",
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
                  fontFamily: "'Syne', system-ui, sans-serif",
                  fontSize: 11,
                  color: "#FF7043",
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
            color: "rgba(253,244,238,0.5)",
            fontSize: 20,
            lineHeight: 1,
            cursor: "pointer",
            padding: "4px 6px",
            transition: "color .2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#FDF4EE")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(253,244,238,0.5)")}
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
