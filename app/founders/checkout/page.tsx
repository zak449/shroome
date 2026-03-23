"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function FoundersCheckout() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref") ?? undefined;
  const email = searchParams.get("email") ?? undefined;
  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    async function redirect() {
      try {
        const res = await fetch("/api/founders-checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ref, email }),
        });
        const data = await res.json();
        if (data.url) {
          window.gtag?.("event", "begin_checkout", {
            event_category: "ecommerce",
            event_label: "founders_batch",
          });
          window.location.href = data.url;
        } else {
          window.location.href = "/founders?checkout_error=1";
        }
      } catch {
        window.location.href = "/founders?checkout_error=1";
      }
    }

    redirect();
  }, [ref, email]);

  return (
    <>
      <style>{`
        .fc-wrap{min-height:100vh;background:#FDF4EE;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px;padding:40px 24px;text-align:center}
        .fc-logo{display:flex;align-items:center;gap:10px;text-decoration:none;color:#1B1F3B}
        .fc-logo span{font-family:'Instrument Serif',Georgia,serif;font-size:28px;font-weight:400;font-style:italic}
        .fc-spinner{width:36px;height:36px;border:3px solid rgba(27,31,59,0.1);border-top-color:#1B1F3B;border-radius:50%;animation:spin .8s linear infinite}
        @keyframes spin{to{transform:rotate(360deg)}}
        .fc-heading{font-family:'Instrument Serif',Georgia,serif;font-size:28px;font-weight:400;font-style:italic;color:#1B1F3B;margin:0}
        .fc-sub{font-family:'Syne',system-ui,sans-serif;font-size:13px;color:#1B1F3B;opacity:.5;margin:0}
      `}</style>
      <div className="fc-wrap">
        <a href="/" className="fc-logo">
          <Image src="/logo-mark.png" alt="shroomé" width={36} height={36} />
          <span>shroomé</span>
        </a>
        <div className="fc-spinner" />
        <h1 className="fc-heading">Locking your number…</h1>
        <p className="fc-sub">Taking you to secure checkout. One moment.</p>
      </div>
    </>
  );
}
