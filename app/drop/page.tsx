import type { Metadata } from "next";
import Image from "next/image";
import MobileNav from "../MobileNav";
import DropAccessForm from "../lp/DropAccessForm";
import BoxBuilder from "./BoxBuilder";
import {
  DROP_001,
  DROP_002,
  X1_BOXES,
  DROP2_SOON_LINE,
  FDA_DISCLAIMER,
} from "../lib/drop-config";

export const metadata: Metadata = {
  title: "the drop — shroomé",
  description:
    "the liquid ceremonial matcha latte — vanilla or strawberry. pour it over milk; the stir is the recipe. the first run is gone. join the flock and shop the next one a day before everyone else.",
  alternates: {
    canonical: "https://www.drinkshroome.com/drop",
  },
  openGraph: {
    title: "the drop — shroomé",
    description:
      "the first run is gone. the next one is coming. shop it a day before everyone else.",
    url: "https://www.drinkshroome.com/drop",
    siteName: "shroomé",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "the drop — shroomé",
    description:
      "the first run is gone. the next one is coming. shop it a day before everyone else.",
  },
};

// ── JSON-LD: Product schema per flavor box (mirrors app/flavors/*/page.tsx) ──

const sharedOffer = {
  "@type": "Offer",
  availability: "https://schema.org/SoldOut",
  itemCondition: "https://schema.org/NewCondition",
  price: "36.00",
  priceCurrency: "USD",
  priceValidUntil: "2027-12-31",
  url: "https://www.drinkshroome.com/drop",
  seller: { "@type": "Organization", name: "ZSQUARED INC" },
  hasMerchantReturnPolicy: {
    "@type": "MerchantReturnPolicy",
    applicableCountry: "US",
    returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
    merchantReturnDays: 30,
    returnMethod: "https://schema.org/ReturnByMail",
    returnFees: "https://schema.org/FreeReturn",
  },
  shippingDetails: {
    "@type": "OfferShippingDetails",
    shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "USD" },
    shippingDestination: { "@type": "DefinedRegion", addressCountry: "US" },
    deliveryTime: {
      "@type": "ShippingDeliveryTime",
      handlingTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 3, unitCode: "DAY" },
      transitTime: { "@type": "QuantitativeValue", minValue: 3, maxValue: 7, unitCode: "DAY" },
    },
  },
};

const vanillaSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "shroomé Vanilla Matcha Latte Concentrate — 12 Sachets",
  description:
    "Liquid ceremonial matcha latte concentrate, vanilla. 2.5g ceremonial matcha, 2g grass-fed collagen peptides, 200mg lion's mane extract (≥70% beta-glucans) per 1oz sachet. Box of 12. Sold in numbered, limited drops.",
  brand: { "@type": "Brand", name: "shroomé" },
  manufacturer: { "@type": "Organization", name: "ZSQUARED INC" },
  category: "Functional Beverages",
  url: "https://www.drinkshroome.com/drop",
  image: ["https://www.drinkshroome.com/sachet-vanilla.png"],
  sku: "SHR-VAN-12",
  gtin12: "860015741318",
  offers: sharedOffer,
};

const strawberrySchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "shroomé Strawberry Matcha Latte Concentrate — 12 Sachets",
  description:
    "Liquid ceremonial matcha latte concentrate, strawberry. 2.5g ceremonial matcha, 2g grass-fed collagen peptides, 200mg lion's mane extract (≥70% beta-glucans) per 1oz sachet. Box of 12. Sold in numbered, limited drops.",
  brand: { "@type": "Brand", name: "shroomé" },
  manufacturer: { "@type": "Organization", name: "ZSQUARED INC" },
  category: "Functional Beverages",
  url: "https://www.drinkshroome.com/drop",
  image: ["https://www.drinkshroome.com/sachet-strawberry.png"],
  sku: "SHR-STR-12",
  gtin12: "860015741332",
  offers: sharedOffer,
};

