# progressive capture & reward architecture — "give data, get status"
> Date: 2026-07-14 · Owner: Lifecycle & Retention pod · Status: READY TO BUILD
> Model: every piece of info a subscriber gives us earns a real, named reward. drop-culture framing throughout: the waitlist is the line, data moves you up the line, SMS gets you through the door first.
>
> **CFO GUARDRAILS (2026-07-14 — non-negotiable, overrides all older docs):**
> 1. `SHROOME20` and `SHROOME30` are **mutually exclusive. never say "stacks."** Approved phrasing: *"SHROOME30 replaces your 20% code"* / *"your best code wins."*
> 2. Referral rewards are **fixed credits: $5 / $10 / $15 at 1 / 3 / 5 referrals.** Not percentages, not stacking, hard cap at $15 (+ leaderboard prize). The live /refer page's "no limit, refer 100 earn $500" copy must be replaced.

---

## 1. the ladder (signup → superfan)

| Step | They give | They get (instant, named) | Data captured |
|---|---|---|---|
| 0 | email | waitlist number + personal referral link + **SHROOME20** locked for launch | email, `referral_code`, `referred_by`, `waitlist_position` |
| 1 | phone (SMS opt-in) | **+10 min early drop access** + **SHROOME30 (replaces the 20)** | phone E.164, `sms_opt_in`, `sms_consent_at` |
| 2 | flavor + ritual quiz (4 q's) | their **"first pour profile"** + **jump 50 spots** up the list | `flavor_pref`, `temp_pref`, `ritual_time`, `current_drink`, `pour_profile` |
| 3 | birthday | **birthday sachet drop** — a free sachet rides along with their box in their birthday month | `birthday` |
| 4 | referrals | **$5 / $10 / $15 credit at 1 / 3 / 5** + leaderboard: **top referrer gets case 001, hand-numbered box** | `referral_count`, `referral_credit` |
| 5 | UGC / follow + join the "pour list" broadcast channel | entry into the **line-skip giveaway** (winner goes to position #1 for the next drop) | `pour_list_joined`, `ugc_entry`, `ig_handle` |

Design rules: one ask per message, ever. Reward is named before the ask. Nothing is "unlock 10% off" vague — everything is a thing you can hold (a spot, a code, a sachet, a numbered box).

---

## 2. klaviyo flow map

**Trigger metric legend:** `Waitlist Signup` (fired by /api/waitlist), `Quiz Completed` (fired by quiz webhook), `Referral Landed` (fired by /api/waitlist when `ref` present — fire it on the REFERRER's profile, see runbook §4), plus list-adds and date-property triggers.

```
FLOW A — welcome ladder (email)          FLOW B — sms welcome (SMS)
trigger: Metric "Waitlist Signup"        trigger: Added to SMS List (consent = subscribed)
filter: first occurrence only            quiet hours: 9a-8p profile local time
│                                        └─ 0 min .... SMS 1 (opt-in confirm, STOP/HELP)
├─ 0 min ...... EMAIL 1 welcome
├─ day 1 ...... branch: sms_opt_in?
│     ├─ NO ... EMAIL 2 sms-upgrade nudge
│     └─ YES .. skip
├─ day 2 ...... branch: quiz_completed_at set?
│     ├─ NO ... EMAIL 3 quiz  ──────────── +SMS 3 quiz nudge day 3, 11am,
│     └─ YES .. skip                        only if sms_opt_in AND quiz still not done
├─ day 4 ...... branch: referral_count ≥ 1?
│     ├─ NO ... EMAIL 4 referral push
│     └─ YES .. skip (they'll get milestone SMS/emails from FLOW D)
├─ day 10 ..... EMAIL 5 drop teaser (all)
└─ day 21 ..... branch: opened/clicked anything OR quiz done OR referred ≥1?
      ├─ NO ... EMAIL 6 re-engage (last touch before sunset segment)
      └─ YES .. exit

FLOW C — quiz completed                  FLOW D — referral milestones
trigger: Metric "Quiz Completed"         trigger: Metric "Referral Landed"
│                                        │  (evaluate profile.referral_count)
├─ 0 min: update waitlist_position       ├─ count = 1 → SMS 4 ($5) [email fallback if no sms]
│         (-50, handled by webhook)      ├─ count = 3 → SMS 5 ($10) [email fallback]
└─ 15 min: "first pour profile"          ├─ count = 5 → SMS 6 ($15) [email fallback]
   email (dynamic block per              └─ count > 5 → no message; leaderboard only
   flavor_pref × temp_pref)                 (weekly leaderboard digest = campaign, not flow)

FLOW E — birthday                        FLOW F — drop day (campaigns + 1 flow)
trigger: date property "birthday",       T-1d 6:00pm: EMAIL campaign — codes (SHROOME20 all;
9:00am profile local, yearly             SHROOME30 note to sms segment: "replaces your 20")
filter: consented                        T-1d 6:05pm: SMS campaign to sms list (code delivery)
└─ SMS 8 (or email if no sms consent)    T-0 10:00am: SMS 7 early-access T-10min (sms list only)
                                         T-0 10:10am: EMAIL "doors open" (everyone)
                                         [SMS 2 template = generic early-access alert for
                                          any future drop/restock]
```

Global suppressions on every flow: unsubscribed/suppressed profiles, `WAITLIST_CLOSED` cutover, and smart-sending OFF for SMS 7 / drop-day sends (they must arrive), ON everywhere else.

---

## 3. profile properties & segments schema

### properties (Klaviyo custom properties — exact keys)

| Key | Type | Set by | Values / notes |
|---|---|---|---|
| `referral_code` | string | /api/waitlist | 6-char; NEVER regenerate on re-signup (audit H2) |
| `referred_by` | string | /api/waitlist | referrer's code |
| `referral_count` | number | signup webhook increments on referrer | drives FLOW D |
| `referral_credit` | number | webhook | 0 / 5 / 10 / 15 — fixed, capped at 15 |
| `sms_opt_in` | boolean | /api/waitlist step-2 call | |
| `sms_consent_at` | datetime | /api/waitlist | TCPA evidence trail |
| `discount_tier` | string | /api/waitlist | `SHROOME20` \| `SHROOME30` (best code wins — one value, never both) |
| `waitlist_position` | number | signup counter | shown in welcome email |
| `flavor_pref` | string | quiz | `strawberry` \| `vanilla` \| `both` |
| `temp_pref` | string | quiz | `hot` \| `iced` |
| `ritual_time` | string | quiz | `morning` \| `afternoon` |
| `current_drink` | string | quiz | `coffee` \| `energy_drink` \| `matcha` \| `tea` \| `none` |
| `pour_profile` | string | quiz webhook | computed label, e.g. `iced strawberry sunrise` |
| `quiz_completed_at` | datetime | quiz webhook | branch key in FLOW A |
| `birthday` | date | birthday form | month/day is enough; year optional |
| `pour_list_joined` | boolean | manual/CSV or IG webhook | step 5 |
| `ugc_entry` | boolean | manual | line-skip giveaway entries |
| `ig_handle` | string | step-5 form | |

### segments

| Segment | Definition | Used for |
|---|---|---|
| `waitlist — all` | in email list, not suppressed | drop teaser, launch blast |
| `waitlist — email only` | all AND `sms_opt_in` ≠ true | EMAIL 2 nudge, T-1d "add your phone, last call" |
| `sms — early access` | SMS consent = subscribed | SMS 7, SHROOME30 delivery |
| `quiz complete` | `quiz_completed_at` is set | flavor-segmented drop creative (strawberry vs vanilla heroes) |
| `referrers 1+ / 3+ / 5+` | `referral_count` ≥ 1 / 3 / 5 | leaderboard digest, case 001 shortlist |
| `birthday known` | `birthday` is set | FLOW E |
| `engaged 30d` | opened or clicked email in 30d OR any event in 30d | healthy-send segment for deliverability |
| `dormant` | received ≥3 emails, zero opens/clicks 30d, no quiz, no referrals | EMAIL 6 target; suppress after no response |

---

## 4. READY-TO-PASTE EMAIL COPY (6)

Merge tags are Klaviyo syntax. All body copy is final; layout blocks in [brackets] map to the existing `emails.ts` design system (navy/lime/lavender canvas).

---

### EMAIL 1 — welcome (Day 0, instant)

**subject:** you're in. here's your number.
**preview:** waitlist #{{ person|lookup:'waitlist_position' }} — plus your code promise and your personal link inside.

> [hero: navy, lime "YOU'RE IN" eyebrow]
>
> **waitlist #{{ person|lookup:'waitlist_position' }}.**
> that's you. locked in for DROP 002.
>
> here's what being on the list actually means:
>
> **1 — SHROOME20 is yours.** 20% off + free shipping at launch. not a "claim it before midnight" thing — it's earned, it's saved to your email, it'll be there.
>
> **2 — drops open to the list first.** DROP 001 sold out. the list heard first. that's the whole model.
>
> **3 — your link moves you up.**
> [navy code block] **drinkshroome.com?ref={{ person|lookup:'referral_code' }}**
> every friend who joins through your link = credit on your account: **$5 for your 1st, $10 total at 3, $15 total at 5.** real dollars, applied at checkout, no games.
>
> one more thing: people on our text list get the doors opened **10 minutes early** on drop day, and their code upgrades from 20 to 30. more on that tomorrow — or skip the wait: [button: GET EARLY ACCESS →] (links to /welcome phone step)
>
> tear. pour. soon.
> — zak
>
> [footer: postal address · unsubscribe]

---

### EMAIL 2 — sms upgrade nudge (Day 1, only if no phone)

**subject:** 10 minutes is the whole game
**preview:** texts get the door opened early — and SHROOME30 replaces your 20% code.

> DROP 001 sold out fast. like, *we owe some of you an apology* fast.
>
> so here's how DROP 002 works: when doors open, **the text list gets in 10 minutes before everyone else.** for a drop that sells out in under an hour, 10 minutes isn't a perk. it's the difference.
>
> and there's a second thing. add your number and your code upgrades:
>
> [lime card] **SHROOME20 → SHROOME30**
> 30% off + free shipping. to be clear: **it replaces your 20% code — your best code wins.** we don't do stacking math, we just give you the bigger number.
>
> [button: ADD MY NUMBER →]
>
> one text when you join, a heads-up before each drop, that's the vibe. no daily "hey bestie" spam — reply STOP anytime and we vanish.
>
> [footer: postal address · unsubscribe]

---

### EMAIL 3 — the quiz (Day 2, only if quiz not done)

**subject:** strawberry or vanilla? (this decides things)
**preview:** 4 questions. 45 seconds. you jump 50 spots up the list.

> we're building your **first pour profile** — the exact way your first shroomé should happen. flavor, temperature, time of day, what it's replacing.
>
> 4 questions:
> ☐ strawberry or vanilla
> ☐ hot or iced
> ☐ morning ritual or afternoon reset
> ☐ what you currently drink (be honest, coffee people, we love you)
>
> what you get for 45 seconds of your life:
> **→ your first pour profile** — saved to your account, and we use it. your drop-day email will literally be built for how you pour.
> **→ +50 spots up the waitlist.** you're #{{ person|lookup:'waitlist_position' }} right now. do the math.
>
> [button: BUILD MY POUR PROFILE →]
>
> [footer: postal address · unsubscribe]

---

### EMAIL 4 — referral push (Day 4, only if 0 referrals)

**subject:** $5 a friend. and the numbered box.
**preview:** 1 friend = $5. 3 = $10. 5 = $15 + a shot at case 001.

> your link has been sitting in your welcome email doing nothing. let's fix that.
>
> [navy code block] **drinkshroome.com?ref={{ person|lookup:'referral_code' }}**
>
> the ladder — fixed credits, straight to your account:
>
> **1 friend → $5 credit**
> **3 friends → $10 credit**
> **5 friends → $15 credit** *(that's the cap — we're a small batch brand, not a pyramid)*
>
> and then there's the thing money can't buy: our **top referrer** before DROP 002 gets a **hand-numbered box from case 001.** the first case. numbered in marker. there will never be another one.
>
> credits apply automatically at checkout on drop day. your friends get on the list; you get paid in matcha money. everyone wins except the person who has to number the boxes (zak).
>
> [button: SHARE MY LINK →]
>
> [footer: postal address · unsubscribe]

---

### EMAIL 5 — drop teaser (Day 10, everyone)

**subject:** DROP 002 has a date
**preview:** we're not telling you yet. but the list hears first. obviously.

> a status update, because you're on the list and the list gets status updates:
>
> **☑ sachets — in production.** 2.5g ceremonial matcha, 2g grass-fed collagen, 200mg lion's mane at ≥70% beta-glucan. same formula that sold out DROP 001. we didn't touch it. you don't touch a thing like that.
> **☑ strawberry + vanilla — both flavors.** {% if person|lookup:'flavor_pref' %}({{ person|lookup:'flavor_pref' }} gang — noted. we know what you're here for.){% endif %}
> **☑ the date — set.** internally. we know it. you don't. yet.
>
> how it'll go down: the list gets the date first. the text list gets the doors **10 minutes early** with SHROOME30 loaded. DROP 001 went in under an hour — 002 is a bigger run, but so is the list.
>
> things you can do while you wait:
> → not on texts yet? [10-min early access + code upgrade →]
> → no pour profile yet? [45 seconds, +50 spots →]
> → link not shared yet? your $5/friend is waiting.
>
> [footer: postal address · unsubscribe]

---

### EMAIL 6 — re-engage (Day 21, dormant only)

**subject:** still want in? (just checking once)
**preview:** your spot and your SHROOME20 are safe. but we don't like talking to a wall.

> real talk: you joined the list three weeks ago and haven't opened a thing since. no judgment — inboxes are war zones.
>
> here's where you stand:
> **→ your spot is safe.** #{{ person|lookup:'waitlist_position' }}, still yours.
> **→ SHROOME20 is safe.** 20% + free shipping at launch, still locked to this email.
> **→ DROP 002 is close.** closer than when you signed up, that's for sure.
>
> if you're still in, do literally one thing — click this and we'll keep your seat warm:
>
> [button: I'M STILL IN →] (links to site; click = engagement signal)
>
> if we don't hear from you, we'll quiet down and just send the one email that matters — the drop announcement. and if you're truly out: [unsubscribe] — no guilt trip, no "are you sure," one click and done.
>
> [footer: postal address · unsubscribe]

---

## 5. READY-TO-PASTE SMS COPY (8)

Encoding: all messages below are **GSM-7 safe** (é is GSM-7; no emoji, no em-dashes, straight apostrophes only — emoji would flip the message to UCS-2 and cut segments from 160 to 70 chars). Counts assume a 25-char branded short link replacing `[LINK]`.

**Global TCPA/CTIA compliance (applies to every message):**
- **Consent:** web form disclosure at capture (exists at `app/page.tsx:929`) must state: marketing texts, autodialed/automated, consent not a condition of purchase, msg frequency varies, msg & data rates may apply, STOP/HELP. Store `sms_consent_at` + disclosure text on the profile.
- **Quiet hours: send window 9:00am–8:00pm PROFILE LOCAL TIME.** Enforce in Klaviyo (Settings → Text messaging → quiet hours). Never override — even for drop day, schedule drops inside the window.
- **STOP/HELP** keyword auto-replies must be live before the first send; STOP honored instantly and globally.
- Brand name (`shroomé:`) opens every message. No shortened third-party link domains (carrier filtering) — use Klaviyo branded short links.

---

**SMS 1 — opt-in confirm (the FIRST message — carries full disclosure)**
Trigger: FLOW B, instant on SMS consent.

> shroomé: hey, it's zak. you're locked in - 10-min early access to every drop + SHROOME30 at launch (replaces your 20% code, best code wins). msg freq varies. msg & data rates may apply. reply HELP for help, STOP to opt out.

*223 chars · GSM-7 · 2 segments. Compliance: this is the required first-touch message — brand name, program description, frequency, rates, HELP, STOP all present. Do not trim the last two sentences.*

**SMS 2 — early-access alert (reusable template: any drop/restock)**
Trigger: FLOW F / manual campaign, inside quiet hours.

> shroomé: early access is LIVE. the next 10 minutes are yours before the doors open to everyone. [LINK] - your code SHROOME30 is loaded. move.

*141 chars (162 w/ 25-char link) · GSM-7 · 2 segments; drop "move." to fit 1 segment if cost matters. Compliance: recipient consented at opt-in; STOP language not required on every message but keep it on at least one message per month of sending.*

**SMS 3 — quiz nudge (Day 3, 11:00am local, only if quiz incomplete)**

> shroomé: 45 seconds, 4 questions. we build your first pour profile + you jump 50 spots up the list. [LINK]

*106 chars (127 w/ link) · GSM-7 · 1 segment.*

**SMS 4 — referral milestone 1 ($5)**
Trigger: FLOW D, `referral_count` hits 1. Send within window; if fired at night, Klaviyo holds until 9am.

> shroomé: your first referral just landed. $5 credit locked to your account for the next drop. 2 more friends = $10. your link: [LINK]

*133 chars (154 w/ link) · GSM-7 · 1 segment. Note: "$5 credit" — never phrase as % or "stacks."*

**SMS 5 — referral milestone 3 ($10)**

> shroomé: 3 referrals. $10 credit locked in. you're 2 away from $15 + a shot at the case 001 hand-numbered box. keep going: [LINK]

*129 chars (150 w/ link) · GSM-7 · 1 segment.*

**SMS 6 — referral milestone 5 ($15, cap)**

> shroomé: 5 referrals. $15 credit secured - max tier. you're officially on the leaderboard for the case 001 box. we see you.

*123 chars · GSM-7 · 1 segment. This is the cap message — no link needed; do not promise further credits.*

**SMS 7 — drop day, T-10 minutes**
Trigger: FLOW F, scheduled. **Schedule the drop itself so T-10 lands ≥9:00am in the westernmost customer timezone** (e.g. doors 10:10am PT = T-10 at 10:00am PT / 1:00pm ET — safe everywhere in the US).

> shroomé: doors open for you in 10 MINUTES. early-access link: [LINK]. SHROOME30 is loaded (replaces your 20% code - best code wins). it will sell out.

*150 chars (171 w/ link) · GSM-7 · 2 segments — accepted; this is the money message. Smart sending OFF for this one send.*

**SMS 8 — birthday**
Trigger: FLOW E, 9:00am profile local on `birthday`, yearly.

> shroomé: happy birthday. a birthday sachet drop is riding along free with your next box - no code, it just shows up. from us, for the ritual.

*141 chars · GSM-7 · 1 segment. Compliance: only sends to profiles with active SMS consent; suppressed profiles excluded automatically by Klaviyo.*

---

## 6. build order

1. Fix audit blockers first (Resend domain, kill the broken Day-7 cron in favor of FLOW A).
2. FLOW A + FLOW B + SMS 1 (these touch every new signup — highest leverage).
3. Quiz (form + webhook + FLOW C), then FLOW D referral milestones.
4. Birthday capture + FLOW E; step-5 pour list last (manual/IG-dependent).
5. FLOW F stays in drafts until DROP 002 date is set; codes generated T-1 day per launch-roadmap (with corrected "replaces" copy).

*Setup click-paths, quiz wiring, RCS registration, and the QA plan live in `Marketing/Email/klaviyo-setup-runbook.md`.*
