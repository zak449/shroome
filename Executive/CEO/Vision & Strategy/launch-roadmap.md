# shroomé Launch Roadmap & Next Steps

> Last updated: March 18, 2026
> Owner: Zak / ZSQUARED INC
> Status: PRE-LAUNCH (Waitlist Phase)

---

## PHASE 0: PRE-LAUNCH — CURRENT ✅

### Completed
- [x] Website live at drinkshroome.com (Next.js on Vercel)
- [x] Waitlist signup with email + optional phone capture
- [x] Cloudflare Turnstile CAPTCHA on signups
- [x] Klaviyo integration (list management, SMS, event tracking)
- [x] Resend integration (welcome email + Day 7 follow-up)
- [x] Google Sheets webhook (backup signup log)
- [x] Google Analytics (G-60FPK4E1PF) with conversion tracking
- [x] GA4 events: generate_lead, sign_up, section_view, scroll_depth, engaged_time
- [x] Mobile responsive fixes (breakpoints at 768px and 480px)
- [x] Brand DNA document finalized
- [x] Email flows built (Welcome + What's Inside)
- [x] CPG folder structure organized (Brand, Marketing, Product, Assets, Executive)
- [x] All reference docs populated (colors, typography, image guidelines, SOPs, compliance)
- [x] Security scan — clean
- [x] System performance optimized

### Still To Do (Pre-Launch)
- [ ] **Verify Resend sending domain** — add drinkshroome.com in Resend dashboard (Settings → Domains) so emails come from hello@drinkshroome.com not flagged as spam
- [ ] **Test welcome email** — sign up with your own email on the live site to verify the full flow works end-to-end
- [ ] **Mark GA4 Key Events** — analytics.google.com → Admin → Events → mark `sign_up` and `generate_lead` as Key Events
- [ ] **Enable macOS Firewall** — System Settings → Network → Firewall → Turn On
- [ ] **Replace AI product images** with real product photography when available
- [ ] **Create hero video** for website and social (Assets/Video folder ready)
- [ ] **SEO: Add structured data** (JSON-LD for Product, Organization)
- [ ] **SEO: Submit sitemap** to Google Search Console
- [ ] **Set up Meta Pixel** for Facebook/Instagram retargeting
- [ ] **Set up TikTok Pixel** for TikTok retargeting and future TikTok Shop
- [ ] **Complete Klaviyo RCS registration** — blue branded SMS on Android

---

## BRAND ASSET REFRESH SOP — When New Logo/Brand DNA Arrives

**Trigger:** When final brand identity (logo, colors, typography) is delivered by design team.

### Update Checklist (in order):

**1. Core Assets**
- [ ] Replace `public/logo-mark.svg` and `public/logo-navy.png` with new logo files
- [ ] Replace `public/favicon.svg` and `public/apple-touch-icon.png`
- [ ] Replace `public/icon-192.png` (PWA icon)
- [ ] Update `public/og-image.jpg` (social share preview image)
- [ ] Update `app/opengraph-image.tsx` with new brand colors/logo

**2. Website**
- [ ] Update brand colors in `app/page.tsx` (BRAND object if applicable)
- [ ] Update font references if typography changes
- [ ] Update `app/globals.css` theme variables
- [ ] Redeploy to Vercel

**3. Email Templates**
- [ ] Update `app/lib/emails.ts` — colors, logo references, font stacks
- [ ] Re-export `Marketing/Email/Flows/01-Welcome-Flow.html`
- [ ] Re-export `Marketing/Email/Flows/02-Whats-Inside-Flow.html`

**4. Third-Party Platforms**
- [ ] **Klaviyo** — update logo in email templates and RCS sender profile
- [ ] **Klaviyo RCS** — update banner image and logo (Settings → Text message → Sender info)
- [ ] **Resend** — no logo needed (text-based sender)
- [ ] **Google Analytics** — no update needed
- [ ] **GoDaddy** — no update needed

**5. Shopify (when migrated)**
- [ ] Update Shopify theme logo and favicon
- [ ] Update Shopify email notification templates
- [ ] Update Shopify checkout branding
- [ ] Update social media linked images

**6. Social Media**
- [ ] Update profile photos on TikTok, Instagram, YouTube
- [ ] Update cover/banner images
- [ ] Update link-in-bio page

**7. Documents**
- [ ] Update `Brand/Brand DNA/` with final brand DNA document
- [ ] Update `Brand/Color & Typography/brand-colors.md`
- [ ] Update `Brand/Logo & Marks/` with final logo files (SVG, PNG, ICO)
- [ ] Update `Brand/Photography & Image Direction/image-guidelines.md` if direction changes

---

## PHASE 1: SHOPIFY MIGRATION

### When to Start
Start Shopify setup when: product photography is done, packaging is finalized, and you have inventory ready to ship (or a confirmed co-packer timeline).

### Pre-Migration: Close Waitlist Campaign
- [ ] **Set `WAITLIST_CLOSED=true`** in Vercel env vars → redeploy (this instantly closes waitlist signups)
- [ ] Export final waitlist from Klaviyo (email list + SMS list) as backup CSV
- [ ] Export Google Sheets waitlist data as backup
- [ ] Note total signups, phone opt-ins, and discount tiers for launch email segmentation

### Shopify Store Setup
- [ ] Create Shopify store (Shopify Basic plan — $39/mo is fine to start)
- [ ] Connect custom domain: drinkshroome.com (update GoDaddy DNS to point to Shopify)
- [ ] Install theme (recommended: Dawn or Sense — clean, fast, free)
- [ ] Set up products: Vanilla sachet, Strawberry sachet, Variety pack
- [ ] Configure subscription (ReCharge or Loop Subscriptions)
- [ ] Set up shipping zones and rates
- [ ] Configure tax settings
- [ ] Set up Shopify Payments (Stripe-powered, lowest fees)
- [ ] Import waitlist emails from Klaviyo for launch blast
- [ ] Configure order confirmation and shipping notification emails
- [ ] Install Klaviyo Shopify app and connect to existing account
- [ ] Transfer GA4 (G-60FPK4E1PF) to Shopify via Google & YouTube app
- [ ] Update Klaviyo SMS Welcome Flow to include Shopify link instead of drinkshroome.com waitlist

### Discount Code Generation — THE DAY BEFORE LAUNCH

**CRITICAL: Codes must be generated and sent the day before going live.**

**Step 1: Create codes in Shopify (T-1 day)**
- [ ] Go to Shopify Admin → Discounts → Create discount
- [ ] Create `SHROOME20`:
  - Type: Percentage discount
  - Value: 20%
  - Applies to: Entire order
  - Free shipping: ✅ Yes
  - Usage limits: One per customer
  - Active dates: Launch day → 14 days after launch
- [ ] Create `SHROOME30`:
  - Type: Percentage discount
  - Value: 30%
  - Applies to: Entire order
  - Free shipping: ✅ Yes
  - Usage limits: One per customer
  - Active dates: Launch day → 14 days after launch
- [ ] Test both codes in checkout preview mode

**Step 2: Send codes via Klaviyo (T-1 day, evening)**
- [ ] Create Klaviyo email campaign: "your code is here — we launch tomorrow"
  - Segment: All waitlist subscribers
  - Include code `SHROOME20` in email body
  - Subject: "your 20% off + free shipping code is here 💚"
- [ ] Create Klaviyo SMS campaign for phone subscribers:
  - Segment: SMS subscribers only (Text Messaging List)
  - Message: "shroomé: your codes are here. SHROOME20 for 20% off + free shipping. PLUS your exclusive SHROOME30 for 30% off (stacks because you gave us your number). we go live tomorrow. 🍵"
- [ ] Schedule email for 6 PM the evening before launch
- [ ] Schedule SMS for 6:05 PM (5 min after email)

**Step 3: Verify (T-1 day)**
- [ ] Test both codes work in Shopify checkout
- [ ] Confirm email preview looks correct
- [ ] Confirm SMS preview reads correctly
- [ ] Verify segments are correct (email list vs phone list)

**Step 4: Update Klaviyo keyword responses after codes are sent**
- [ ] Update the SMS YES confirmation message to remove "codes drop the day before" and replace with the actual code
- [ ] Update the SMS Welcome Flow message with the actual code

### Essential Shopify Apps (Install These First)

| App | Purpose | Cost |
|-----|---------|------|
| **Klaviyo** | Email/SMS marketing (you already have this) | Free up to 250 contacts |
| **ReCharge** or **Loop Subscriptions** | Subscription management | ~$99/mo |
| **Google & YouTube** (by Google) | GA4 + Google Shopping feed | Free |
| **Meta/Facebook Channel** | Instagram/Facebook Shop + Pixel | Free |
| **TikTok Channel** | TikTok Shop + Pixel | Free |
| **Judge.me** or **Loox** | Product reviews with photos | Free / $9.99/mo |
| **Gorgias** or **Tidio** | Customer support / live chat | $10-50/mo |
| **Rebuy** or **Also Bought** | Cross-sell / upsell | $99/mo |
| **Lucky Orange** or **Hotjar** | Heatmaps and session recordings | Free tier |
| **Inventory Planner** | Demand forecasting | $99/mo (add later) |

### Nice-to-Have Shopify Apps (Add After Launch)

| App | Purpose | When |
|-----|---------|------|
| **Smile.io** | Loyalty / rewards program | After 500+ customers |
| **ReferralCandy** or **Refersion** | Affiliate program | Month 2-3 |
| **Privy** | Pop-ups and exit intent | If conversion rate is low |
| **ShipBob** or **ShipStation** | 3PL fulfillment integration | When order volume justifies |
| **Returnly** or **Loop Returns** | Self-serve returns portal | After launch |
| **Triple Whale** or **Northbeam** | Attribution / analytics dashboard | When running paid ads |
| **Postscript** | SMS marketing (alternative to Klaviyo SMS) | If Klaviyo SMS underperforms |

---

## PHASE 2: LAUNCH

### Launch Sequence (Day-by-Day)

**T-7 days:**
- [ ] Send "launch is coming" teaser email to waitlist
- [ ] Post countdown content on social
- [ ] Prep influencer seeding packages

**T-3 days:**
- [ ] Send "3 days away" email with preview
- [ ] Finalize ad creative for paid launch

**T-0 (Launch Day):**
- [ ] Send launch email to waitlist with 20% off + free shipping discount code
- [ ] Open store to public
- [ ] Post launch content across all social channels
- [ ] Monitor orders, email deliverability, checkout flow
- [ ] Respond to every DM and comment within 1 hour

**T+1 to T+3:**
- [ ] Send reminder email to waitlist non-openers
- [ ] Share UGC and early customer reactions
- [ ] Monitor fulfillment and shipping

**T+7:**
- [ ] Send "last chance" email for 20% off + free shipping waitlist discount expiration
- [ ] Analyze first week metrics (conversion rate, AOV, email open rates)

---

## PHASE 3: SOCIAL MEDIA & CONTENT

### Platform Priority

| Platform | Priority | Use Case |
|----------|----------|----------|
| **TikTok** | #1 | Product demos, "what I drink in a morning", ingredient education, ASMR pours |
| **Instagram** | #2 | Brand aesthetic, Reels (repurposed TikToks), Stories for BTS |
| **YouTube Shorts** | #3 | Repurpose TikTok/Reels content |
| **Pinterest** | #4 | Lifestyle/recipe pins — long-tail organic traffic |

### Content Pillars (from content-pillars.md)
1. **Product Education** — beta-glucans, ceremonial matcha, what's inside
2. **Lifestyle/Energy** — café energy at home, morning routines, no crash
3. **Transparency** — clean label, real doses, behind the formulation
4. **Community** — founder story, customer reactions, waitlist exclusivity

### TikTok Shop Setup
- [ ] Apply for TikTok Shop seller account (shop.tiktok.com)
- [ ] Requirements: US business, EIN, bank account, product images
- [ ] Connect Shopify → TikTok Shopping (via TikTok Channel app)
- [ ] Set up TikTok Pixel on Shopify for ad tracking
- [ ] Create shoppable videos (product tagged in TikTok content)
- [ ] Set up TikTok affiliate commission (typically 10-20% for CPG)
- [ ] Apply for TikTok Shop "Sample Program" — send free product to creators who request it

### TikTok Content Strategy
- Post 1-3x daily during launch week, then 4-5x weekly ongoing
- Hook in first 1-2 seconds (visual or text hook)
- Show the product in use within first 3 seconds
- 15-30 second videos perform best
- Use trending sounds but stay on brand
- Engage with every comment in first hour

---

## PHASE 4: AFFILIATE & INFLUENCER PROGRAM

### Affiliate Program Setup

**Platform options:**
| Platform | Best For | Cost |
|----------|----------|------|
| **TikTok Shop Affiliate** | TikTok creators | Commission only (no platform fee) |
| **Refersion** | Shopify-native affiliate tracking | $99/mo |
| **GoAffPro** | Budget Shopify affiliate app | Free - $24/mo |
| **Impact.com** | Scaling to 100+ affiliates | Custom pricing |

**Recommended commission structure:**
- Standard affiliates: 15% per sale
- Top-tier / influencer partners: 20-25% per sale
- First-sale bonus: Extra $5-10 for first conversion
- Cookie window: 30 days

### Influencer Seeding Strategy

**Micro-influencers (5K-50K followers):**
- Send free product + handwritten note
- No contract required — let them post organically if they love it
- Target: health/wellness, matcha lovers, morning routine creators
- Budget: 50-100 seeding kits at $15-20 COGS each = $750-2,000

**Mid-tier influencers (50K-500K):**
- Paid partnership: $200-1,000 per post/video
- Negotiate usage rights for paid ads (whitelisting)
- Target 5-10 creators for launch

**Macro influencers (500K+):**
- Wait until post-launch with proven product-market fit
- Budget: $2,000-10,000+ per partnership

### Affiliate Onboarding Checklist
- [ ] Set up affiliate platform (Refersion or GoAffPro on Shopify)
- [ ] Create affiliate landing page with sign-up form
- [ ] Build affiliate kit: product images, brand guidelines, approved claims, sample captions
- [ ] Set commission tiers
- [ ] Create unique discount codes per affiliate (CREATOR15, etc.)
- [ ] Set up automated affiliate payouts (monthly)
- [ ] Create affiliate dashboard for tracking

---

## PHASE 5: PAID ADVERTISING

### When to Start Paid Ads
Start AFTER organic content proves product-market fit (positive comments, repeat purchases, good email engagement). Typically 2-4 weeks post-launch.

### Channel Priority

| Channel | Budget Start | Best For |
|---------|-------------|----------|
| **TikTok Ads** | $50-100/day | Top of funnel awareness, UGC-style ads |
| **Meta (IG/FB) Ads** | $50-100/day | Retargeting, lookalike audiences |
| **Google Shopping** | $30-50/day | Intent-based capture ("buy matcha latte") |
| **YouTube Ads** | Later | Brand awareness at scale |

### Creative Strategy
- Use UGC and influencer content as ad creative (with permission)
- Test 3-5 creatives per ad set
- Lead with the hook: "This isn't your average matcha"
- A/B test: product-focused vs. lifestyle vs. ingredient education
- Retarget website visitors and email subscribers

### Key Metrics to Track
| Metric | Target |
|--------|--------|
| ROAS (Return on Ad Spend) | 3x+ |
| CAC (Customer Acquisition Cost) | < $25 |
| CPC (Cost Per Click) | < $1.50 |
| CTR (Click-Through Rate) | > 1.5% |
| CVR (Conversion Rate) | > 2.5% |

---

## PHASE 6: SCALE & RETAIL

### Online Marketplace Expansion
- [ ] Amazon FBA (after proving DTC demand)
- [ ] Walmart Marketplace
- [ ] Thrive Market (application-based, health-focused)
- [ ] iHerb

### Retail Strategy
- [ ] Start with local specialty groceries and coffee shops
- [ ] Apply to Whole Foods local/regional program
- [ ] Sprouts, Natural Grocers, Erewhon
- [ ] Need: retail-ready packaging, UPC codes, sell sheets, broker relationships

### B2B / Café Partnerships
- [ ] Create B2B sachet format for cafés
- [ ] Wholesale pricing (50%+ margin for café partner)
- [ ] Café sampling program
- [ ] Co-branded menu items

---

## KEY METRICS DASHBOARD (Track Weekly)

### Pre-Launch (Now)
| Metric | Where to Track |
|--------|---------------|
| Waitlist signups | Klaviyo list count + Google Sheets |
| Email open rate | Klaviyo |
| Email click rate | Klaviyo |
| Website traffic | Google Analytics |
| Conversion rate (visitor → signup) | GA4: sign_up events / sessions |
| Scroll depth | GA4: scroll_depth events |
| Avg time on site | GA4: engaged_time events |
| Traffic sources | GA4: Acquisition report |

### Post-Launch (Shopify)
| Metric | Where to Track |
|--------|---------------|
| Revenue | Shopify Analytics |
| Orders | Shopify Analytics |
| AOV (Average Order Value) | Shopify Analytics |
| Conversion rate | Shopify Analytics |
| CAC | Ad platforms + Shopify |
| LTV | Klaviyo or Triple Whale |
| Subscription rate | ReCharge dashboard |
| Churn rate (subscriptions) | ReCharge dashboard |
| Email revenue | Klaviyo |
| SMS revenue | Klaviyo |
| ROAS by channel | Ad platforms or Triple Whale |
| Return rate | Shopify |
| NPS score | Post-purchase survey |

---

## INTEGRATION MAP

```
                    ┌─────────────┐
                    │  SHOPIFY    │
                    │  (Store)    │
                    └──────┬──────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
    ┌─────▼─────┐   ┌─────▼─────┐   ┌─────▼─────┐
    │  Klaviyo  │   │  Google   │   │  TikTok   │
    │  Email +  │   │  GA4 +    │   │  Shop +   │
    │  SMS      │   │  Shopping │   │  Pixel    │
    └───────────┘   └───────────┘   └───────────┘
          │                │                │
    ┌─────▼─────┐   ┌─────▼─────┐   ┌─────▼─────┐
    │ ReCharge  │   │  Meta     │   │ Refersion │
    │ Subscript │   │  Pixel +  │   │ Affiliate │
    │           │   │  Shop     │   │ Program   │
    └───────────┘   └───────────┘   └───────────┘
          │
    ┌─────▼─────┐
    │  Judge.me │
    │  Reviews  │
    └───────────┘
```

---

## BUDGET ESTIMATES (Monthly, Post-Launch)

| Category | Month 1 | Month 3 | Month 6 |
|----------|---------|---------|---------|
| Shopify + apps | $200 | $350 | $500 |
| Klaviyo | Free | $45 | $150 |
| Paid ads | $1,500 | $5,000 | $10,000 |
| Influencer seeding | $1,000 | $2,000 | $3,000 |
| Paid partnerships | $0 | $2,000 | $5,000 |
| 3PL / fulfillment | Variable | Variable | Variable |
| **Total (excl. COGS)** | **~$2,700** | **~$9,400** | **~$18,650** |

---

*This document is the single source of truth for shroomé's launch plan. Update as milestones are completed.*
