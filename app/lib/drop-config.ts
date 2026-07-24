// ─────────────────────────────────────────────────────────────────────────────
// DROP CONFIG — OPS-OWNED. Single source of truth for drop numbers, sizes,
// and dates shown anywhere on the site (/lp/*, /drop).
//
// HONESTY RULE (non-negotiable, per lp-briefs): every value here must be
// literally true — real production run counts, real dates. Never inflate,
// never run a countdown to an unconfirmed or movable date.
// ─────────────────────────────────────────────────────────────────────────────

export const DROP_001 = {
  number: "001",
  /** Real production run count for drop 001. */
  boxes: 500,
  /**
   * Days from drop 001 open to sellout — shown on /drop hero.
   * OPS: confirm against actual sales records before changing.
   */
  soldOutInDays: 9,
  soldOut: true,
} as const;

export const DROP_002 = {
  number: "002",
  /**
   * Allocation for drop 002 — null until ops confirms the production run.
   * While null, pages render "size still secret" and never show a count.
   */
  boxes: null as number | null,
  /**
   * Confirmed open date (ISO string) — null until ops confirms.
   * While null, pages render "next drop: soon. the flock hears the
   * date first." instead of a countdown. NEVER set a placeholder date.
   */
  openDate: null as string | null,
};

/** "500" — formatted drop 001 run count for copy interpolation. */
export const X1_BOXES = DROP_001.boxes.toLocaleString("en-US");

/** "a limited run" / "a limited run of 1,000 boxes" once ops confirms. */
export const DROP2_RUN = DROP_002.boxes
  ? `a limited run of ${DROP_002.boxes.toLocaleString("en-US")} boxes`
  : "a limited run";

/** Ledger right-hand text for drop 002. */
export const DROP2_LEDGER = DROP_002.boxes
  ? `limited run of ${DROP_002.boxes.toLocaleString("en-US")} boxes`
  : "size still secret";

/** Fallback line rendered while no confirmed drop 002 date exists. */
export const DROP2_SOON_LINE =
  "next drop: soon. the flock hears the date first.";

/**
 * Access-list momentum copy — same source of truth as the homepage hero
 * ("Join 100+ early adopters"). Update in lockstep with app/page.tsx.
 */
export const ACCESS_LIST_COUNT = "100+";

export const FDA_DISCLAIMER =
  "These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.";
