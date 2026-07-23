import type { Metadata } from "next";
import Image from "next/image";
import MobileNav from "../MobileNav";
import DropAccessForm from "../lp/DropAccessForm";
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
    "shroomé ships in numbered, limited drops. drop 001 — 500 boxes — sold out. drop 002 is next: vanilla, strawberry, variety, and stock-up boxes of the liquid ceremonial matcha latte. join the waitlist for first access.",
  alternates: {
    canonical: "https://www.drinkshroome.com/drop",
  },
  openGraph: {
    title: "the drop — shroomé",
    description:
      "numbered, limited drops of the liquid ceremonial matcha latte. drop 001 sold out. drop 002 is next — the waitlist gets first access.",
    url: "https://www.drinkshroome.com/drop",
    siteName: "shroomé",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "the drop — shroomé",
    description:
      "numbered, limited drops of the liquid ceremonial matcha latte. drop 001 sold out. drop 002 is next — the waitlist gets first access.",
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
    "Ready-to-pour ceremonial matcha latte concentrate, vanilla. 2.5g ceremonial matcha, 2g grass-fed collagen peptides, 200mg lion's mane extract (≥70% beta-glucans) per 1oz sachet. Box of 12. Sold in numbered, limited drops.",
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
    "Ready-to-pour ceremonial matcha latte concentrate, strawberry. 2.5g ceremonial matcha, 2g grass-fed collagen peptides, 200mg lion's mane extract (≥70% beta-glucans) per 1oz sachet. Box of 12. Sold in numbered, limited drops.",
  brand: { "@type": "Brand", name: "shroomé" },
  manufacturer: { "@type": "Organization", name: "ZSQUARED INC" },
  category: "Functional Beverages",
  url: "https://www.drinkshroome.com/drop",
  image: ["https://www.drinkshroome.com/sachet-strawberry.png"],
  sku: "SHR-STR-12",
  gtin12: "860015741332",
  offers: sharedOffer,
};

// ── Storefront data (source of truth: Product/SKU Catalog) ──

const products = [
  {
    sku: "SHR-VAN-12",
    name: "vanilla — 12 box",
    desc: "warm, floral, latte-like. 12 sachets.",
    price: "$36",
    perServing: "$3.00 / serving",
    compareAt: null,
    subFrom: "$30.60 with subscription",
    accent: "var(--brand-flavor-functional)",
    image: "/sachet-vanilla.png",
  },
  {
    sku: "SHR-STR-12",
    name: "strawberry — 12 box",
    desc: "bright, fruity, smoothie-like. 12 sachets.",
    price: "$36",
    perServing: "$3.00 / serving",
    compareAt: null,
    subFrom: "$30.60 with subscription",
    accent: "var(--brand-flavor-strawberry)",
    image: "/sachet-strawberry.png",
  },
  {
    sku: "SHR-VAR-24",
    name: "variety — 24 box",
    desc: "12 vanilla + 12 strawberry. the duo bundle.",
    price: "$66",
    perServing: "$2.75 / serving",
    compareAt: "$72",
    subFrom: "$54.12 with subscription",
    accent: "var(--brand-tint-soft)",
    image: "/sachets-both.png",
  },
  {
    sku: "SHR-VAR-48",
    name: "48 stock-up",
    desc: "24 vanilla + 24 strawberry. never run dry.",
    price: "$126",
    perServing: "$2.63 / serving",
    compareAt: "$144",
    subFrom: "$100.80 with subscription",
    accent: "var(--brand-accent)",
    image: "/sachets-both.png",
  },
  {
    sku: "SHR-TRY-6",
    name: "first-pour trial — 6",
    desc: "3 vanilla + 3 strawberry. the low-risk taste test.",
    price: "$21",
    perServing: "$3.50 / serving",
    compareAt: null,
    subFrom: null,
    accent: "var(--brand-tint-blush)",
    image: "/sachets-both.png",
  },
];

