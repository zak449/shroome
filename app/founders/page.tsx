import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "First Pour — closed | shroomé",
  description:
    "The First Pour — the founding 500 boxes of shroomé — is gone. Drop 002 is next. The list gets the link before it's public.",
  alternates: { canonical: "https://www.drinkshroome.com/founders" },
  robots: { index: false },
};

export default function FoundersPage() {
  return (
    <>
      <style>{`
        .fp-page{min-height:100vh;background:var(--brand-tint-soft);display:flex;flex-direction:column}
        .fp-nav{display:flex;align-items:center;justify-content:space-between;padding:16px 5%;background:rgba(var(--brand-canvas-rgb),0.88);backdrop-filter:blur(16px);border-bottom:1px solid rgba(var(--brand-ink-rgb),0.1)}
        .fp-main{flex:1;display:flex;align-items:center;justify-content:center;padding:64px 24px;position:relative;overflow:hidden}
        .fp-card{position:relative;z-index:1;max-width:560px;text-align:center}
        .fp-eyebrow{font-family:var(--brand-font-mono);font-weight:700;font-size:0.66rem;letter-spacing:0.16em;text-transform:uppercase;color:var(--brand-ink);margin-bottom:18px}
        .fp-h1{font-family:var(--brand-font-display);font-weight:800;letter-spacing:-0.02em;font-size:clamp(2.4rem,6vw,3.6rem);line-height:1.03;color:var(--brand-ink);margin:0 0 18px}
        .fp-sub{font-family:var(--brand-font-body);font-size:1rem;line-height:1.7;color:rgba(var(--brand-ink-rgb),0.75);margin:0 auto 30px;max-width:460px}
        .fp-plaque{position:relative;background:var(--brand-canvas);border:3px solid var(--brand-ink);border-radius:20px;max-width:440px;margin:0 auto 34px;padding:26px 24px 0;transform:rotate(-1deg);box-shadow:0 14px 34px rgba(45,52,26,0.16);overflow:hidden}
        .fp-plaque p{font-family:var(--brand-font-mono);font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:var(--brand-ink);margin:0}
        .fp-plaque .l1{font-size:0.72rem;padding-bottom:12px}
        .fp-plaque .l2{font-size:0.66rem;border-top:1px solid rgba(var(--brand-ink-rgb),0.2);padding:12px 0}
        .fp-plaque .l3{font-size:0.62rem;background:var(--brand-tint-soft);margin:0 -24px;padding:12px 24px}
        .fp-cta{display:inline-block;background:var(--brand-accent);border:2px solid var(--brand-ink);border-radius:999px;padding:16px 32px;font-family:var(--brand-font-body);font-weight:800;font-size:0.78rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--brand-canvas);text-decoration:none}
        .fp-secondary{display:block;margin-top:16px;font-family:var(--brand-font-body);font-size:0.75rem;color:rgba(var(--brand-ink-rgb),0.6);text-decoration:underline}
        .fp-flower{position:absolute;pointer-events:none}
      `}</style>

      <div className="fp-page">
        <nav className="fp-nav" aria-label="Main navigation">
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <Image src="/brand/symbol-sheep-solid.png" width={32} height={35} alt="mé the shroomé sheep" priority style={{ height: 32, width: "auto" }} />
            <Image src="/brand/wordmark.png" width={118} height={25} alt="shroomé" priority style={{ height: 24, width: "auto" }} />
          </a>
          <a href="/drop" style={{ fontFamily: "var(--brand-font-body)", fontWeight: 800, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--brand-canvas)", textDecoration: "none", background: "var(--brand-accent)", border: "2px solid var(--brand-ink)", borderRadius: 999, padding: "10px 20px" }}>
            The Drop →
          </a>
        </nav>

        <main className="fp-main">
          <img src="/brand/pattern-flower-brand.svg" alt="" aria-hidden className="fp-flower" style={{ top: "-12%", left: "-8%", width: "26vw", minWidth: 220, opacity: 0.7 }} />
          <img src="/brand/pattern-flower-vanilla.svg" alt="" aria-hidden className="fp-flower" style={{ bottom: "-14%", right: "-6%", width: "20vw", minWidth: 180, opacity: 0.55 }} />

          <div className="fp-card">
            <Image src="/brand/symbol-sheep-solid.png" width={72} height={80} alt="" aria-hidden style={{ width: 64, height: "auto", margin: "0 auto 20px", display: "block" }} />
            <p className="fp-eyebrow">The First Pour · Founding 500</p>
            <h1 className="fp-h1">Poured. Gone.<br />Part of the lore now.</h1>
            <p className="fp-sub">
              The First Pour was the founding run of shroomé — 500 boxes, first names on the
              list, gone in 9 days. If you were in it, you know. If you weren&apos;t,
              Drop 002 is your shot.
            </p>
            <div className="fp-plaque">
              <Image src="/brand/symbol-sheep-solid.png" width={40} height={44} alt="" aria-hidden style={{ width: 36, height: "auto", margin: "0 auto 12px", display: "block" }} />
              <p className="l1">The First Pour · Drop 001</p>
              <p className="l2">500/500 boxes · Poured out · 9 days</p>
              <p className="l3">If you know, you poured</p>
            </div>
            <a className="fp-cta" href="/drop#waitlist">Join the Flock — Drop 002 →</a>
            <a className="fp-secondary" href="/">Back to the mothership</a>
          </div>
        </main>
      </div>
    </>
  );
}
