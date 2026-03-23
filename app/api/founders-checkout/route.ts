import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const referralCode = body.ref as string | undefined;

    const origin = req.headers.get("origin") || "https://www.drinkshroome.com";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: process.env.STRIPE_FOUNDERS_PRICE_ID!,
          quantity: 1,
        },
      ],
      // Pre-fill email if passed (e.g. from waitlist)
      ...(body.email ? { customer_email: body.email } : {}),
      metadata: {
        product: "founders_batch",
        referral_code: referralCode ?? "",
      },
      payment_intent_data: {
        metadata: {
          product: "founders_batch",
          referral_code: referralCode ?? "",
        },
      },
      success_url: `${origin}/founders/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/founders`,
      // Collect shipping address for box delivery
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      custom_text: {
        submit: {
          message:
            "Your box is numbered and reserved. Ships 2 weeks before public launch on June 15, 2026.",
        },
      },
      // Allow promo codes so referral stacking works later
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session." },
      { status: 500 }
    );
  }
}
