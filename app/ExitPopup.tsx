"use client";
import { useState, useEffect, useRef, useCallback } from "react";

export default function ExitPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState<"email" | "captcha" | "phone" | "done">("email");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [dismissed, setDismissed] = useState(false);
  const captchaRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      if (
        e.clientY <= 5 &&
        !dismissed &&
        !show &&
        !sessionStorage.getItem("shroome_exit_popup_dismissed") &&
        !sessionStorage.getItem("shroome_exit_popup_converted")
      ) {
        setShow(true);
      }
    },
    [dismissed, show]
  );

  useEffect(() => {
    // Ghost landing pages (/lp/*) run their own single-CTA flow — no popup there
    if (window.location.pathname.startsWith("/lp")) {
      setDismissed(true);
      return;
    }
    // Don't show if already signed up or dismissed this session
    if (
      sessionStorage.getItem("shroome_exit_popup_dismissed") ||
      sessionStorage.getItem("shroome_exit_popup_converted")
    ) {
      setDismissed(true);
      return;
    }

    // Wait 5 seconds before enabling exit intent
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseLeave]);

  const dismiss = () => {
    setShow(false);
    setDismissed(true);
    sessionStorage.setItem("shroome_exit_popup_dismissed", "1");
    document.removeEventListener("mouseleave", handleMouseLeave);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading" || step === "captcha") return;
    setStatus("idle");
    setStep("captcha");
  };

  const onTurnstileSuccess = useCallback(async (token: string) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, turnstileToken: token }),
      });
      if (res.ok) {
        setStep("phone");
        setStatus("idle");
        sessionStorage.setItem("shroome_exit_popup_converted", "1");
        window.gtag?.("event", "sign_up", {
          method: "waitlist",
          event_category: "engagement",
          event_label: "exit_popup",
        });
        window.gtag?.("event", "generate_lead", {
          currency: "USD",
          value: 5.0,
        });
        document.removeEventListener("mouseleave", handleMouseLeave);
      } else {
        setStatus("error");
        setStep("email");
      }
    } catch {
      setStatus("error");
      setStep("email");
    }
  }, [email, handleMouseLeave]);

  // Load the Turnstile script and render the widget when the captcha step is
  // active (the API rejects token-less signups when Turnstile is configured).
  // Same pattern as app/refer/page.tsx — falls back to Cloudflare's always-pass
  // test sitekey when NEXT_PUBLIC_TURNSTILE_SITE_KEY is unset (dev).
  useEffect(() => {
    if (step !== "captcha") return;
    const renderWidget = () => {
      if (!captchaRef.current || !window.turnstile) return;
      if (widgetIdRef.current) {
        try { window.turnstile.remove(widgetIdRef.current); } catch {}
      }
      widgetIdRef.current = window.turnstile.render(captchaRef.current, {
        sitekey: (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY.startsWith("REPLACE")) ? process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY : "1x00000000000000000000AA",
        callback: onTurnstileSuccess,
        // Never submit an empty token (the API fails closed) — return to the
        // email step; resubmitting renders a fresh widget with a fresh token.
        "error-callback": () => {
          setStatus("error");
          setStep("email");
        },
        theme: "light",
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
  }, [step, onTurnstileSuccess]);

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim() || status === "loading") return;
    setStatus("loading");
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone }),
      });
      window.gtag?.("event", "sign_up", {
        method: "waitlist_phone",
        event_category: "engagement",
        event_label: "exit_popup_phone",
      });
    } catch {}
    setStatus("idle");
    setStep("done");
  };

  const skipPhone = () => {
    setStep("done");
  };

  if (!show) return null;

  return (
    <>
      <style>{`
        .ep-overlay {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(var(--brand-ink-rgb), 0.6);
          backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
          animation: epFadeIn 0.3s ease;
        }
        .ep-card {
          background: var(--brand-canvas);
          max-width: 440px; width: 100%;
          border-radius: 20px;
          padding: 48px 36px 40px;
          position: relative;
          text-align: center;
          animation: epSlideUp 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          box-shadow: 0 24px 80px rgba(var(--brand-ink-rgb), 0.25);
        }
        .ep-close {
          position: absolute; top: 16px; right: 16px;
          background: none; border: none; cursor: pointer;
          font-size: 20px; color: rgba(var(--brand-ink-rgb), 0.3);
          width: 36px; height: 36px; display: flex;
          align-items: center; justify-content: center;
          border-radius: 50%; transition: all 0.2s;
        }
        .ep-close:hover { background: rgba(var(--brand-ink-rgb), 0.06); color: var(--brand-ink); }
        .ep-emoji { font-size: 40px; margin-bottom: 16px; }
        .ep-title {
          font-family: var(--brand-font-display);
          font-size: 30px; font-weight: 800; letter-spacing: -0.02em;
          color: var(--brand-ink); margin: 0 0 8px; line-height: 1.1;
        }
        .ep-title em { color: var(--brand-accent-deep); font-style: normal; }
        .ep-sub {
          font-family: var(--brand-font-body);
          font-size: 14px; color: rgba(var(--brand-ink-rgb), 0.6);
          line-height: 1.6; margin: 0 0 24px; font-weight: 400;
        }
        .ep-form { display: flex; gap: 8px; }
        .ep-input {
          flex: 1; padding: 14px 16px;
          border: 1px solid rgba(var(--brand-ink-rgb), 0.12);
          border-radius: 10px; font-size: 14px;
          font-family: var(--brand-font-body);
          background: #fff; color: var(--brand-ink);
          outline: none; transition: border-color 0.2s;
        }
        .ep-input:focus { border-color: var(--brand-accent); }
        .ep-input::placeholder { color: rgba(var(--brand-ink-rgb), 0.35); }
        .ep-btn {
          padding: 14px 24px; background: var(--brand-ink); color: var(--brand-canvas);
          border: none; border-radius: 10px; font-size: 13px;
          font-family: var(--brand-font-body);
          font-weight: 700; letter-spacing: 0.04em;
          text-transform: uppercase; cursor: pointer;
          white-space: nowrap; transition: all 0.2s;
        }
        .ep-btn:hover { background: #3c452a; transform: translateY(-1px); }
        .ep-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
        .ep-perks {
          display: flex; justify-content: center; gap: 20px;
          margin-top: 20px;
        }
        .ep-perk {
          font-family: var(--brand-font-mono);
          font-size: 10px; letter-spacing: 0.08em;
          text-transform: uppercase; color: rgba(var(--brand-ink-rgb), 0.45);
        }
        .ep-success-title {
          font-family: var(--brand-font-display);
          font-size: 26px; font-weight: 800; letter-spacing: -0.02em;
          color: var(--brand-accent-deep); margin: 0 0 8px;
        }
        .ep-success-sub {
          font-family: var(--brand-font-body);
          font-size: 14px; color: rgba(var(--brand-ink-rgb), 0.6);
          line-height: 1.6; margin: 0 0 20px;
        }
        .ep-success-btn {
          padding: 12px 28px; background: var(--brand-accent); color: var(--brand-canvas);
          border: none; border-radius: 10px; font-size: 12px;
          font-family: var(--brand-font-body);
          font-weight: 700; letter-spacing: 0.06em;
          text-transform: uppercase; cursor: pointer;
          transition: all 0.2s;
        }
        .ep-success-btn:hover { background: var(--brand-accent-muted-deep); }
        .ep-no-thanks {
          display: block; margin-top: 16px;
          font-family: var(--brand-font-body);
          font-size: 12px; color: rgba(var(--brand-ink-rgb), 0.35);
          background: none; border: none; cursor: pointer;
          text-decoration: underline; transition: color 0.2s;
        }
        .ep-no-thanks:hover { color: rgba(var(--brand-ink-rgb), 0.6); }
        @keyframes epFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes epSlideUp { from { opacity: 0; transform: translateY(20px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @media (max-width: 500px) {
          .ep-card { padding: 36px 24px 32px; border-radius: 16px; }
          .ep-title { font-size: 26px; }
          .ep-form { flex-direction: column; }
          .ep-btn { width: 100%; }
          .ep-perks { gap: 12px; }
        }
      `}</style>

      <div className="ep-overlay" onClick={dismiss}>
        <div className="ep-card" onClick={(e) => e.stopPropagation()}>
          <button className="ep-close" onClick={dismiss} aria-label="Close">
            &times;
          </button>

          {step === "email" ? (
            <>
              <img src="/brand/symbol-sheep-solid.png" alt="" aria-hidden style={{ width: 48, height: "auto", margin: "0 auto 14px", display: "block" }} />
              <h2 className="ep-title">
                leaving before you&apos;re <em>on the list?</em>
              </h2>
              <p className="ep-sub">
                Drop 001 — 500 boxes — sold out in 9 days. The Drop 002 list gets the link
                before it&apos;s public. After that, it&apos;s gone again.
              </p>
              <form className="ep-form" onSubmit={handleEmailSubmit}>
                <input
                  className="ep-input"
                  type="email"
                  placeholder="your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
                <button className="ep-btn" type="submit" disabled={status === "loading"}>
                  {status === "loading" ? "..." : "Get first access"}
                </button>
              </form>
              {status === "error" && (
                <p style={{ color: "var(--brand-accent-warm)", fontSize: 12, marginTop: 8, fontFamily: "var(--brand-font-body)" }}>
                  Something went wrong. Try again.
                </p>
              )}
              <div className="ep-perks">
                <span className="ep-perk">First access</span>
                <span className="ep-perk">Drop-day text</span>
                <span className="ep-perk">No spam</span>
              </div>
              <button className="ep-no-thanks" onClick={dismiss}>
                No thanks, I&apos;ll miss the drop
              </button>
            </>
          ) : step === "captcha" ? (
            <>
              <img src="/brand/symbol-sheep-solid.png" alt="" aria-hidden style={{ width: 48, height: "auto", margin: "0 auto 14px", display: "block" }} />
              <h2 className="ep-title">one quick check&hellip;</h2>
              <p className="ep-sub">Confirm you&apos;re human and your place in line is locked.</p>
              <div ref={captchaRef} style={{ display: "flex", justifyContent: "center", minHeight: 65 }} />
              {status === "loading" && (
                <p style={{ fontSize: 12, marginTop: 8, fontFamily: "var(--brand-font-body)", color: "rgba(var(--brand-ink-rgb),0.5)" }}>
                  Submitting...
                </p>
              )}
            </>
          ) : step === "phone" ? (
            <>
              <div className="ep-emoji">📱</div>
              <h2 className="ep-success-title">you&apos;re in line!</h2>
              <p className="ep-sub">
                Drop texts go out <strong style={{ color: "var(--brand-ink)", fontWeight: 700 }}>10 minutes before the email</strong>. Add your number and shop Drop 002 before the link is public.
              </p>
              <form className="ep-form" onSubmit={handlePhoneSubmit}>
                <input
                  className="ep-input"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  autoFocus
                />
                <button className="ep-btn" type="submit" disabled={status === "loading"}>
                  {status === "loading" ? "..." : "Text me first"}
                </button>
              </form>
              <div className="ep-perks">
                <span className="ep-perk">10 min early</span>
                <span className="ep-perk">Drop-day text</span>
                <span className="ep-perk">First in line</span>
              </div>
              <button className="ep-no-thanks" onClick={skipPhone}>
                No thanks, I&apos;ll refresh the page like everyone else
              </button>
            </>
          ) : (
            <>
              <div className="ep-emoji">💚</div>
              <h2 className="ep-success-title">you&apos;re all set!</h2>
              <p className="ep-success-sub">
                Watch your inbox for the Drop 002 link.{phone ? " The text lands 10 minutes before it." : ""} You&apos;re ahead of the line.
              </p>
              <button className="ep-success-btn" onClick={dismiss}>
                Back to browsing
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
