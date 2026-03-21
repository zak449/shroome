"use client";
import { useState, useEffect, useCallback } from "react";

export default function ExitPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [dismissed, setDismissed] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, turnstileToken: "exit-popup-bypass" }),
      });
      if (res.ok) {
        setStatus("success");
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
      }
    } catch {
      setStatus("error");
    }
  };

  if (!show) return null;

  return (
    <>
      <style>{`
        .ep-overlay {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(27, 31, 59, 0.6);
          backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
          animation: epFadeIn 0.3s ease;
        }
        .ep-card {
          background: #FDF4EE;
          max-width: 440px; width: 100%;
          border-radius: 20px;
          padding: 48px 36px 40px;
          position: relative;
          text-align: center;
          animation: epSlideUp 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          box-shadow: 0 24px 80px rgba(27, 31, 59, 0.25);
        }
        .ep-close {
          position: absolute; top: 16px; right: 16px;
          background: none; border: none; cursor: pointer;
          font-size: 20px; color: rgba(27, 31, 59, 0.3);
          width: 36px; height: 36px; display: flex;
          align-items: center; justify-content: center;
          border-radius: 50%; transition: all 0.2s;
        }
        .ep-close:hover { background: rgba(27, 31, 59, 0.06); color: #1B1F3B; }
        .ep-emoji { font-size: 40px; margin-bottom: 16px; }
        .ep-title {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: 32px; font-weight: 400; font-style: italic;
          color: #1B1F3B; margin: 0 0 8px; line-height: 1.1;
        }
        .ep-title em { color: #FF7043; font-style: italic; }
        .ep-sub {
          font-family: 'Syne', system-ui, sans-serif;
          font-size: 14px; color: rgba(27, 31, 59, 0.6);
          line-height: 1.6; margin: 0 0 24px; font-weight: 400;
        }
        .ep-form { display: flex; gap: 8px; }
        .ep-input {
          flex: 1; padding: 14px 16px;
          border: 1px solid rgba(27, 31, 59, 0.12);
          border-radius: 10px; font-size: 14px;
          font-family: 'Syne', system-ui, sans-serif;
          background: #fff; color: #1B1F3B;
          outline: none; transition: border-color 0.2s;
        }
        .ep-input:focus { border-color: #C8FF3A; }
        .ep-input::placeholder { color: rgba(27, 31, 59, 0.35); }
        .ep-btn {
          padding: 14px 24px; background: #1B1F3B; color: #FDF4EE;
          border: none; border-radius: 10px; font-size: 13px;
          font-family: 'Syne', system-ui, sans-serif;
          font-weight: 700; letter-spacing: 0.04em;
          text-transform: uppercase; cursor: pointer;
          white-space: nowrap; transition: all 0.2s;
        }
        .ep-btn:hover { background: #2a2e4f; transform: translateY(-1px); }
        .ep-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
        .ep-perks {
          display: flex; justify-content: center; gap: 20px;
          margin-top: 20px;
        }
        .ep-perk {
          font-family: 'DM Mono', monospace;
          font-size: 10px; letter-spacing: 0.08em;
          text-transform: uppercase; color: rgba(27, 31, 59, 0.45);
        }
        .ep-success-title {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: 28px; font-weight: 400; font-style: italic;
          color: #2D4A2D; margin: 0 0 8px;
        }
        .ep-success-sub {
          font-family: 'Syne', system-ui, sans-serif;
          font-size: 14px; color: rgba(27, 31, 59, 0.6);
          line-height: 1.6; margin: 0 0 20px;
        }
        .ep-success-btn {
          padding: 12px 28px; background: #C8FF3A; color: #1B1F3B;
          border: none; border-radius: 10px; font-size: 12px;
          font-family: 'Syne', system-ui, sans-serif;
          font-weight: 700; letter-spacing: 0.06em;
          text-transform: uppercase; cursor: pointer;
          transition: all 0.2s;
        }
        .ep-success-btn:hover { background: #d4ff5a; }
        .ep-no-thanks {
          display: block; margin-top: 16px;
          font-family: 'Syne', system-ui, sans-serif;
          font-size: 12px; color: rgba(27, 31, 59, 0.35);
          background: none; border: none; cursor: pointer;
          text-decoration: underline; transition: color 0.2s;
        }
        .ep-no-thanks:hover { color: rgba(27, 31, 59, 0.6); }
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

          {status !== "success" ? (
            <>
              <div className="ep-emoji">🍵</div>
              <h2 className="ep-title">
                wait — don&apos;t miss <em>this.</em>
              </h2>
              <p className="ep-sub">
                Get <strong style={{ color: "#1B1F3B", fontWeight: 700 }}>20% off + free shipping</strong> on the
                world&apos;s first ready-to-pour ceremonial matcha latte. Only for early access members.
              </p>
              <form className="ep-form" onSubmit={handleSubmit}>
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
                  {status === "loading" ? "..." : "Claim it"}
                </button>
              </form>
              {status === "error" && (
                <p style={{ color: "#FF7043", fontSize: 12, marginTop: 8, fontFamily: "'Syne', sans-serif" }}>
                  Something went wrong. Try again.
                </p>
              )}
              <div className="ep-perks">
                <span className="ep-perk">20% off</span>
                <span className="ep-perk">Free shipping</span>
                <span className="ep-perk">Early access</span>
              </div>
              <button className="ep-no-thanks" onClick={dismiss}>
                No thanks, I&apos;ll pay full price
              </button>
            </>
          ) : (
            <>
              <div className="ep-emoji">💚</div>
              <h2 className="ep-success-title">you&apos;re in!</h2>
              <p className="ep-success-sub">
                Check your email for your exclusive discount code. We&apos;ll let you know the moment we launch.
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
