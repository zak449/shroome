# lifecycle & retention audit — email + SMS pipeline
> Date: 2026-07-14 · Auditor: Lifecycle & Retention pod · Scope: code-level audit of waitlist → welcome → Day-7 → unsubscribe pipeline, live endpoint test, deliverability posture
> Verdict: **PARTIALLY WORKING.** Signup capture is resilient (triple-write: Klaviyo + Sheets + admin email), but the Day-7 email almost certainly never sends, Resend domain verification is still pending (welcome emails may be silently failing), and referral-reward copy contradicts the CFO ruling on three different surfaces.

---

## 1. Findings table

Severity key: **BLOCKER** = revenue/compliance stops here · **HIGH** = fix before next send · **MED** = fix this sprint · **LOW** = hygiene

| # | Sev | Location | Finding | Fix |
|---|-----|----------|---------|-----|
| B1 | **BLOCKER** | `Executive/CEO/Vision & Strategy/launch-roadmap.md:29` + `app/api/waitlist/route.ts:222-231` | **Resend sending domain not verified.** Sends from `hello@drinkshroome.com` will be rejected by Resend until drinkshroome.com is verified (SPF/DKIM). Errors are caught and only `console.error`'d — the API still returns `success:true`, so signups may be getting **no welcome email at all** and nobody would know. | Verify domain in Resend → Settings → Domains TODAY. Then check Resend logs for the failure backlog. Add alerting: if `resend.emails.send` throws, fire the admin notification with the error. |
| B2 | **BLOCKER** | `app/api/cron/follow-up/route.ts:34` | **Day-7 email exists in code but almost certainly never fires.** The cron filters Klaviyo profiles with `greater-or-equal(properties.signup_date,…)`. The Klaviyo `/api/profiles` filter does **not support custom `properties.*` fields** (only id, email, phone_number, external_id, created, updated, subscription fields). The query returns 400 → route returns 500 → `sent: 0` every day. | Confirm in Vercel → Cron logs (expect daily "Klaviyo query failed"). Best fix: stop sending Day-7 via Resend cron entirely — trigger a **Klaviyo flow off the "Waitlist Signup" metric with a 7-day delay** (see runbook). Klaviyo then also handles suppression, quiet hours, and retries for free. |
| H1 | HIGH | `app/api/waitlist/route.ts:176-181`, `route.ts:13`, `app/page.tsx:248` | **Turnstile is bypassable.** Verification only runs `if (turnstileToken)` — a direct POST with no token skips CAPTCHA entirely. The frontend `error-callback` also submits an empty token (skips verify), and a missing `TURNSTILE_SECRET_KEY` auto-passes. Bot signups pollute the list and burn Resend sends. | Require the token on email-step submissions: reject when `!turnstileToken` (keep the phone-step call exempt only if email already passed, e.g. short-lived signed cookie). Fail closed when the secret env var is set but verification errors. |
| H2 | HIGH | `app/api/waitlist/route.ts:184-189` | **Double signup regenerates the referral code.** No dedupe: every POST mints a new code and upserts it onto the Klaviyo profile, overwriting the old one. A subscriber who re-enters their email gets a new code — every link they already shared stops counting for them, and `/refer` shows 0. Also: duplicate welcome emails + duplicate Sheets rows. | Before generating, GET the Klaviyo profile by email; if `properties.referral_code` exists, reuse it and skip the welcome send (or send a "you're already in" variant). |
| H3 | HIGH | `app/api/waitlist/route.ts:36-38, 70` | **Naive E.164 handling can kill the whole Klaviyo sync.** `+1` is prefixed to stripped digits — user input `1 (415) 555-2671` becomes `+114155552671` (invalid); `07911 123456` (UK, no +) becomes `+107911123456`. Klaviyo rejects the profile-import → `profileId` is undefined → line 70 `return` silently abandons list add, consent, SMS, and event. API still returns success. | Validate/normalize with `libphonenumber-js` (default region US, strip leading `1` when 11 digits). On invalid phone: proceed with email-only sync and return a soft error so the UI can re-prompt. Never let a bad phone abort the email-side sync. |
| H4 | HIGH | `app/api/cron/follow-up/route.ts:48-70` | **Unsubscribed users would still get the Day-7 Resend email.** Unsubscribe suppresses the profile in Klaviyo, but the cron sends through Resend using a raw profile query — Klaviyo suppression does not gate Resend. CAN-SPAM violation (sending after opt-out). | Moot if B2 fix moves Day-7 into Klaviyo flows (suppression honored automatically). If the cron stays: filter out profiles with `subscriptions.email.marketing.suppression` before sending. |
| H5 | HIGH | `app/unsubscribe/page.tsx:177-195` | **Unsubscribe is gated on picking a reason.** "Confirm unsubscribe" is disabled until a reason is selected, after a 2-step "are you sure" flow. CAN-SPAM: opt-out may not be conditioned on anything beyond an email address; FTC's 2024 click-to-cancel posture makes reason-walls a real risk. | Make reason optional (add a visible "skip" / enable Confirm with no reason). One page, one click is the safe pattern. |
| H6 | HIGH | `app/lib/emails.ts:41-44` | **No physical postal address in the email footer.** CAN-SPAM requires a valid postal address in every commercial email. Footer currently has only © + unsubscribe. | Add ZSQUARED INC's mailing address (or a registered PO box / virtual address) to `emailShell()`. |
| H7 | HIGH | `app/api/waitlist/route.ts:222-227`, `app/api/cron/follow-up/route.ts:65-70` | **No `List-Unsubscribe` / `List-Unsubscribe-Post` headers on Resend sends.** Gmail/Yahoo bulk-sender rules require RFC 8058 one-click unsubscribe for marketing mail; missing headers = spam-folder risk even at low volume. | Pass headers to `resend.emails.send`: `List-Unsubscribe: <https://www.drinkshroome.com/unsubscribe?email=…>, <mailto:unsub@drinkshroome.com>` and `List-Unsubscribe-Post: List-Unsubscribe=One-Click` (wire a GET/POST handler that unsubscribes without the reason wall). |
| H8 | HIGH | `app/lib/emails.ts:129-131` vs `app/refer/page.tsx:503-508` vs `launch-roadmap.md:148` vs CFO ruling | **Referral & discount promises contradict each other on 3 surfaces.** Welcome email: "refer 3 → extra 10% off (stackable)". /refer page: "$5 per referral, no limit — refer 100, earn $500". Roadmap SMS copy: SHROOME30 "stacks because you gave us your number". CFO ruling (2026-07-14): **SHROOME20/SHROOME30 mutually exclusive — best code wins; referral rewards are FIXED credits $5/$10/$15 at 1/3/5 referrals.** Every legacy promise is a liability. | Update `emails.ts` referral block to the $5/$10/$15 ladder; update `/refer` page copy ("no limit / $500" must go); update roadmap SMS copy to "SHROOME30 replaces your 20% code". Canonical copy: `Marketing/Email/Flows/engagement-capture-flows.md`. |
| H9 | HIGH | `app/api/waitlist/route.ts:119-129` | **SMS consent is never recorded via the subscription API.** Step 4 only creates a list relationship. SMS marketing consent is only set if that list has single opt-in enabled (a dashboard setting nobody can verify from code), and no `consented_at` timestamp or consent text snapshot is stored — weak TCPA evidence trail. | Use `profile-subscription-bulk-create-jobs` with `sms: { marketing: { consent: "SUBSCRIBED" } }` (mirrors Step 3), and store `sms_consent_at` + the exact disclosure string as profile properties. Frontend disclosure exists (`app/page.tsx:929` — good) but should also mention HELP, msg frequency, and link to Terms/Privacy. |
| M1 | MED | `app/api/waitlist/route.ts:26, 188-192` | **Klaviyo failure ≠ lost signup, but it is silent.** If Klaviyo is down or `KLAVIYO_API_KEY` unset, the signup still lands in Sheets + admin email (good), and response is still `success:true` (acceptable) — but there is no retry/queue and no alert, so drift between Sheets and Klaviyo is invisible. | Weekly reconcile Sheets rows vs Klaviyo list count (dashboard/stats route already reads both). Consider re-driving failed syncs from the Sheet. |
| M2 | MED | `app/api/referral/route.ts:31-42` | **Referral counts are likely always 0, and capped at ~20.** Same unsupported-filter problem as B2 (`properties.referred_by` not filterable on /api/profiles), and no pagination even if it worked. The /refer dashboard silently degrades to 0 on error — users who share links see no progress. | Track referrals as a counter: on signup with `ref`, look up the referrer profile by... code (needs a code→profile mapping; store `referral_code` as `external_id` or keep a Sheet/KV index) and increment `referral_count` on their profile. Segments then key off `referral_count`. |
| M3 | MED | `app/api/cron/follow-up/route.ts:33-45` | Cron reads only the first page of profiles (default page size ~20) — >20 signups/day would be skipped. | Moot with B2 fix; else paginate via `links.next`. |
| M4 | MED | `app/api/cron/follow-up/route.ts:53-59` | Dedupe check filters events by `metric.name` — events API filters on `metric_id`, so this 400s → `eventsRes.ok` false → **fails open** → duplicate sends possible. | Moot with B2 fix; else resolve metric ID once and filter on it, and fail **closed** on lookup error. |
| M5 | MED | `app/api/cron/follow-up/route.ts:8-11` + `vercel.json:3-6` | If `CRON_SECRET` is unset in Vercel, Vercel sends no Authorization header → 401 every day, silently. Cron schedule itself is fine (`0 14 * * *` = 14:00 UTC daily). | Confirm `CRON_SECRET` exists in Vercel env; check cron invocation logs for 401s. |
| M6 | MED | `app/api/waitlist/route.ts:160` | **No rate limiting.** Anyone can POST arbitrary emails in a loop → email-bombing third parties with welcome emails from your domain, torching sender reputation + Resend quota. Turnstile would mitigate, but see H1. | Add per-IP rate limit (Vercel WAF rule or Upstash Ratelimit) + enforce Turnstile (H1). |
| M7 | MED | `app/api/unsubscribe/route.ts:3-9` | Unsubscribe endpoint accepts any email, unauthenticated — anyone can unsubscribe anyone else. Low abuse odds pre-launch, but pair with H7's one-click work. | Sign the unsub link (`email` + HMAC token) in `unsub()` in `emails.ts`; accept unsigned only from the manual page with a confirmation email. |
| M8 | MED | `scripts/google-sheets-webhook.js:41-47` vs `app/api/waitlist/route.ts:201-211` | **The Sheets webhook drops the referral data.** Route POSTs `referral_code`, `referred_by`, `discount`, `total_discount` — Apps Script writes only Email/Phone/Date/Source/Status. Your only non-Klaviyo record of referral codes is discarded, so codes are unrecoverable if Klaviyo sync failed (M1) or codes get overwritten (H2). | Redeploy Apps Script appending `data.referral_code`, `data.referred_by`, `data.total_discount` columns. |
| M9 | MED | `app/api/waitlist/route.ts:219` | Welcome email only sends when `!phone`. Fine for the current 2-step UI, but any future single-call integration (popups, partner forms) that includes phone on first POST silently produces no welcome email. | Key the welcome send off "profile is new" (see H2 dedupe) instead of "phone absent". |
| L1 | LOW | `app/api/waitlist/route.ts:238-239` | Raw `email`/`phone` interpolated into admin-email HTML — HTML/content injection into your own inbox (phishing vector). | Escape or send plain-text admin notifications. |
| L2 | LOW | `app/api/waitlist/route.ts:6-8` | Referral codes are 6-char `Math.random` with no uniqueness check — collisions possible at scale; also non-crypto RNG is guessable. | Check-and-regenerate on collision; use `crypto.randomUUID()`-derived slice. |
| L3 | LOW | `app/api/unsubscribe/route.ts:24` | Email not URL-encoded inside the Klaviyo filter query string — `+` in emails (`zak+test@…`) becomes a space and lookup misses. Same bug pattern in the cron/referral routes' filters. | `encodeURIComponent` the whole `filter=` value. |
| L4 | LOW | `app/lib/emails.ts:54-55` + `Marketing/Email/email-strategy.md:101` | Full-bleed hero JPGs likely exceed the strategy's own 200KB image budget; heavy remote images hurt Gmail clipping/load. | Compress `email-hero-cup.jpg` / `email-clouds-bg.jpg` to <200KB. |
| L5 | LOW | `Marketing/Email/email-strategy.md:15, 73` + `route.ts:147, 207` | Docs and event/Sheet properties still say "extra 10% (stackable)" / `stackable_extra_10`. Wrong per CFO ruling; the property name will keep re-infecting copy. | Update strategy doc; rename property to `discount_tier_upgrade` (keep old one populated during transition). |

