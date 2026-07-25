# shroomé lifecycle flows — the suspense engine

**Owner:** lifecycle/CRM · **Status:** design locked, Klaviyo build in progress · **Last updated:** 2026-07-24

## the premise

The next run is not ready to ship. That is not a problem to hide; it is the product of this program.
The waiting period is where the flock gets built. Every send must contain **information worth opening**
(lore, a real photo, a real vote, a real perk) and must compound the feeling that members are on the
inside of something that is genuinely scarce.

**Honesty rule is absolute.** Real numbers only (500 boxes, 9 days). No fake timers, no invented dates,
no inflated counts, no "almost gone" that isn't literally true. "size still secret" is the official
answer until ops confirms the next run's size (`app/lib/drop-config.ts` is the single source of truth;
if `DROP_002.boxes` is null, no email may state a count).

**Voice (canon: `Marketing/messaging-dna.md`):** every email is a short personal note from zak,
the founder. lowercase, warm, direct, passionate. "the first run / the next run" (never Drop
001/002 in customer copy). Sold out = "poured out". Speed = "the stir is the recipe" / "ready
the second you stir". No em-dashes, no lore-speak, no dispatch numbering, no riddles. The five
verbatim phrases: "you hear it first." / "we only email when it matters. no spam, ever." /
"the first run poured out in 9 days." / "the stir is the recipe." / "never sold, only earned."
Community first; discounts exist but never lead.

