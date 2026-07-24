#!/usr/bin/env node
/**
 * shroomé — Shopify catalog seed script
 * =====================================
 * Seeds the launch catalog against the Shopify Admin GraphQL API (2025-07):
 *   1. Products + variants (productSet): 4 products / 10 variants, inventory
 *      tracked, 0 available, policy DENY  → everything renders SOLD OUT.
 *   2. Selling plan groups: 3 subscribe & save groups (12 / 24 / 48 tiers,
 *      cadences every 2 weeks / 30 days / 60 days, 10–20% off).
 *   3. Discount codes: SHROOME20 (waitlist) & SHROOME30 (SMS) — mutually
 *      exclusive (combinesWith all false), one per customer, ONE-TIME
 *      purchases only, active LAUNCH_AT → +14 days. Absolute cap: 30%.
 *
 * Idempotent: every step queries by handle / merchantCode / code first and
 * skips anything that already exists. Safe to re-run.
 *
 * USAGE
 *   export SHOPIFY_STORE_DOMAIN="your-store.myshopify.com"
 *   export SHOPIFY_ADMIN_TOKEN="shpat_xxx"          # Admin API access token
 *   export LAUNCH_AT="2026-08-01T16:00:00Z"          # optional; default: now
 *   node scripts/shopify-seed.mjs
 *
 * Requires Node 18+ (global fetch, no npm deps). Scopes: see
 * scripts/README-shopify.md (write_products, write_publications not needed,
 * write_purchase_options, write_discounts, read_locations,
 * read/write_own_subscription_contracts for checkout subscriptions).
 *
 * NOT created here (by design):
 *   - Founders FP30-XXXX codes (customer-specific, imported at migration —
 *     see Product/SKU Catalog/discount-matrix.md §2)
 *   - Launch free shipping: implemented as a temporary $0 SHIPPING RATE
 *     (orders ≥ $15, launch → +14d), not a discount object, because the
 *     launch codes set combinesWith all-false (CFO). Configure manually in
 *     Settings → Shipping. The script logs a reminder.
 *
 * Pricing source of truth: Product/SKU Catalog/sku-catalog.md
 * ($36/12-pack anchor). SKU codes + GS1 GTINs (prefix 860015741) per
 * Product/SKU Catalog/SKUMaster.xlsx (SHR-[CATEGORY]-[FLAVOR]-[QTY]):
 * 24/48 variants are online bundles of the GTIN'd 12-count retail boxes
 * (barcode = 12-box UPC with x2/x4 notation); variety & first pour kit are
 * DTC bundles/kits with no GTIN. Keep this file in sync with those docs.
 */

const API_VERSION = "2025-07";
const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;

if (!DOMAIN || !TOKEN) {
  console.error(
    "error: set SHOPIFY_STORE_DOMAIN (your-store.myshopify.com) and SHOPIFY_ADMIN_TOKEN (shpat_...)"
  );
  process.exit(1);
}

const LAUNCH_AT = process.env.LAUNCH_AT
  ? new Date(process.env.LAUNCH_AT)
  : new Date();
if (Number.isNaN(LAUNCH_AT.getTime())) {
  console.error(`error: LAUNCH_AT is not a valid date: ${process.env.LAUNCH_AT}`);
  process.exit(1);
}
const ENDS_AT = new Date(LAUNCH_AT.getTime() + 14 * 24 * 60 * 60 * 1000);

const ENDPOINT = `https://${DOMAIN}/admin/api/${API_VERSION}/graphql.json`;

// ---------------------------------------------------------------------------
// Catalog data — mirrors Product/SKU Catalog/shopify-products.csv
// ---------------------------------------------------------------------------

const FDA =
  "<p><em>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.</em></p>";

const CLAIMS =
  "<ul><li>supports sustained focus*</li><li>supports healthy energy levels*</li><li>supports immune function*</li><li>supports skin health*</li><li>provides antioxidant support*</li></ul>";