---

## 2. Live endpoint test — 2026-07-14

**Result: TEST BLOCKED — could not reach drinkshroome.com from this environment. No signup was created.**

Exactly what happened:

| Attempt | Command | Result |
|---|---|---|
| 1 | `curl -L -X POST https://www.drinkshroome.com/api/waitlist` with `{"email":"zak+launchtest@communityattire.com"}` | `curl: (56) CONNECT tunnel failed, response 403` — the sandbox's egress proxy refused the tunnel (policy denial), HTTP status 000, request never left the environment |
| 2 | Same POST to `https://drinkshroome.com/api/waitlist` (non-www) | Identical: CONNECT rejected with 403 by the egress gateway |
| 3 | WebFetch GET `https://www.drinkshroome.com/` | HTTP 403 Forbidden (same egress policy) |

Proxy status log confirms `connect_rejected: gateway answered 403 to CONNECT (policy denial)` for both `www.drinkshroome.com:443` and `drinkshroome.com:443`. This is an **environment network-policy block, not a finding about the site** — it does not tell us whether Turnstile is enforced live. Note the environment README explicitly says policy 403s must be reported, not retried or worked around.

**Action for a human (2 min):** run from any normal machine:

```bash
curl -s -w "\n%{http_code}\n" -X POST https://www.drinkshroome.com/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"zak+launchtest@communityattire.com"}'
```