export default function DropPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vanillaSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(strawberrySchema) }}
      />

      <style>{`
        .dr-nav{position:sticky;top:0;z-index:200;display:flex;align-items:center;justify-content:space-between;padding:0 5%;height:60px;background:rgba(var(--brand-canvas-rgb),0.88);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid rgba(var(--brand-ink-rgb),0.06)}
        .dr-nav-logo{display:flex;align-items:center;gap:8px;text-decoration:none;color:var(--brand-ink)}
        .dr-nav-logo span{display:none}
        .dr-nav-links{display:flex;gap:8px}
        @media(max-width:768px){.dr-nav-links{display:none !important}.dr-nav-cta{display:none !important}}
        .dr-nav-links a{font-family:var(--brand-font-body);font-size:11.5px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--brand-ink);opacity:.7;text-decoration:none;padding:6px 10px;transition:opacity .2s}
        .dr-nav-links a:hover{opacity:1}
        .dr-nav-cta{font-family:var(--brand-font-body);font-size:11px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;background:var(--brand-accent);color:var(--brand-canvas);border:2px solid var(--brand-ink);padding:10px 22px;border-radius:999px;text-decoration:none;transition:transform .15s}
        .dr-nav-cta:hover{transform:scale(1.03)}

        .dr-h1{font-family:var(--brand-font-display);letter-spacing:-0.02em;font-weight:800;font-size:clamp(2.4rem,6vw,4rem);line-height:1.05;margin:0 0 18px;color:var(--brand-canvas)}
        .dr-h2{font-family:var(--brand-font-display);letter-spacing:-0.02em;font-weight:800;font-size:clamp(1.7rem,4vw,2.5rem);line-height:1.15;margin:0;color:var(--brand-ink)}
        .dr-eyebrow{font-family:var(--brand-font-mono);font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;margin:0 0 18px}

        .dr-ledger{max-width:720px;margin:0 auto;display:flex;flex-direction:column;gap:12px}
        .dr-ledger-row{display:flex;align-items:center;justify-content:space-between;gap:12px;background:var(--brand-ink);color:var(--brand-canvas);padding:18px 22px;flex-wrap:wrap}
        .dr-ledger-num{font-family:var(--brand-font-body);font-weight:700;font-size:0.85rem;letter-spacing:.12em;text-transform:uppercase;display:inline-flex;align-items:center;gap:10px}
        .dr-ledger-detail{font-family:var(--brand-font-mono);font-size:0.78rem;color:rgba(var(--brand-canvas-rgb),0.75)}
        .dr-ledger-stamp{font-family:var(--brand-font-body);font-weight:800;font-size:0.62rem;letter-spacing:.12em;text-transform:uppercase;color:var(--brand-ink);background:var(--brand-tint-soft);padding:4px 10px;transform:rotate(-2deg)}

        .dr-footer{background:var(--brand-flavor-functional);padding:40px 5%;text-align:center}
        .dr-footer a{font-family:var(--brand-font-body);font-size:11px;color:var(--brand-ink);opacity:.5;text-decoration:none;margin:0 8px}
        .dr-footer a:hover{opacity:1}
      `}</style>

      {/* ── NAV ── */}
      <nav className="dr-nav" aria-label="Main navigation">
        <a href="/" className="dr-nav-logo">
          <Image src="/brand/symbol-sheep-solid.png" alt="mé the shroomé sheep" width={32} height={32} priority />
          <Image src="/brand/wordmark.png" alt="shroomé" width={110} height={24} priority style={{ width: 110, height: "auto" }} />
        </a>
        <div className="dr-nav-links">
          <a href="/#why">Why shroomé</a>
          <a href="/#ingredients">Ingredients</a>
          <a href="/faq">FAQ</a>
          <a href="/founders">First Pour</a>
        </div>
        <a className="dr-nav-cta" href="#join">Join the Flock &rarr;</a>
        <MobileNav
          prefix="dr"
          links={[
            { label: "Why shroomé", href: "/#why" },
            { label: "Ingredients", href: "/#ingredients" },
            { label: "FAQ", href: "/faq" },
            { label: "First Pour", href: "/founders" },
            { label: "Join the Flock", href: "#join" },
          ]}
        />
      </nav>

      {/* ── HERO ── */}
      <section style={{ background: "var(--brand-ink)", padding: "88px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        {/* the vault shot — drop 001's boxes, stacked like the archive they are */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url(/brand/box-stack.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center 60%",
            opacity: 0.28,
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(45,52,26,0.55) 0%, rgba(45,52,26,0.2) 45%, rgba(45,52,26,0.75) 100%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", maxWidth: 760, margin: "0 auto" }}>
          <p className="dr-eyebrow" style={{ color: "var(--brand-accent)" }}>when it&apos;s gone, it&apos;s gone</p>
          <h1 className="dr-h1">
            the first run poured out in {DROP_001.soldOutInDays} days.
          </h1>
          <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.95rem", color: "rgba(var(--brand-canvas-rgb),0.7)", lineHeight: 1.7, maxWidth: 520, margin: "0 auto 32px" }}>
            your cafe order, sachet form. we keep making it, and you keep buying it
            faster than we can pour. the first run went in 9 days. the next one is
            coming: same pour, same swirl, ready the second you stir. members shop it
            a full day before the link goes public.
          </p>
          <a
            href="#join"
            style={{
              display: "inline-block",
              background: "var(--brand-accent)",
              color: "var(--brand-canvas)",
              fontFamily: "var(--brand-font-body)",
              fontWeight: 800,
              fontSize: "0.78rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "16px 36px",
              textDecoration: "none",
            }}
          >
            join the flock →
          </a>
          <p style={{ fontFamily: "var(--brand-font-mono)", fontSize: "0.68rem", color: "rgba(var(--brand-canvas-rgb),0.45)", marginTop: 14 }}>
            {DROP_002.openDate ? "next run: date confirmed" : DROP2_SOON_LINE}
          </p>
        </div>
      </section>

      {/* ── BOX BUILDER ── */}
      <section style={{ background: "var(--brand-tint-soft)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto 36px", textAlign: "center" }}>
          <h2 className="dr-h2">build your box.</h2>
          <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.88rem", color: "rgba(var(--brand-ink-rgb),0.65)", marginTop: 10 }}>
            dream it up now, save it, pour it when the next production goes live. the first run didn&apos;t leave a single box behind.
          </p>
        </div>
        <BoxBuilder />
      </section>

      {/* ── SUBSCRIBERS SKIP THE LINE ── */}
      <section style={{ background: "var(--brand-tint-soft)", padding: "72px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <h2 className="dr-h2">subscribers never miss a drop.</h2>
          <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.92rem", color: "rgba(var(--brand-ink-rgb),0.7)", marginTop: 14, lineHeight: 1.7 }}>
            subscribers don&apos;t set alarms. your box is already yours before the drop
            even opens. it just shows up, with a members-only gift tucked inside. skip,
            pause, or swap flavors whenever. the only thing you have to do is pour.
          </p>
          <p style={{ fontFamily: "var(--brand-font-mono)", fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--brand-canvas)", background: "var(--brand-accent)", display: "inline-block", padding: "8px 18px", borderRadius: 999, border: "2px solid var(--brand-ink)", marginTop: 20 }}>
            opens with the next run
          </p>
          <Image
            src="/brand/shipper-box.jpg"
            alt="The shroomé kraft shipping box — Pour. Swirl. Go."
            width={1600}
            height={900}
            loading="lazy"
            style={{ width: "100%", maxWidth: 640, height: "auto", borderRadius: 24, border: "3px solid var(--brand-ink)", margin: "36px auto 0", display: "block", boxShadow: "0 18px 40px rgba(45,52,26,0.2)" }}
          />
          <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.78rem", color: "rgba(var(--brand-ink-rgb),0.6)", marginTop: 14 }}>
            cafe energy, delivered to your home address.
          </p>
        </div>
      </section>

      {/* ── DROP LEDGER ── */}
      <section style={{ background: "var(--brand-canvas)", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h2 className="dr-h2">the ledger.</h2>
        </div>
        <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.85rem", color: "rgba(var(--brand-ink-rgb),0.6)", textAlign: "center", margin: "-18px 0 28px" }}>
          we keep making it. you keep pouring it out.
        </p>
        <div className="dr-ledger">
          <div className="dr-ledger-row">
            <span className="dr-ledger-num">first run</span>
            <span className="dr-ledger-detail"><s>{X1_BOXES} boxes</s> · gone in 9 days</span>
            <span className="dr-ledger-stamp">poured out</span>
          </div>
          <div className="dr-ledger-row" style={{ position: "relative" }}>
            <span className="dr-ledger-num">next run</span>
            <span className="dr-ledger-detail">
              {DROP_002.boxes ? `${DROP_002.boxes.toLocaleString("en-US")} boxes` : "size still secret"}
            </span>
            <span className="dr-ledger-detail">the flock hears first</span>
            <Image
              src="/brand/me-05.png"
              alt=""
              aria-hidden
              width={72}
              height={64}
              loading="lazy"
              style={{ position: "absolute", right: 18, top: -30, width: 60, height: "auto" }}
            />
          </div>
        </div>
        <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.8rem", color: "rgba(var(--brand-ink-rgb),0.6)", textAlign: "center", maxWidth: 520, margin: "24px auto 0", lineHeight: 1.6 }}>
          no fake timers, no phantom &quot;only 3 left.&quot; when a run pours out it&apos;s
          gone until the next production. no games, no pressure. we keep making it, and
          the flock always pours first.
        </p>
      </section>

      {/* ── WAITLIST ── */}
      <section id="join" style={{ background: "var(--brand-ink)", padding: "88px 24px", position: "relative", overflow: "hidden" }}>
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url(/brand/pattern-ripple.svg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.16,
            pointerEvents: "none",
          }}
        />
        <Image
          src="/sachets-both.png"
          alt=""
          aria-hidden
          width={300}
          height={314}
          loading="lazy"
          style={{ position: "absolute", right: "4%", bottom: -30, width: "clamp(150px, 16vw, 230px)", height: "auto", transform: "rotate(6deg)", filter: "drop-shadow(0 18px 34px rgba(0,0,0,0.4))", pointerEvents: "none" }}
        />
        <Image
          src="/brand/sheep-drink.png"
          alt=""
          aria-hidden
          width={110}
          height={130}
          loading="lazy"
          style={{ position: "absolute", left: "5%", bottom: 26, width: "clamp(64px, 7vw, 96px)", height: "auto", transform: "rotate(-6deg)", filter: "invert(1) brightness(1.9)", opacity: 0.9, pointerEvents: "none" }}
        />
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <h2 className="dr-h2" style={{ color: "var(--brand-canvas)", marginBottom: 16 }}>join the flock.</h2>
          <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.9rem", color: "rgba(var(--brand-canvas-rgb),0.7)", lineHeight: 1.7, margin: "0 auto 32px", maxWidth: 500 }}>
            a full day before the public link exists, you&apos;ll already have the cart
            open. members vote on new flavors, get member-only merch, and free gifts
            with every subscription. the first run went in 9 days. this one won&apos;t
            wait either.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <DropAccessForm source="drop" dark buttonLabel="join the flock" microcopy="one text per drop. no spam, ever." />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="dr-footer">
        <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "12px", color: "rgba(var(--brand-ink-rgb),0.65)", maxWidth: 620, margin: "0 auto 20px", lineHeight: 1.6 }}>
          {FDA_DISCLAIMER}
        </p>
        <div style={{ marginBottom: 12 }}>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="mailto:hello@drinkshroome.com">hello@drinkshroome.com</a>
        </div>
        <p style={{ fontFamily: "var(--brand-font-mono)", fontSize: "10px", color: "rgba(var(--brand-ink-rgb),0.4)", margin: 0 }}>
          © 2026 shroomé · ZSQUARED INC
        </p>
      </footer>
    </>
  );
}
