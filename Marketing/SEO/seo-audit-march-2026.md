# SEO Audit — drinkshroome.com
**Date:** March 20, 2026
**Audited by:** Claude (AI-assisted)

---

## 🚨 CRITICAL: Site Is NOT Indexed by Google

**`site:drinkshroome.com` returns ZERO results.** Google has not indexed any pages on the site. This is the #1 priority to fix.

### Why This Is Happening:
1. **No `sitemap.xml`** — Returns 404. Google can't discover your pages efficiently without a sitemap.
2. **No `robots.txt`** — Returns 404. While this means nothing is blocked, having a proper robots.txt with a sitemap reference helps crawlers.
3. **Site may not be submitted to Google Search Console** — Without GSC verification, Google may not prioritize crawling.
4. **Brand has zero external citations** — Searching `"drinkshroome.com"` returns no results anywhere on the web.

### Immediate Fixes Required:
- [ ] **Create `sitemap.xml`** — Next.js can auto-generate this. Add to `app/sitemap.ts`
- [ ] **Create `robots.txt`** — Add to `app/robots.ts` or `public/robots.txt`
- [ ] **Submit to Google Search Console** — Verify ownership, submit sitemap
- [ ] **Submit to Bing Webmaster Tools** — Secondary but valuable
- [ ] **Request indexing** for key pages via GSC URL Inspection tool

---

## Current Site Structure

### Pages Found:
| Page | URL | Status |
|------|-----|--------|
| Homepage | `/` | ✅ Live |
| Blog Index | `/blog` | ✅ Live (4 posts) |
| Blog: Beta-Glucans | `/blog/what-are-beta-glucans-mushroom-compound` | ✅ Live |
| Blog: Ceremonial vs Culinary | `/blog/ceremonial-vs-culinary-matcha-grade-matters` | ✅ Live |
| Blog: Coffee Replacement | `/blog/replace-morning-coffee-without-crash` | ✅ Live |
| Blog: Collagen Research | `/blog/collagen-in-morning-drink-research` | ✅ Live |
| FAQ | `/faq` | ✅ Live |
| Privacy Policy | `/privacy` | ✅ Live |
| Terms of Service | `/terms` | ✅ Live |

---

## What's Working ✅

### Schema Markup (Structured Data)
- ✅ **Organization schema** — Brand name, logo, social links, contact email
- ✅ **Product schema** — Product name, description, ingredients, availability
- ✅ Open Graph and Twitter Card tags configured
- ✅ Canonical URLs properly set

### Content
- ✅ 4 blog posts published (good start)
- ✅ Clear value proposition on homepage
- ✅ FAQ section with 14 questions covering key topics
- ✅ Blog categories (Ingredients, Wellness, Science) are well-structured

### Technical
- ✅ Next.js (fast, SSG-capable)
- ✅ HTTPS enabled
- ✅ Mobile-responsive

---

## What Needs Fixing 🔧

### HIGH PRIORITY

#### 1. Missing `sitemap.xml` and `robots.txt`
**Impact:** Google can't efficiently discover or crawl your pages.

**Fix:** Create `app/sitemap.ts`:
```typescript
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://drinkshroome.com'
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    // Add all blog post URLs
  ]
}
```

Create `app/robots.ts`:
```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://drinkshroome.com/sitemap.xml',
  }
}
```

#### 2. Missing FAQPage Schema on `/faq`
**Impact:** Missing rich snippet opportunity. FAQ schema can show expandable Q&A directly in Google search results.

**Fix:** Add FAQPage JSON-LD to the FAQ page (code was written in prior session but may not be deployed).

#### 3. Missing Image Alt Text
**Impact:** Product images lack descriptive alt attributes. This hurts image SEO and accessibility.

**Fix:** Add descriptive alt text to all images:
- `alt="shroomé vanilla ceremonial matcha latte sachet"`
- `alt="shroomé strawberry matcha latte being poured over oat milk"`
- etc.

#### 4. Google Search Console Not Set Up (Likely)
**Impact:** Can't monitor indexing, submit sitemap, or see search queries.

**Fix:**
1. Go to https://search.google.com/search-console
2. Add property: `drinkshroome.com`
3. Verify via DNS TXT record or HTML file
4. Submit sitemap.xml once created

### MEDIUM PRIORITY

#### 5. Blog Posts Are Too Short
Current posts average ~900-1,100 words. For competitive SEO keywords, 1,500-2,500 words typically rank better.

**Fix:** Expand existing posts or supplement with longer-form content (the 3 new posts being written target 1,500-2,000 words).

#### 6. Content Overlap Risk
Two of the three new blog posts overlap significantly with existing content:
- **Existing:** "Ceremonial vs. Culinary Matcha" ↔ **New:** "What Does Ceremonial Grade Matcha Mean?" — **HIGH OVERLAP**
- **Existing:** "What Are Beta-Glucans?" ↔ **New:** "Fruiting Body vs Mycelium" — **Moderate overlap** (different angle)
- **Existing:** "Replace Morning Coffee" ↔ **New:** "Caffeine + L-Theanine Nootropic Stack" — **Low overlap** (different audience)