Interpretation guide:
- `403 CAPTCHA verification failed` → **PASS** (bot protection enforced — but note H1: per code, this only happens if the request *includes* an invalid token; a token-less request skips the check)
- `200 {"success":true,"referralCode":"…"}` → signup accepted **without any Turnstile token → confirms H1 bypass live**; then check zak+launchtest inbox for the welcome email (tests B1) and the Klaviyo profile + Sheets row
- `410` → `WAITLIST_CLOSED` is set (unexpected in waitlist mode)
- `500` → check Vercel function logs

---

## 3. Deliverability checklist

| Item | Status (from code/docs) | Action |
|---|---|---|
| Resend domain verification (drinkshroome.com) | **PENDING** per launch-roadmap.md:29 — B1 blocker | Resend → Domains → add drinkshroome.com → add DKIM (`resend._domainkey`) + SPF include records at GoDaddy → wait for "Verified" |
| SPF | Unknown until domain added | `v=spf1 include:_spf.resend.com ~all` (merge with existing includes — one SPF record only). Klaviyo sends use Klaviyo's shared or dedicated domain — if setting up dedicated sending domain (`send.drinkshroome.com`), add its CNAMEs too |
| DKIM | Unknown | Resend DKIM record + Klaviyo dedicated-domain CNAMEs (Klaviyo → Settings → Email → Domains) |
| DMARC | Not referenced anywhere in repo | Add `_dmarc.drinkshroome.com TXT "v=DMARC1; p=none; rua=mailto:dmarc@drinkshroome.com"` now; tighten to `p=quarantine` after 2-4 clean weeks. Required by Gmail/Yahoo for bulk senders |
| From addresses | `hello@drinkshroome.com` (welcome, Day-7), admin notices to `info@drinkshroome.com` | Fine once verified. Keep marketing (Klaviyo) and transactional (Resend) on separate subdomains ideally (`hello@drinkshroome.com` vs Klaviyo `hello@send.drinkshroome.com`) to isolate reputation |
| List-Unsubscribe one-click headers | **Missing** (H7) | Add to every Resend marketing send |
| Physical address in footer | **Missing** (H6) | Add to `emailShell()` |
| Klaviyo sender profile | Not verifiable from code | Klaviyo → Settings → Organization: legal name, address, default from `hello@drinkshroome.com` |
| Klaviyo SMS: TFN/short code + HELP/STOP | Not verifiable from code | Toll-free number verification takes ~1-3 weeks — start now. Confirm auto-responses for STOP/HELP are enabled and quiet hours set (see runbook) |
| Klaviyo RCS registration | **PENDING** per launch-roadmap.md:39 | Settings → Text messaging → RCS: submit brand name, logo, banner; carrier approval ~2-4 weeks — start now for drop-day branded blue bubbles |
| Warm-up plan | n/a | Pre-launch volume is low (fine). For drop-day blast: send in 2-3 waves, engaged segment first |
| Image weight | Hero JPGs likely >200KB (L4) | Compress before next send |