const DOSE =
  "<p>every 1oz sachet: 2.5g organic ceremonial matcha (~60mg caffeine + naturally occurring l-theanine), 2g grass-fed collagen peptides, and 200mg organic lion's mane extract standardized to 70%+ beta-glucans. no added sugar. no artificial sweeteners. no proprietary blends — every ingredient and dose on the label.</p>";

const DROP =
  "<p>sold in full production runs, released as drops. drop 001 sold out. subscribers never miss a drop — their boxes are reserved before each drop opens.</p>";

const CATALOG = [
  {
    handle: "shroome-vanilla",
    title: "shroomé vanilla — matcha latte concentrate",
    descriptionHtml: `<p>ceremonial matcha latte concentrate — vanilla. pour. swirl. glow.</p>${DOSE}${CLAIMS}<p>madagascar vanilla, subtle caramel warmth, creamy finish. your cafe matcha runs ~$7 a cup. this starts at $3 — and less on subscription.</p>${DROP}${FDA}`,
    tags: ["matcha", "lions mane", "collagen", "functional beverage", "vanilla", "drop", "subscription"],
    seo: {
      title: "shroomé vanilla — ceremonial matcha latte concentrate",
      description:
        "ceremonial matcha + lion's mane + collagen in one vanilla sachet. pour, swirl, glow. from $2.10/serving on subscription. drop 002 coming soon.",
    },
    variants: [
      { option: "12 sachets", sku: "SHR-BOX-VAN-12", price: "36.00", compareAtPrice: null, grams: 650, barcode: "860015741318" },
      { option: "24 sachets", sku: "SHR-BOX-VAN-24", price: "66.00", compareAtPrice: "72.00", grams: 1250, barcode: "860015741318 x2" }, // 2x 12-box — online bundle, no separate GTIN
      { option: "48 sachets", sku: "SHR-BOX-VAN-48", price: "126.00", compareAtPrice: "144.00", grams: 2400, barcode: "860015741318 x4" }, // 4x 12-box
    ],
  },
  {
    handle: "shroome-strawberry",
    title: "shroomé strawberry — matcha latte concentrate",
    descriptionHtml: `<p>ceremonial matcha latte concentrate — strawberry. pour. swirl. glow.</p>${DOSE}${CLAIMS}<p>real strawberry, light tartness, clean finish. bright, fruity, fresh. your cafe matcha runs ~$7 a cup. this starts at $3 — and less on subscription.</p>${DROP}${FDA}`,
    tags: ["matcha", "lions mane", "collagen", "functional beverage", "strawberry", "drop", "subscription"],
    seo: {
      title: "shroomé strawberry — ceremonial matcha latte concentrate",
      description:
        "ceremonial matcha + lion's mane + collagen in one strawberry sachet. pour, swirl, glow. from $2.10/serving on subscription. drop 002 coming soon.",
    },
    variants: [
      { option: "12 sachets", sku: "SHR-BOX-STR-12", price: "36.00", compareAtPrice: null, grams: 650, barcode: "860015741332" },
      { option: "24 sachets", sku: "SHR-BOX-STR-24", price: "66.00", compareAtPrice: "72.00", grams: 1250, barcode: "860015741332 x2" }, // 2x 12-box — online bundle, no separate GTIN
      { option: "48 sachets", sku: "SHR-BOX-STR-48", price: "126.00", compareAtPrice: "144.00", grams: 2400, barcode: "860015741332 x4" }, // 4x 12-box
    ],
  },
  {
    handle: "shroome-variety-pack",
    title: "shroomé variety pack — matcha latte concentrate",
    descriptionHtml: `<p>ceremonial matcha latte concentrate — half vanilla, half strawberry. pour. swirl. glow.</p><p>can't pick a lane? don't.</p>${DOSE}${CLAIMS}<p>warm vanilla mornings, bright strawberry afternoons. your cafe matcha runs ~$7 a cup. this starts at $3 — and less on subscription.</p>${DROP}${FDA}`,
    tags: ["matcha", "lions mane", "collagen", "functional beverage", "variety", "drop", "subscription"],
    seo: {
      title: "shroomé variety pack — vanilla + strawberry matcha latte",
      description:
        "half vanilla, half strawberry. ceremonial matcha + lion's mane + collagen. from $2.10/serving on subscription. drop 002 coming soon.",
    },
    variants: [
      // variety = DTC-only; no GTIN required (kit / bundle of GTIN'd boxes). Needs NEW GTIN if ever a physical retail box.
      { option: "12 sachets (6 vanilla / 6 strawberry)", sku: "SHR-KIT-VAR-12", price: "36.00", compareAtPrice: null, grams: 650, barcode: null }, // 3PL-kitted loose sachets
      { option: "24 sachets (12 vanilla / 12 strawberry)", sku: "SHR-BOX-VAR-24", price: "66.00", compareAtPrice: "72.00", grams: 1250, barcode: null }, // 1 VAN box + 1 STR box
      { option: "48 sachets (24 vanilla / 24 strawberry)", sku: "SHR-BOX-VAR-48", price: "126.00", compareAtPrice: "144.00", grams: 2400, barcode: null }, // 2 + 2 boxes
    ],
  },
  {
    handle: "shroome-first-pour-kit",
    title: "shroomé first pour kit — 6 sachets",
    descriptionHtml: `<p>your first pour. 3 vanilla + 3 strawberry — six mornings to find your flavor.</p>${DOSE}${CLAIMS}<p>pour. swirl. glow. then subscribe to the flavor you loved — subscribers never miss a drop.</p>${FDA}`,
    tags: ["matcha", "lions mane", "collagen", "functional beverage", "trial", "starter kit", "drop"],
    seo: {
      title: "shroomé first pour kit — 6-sachet matcha latte trial",
      description:
        "3 vanilla + 3 strawberry sachets of ceremonial matcha + lion's mane + collagen. $21. six mornings to find your flavor.",
    },
    variants: [
      { option: "6 sachets (3 vanilla / 3 strawberry)", sku: "SHR-KIT-VAR-06", price: "21.00", compareAtPrice: null, grams: 350, barcode: null }, // DTC-only kit — no GTIN needed unless retail
    ],
  },
];