const subMatrix = {
  cadences: ["every 2 weeks", "every 30 days", "every 60 days"],
  rows: [
    {
      qty: "12 sachets",
      base: "$36",
      cells: [
        { pct: "15%", price: "$30.60", per: "$2.55/serv" },
        { pct: "12%", price: "$31.68", per: "$2.64/serv" },
        { pct: "10%", price: "$32.40", per: "$2.70/serv" },
      ],
    },
    {
      qty: "24 sachets",
      base: "$66",
      cells: [
        { pct: "18%", price: "$54.12", per: "$2.26/serv" },
        { pct: "15%", price: "$56.10", per: "$2.34/serv" },
        { pct: "12%", price: "$58.08", per: "$2.42/serv" },
      ],
    },
    {
      qty: "48 sachets",
      base: "$126",
      cells: [
        { pct: "20%", price: "$100.80", per: "$2.10/serv" },
        { pct: "20%", price: "$100.80", per: "$2.10/serv" },
        { pct: "15%", price: "$107.10", per: "$2.23/serv" },
      ],
    },
  ],
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
        .dr-nav-cta{font-family:var(--brand-font-body);font-size:11px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;background:var(--brand-accent);color:var(--brand-ink);border:2px solid var(--brand-ink);padding:10px 22px;border-radius:999px;text-decoration:none;transition:transform .15s}
        .dr-nav-cta:hover{transform:scale(1.03)}

        .dr-h1{font-family:var(--brand-font-display);letter-spacing:-0.02em;font-weight:800;font-size:clamp(2.4rem,6vw,4rem);line-height:1.05;margin:0 0 18px;color:var(--brand-canvas)}
        .dr-h2{font-family:var(--brand-font-display);letter-spacing:-0.02em;font-weight:800;font-size:clamp(1.7rem,4vw,2.5rem);line-height:1.15;margin:0;color:var(--brand-ink)}
        .dr-eyebrow{font-family:var(--brand-font-mono);font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;margin:0 0 18px}

        .dr-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:18px;max-width:1120px;margin:0 auto}
        .dr-card{background:#fff;border:2px solid var(--brand-ink);border-radius:24px;overflow:hidden;position:relative;display:flex;flex-direction:column}
        .dr-card-img{position:relative;padding:30px 20px 16px;display:flex;justify-content:center;align-items:center;min-height:230px}
        .dr-card-img img{filter:drop-shadow(0 14px 22px rgba(45,52,26,0.3))}
        .dr-soldout{position:absolute;top:16px;left:50%;transform:translateX(-50%) rotate(-6deg);background:var(--brand-ink);color:var(--brand-canvas);font-family:var(--brand-font-body);font-weight:800;font-size:0.82rem;letter-spacing:.16em;text-transform:uppercase;padding:8px 18px;z-index:2}
        .dr-card-body{padding:8px 22px 24px;display:flex;flex-direction:column;flex:1}
        .dr-card-sku{font-family:var(--brand-font-mono);font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:rgba(var(--brand-ink-rgb),0.35);margin:0 0 6px}
        .dr-card h3{font-family:var(--brand-font-display);font-weight:800;font-size:1.35rem;color:var(--brand-ink);margin:0 0 4px}
        .dr-card-desc{font-family:var(--brand-font-body);font-size:0.78rem;color:rgba(var(--brand-ink-rgb),0.55);line-height:1.5;margin:0 0 14px}
        .dr-price-row{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap;margin:0 0 2px}
        .dr-price{font-family:var(--brand-font-mono);font-size:1.4rem;font-weight:500;color:var(--brand-ink)}
        .dr-compare{font-family:var(--brand-font-mono);font-size:0.9rem;color:rgba(var(--brand-ink-rgb),0.35);text-decoration:line-through}
        .dr-per{font-family:var(--brand-font-mono);font-size:0.68rem;color:rgba(var(--brand-ink-rgb),0.5);margin:0 0 4px}
        .dr-sub-from{font-family:var(--brand-font-body);font-size:0.7rem;font-weight:600;color:var(--brand-ink);background:rgba(var(--brand-accent-rgb),0.35);display:inline-block;padding:4px 8px;margin:6px 0 14px}
        .dr-card-btn{margin-top:auto;display:block;text-align:center;background:var(--brand-ink);color:var(--brand-canvas);font-family:var(--brand-font-body);font-weight:800;font-size:0.7rem;letter-spacing:.1em;text-transform:uppercase;padding:14px 12px;border-radius:999px;text-decoration:none}

        .dr-table-wrap{max-width:900px;margin:0 auto;overflow-x:auto}
        .dr-table{width:100%;border-collapse:collapse;min-width:560px}
        .dr-table th,.dr-table td{border:1px solid rgba(var(--brand-ink-rgb),0.15);padding:14px 16px;text-align:left}
        .dr-table th{font-family:var(--brand-font-body);font-weight:700;font-size:0.7rem;letter-spacing:.1em;text-transform:uppercase;color:var(--brand-ink);background:rgba(var(--brand-flavor-functional-rgb),0.35)}
        .dr-table td{font-family:var(--brand-font-mono);font-size:0.8rem;color:var(--brand-ink);background:var(--brand-canvas)}
        .dr-cell-pct{font-weight:700;display:block}
        .dr-cell-sub{font-size:0.68rem;color:rgba(var(--brand-ink-rgb),0.5);display:block;margin-top:2px}

        .dr-ledger{max-width:720px;margin:0 auto;display:flex;flex-direction:column;gap:12px}
        .dr-ledger-row{display:flex;align-items:center;justify-content:space-between;gap:12px;background:var(--brand-ink);color:var(--brand-canvas);padding:18px 22px;flex-wrap:wrap}
        .dr-ledger-num{font-family:var(--brand-font-body);font-weight:700;font-size:0.85rem;letter-spacing:.12em;text-transform:uppercase;display:inline-flex;align-items:center;gap:10px}
        .dr-ledger-detail{font-family:var(--brand-font-mono);font-size:0.78rem;color:rgba(var(--brand-canvas-rgb),0.75)}
        .dr-ledger-stamp{font-family:var(--brand-font-body);font-weight:800;font-size:0.62rem;letter-spacing:.12em;text-transform:uppercase;color:var(--brand-ink);background:var(--brand-flavor-strawberry);padding:4px 10px;transform:rotate(-2deg)}
        .dr-dot{width:8px;height:8px;border-radius:50%;background:var(--brand-accent);display:inline-block;animation:drPulse 1.8s ease-in-out infinite}
        @keyframes drPulse{0%,100%{box-shadow:0 0 0 0 rgba(var(--brand-accent-rgb),0.6)}50%{box-shadow:0 0 0 6px rgba(var(--brand-accent-rgb),0)}}
        @media(prefers-reduced-motion:reduce){.dr-dot{animation:none}}

        .dr-footer{background:var(--brand-flavor-functional);padding:40px 5%;text-align:center}
        .dr-footer a{font-family:var(--brand-font-body);font-size:11px;color:var(--brand-ink);opacity:.5;text-decoration:none;margin:0 8px}
        .dr-footer a:hover{opacity:1}
      `}</style>

      {/* ── NAV ── */}
      <nav className="dr-nav" aria-label="Main navigation">
        <a href="/" className="dr-nav-logo">
          <Image src="/logo-mark.png" alt="mé the shroomé sheep" width={32} height={32} priority />
          <Image src="/brand/wordmark.png" alt="shroomé" width={110} height={24} priority style={{ width: 110, height: "auto" }} />
        </a>
        <div className="dr-nav-links">
          <a href="/#why">Why shroomé</a>
          <a href="/#ingredients">Ingredients</a>
          <a href="/faq">FAQ</a>
          <a href="/founders">First Pour</a>
        </div>
        <a className="dr-nav-cta" href="#waitlist">Get Drop Access &rarr;</a>
        <MobileNav
          prefix="dr"
          links={[
            { label: "Why shroomé", href: "/#why" },
            { label: "Ingredients", href: "/#ingredients" },
            { label: "FAQ", href: "/faq" },
            { label: "First Pour", href: "/founders" },
            { label: "Get Drop Access", href: "#waitlist" },
          ]}
        />
      </nav>

      {/* ── HERO ── */}
      <section style={{ background: "var(--brand-ink)", padding: "88px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: "-30%",
            background: "radial-gradient(ellipse 50% 40% at 50% 45%, rgba(var(--brand-flavor-functional-rgb),0.22) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", maxWidth: 760, margin: "0 auto" }}>
          <p className="dr-eyebrow" style={{ color: "var(--brand-accent)" }}>numbered · limited · honest</p>
          <h1 className="dr-h1">
            drop 001 — sold out in {DROP_001.soldOutInDays} days.
          </h1>
          <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.95rem", color: "rgba(var(--brand-canvas-rgb),0.7)", lineHeight: 1.7, maxWidth: 520, margin: "0 auto 32px" }}>
            shroomé ships in numbered, limited drops — real production runs, published counts.
            drop 002 is next: same sachet, same thirty-second pour. the waitlist gets the link first.
          </p>
          <a
            href="#waitlist"
            style={{
              display: "inline-block",
              background: "var(--brand-accent)",
              color: "var(--brand-ink)",
              fontFamily: "var(--brand-font-body)",
              fontWeight: 800,
              fontSize: "0.78rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "16px 36px",
              textDecoration: "none",
            }}
          >
            get drop access →
          </a>
          <p style={{ fontFamily: "var(--brand-font-mono)", fontSize: "0.68rem", color: "rgba(var(--brand-canvas-rgb),0.45)", marginTop: 14 }}>
            <span className="dr-dot" style={{ marginRight: 8, verticalAlign: "middle" }} aria-hidden="true" />
            drop 002 — {DROP_002.openDate ? "date confirmed" : DROP2_SOON_LINE}
          </p>
        </div>
      </section>

      {/* ── PRODUCT GRID ── */}
      <section style={{ background: "var(--brand-canvas)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto 36px", textAlign: "center" }}>
          <h2 className="dr-h2">the lineup.</h2>
          <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.88rem", color: "rgba(var(--brand-ink-rgb),0.6)", marginTop: 10 }}>
            every box from drop 001 is gone. drop 002 brings them back — waitlist first.
          </p>
        </div>
        <div className="dr-grid">
          {products.map((p) => (
            <div key={p.sku} className="dr-card">
              <div className="dr-card-img" style={{ background: p.accent }}>
                <span className="dr-soldout">sold out</span>
                <Image src={p.image} alt={`shroomé ${p.name} — sold out`} width={306} height={639} style={{ width: "auto", height: 200, maxWidth: "100%", objectFit: "contain" }} />
              </div>
              <div className="dr-card-body">
                <p className="dr-card-sku">{p.sku}</p>
                <h3>{p.name}</h3>
                <p className="dr-card-desc">{p.desc}</p>
                <div className="dr-price-row">
                  <span className="dr-price">{p.price}</span>
                  {p.compareAt && <span className="dr-compare">{p.compareAt}</span>}
                </div>
                <p className="dr-per">{p.perServing}</p>
                {p.subFrom ? (
                  <span className="dr-sub-from">{p.subFrom}</span>
                ) : (
                  <span style={{ height: 14, display: "block" }} />
                )}
                <a className="dr-card-btn" href="#waitlist">
                  join the waitlist for drop 002
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SUBSCRIPTION TEASER ── */}
      <section style={{ background: "var(--brand-tint-soft)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto 32px", textAlign: "center" }}>
          <h2 className="dr-h2">subscribers never miss a drop.</h2>
          <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.88rem", color: "rgba(var(--brand-ink-rgb),0.65)", marginTop: 10, maxWidth: 560, marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>
            every active subscription&apos;s boxes are reserved out of each production run before
            the public window opens — allocation reserved, 10–20% off, skip or pause anytime.
          </p>
          <p style={{ fontFamily: "var(--brand-font-mono)", fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--brand-ink)", background: "var(--brand-accent)", display: "inline-block", padding: "6px 14px", marginTop: 16 }}>
            opens with drop 002
          </p>
        </div>
        <div className="dr-table-wrap">
          <table className="dr-table">
            <caption style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}>
              Subscription pricing matrix: quantity per delivery by cadence
            </caption>
            <thead>
              <tr>
                <th scope="col">per delivery</th>
                {subMatrix.cadences.map((c) => (
                  <th scope="col" key={c}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {subMatrix.rows.map((row) => (
                <tr key={row.qty}>
                  <td>
                    <span className="dr-cell-pct">{row.qty}</span>
                    <span className="dr-cell-sub">one-time {row.base}</span>
                  </td>
                  {row.cells.map((cell, i) => (
                    <td key={i}>
                      <span className="dr-cell-pct">{cell.pct} off → {cell.price}</span>
                      <span className="dr-cell-sub">{cell.per}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.75rem", color: "rgba(var(--brand-ink-rgb),0.55)", textAlign: "center", marginTop: 18 }}>
          bigger quantity + tighter cadence = deeper discount. all subscriptions ship free.
        </p>
      </section>

      {/* ── DROP LEDGER ── */}
      <section style={{ background: "var(--brand-canvas)", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h2 className="dr-h2">the ledger.</h2>
        </div>
        <div className="dr-ledger">
          <div className="dr-ledger-row">
            <span className="dr-ledger-num">drop 001</span>
            <span className="dr-ledger-detail"><s>{X1_BOXES} boxes</s></span>
            <span className="dr-ledger-stamp">sold out</span>
          </div>
          <div className="dr-ledger-row">
            <span className="dr-ledger-num">
              <span className="dr-dot" aria-hidden="true" />
              drop 002
            </span>
            <span className="dr-ledger-detail">
              {DROP_002.boxes ? `${DROP_002.boxes.toLocaleString("en-US")} boxes` : "allocation TBA"}
            </span>
            <span className="dr-ledger-detail">waitlist gets first access</span>
          </div>
        </div>
        <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.8rem", color: "rgba(var(--brand-ink-rgb),0.6)", textAlign: "center", maxWidth: 520, margin: "24px auto 0", lineHeight: 1.6 }}>
          scarcity here is the boring kind: a drop&apos;s size equals the production run we actually
          received — never an artificial cap, never a fake timer. when it&apos;s gone, it&apos;s gone
          until the next run.
        </p>
      </section>

      {/* ── WAITLIST ── */}
      <section id="waitlist" style={{ background: "var(--brand-ink)", padding: "88px 24px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <h2 className="dr-h2" style={{ color: "var(--brand-canvas)", marginBottom: 16 }}>get drop 002 first.</h2>
          <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.9rem", color: "rgba(var(--brand-canvas-rgb),0.7)", lineHeight: 1.7, margin: "0 auto 32px", maxWidth: 500 }}>
            join the waitlist for the drop 002 link at open — add your number and it hits your
            texts 10 minutes before everyone else, and your code upgrades from 20% to 30%
            (best code wins). 20% off and free shipping locked in either way.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <DropAccessForm source="drop" dark buttonLabel="get drop access" microcopy="one text per drop. no spam, ever." />
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
