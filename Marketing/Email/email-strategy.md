# shroome Email Strategy

> Last updated: March 2026
> Owner: Marketing Director
> Tech stack: Resend API (sending) + Klaviyo (list management & segmentation)

---

## Philosophy

Our emails are a conversation, not a sales pitch. Every touchpoint should make the subscriber feel like an insider who made a smart decision joining the waitlist — not a lead in a funnel.

**Tone:** Warm, direct, slightly playful. Like a text from a friend who happens to know a lot about functional mushrooms.

**CTA framing:** Always "thank you / welcome" tone. Never acquisition-language like "CLAIM YOUR SPOT" or "DON'T MISS OUT." The subscriber is already in. The 20% off + free shipping launch discount is locked in for them — it is not something they need to act on or "claim." It is theirs. Subscribers who provide their phone number get an extra 10% off (stackable).

---

## Technical Setup

### Sending Infrastructure
- **Transactional & marketing sends:** Resend API
- **List management & segmentation:** Klaviyo
- **Sync:** Subscriber data pushes from Resend to Klaviyo for segmentation and analytics
- **Domain:** Sending from @drinkshroome.com (authenticated SPF/DKIM/DMARC)

### List Hygiene
- Monitor bounce rates per send (target: <2%)
- Suppress hard bounces immediately
- Soft bounce retry: 3 attempts over 72 hours, then suppress
- Unsubscribe processing: immediate, one-click

---

## Active Flows

### Flow 1: Welcome Email
- **Trigger:** Waitlist signup
- **Timing:** Day 0 (immediate)
- **Subject line:** "you just made the list"
- **Content mix:**
  - 60% — Beta-glucans education (what they are, why 70%+ matters, how shroome sources them)
  - 20% — Collagen introduction (grass-fed, bioavailable peptides, why it belongs in your morning)
  - 20% — The drink experience (what it tastes like, how it fits into your morning, the "no crash" promise)
- **CTA:** Soft — visit the site, follow on socials
- **Tone:** Grateful, informative. "Here's what you just signed up for, and here's why it matters."

### Flow 2: What's Inside
- **Trigger:** 7 days after waitlist signup
- **Timing:** Day 7
- **Subject line:** "what's actually in it"
- **Content mix:**
  - Deep dive on the formulation
  - Ingredient-by-ingredient breakdown with dosages
  - Why each ingredient is there (not filler, not fairy dust)
  - Comparison to competitors (without naming names): real doses vs. proprietary blends
- **CTA:** Soft — learn more on site, share with a friend
- **Tone:** Transparent, confident. "We'll tell you exactly what's inside because we're proud of it."

---

## Planned Flows (Pre-Launch Roadmap)

### Flow 3: Founder Story (Day 14)
- **Subject line:** TBD
- **Content:** Why shroome exists, the founder journey, what gap in the market this fills
- **Purpose:** Build emotional connection and brand loyalty before launch

### Flow 4: Launch Announcement (Launch Day)
- **Subject line:** TBD
- **Content:** Product is live, 20% off + free shipping automatically applied, direct link to shop. Phone number subscribers get extra 10% off (stackable)
- **Purpose:** Convert waitlist to customers
- **Note:** The discount is NOT a limited-time pressure tactic. Waitlist subscribers earned it by being early. Frame accordingly. The extra 10% for phone number is a thank-you for deeper engagement.

### Flow 5: Post-Purchase (Post-Launch)
- **Subject line:** TBD
- **Content:** Thank you, how to prepare, what to expect in the first week
- **Purpose:** Reduce buyer's remorse, set expectations, encourage habit formation

---

## Email Design Standards

### Layout
- Single column, mobile-first
- Max width: 600px
- Background: Cream (#FDF4EE)
- Text: Navy (#1B1F3B)
- CTA buttons: Lime (#C8FF3A) background, Navy text

### Typography
- Headings: Instrument Serif italic (fallback: Georgia)
- Body: Syne (fallback: system-ui, sans-serif)
- Body size: 16px minimum
- Line height: 1.5

### Imagery
- Product sachet photography in headers when relevant
- No stock photography
- Cloud/gradient backgrounds acceptable for header sections
- Keep images under 200KB for deliverability

---

## Metrics & Targets

| Metric | Target | Industry Avg (CPG) |
|---|---|---|
| Open rate | 40%+ | 25-30% |
| Click rate | 5%+ | 2-3% |
| Unsubscribe rate | <0.5% per send | <0.5% |
| Bounce rate | <2% | <2% |
| Spam complaint rate | <0.1% | <0.1% |

---

## Rules of Engagement

1. Never send more than 2 emails per week (pre-launch)
2. Never use all-caps subject lines
3. Never use urgency/scarcity tactics for the waitlist discount
4. Always include a one-click unsubscribe link
5. Every email should teach something — never send content-free promotional blasts
6. Preview text is as important as the subject line — write both together
7. Test every email on mobile before sending (Gmail app, Apple Mail, Outlook)