// Subscription matrix — mirrors Product/SKU Catalog/subscription-plans.md.
// One group per quantity tier (selling-plan discounts are fixed per plan).
const SELLING_PLAN_GROUPS = [
  {
    merchantCode: "shroome-sub-12",
    name: "subscribe & save — 12 sachets",
    position: 1,
    skus: ["SHR-BOX-VAN-12", "SHR-BOX-STR-12", "SHR-KIT-VAR-12"],
    plans: [
      { name: "every 2 weeks", option: "2 weeks", interval: "WEEK", intervalCount: 2, percentage: 15 },
      { name: "every 30 days", option: "30 days", interval: "DAY", intervalCount: 30, percentage: 12 },
      { name: "every 60 days", option: "60 days", interval: "DAY", intervalCount: 60, percentage: 10 },
    ],
  },
  {
    merchantCode: "shroome-sub-24",
    name: "subscribe & save — 24 sachets",
    position: 2,
    skus: ["SHR-BOX-VAN-24", "SHR-BOX-STR-24", "SHR-BOX-VAR-24"],
    plans: [
      { name: "every 2 weeks", option: "2 weeks", interval: "WEEK", intervalCount: 2, percentage: 18 },
      { name: "every 30 days", option: "30 days", interval: "DAY", intervalCount: 30, percentage: 15 },
      { name: "every 60 days", option: "60 days", interval: "DAY", intervalCount: 60, percentage: 12 },
    ],
  },
  {
    merchantCode: "shroome-sub-48",
    name: "subscribe & save — 48 sachets",
    position: 3,
    skus: ["SHR-BOX-VAN-48", "SHR-BOX-STR-48", "SHR-BOX-VAR-48"],
    plans: [
      { name: "every 2 weeks", option: "2 weeks", interval: "WEEK", intervalCount: 2, percentage: 20 },
      { name: "every 30 days", option: "30 days", interval: "DAY", intervalCount: 30, percentage: 20 },
      { name: "every 60 days", option: "60 days", interval: "DAY", intervalCount: 60, percentage: 15 },
    ],
  },
];