**The mascot:** mé, our sheep, appears as ONE cute beat per email at most (she taste-tests,
she counts votes, she's thrilled). She is a character we love, not a mythology the reader
must decode. No ledger/archive/sealed-page framing anywhere.

Repo implementations live in `app/lib/emails.ts` (preview at `/api/preview-email?type=welcome|sachet|ledger|redacted|ballot`).
SMS copy canon lives in `Marketing/Email/Flows/engagement-capture-flows.md` §5.

---

## FLOW 1 — the initiation arc

Trigger: joins the list (Klaviyo list `waitlist` / metric "Waitlist Signup"). Exit: never (one pass).

| # | timing | subject | preview | body concept | asset | CTA |
|---|--------|---------|---------|--------------|-------|-----|
| 1.1 | instant | thank you. you're in. 🐑 | the first run poured out in 9 days. the next one, you shop first. and we will not spam you. | thank-you note from zak: we worked hard on the first run (500 boxes, poured out in 9 days); the promise: early access before go-live, member-only merch (never sold, only earned), no spam ever; referral block if code exists | hero-induction.png, sachet-vanilla.png, sachet-strawberry.png, badge-*.png, sheep-drink.png | see the next run → (site) |
| 1.2 | +2 days | how to pour it 🍵 | no powder, no whisk. tear, pour over milk, stir. here's exactly what's inside. | the useful email: the ritual (the stir is the recipe) + every sachet weighed out: 2.5g matcha, 200mg extracts at 70%+ beta-glucans, 2g collagen; wink: mé taste-tests every batch | hero-specimen.png, ig-sachet-sip.jpg, cup-logo.jpg | meet shroomé → (site) |
| 1.3 | +5 days | what we're making right now | the next run is real and in motion. no date yet, and we won't invent one. you hear it first. | honest status note: the next run is real and in motion; size and date genuinely unknown, we say so instead of guessing; you hear it first, a full day before the public; wink: mé sworn to secrecy | hero-envelope.png, symbol-sheep-solid.png | watch the next run → (/drop) |

Implemented: `welcomeEmail`, `sachetEmail`, `ledgerEmail` in `app/lib/emails.ts`.

## FLOW 2 — the archive (waiting-period lore drips)

Trigger: finished FLOW 1 and no confirmed next-run date exists. Cadence: one drip roughly every
7 to 10 days; the flow pauses itself the moment FLOW 5 (whisper sequence) starts. Suspense compounds
because each drip removes exactly one redaction bar while adding a new sealed item.

| # | timing | subject | preview | body concept | asset | CTA |
|---|--------|---------|---------|--------------|-------|-----|
| 2.1 | +7d after 1.3 | a quick heads-up | recipes locked. materials moving. when the date is real, you hear it first. | plain production update on a paper card: recipes locked, materials on the move, date set the moment everything lands; ONE covered line (flavor three) saved for the vote, honestly labeled | shipper-box.jpg, paper status card | follow the run → (/drop) |
| 2.2 | +8d | the first run, autopsied | 500 boxes. 9 days. here's what we learned from the pour-out. | honest retro lore: what the first run taught us (real numbers, real lessons), why the next run is built differently | box-stack.jpg, me-01.png | read the ledger → (/drop) |
| 2.3 | +8d | mé's field notes, page one | our sheep keeps notes on everything. we photographed a page. | lore: the world of mé (the ledger, the flock, why a sheep); soft perk reminder that members hear first | me-03.png … me-07.png rotation, pattern assets | join the conversation → (IG) |
| 2.4 | +9d | merch you cannot buy | never sold. only earned. mé is already embroidering. | **merch tease:** member-only merch exists, it is earned (referrals, votes, drop-day participation), photos cropped tight | ig-mushroom-hat.jpg (cropped), lockup-good-energy.png | see how it's earned → (/refer) |

Implemented: `redactedEmail` (2.1) in `app/lib/emails.ts`. 2.2 to 2.4 are next in the build queue.

## FLOW 3 — the first ballot (flavor vote)

Trigger: manual campaign to the flock segment when the ballot mechanism is live (Klaviyo form or
poll link; the email function takes `voteUrl` at send time). This is a **campaign moment**, not an
evergreen flow: one open, one close, results read into the ledger.

| # | timing | subject | preview | body concept | asset | CTA |
|---|--------|---------|---------|--------------|-------|-----|
| 3.1 | ballot open | flavor three is your call 🗳️ | vanilla and strawberry are staying. you pick what joins them. one vote per member. | the membership perk made real: we're making a third flavor and members pick it; one vote per member, winner announced to members first, straight to the production floor; wink: mé counts the votes | hero-ballot.png, dashed "?" card | cast your vote → (ballot URL) |
| 3.2 | +3 days, non-voters only | ballots close soon (real ones) | mé counts at the deadline. mé has never miscounted anything. | nudge with the real close date only once it is set | me-04.png | cast your vote → |
| 3.3 | after count | the ledger records your winner | read into the ledger before anyone else hears it. | results to members first, always; winner feeds FLOW 2's next redaction reveal | winner sachet render or lavender card | see the tally → |

Implemented: `ballotEmail` (3.1) in `app/lib/emails.ts`.

## FLOW 4 — the merch tease (earned, never sold)

Trigger: `referral_count` milestones (Klaviyo profile property, already synced by `/api/waitlist`).
Companion SMS: SMS 4/5/6 in the SMS canon doc.

| # | timing | subject | preview | body concept | asset | CTA |
|---|--------|---------|---------|--------------|-------|-----|
| 4.1 | ref=1 | your first recruit is in the ledger | $5 credit locked. mé drew a little star next to your name. | real credit, real ledger entry; what earning looks like from here | sheep-stack.png | share your link → (/refer) |
| 4.2 | ref=3 | two away from the hand-numbered box | $10 locked. the first run's box 001 goes to the top recruiter. | leaderboard lore: a hand-numbered box from the first run is the trophy | shipper-box.jpg | keep going → (/refer) |
| 4.3 | ref=5 | max tier. mé sees you. | $15 secured. you're on the leaderboard for the box. | cap honesty (never promise more), merch-earned tease crossover | lockup-circle.png | check the leaderboard → (/refer) |

## FLOW 5 — the whisper sequence (next-run announcement arc)

Trigger: staged manually as ops facts become true. **Each stage may only send when its fact is
literally true.** This is the payoff the entire waiting period builds toward; stages escalate from
whisper to doors-open. Members always hear each stage a full day (minimum) before the public channel.

| stage | gate (must be true) | subject | preview | body concept | asset | CTA |
|-------|--------------------|---------|---------|--------------|-------|-----|
| 5.1 rumor | production actually in motion | it's moving | mé won't confirm anything. mé also didn't deny it. | one line, huge white space: "the next run is no longer a rumor. that's all the ledger will release." | symbol-sheep-solid.png only | no CTA (deliberate) |
| 5.2 confirmed | run size confirmed by ops (`DROP_002.boxes` set) | the envelope is open | entry no. 002, unsealed. run size inside. | the redaction bar comes off the run size; real count published to members first | reuse sealed-envelope motif, now open | read the entry → (/drop) |
| 5.3 date | open date confirmed (`DROP_002.openDate` set) | the ledger has a date | your early window opens a full day before the doors. | real date, member window explained, calendar link; SMS consent upsell (drop-day text) | hero-pour.jpg | get the drop-day text → |
| 5.4 members-open | member window actually open | your window is open | a full day before everyone. the stir is the recipe. | doors open for the flock; SMS 2/7 fire alongside; honesty line: "the first run poured out in 9 days" | sachets-both.png | shop the run → |
| 5.5 public | public doors open | doors open. flock's been in for a day. | what's left is what's left. | public open framed as proof the membership is real; no false scarcity, state real remaining status only if exact | cup-logo.jpg | shop the run → |

## suspense sequencing logic (why this compounds)

1. **Initiation** teaches the rules of the world (ledger, mé, runs, poured out).
2. **The archive** establishes a rhythm of sealed things partially revealed; every drip pays off a
   prior tease and plants a new one (the redacted flavor line sets up the ballot; the ballot winner
   sets up the next redaction reveal; merch stays cropped until earned).
3. **The ballot** converts spectators into participants; a vote is skin in the game.
4. **The whisper sequence** cashes every planted thread in strict truth order: rumor, size, date,
   doors. Because nothing was ever faked, each unlock is a real information event and open rates
   compound instead of decaying.

## guardrails

- No send may state a count, date, or timer that is not in `app/lib/drop-config.ts` or confirmed by ops in writing.
- Discount codes (SHROOME20/30, referral credits) may appear only below the fold, never in subjects or previews.
- Every marketing email carries the RFC 8058 headers (`unsubHeaders`) and the no-spam footer
  ("we only email when it matters. no spam, ever.") with a working unsubscribe link. In Klaviyo
  templates the unsubscribe must be `<a href="{% unsubscribe_link %}">unsubscribe</a>` (never a
  bare `{% unsubscribe %}` with arguments; that renders as raw text).
- SMS: GSM-7, quiet hours, brand-name prefix, canon per `Marketing/Email/Flows/engagement-capture-flows.md` §5.

## Klaviyo build state (pushed via API on 2026-07-24)

**Templates** (editor type CODE, view at klaviyo.com/email-editor/{ID}/edit):

| template | ID | maps to |
|----------|----|---------|
| shroome welcome v4 | `YsFgxn` | Flow 1.1 (welcomeEmail) |
| shroome how to pour it v4 | `Vy44ng` | Flow 1.2 (sachetEmail) |
| shroome what we're making v4 | `YpewgG` | Flow 1.3 (ledgerEmail) |
| shroome the heads-up v4 | `SbEihj` | Flow 2.1 (redactedEmail) |
| shroome the flavor vote v4 | `RwCfwb` | Flow 3.1 (ballotEmail); swap the CTA href for the live ballot URL before sending |

**Segments** (created): `STTRhG` "shroome — the flock (waitlist members)" (member of Shroomé
Waitlist list `TyUdnu`); `WRSTT7` "shroome — flock: sms consented (drop-day text)".

**Existing account objects found:** lists Email List `Rh3MYC`, Text Messaging List `T5tFv7`
(double opt-in), Shroomé Waitlist `TyUdnu` (single opt-in, the one `/api/waitlist` syncs to),
Preview List `URTyZA`. Flows: "SMS Welcome Flow" (live, Added to List), "Email Welcome Series"
(draft, Added to List), 3 unconfigured "Essential Flow Recommendation_" drafts. No templates or
segments existed before this push.

### founder checklist — what must be clicked together in the Klaviyo UI

The flows API is read-only, so the flow builder steps are manual:

1. Open the draft **"Email Welcome Series"** flow (trigger: Added to List). Set the trigger list to
   **Shroomé Waitlist** (`TyUdnu`). Build three email steps: instant → template `YsFgxn` (subject:
   "thank you. you're in. 🐑"), wait 2 days → `Vy44ng` (subject: "how to pour it 🍵"), wait
   3 days → `YpewgG` (subject: "what we're making right now"). Set each message's preview
   text from the FLOW 1 table. Turn smart sending ON. Set live.
2. Create **"the archive (lore drips)"** flow: trigger Added to List (Shroomé Waitlist), time delay
   12 days (so it lands after 1.3), email step → `SbEihj` (subject: "a quick heads-up").
   Add a flow filter "has not been in flow X" is unnecessary since the delay sequences it. Leave the
   2.2 to 2.4 drips as placeholder notes; templates for them are the next build batch.
3. Review the live **"SMS Welcome Flow"**: replace its message body with SMS 1 from
   `Marketing/Email/Flows/engagement-capture-flows.md` §5 (the canon-corrected opt-in confirm with
   full disclosure). Confirm quiet hours are on in Settings → Text messaging.
4. Keep the ballot (`RwCfwb`) and any whisper-sequence sends as **campaigns**, created only when
   their gates are true; target segment `STTRhG`, and for SMS beats segment `WRSTT7`.
5. Archive or delete the three "Essential Flow Recommendation_" drafts to keep the account clean.
6. Referral milestone flow (FLOW 4) needs a `referral_count` profile property that the app does not
   currently sync (the repo computes referral counts in `/api/referral` on the fly). Either add a
   property sync to `/api/waitlist`/a cron, or trigger milestones off the custom "Referral Landed"
   event if/when one is emitted. Until then FLOW 4 stays on paper.
