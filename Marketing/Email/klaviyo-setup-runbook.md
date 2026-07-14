# klaviyo setup runbook — waitlist lifecycle build
> Date: 2026-07-14 · Owner: Lifecycle & Retention pod
> Companion docs: `lifecycle-audit-2026-07-14.md` (fix blockers B1/B2 first) and `Flows/engagement-capture-flows.md` (all copy + flow logic).
> Everything below is exact click-paths in the current Klaviyo UI (2026). Budget: ~1 focused day, plus carrier wait times (start §7 RCS and TFN verification TODAY — they gate drop day).

---

## 0. prerequisites (30 min)

1. **Account & sender info** — Klaviyo → Settings → Organization: legal entity ZSQUARED INC, physical mailing address (also fixes the CAN-SPAM footer gap — audit H6), default sender `shroomé <hello@drinkshroome.com>`.
2. **Dedicated sending domain** — Settings → Email → Sending domains → Add `send.drinkshroome.com` → copy the 3 CNAMEs + TXT into GoDaddy DNS → wait for green "Verified". (Separate from Resend's verification of the root domain — do both.)
3. **DMARC** — GoDaddy DNS: TXT `_dmarc` = `v=DMARC1; p=none; rua=mailto:dmarc@drinkshroome.com`.
4. Confirm Vercel env vars match dashboard reality: `KLAVIYO_LIST_ID`, `KLAVIYO_SMS_LIST_ID` (Lists → click list → ID is in the URL, 6 chars).

## 1. lists (10 min)

Audiences → Lists & segments → Create list:

| List | Settings |
|---|---|
| `Waitlist — Email` (should already exist = `KLAVIYO_LIST_ID`) | Opt-in: **single opt-in** (Settings tab of the list). Double opt-in would strand signups who don't confirm |
| `Waitlist — SMS` (= `KLAVIYO_SMS_LIST_ID`) | **Single opt-in** — the code relies on this (audit H9). Verify: List → Settings → Consent |
| `Pour List` (step 5) | manual adds / CSV from IG broadcast channel joiners |

## 2. profile properties (15 min)

Properties auto-create on first write — no schema UI needed. But pre-create via one test profile so segment builders can see them: Audiences → Profiles → Create profile → add each custom property from the schema table in `engagement-capture-flows.md §3` with a dummy value, exact keys: `referral_code`, `referred_by`, `referral_count` (number), `referral_credit` (number), `sms_opt_in` (boolean), `sms_consent_at` (datetime), `discount_tier`, `waitlist_position` (number), `flavor_pref`, `temp_pref`, `ritual_time`, `current_drink`, `pour_profile`, `quiz_completed_at` (datetime), `birthday` (date), `pour_list_joined` (boolean), `ugc_entry` (boolean), `ig_handle`.

**Type discipline:** first write wins for type inference — make sure `referral_count` etc. are written as numbers by the webhook, never `"3"` strings, or segment math breaks.

## 3. segments (20 min)

Audiences → Lists & segments → Create segment — definitions:

| Segment | Definition (segment builder) |
|---|---|
| `SMS — Early Access` | *If someone is or is not consented: SMS consent is subscribed* |
| `Email Only (no SMS)` | *In list Waitlist — Email* AND *SMS consent is not subscribed* |
| `Quiz Complete` | *Properties about someone: quiz_completed_at is set* |
| `Referrers 1+` / `3+` / `5+` | *referral_count ≥ 1 / 3 / 5* (three segments) |
| `Birthday Known` | *birthday is set* |
| `Engaged 30d` | *Opened Email ≥1 in last 30 days* OR *Clicked Email ≥1 in last 30 days* OR *Quiz Completed ≥1 in last 30 days* |
| `Dormant 21d+` | *Received Email ≥3 over all time* AND *Opened Email = 0 in last 30 days* AND *Clicked Email = 0 in last 30 days* AND *quiz_completed_at is not set* AND *referral_count < 1* |

## 4. flows (half day)

Flows → Create flow → Build your own. For each: build → set messages to **Live** (not "Manual") → turn flow status to Live.

### FLOW A — Welcome Ladder
- **Trigger:** Metric → `Waitlist Signup` (this metric already exists — the API fires it; check Analytics → Metrics to confirm events are arriving. If zero events ever, the API integration is broken — see audit M1).
- **Flow filters:** *Has Waitlist Signup zero times since starting this flow* (prevents re-entry on double signup) AND *SMS/email consent: email subscribed*.
- Steps (copy from `engagement-capture-flows.md §4`):
  1. Email 1 — no delay. Uses `{{ person|lookup:'waitlist_position' }}` and `{{ person|lookup:'referral_code' }}`.
  2. Time delay 1 day → **Conditional split:** *sms_opt_in equals true* → NO branch: Email 2. YES: skip.
  3. Time delay 1 day → **Conditional split:** *quiz_completed_at is set* → NO: Email 3.
  4. Time delay 2 days → **Conditional split:** *referral_count ≥ 1* → NO: Email 4.
  5. Time delay 6 days → Email 5 (both branches).
  6. Time delay 11 days → **Conditional split:** *(Opened Email ≥1 since starting this flow) OR (quiz_completed_at is set) OR (referral_count ≥ 1)* → NO: Email 6.
- Smart Sending ON for emails 2–6, OFF for Email 1 (welcome must always send).
- **This flow REPLACES the broken Vercel cron Day-7 email (audit B2).** After it's live: delete the cron entry from `vercel.json` or leave the route dormant, and port the `sachetEmail` "what's inside" content into Email 5's education block or a Day-7 slot if you want to keep it 1:1.

### FLOW B — SMS Welcome
- **Trigger:** *Added to list* → `Waitlist — SMS`. Flow filter: *SMS consent is subscribed*.
- Step: SMS 1 (opt-in confirm) — no delay. Quiet hours will hold it if consent lands at night; that's correct behavior.
- Settings → Text messaging → confirm **quiet hours 9:00am–8:00pm recipient local** and STOP/HELP auto-responses are customized (HELP reply: "shroomé: ceremonial matcha drops. support: info@drinkshroome.com. msg&data rates may apply. reply STOP to opt out.").

### FLOW C — Quiz Completed
- **Trigger:** Metric → `Quiz Completed` (fired by the quiz webhook, §5).
- Steps: 15-min delay → "first pour profile" email — one template with conditional blocks: `{% if person|lookup:'flavor_pref' == 'strawberry' %}` … strawberry hero … `{% endif %}` etc. (The −50 waitlist positions is applied by the webhook itself, not the flow.)

### FLOW D — Referral Milestones
- **Trigger:** Metric → `Referral Landed` (must be fired **on the referrer's profile** — requires the small API change below, §5b).
- **Trigger split** on *referral_count*: =1 → SMS 4 · =3 → SMS 5 · =5 → SMS 6. Each SMS step gets a **conditional split** above it: *SMS consent subscribed?* NO → send the email fallback version instead (same copy, email format).
- Flow filter: none on re-entry (each referral event should be evaluated).

### FLOW E — Birthday
- **Trigger:** Date property → `birthday` → *on the date, recurring yearly*, send time 9:00am recipient local.
- Step: conditional split on SMS consent → SMS 8, else birthday email variant.

### FLOW F — Drop Day
Built as **scheduled campaigns**, not flows (one-time sends): T-1d 6:00pm code-delivery email (segment: all waitlist; body states SHROOME20, with a dynamic block for the SMS segment: "your SHROOME30 replaces it — best code wins") · T-1d 6:05pm code SMS to `SMS — Early Access` · T-0 SMS 7 at T-10min · T-0 doors-open email. **Copy guardrail: the launch-roadmap.md:148 SMS draft says "stacks" — that copy is dead. Use the SMS 7 / campaign copy from engagement-capture-flows.md.** Smart Sending OFF on both T-0 sends.

## 5. wiring the quiz

**Recommended: Typeform → Vercel webhook** (Klaviyo forms can't do multi-step logic + the position bump).

a) Quiz webhook:
1. Typeform: 4 questions (strawberry/vanilla · hot/iced · morning/afternoon · current drink), hidden field `email` (pass via link: `?email={{ email }}` from Klaviyo emails using `{{ person.email }}`).
2. New route `app/api/quiz/route.ts` (mirror the waitlist route's Klaviyo client): verify Typeform signature → profile-import upsert with `flavor_pref`, `temp_pref`, `ritual_time`, `current_drink`, `quiz_completed_at`, computed `pour_profile` (e.g. `${temp} ${flavor} ${ritual_time === 'morning' ? 'sunrise' : 'reset'}`), and `waitlist_position` −50 (floor at 1) → fire `Quiz Completed` event.
3. Typeform → Connect → Webhooks → the Vercel URL.

b) Referral counter (enables FLOW D — closes audit M2, where /api/referral's `properties.referred_by` filter doesn't work):
- In `/api/waitlist`, when `ref` is present: resolve the referrer (maintain a code→email map — simplest: a second tab in the Google Sheet, or store the code as Klaviyo `external_id` at signup so you can GET the profile by external_id) → increment `referral_count`, set `referral_credit` (1→5, 3→10, 5→15, cap 15) → fire `Referral Landed` event **on the referrer's profile** with `{ new_count }`.
- Leaderboard: weekly export of `Referrers 1+` sorted by `referral_count` → manual "leaderboard" campaign; winner gets the case 001 numbered box.

c) Birthday capture: Klaviyo form (popup or embed on /welcome) with only the birthday field, targeted to `Quiz Complete` segment, or a one-question email (Email 5 P.S. slot): "birthday sachet drop — tell us the date." Form writes straight to the `birthday` property.

## 6. code changes this runbook assumes (from audit — do before going live)

1. B1: verify Resend domain (or move ALL sends into Klaviyo and retire Resend for marketing).
2. B2: retire the Day-7 cron once FLOW A is live.
3. H1: enforce Turnstile token presence.
4. H2: dedupe referral codes (reuse existing on re-signup) — REQUIRED or FLOW D counts drift.
5. H3: real E.164 validation — REQUIRED or SMS list silently loses bad-format phones.
6. H6/H7: postal address + List-Unsubscribe headers on any remaining Resend sends.
7. H8: update `emails.ts` referral block, `/refer` page ($5-forever copy → $5/$10/$15 cap), and roadmap SMS copy to "replaces / best code wins".
8. H9: record SMS consent via subscription job + `sms_consent_at`.

## 7. RCS registration (start today — 2-4 week carrier approval)

1. Prereq: SMS is fully provisioned first — toll-free number verified (Settings → Text messaging → verification status; if not submitted: company info + opt-in screenshot of the site's consent language + sample messages — use SMS 1 from the copy doc).
2. Settings → Text messaging → **Sender info / RCS** → Register brand: legal name ZSQUARED INC, brand name "shroomé", logo (224×224 PNG from `Brand/Logo & Marks/`), banner 1440×448, brand color #1B1F3B, contact `info@drinkshroome.com`, privacy + terms URLs (drinkshroome.com/privacy, /terms).
3. Submit for carrier verification. Status shows per-carrier; Android users get branded blue-bubble sender once approved. iOS falls back to SMS automatically — never assume RCS features (rich cards) in critical sends; SMS 7 must work as plain text.
4. When brand refresh lands, update logo/banner here (already in launch-roadmap Brand Asset Refresh SOP §4).

## 8. QA test plan (run before flipping anything live)

**A. End-to-end test profile (30 min)**
1. Sign up on the live site with `zak+qa1@communityattire.com`, email only → verify: Klaviyo profile exists with `referral_code`/`waitlist_position`/consent; row in Google Sheet; Email 1 arrives (check spam folder AND headers — DKIM pass, from `hello@drinkshroome.com`); Vercel logs clean.
2. Add phone (own cell) at the phone step → verify: E.164 correct on profile, on SMS list, SMS consent = subscribed, `sms_consent_at` set; SMS 1 arrives with STOP/HELP text; reply **HELP** → auto-reply; reply **STOP** → confirmation + consent flips to unsubscribed in Klaviyo; re-text **START** to restore for further testing.
3. Sign up `zak+qa2@…` via `?ref=<qa1's code>` → verify: qa2 has `referred_by`; qa1's `referral_count` = 1; `Referral Landed` fired; SMS 4 arrives (inside quiet hours).
4. Complete the quiz as qa1 → properties written, position bumped −50, `Quiz Completed` event, pour-profile email arrives with correct flavor block.
5. Double-signup qa1 again → referral code UNCHANGED (post-H2 fix), no duplicate welcome email.
6. Unsubscribe qa1 via the email footer link → suppressed in Klaviyo; confirm removal is possible WITHOUT selecting a reason (post-H5 fix); confirm qa1 exits FLOW A (check flow analytics — "skipped: suppressed").
7. Time-travel test for FLOW A branches: use flow preview ("Preview with profile") for Emails 2–6 rather than waiting 21 days; confirm branch logic against a phone-having + quiz-complete profile (should get 1, 5 only).
8. Turnstile: POST the API directly with no token (curl from §2 of the audit) → expect 403 after the H1 fix.

**B. Seed-list deliverability check (before first real campaign)**
1. Build a seed list: Gmail, Outlook.com, Yahoo, iCloud, + a Google Workspace address.
2. Send Email 1 template as a campaign to seeds only. Check: inbox vs spam placement per provider; `Authentication-Results` header shows SPF=pass, DKIM=pass (d=send.drinkshroome.com), DMARC=pass; images load; unsubscribe one-click works from the Gmail native button (List-Unsubscribe header present); rendering on Gmail app / Apple Mail / Outlook per email-strategy rule 7.
3. Optional: run the template through a placement tool (GlockApps/Mail-tester — target score ≥9/10).
4. SMS seed: send SMS 2 template to 3 team phones across carriers (Verizon, AT&T, T-Mobile) → confirm no carrier filtering (delivery receipts in Klaviyo), link preview works, sender shows toll-free number (or RCS brand once approved).

**C. Go-live checklist**
- [ ] All audit BLOCKER + HIGH items closed
- [ ] Flows A–E live, F drafted; cron removed
- [ ] Quiet hours + STOP/HELP verified on a real device
- [ ] Segments returning sane counts (Email Only + SMS Early Access ≈ full list)
- [ ] Dashboard drift check: Sheet rows ≈ Klaviyo list size
- [ ] Weekly: review flow analytics (opens, clicks, unsub <0.5%/send, spam <0.1% per email-strategy targets)