// Launch codes — CFO verdict 2026-07-14: mutually exclusive (combinesWith all
// false), one per customer, ONE-TIME purchases only. SHROOME30 REPLACES
// SHROOME20, it never stacks. Absolute single-order discount cap: 30%.
const DISCOUNTS = [
  { code: "SHROOME20", title: "SHROOME20 — waitlist launch (20% off, one-time only)", percentage: 0.2 },
  { code: "SHROOME30", title: "SHROOME30 — SMS waitlist (30% off, replaces SHROOME20)", percentage: 0.3 },
];

// ---------------------------------------------------------------------------
// GraphQL helper
// ---------------------------------------------------------------------------

async function gql(query, variables = {}) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText}: ${await res.text()}`);
  }
  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
  }
  return json.data;
}

function assertNoUserErrors(payload, label) {
  const errs = payload?.userErrors ?? [];
  if (errs.length) {
    throw new Error(`${label} userErrors: ${JSON.stringify(errs)}`);
  }
}

const summary = { products: [], skippedProducts: [], groups: [], skippedGroups: [], discounts: [], skippedDiscounts: [], warnings: [] };
const log = (msg) => console.log(msg);

// ---------------------------------------------------------------------------
// 0. Primary location (for explicit 0-available inventory)
// ---------------------------------------------------------------------------

async function getPrimaryLocationId() {
  try {
    const data = await gql(`{ locations(first: 1) { nodes { id name } } }`);
    const loc = data.locations.nodes[0];
    if (loc) {
      log(`[info] inventory location: ${loc.name} (${loc.id})`);
      return loc.id;
    }
  } catch (e) {
    summary.warnings.push(`could not read locations (${e.message}) — inventory will default to 0 anyway (tracked, unstocked)`);
    log(`[warn] ${summary.warnings.at(-1)}`);
  }
  return null;
}

// ---------------------------------------------------------------------------
// 1. Products
// ---------------------------------------------------------------------------

const PRODUCT_BY_HANDLE = `
  query productByHandle($q: String!) {
    products(first: 1, query: $q) {
      nodes { id handle variants(first: 10) { nodes { id sku } } }
    }
  }`;

const PRODUCT_SET = `
  mutation productSet($input: ProductSetInput!) {
    productSet(input: $input, synchronous: true) {
      product { id handle variants(first: 10) { nodes { id sku } } }
      userErrors { field message }
    }
  }`;

async function ensureProduct(p, locationId) {
  const existing = await gql(PRODUCT_BY_HANDLE, { q: `handle:${p.handle}` });
  const found = existing.products.nodes.find((n) => n.handle === p.handle);
  if (found) {
    log(`[skip] product exists: ${p.handle} (${found.id})`);
    summary.skippedProducts.push(p.handle);
    return found;
  }

  const input = {
    title: p.title,
    handle: p.handle,
    descriptionHtml: p.descriptionHtml,
    vendor: "shroomé",
    productType: "Matcha Latte Concentrate",
    status: "ACTIVE",
    tags: p.tags,
    seo: p.seo,
    productOptions: [
      { name: "Pack Size", position: 1, values: p.variants.map((v) => ({ name: v.option })) },
    ],
    variants: p.variants.map((v) => ({
      optionValues: [{ optionName: "Pack Size", name: v.option }],
      sku: v.sku,
      price: v.price,
      compareAtPrice: v.compareAtPrice,
      barcode: v.barcode ?? null, // real GS1 GTIN-12s (prefix 860015741) per SKUMaster.xlsx; null = DTC bundle/kit, no GTIN required
      taxable: true,
      inventoryPolicy: "DENY", // SOLD OUT until flip-live: never oversell
      inventoryItem: {
        tracked: true,
        requiresShipping: true,
        measurement: { weight: { value: v.grams, unit: "GRAMS" } },
      },
      ...(locationId
        ? { inventoryQuantities: [{ locationId, name: "available", quantity: 0 }] }
        : {}),
    })),
  };

  const data = await gql(PRODUCT_SET, { input });
  assertNoUserErrors(data.productSet, `productSet(${p.handle})`);
  const product = data.productSet.product;
  log(`[create] product ${p.handle} (${product.id}) — ${product.variants.nodes.length} variants, inventory 0/DENY`);
  summary.products.push(p.handle);
  return product;
}

// ---------------------------------------------------------------------------
// 2. Selling plan groups
// ---------------------------------------------------------------------------

const GROUPS_QUERY = `
  { sellingPlanGroups(first: 50) { nodes { id name merchantCode } } }`;

const GROUP_CREATE = `
  mutation sellingPlanGroupCreate($input: SellingPlanGroupInput!, $resources: SellingPlanGroupResourceInput) {
    sellingPlanGroupCreate(input: $input, resources: $resources) {
      sellingPlanGroup { id name }
      userErrors { field message }
    }
  }`;

async function ensureSellingPlanGroups(variantIdBySku) {
  let existing = [];
  try {
    existing = (await gql(GROUPS_QUERY)).sellingPlanGroups.nodes;
  } catch (e) {
    summary.warnings.push(`could not list selling plan groups (${e.message}) — check write_purchase_options scope`);
    log(`[warn] ${summary.warnings.at(-1)}`);
  }

  for (const g of SELLING_PLAN_GROUPS) {
    if (existing.some((n) => n.merchantCode === g.merchantCode)) {
      log(`[skip] selling plan group exists: ${g.merchantCode}`);
      summary.skippedGroups.push(g.merchantCode);
      continue;
    }
    const productVariantIds = g.skus.map((sku) => variantIdBySku.get(sku)).filter(Boolean);
    if (productVariantIds.length !== g.skus.length) {
      const missing = g.skus.filter((sku) => !variantIdBySku.get(sku));
      summary.warnings.push(`group ${g.merchantCode}: missing variant ids for ${missing.join(", ")} — group not created`);
      log(`[warn] ${summary.warnings.at(-1)}`);
      continue;
    }
    const input = {
      name: g.name,
      merchantCode: g.merchantCode,
      options: ["delivery every"],
      position: g.position,
      sellingPlansToCreate: g.plans.map((plan) => ({
        name: plan.name,
        options: [plan.option],
        category: "SUBSCRIPTION",
        billingPolicy: { recurring: { interval: plan.interval, intervalCount: plan.intervalCount } },
        deliveryPolicy: { recurring: { interval: plan.interval, intervalCount: plan.intervalCount } },
        pricingPolicies: [
          { fixed: { adjustmentType: "PERCENTAGE", adjustmentValue: { percentage: plan.percentage } } },
        ],
      })),
    };
    const data = await gql(GROUP_CREATE, { input, resources: { productVariantIds } });
    assertNoUserErrors(data.sellingPlanGroupCreate, `sellingPlanGroupCreate(${g.merchantCode})`);
    log(`[create] selling plan group ${g.merchantCode} → ${g.plans.map((p) => `${p.option}=${p.percentage}%`).join(", ")} on ${g.skus.join(", ")}`);
    summary.groups.push(g.merchantCode);
  }
}

// ---------------------------------------------------------------------------
// 3. Discount codes
// ---------------------------------------------------------------------------

const DISCOUNT_LOOKUP = `
  query discountByCode($q: String!) {
    codeDiscountNodes(first: 10, query: $q) {
      nodes {
        id
        codeDiscount {
          ... on DiscountCodeBasic { title codes(first: 1) { nodes { code } } }
        }
      }
    }
  }`;

const DISCOUNT_CREATE = `
  mutation discountCodeBasicCreate($basicCodeDiscount: DiscountCodeBasicInput!) {
    discountCodeBasicCreate(basicCodeDiscount: $basicCodeDiscount) {
      codeDiscountNode { id }
      userErrors { field code message }
    }
  }`;

async function ensureDiscount(d) {
  const lookup = await gql(DISCOUNT_LOOKUP, { q: d.code });
  const exists = lookup.codeDiscountNodes.nodes.some(
    (n) => n.codeDiscount?.codes?.nodes?.some((c) => c.code === d.code)
  );
  if (exists) {
    log(`[skip] discount code exists: ${d.code}`);
    summary.skippedDiscounts.push(d.code);
    return;
  }

  const basicCodeDiscount = {
    title: d.title,
    code: d.code,
    startsAt: LAUNCH_AT.toISOString(),
    endsAt: ENDS_AT.toISOString(),
    appliesOncePerCustomer: true, // one use per customer (waitlist promise)
    customerSelection: { all: true },
    customerGets: {
      // CFO: launch codes are ONE-TIME only — they never touch subscription
      // pricing, keeping the absolute single-order discount cap at 30%.
      appliesOnOneTimePurchase: true,
      appliesOnSubscription: false,
      value: { percentage: d.percentage },
      items: { all: true },
    },
    // CFO: SHROOME20 and SHROOME30 are MUTUALLY EXCLUSIVE — SHROOME30
    // replaces, never stacks. All-false also blocks any other discount.
    combinesWith: {
      orderDiscounts: false,
      productDiscounts: false,
      shippingDiscounts: false,
    },
  };

  const data = await gql(DISCOUNT_CREATE, { basicCodeDiscount });
  assertNoUserErrors(data.discountCodeBasicCreate, `discountCodeBasicCreate(${d.code})`);
  log(`[create] discount ${d.code}: ${d.percentage * 100}% off one-time orders, ${LAUNCH_AT.toISOString()} → ${ENDS_AT.toISOString()}, one per customer, combines with nothing`);
  summary.discounts.push(d.code);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  log(`shroomé seed → ${DOMAIN} (API ${API_VERSION})`);
  log(`launch window: ${LAUNCH_AT.toISOString()} → ${ENDS_AT.toISOString()}\n`);

  const locationId = await getPrimaryLocationId();

  // 1. products
  const variantIdBySku = new Map();
  for (const p of CATALOG) {
    const product = await ensureProduct(p, locationId);
    for (const v of product.variants.nodes) {
      if (v.sku) variantIdBySku.set(v.sku, v.id);
    }
  }

  // 2. subscriptions
  await ensureSellingPlanGroups(variantIdBySku);

  // 3. discounts
  for (const d of DISCOUNTS) {
    await ensureDiscount(d);
  }

  // summary
  log("\n================ SUMMARY ================");
  log(`products created:  ${summary.products.length ? summary.products.join(", ") : "none"}`);
  log(`products skipped:  ${summary.skippedProducts.length ? summary.skippedProducts.join(", ") : "none"}`);
  log(`plan groups created: ${summary.groups.length ? summary.groups.join(", ") : "none"}`);
  log(`plan groups skipped: ${summary.skippedGroups.length ? summary.skippedGroups.join(", ") : "none"}`);
  log(`discounts created: ${summary.discounts.length ? summary.discounts.join(", ") : "none"}`);
  log(`discounts skipped: ${summary.skippedDiscounts.length ? summary.skippedDiscounts.join(", ") : "none"}`);
  if (summary.warnings.length) {
    log(`warnings:`);
    for (const w of summary.warnings) log(`  - ${w}`);
  }
  log("\nMANUAL FOLLOW-UPS (not API-seedable):");
  log("  1. Settings → Shipping: add temporary $0 rate for orders ≥ $15 (launch → +14d), then revert to $50 free-shipping threshold.");
  log("  2. Import founders FP30-XXXX codes (12-pack only, fenced) — see Product/SKU Catalog/discount-matrix.md §2.");
  log("  3. Barcodes are live GS1 GTINs (SKUMaster.xlsx). Buy NEW GTINs only if variety/trial ever become physical retail boxes.");
  log("  4. Verify SOLD OUT rendering + back-in-stock waitlist form on all 4 product pages.");
  log("==========================================");
}

main().catch((e) => {
  console.error(`\nfatal: ${e.message}`);
  process.exitCode = 1;
});