## 4. Verify-in-dashboard checklist (things code can't prove)

- [ ] **Vercel env vars present:** `RESEND_API_KEY`, `KLAVIYO_API_KEY`, `KLAVIYO_LIST_ID`, `KLAVIYO_SMS_LIST_ID`, `GOOGLE_SHEETS_WEBHOOK_URL`, `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (must NOT start with `REPLACE` — page.tsx:246 falls back to the always-pass test key `1x00000000000000000000AA`), `CRON_SECRET`, and `WAITLIST_CLOSED` **unset/false**
- [ ] **Resend dashboard → Logs:** are welcome emails actually delivering, or erroring on unverified domain? (B1 — this is the single most important check)
- [ ] **Vercel → Cron:** is `/api/cron/follow-up` returning 200 with `sent > 0`, or 500/401 daily? (B2/M5)
- [ ] **Klaviyo → Lists:** email list ID and SMS list ID match the env vars; **SMS list has single opt-in enabled** (route.ts comment assumes it — H9)
- [ ] **Klaviyo → SMS settings:** sending number provisioned & verified, STOP/HELP auto-replies on, quiet hours enforced, RCS registration submitted
- [ ] **Klaviyo → Flows:** does any flow trigger off "Waitlist Signup" metric or list-add? (Code fires the event; nothing in code proves a flow consumes it)
- [ ] **Klaviyo → Profiles:** spot-check a recent signup: has `referral_code`, `signup_date`, email consent SUBSCRIBED; phone signups have valid E.164 + SMS consent
- [ ] **Google Sheet "Signups" tab:** rows arriving; count vs Klaviyo list size (drift = M1)
- [ ] **Turnstile dashboard (Cloudflare):** widget traffic present = keys are real, not test keys
- [ ] **Send a real end-to-end test signup** (roadmap item, still open) — the curl from §2 plus inbox check

---

*Companion docs: `Marketing/Email/Flows/engagement-capture-flows.md` (capture-ladder architecture + all copy) and `Marketing/Email/klaviyo-setup-runbook.md` (click-path setup + QA).*