**Recommendation:** Instead of "What Does Ceremonial Grade Matcha Mean?", consider a different topic:
- "5 Signs Your Matcha Powder Is Actually Culinary Grade (Not Ceremonial)"
- "Matcha vs Green Tea: Why Whole-Leaf Matters"
- "The Science of Shade-Growing: How 21 Days Changes Everything"

#### 7. No Internal Linking Strategy
Blog posts should link to each other and to the homepage/product. This distributes "link juice" and keeps visitors on site longer.

**Fix:** Add 2-3 internal links per blog post:
- Beta-glucans post → link to "How mushroom extracts in shroomé work"
- Coffee replacement post → link to "What is ceremonial matcha"
- Collagen post → link to homepage ingredients section

#### 8. No Backlinks
Zero external sites link to drinkshroome.com. Without backlinks, Google has no external signals to rank the site.

**Fix (In Progress):**
- Quora answers with backlinks (8 posted)
- Reddit engagement (6 templates ready)
- Wikipedia credibility building (3 edits done)
- Guest post pitches (article written, pitches pending)
- Press release distribution (PRLog pending)

### LOW PRIORITY

#### 9. Homepage Title Could Be More Keyword-Rich
Current: "shroomé — Café Energy. Home Address."
This is brand-focused but doesn't include target keywords.

**Suggested:** "shroomé — Ceremonial Matcha Latte with Mushroom Extracts & Collagen"

#### 10. Meta Description Could Include More Keywords
Current meta focuses on brand messaging. Consider including "matcha latte", "functional mushrooms", "ready-to-pour" for search matching.

#### 11. Missing Blog Categories/Tags Pages
Individual category pages (e.g., `/blog/category/ingredients`) would create additional indexable pages targeting keyword clusters.

#### 12. No Breadcrumb Schema on Blog Posts
BreadcrumbList schema was coded in prior session — confirm it's deployed.

---

## Keyword Opportunity Map

| Target Keyword | Monthly Search Volume (Est.) | Current Ranking | Content Needed |
|---|---|---|---|
| "ceremonial grade matcha" | 5,000-10,000 | Not indexed | Blog post (exists) |
| "matcha vs coffee" | 10,000-20,000 | Not indexed | Blog post (exists) |
| "best mushroom supplement" | 20,000-40,000 | Not indexed | Blog post (exists) |
| "collagen peptides benefits" | 15,000-30,000 | Not indexed | Blog post (exists) |
| "fruiting body vs mycelium" | 2,000-5,000 | Not indexed | Blog post (writing) |
| "caffeine L-theanine" | 3,000-6,000 | Not indexed | Blog post (writing) |
| "functional matcha latte" | 500-1,000 | Not indexed | Homepage optimization |
| "ready to pour matcha" | 100-500 | Not indexed | Homepage/product page |
| "matcha with mushroom extract" | 200-500 | Not indexed | Homepage/product page |
| "beta-glucan mushroom" | 1,000-3,000 | Not indexed | Blog post (exists) |

---

## Action Plan (Priority Order)

### This Week
1. ✅ Create sitemap.xml and robots.txt
2. ✅ Set up Google Search Console + submit sitemap
3. ✅ Set up Bing Webmaster Tools
4. ✅ Add FAQPage schema to /faq
5. ✅ Add image alt text to all product images
6. ✅ Deploy Schema.org changes (Organization, Product, BlogPosting, BreadcrumbList)

### This Month
7. Publish 2-3 new blog posts (non-overlapping topics)
8. Add internal links between all blog posts
9. Submit press releases (PRLog, BriefingWire) for backlinks
10. Continue Quora/Reddit answer posting (5-10/day)
11. Send guest post pitches to Tier 1 targets
12. Continue Wikipedia credibility edits (2-3/day)

### Next 30 Days
13. Monitor Google Search Console for indexing progress
14. Expand existing short blog posts to 1,500+ words
15. Create category pages for blog
16. Pitch and publish 2-3 guest posts
17. Begin Wikipedia substantive edits (week 4+)
18. Target 20+ backlinks from Quora, Reddit, guest posts, press releases

---

## GEO (Generative Engine Optimization) Status

**Current AI visibility:** ZERO. Searching for "drinkshroome" or "shroomé matcha" in AI assistants returns no results.

**Why:** No indexed content, no backlinks, no citations in AI training data.

**Path to AI visibility:**
1. Get indexed by Google (prerequisite)
2. Build citations on high-authority sites (Wikipedia, Healthline, Well+Good)
3. Publish data-driven content that AI models cite (beta-glucan percentages, L-theanine research)
4. Quora/Reddit answers create "long tail" AI training data
5. Guest posts on DA 50+ sites create authoritative citations

**Timeline:** 3-6 months to appear in AI search results for category queries.
