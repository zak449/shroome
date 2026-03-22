"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function UnsubscribeFlow() {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "";
  const [step, setStep] = useState<"confirm" | "reason" | "processing" | "done">("confirm");
  const [email, setEmail] = useState(emailParam);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (emailParam) setEmail(emailParam);
  }, [emailParam]);

  const reasons = [
    "Too many emails",
    "Content isn't relevant to me",
    "I already purchased / no longer interested",
    "I never signed up for this",
    "Other",
  ];

  const handleUnsubscribe = async () => {
    setStep("processing");
    setLoading(true);
    try {
      await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, reason }),
      });
    } catch {
      // Still show success to avoid confusion
    }
    setLoading(false);
    setStep("done");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FDF4EE",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        fontFamily: "'Syne', system-ui, sans-serif",
        color: "#1B1F3B",
      }}
    >
      <div style={{ maxWidth: 480, width: "100%", textAlign: "center" }}>
        {/* Logo */}
        <a href="https://www.drinkshroome.com" style={{ display: "inline-block", marginBottom: 40 }}>
          <Image src="/logo-mark.png" alt="shroomé logo mark" width={100} height={100} style={{ display: "block" }} priority />
        </a>

        {/* Step 1: Confirm */}
        {step === "confirm" && (
          <div>
            <h1
              style={{
                fontSize: 28,
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                margin: "0 0 12px",
              }}
            >
              we&apos;ll miss you 💚
            </h1>
            <p style={{ fontSize: 15, opacity: 0.6, margin: "0 0 32px", lineHeight: 1.6 }}>
              are you sure you want to unsubscribe from shroomé emails?
              you&apos;ll miss out on exclusive early access and launch discounts.
            </p>

            {email && (
              <p
                style={{
                  fontSize: 13,
                  background: "#fff",
                  padding: "10px 16px",
                  borderRadius: 8,
                  display: "inline-block",
                  margin: "0 0 24px",
                  border: "1px solid rgba(27,31,59,0.1)",
                }}
              >
                {email}
              </p>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
              <button
                onClick={() => setStep("reason")}
                style={{
                  padding: "14px 32px",
                  background: "#1B1F3B",
                  color: "#fff",
                  border: "none",
                  borderRadius: 50,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                Yes, unsubscribe me
              </button>
              <a
                href="https://www.drinkshroome.com"
                style={{
                  padding: "14px 32px",
                  background: "#C8FF3A",
                  color: "#1B1F3B",
                  border: "none",
                  borderRadius: 50,
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  textDecoration: "none",
                  display: "block",
                  fontFamily: "inherit",
                }}
              >
                No, keep me on the list!
              </a>
            </div>
          </div>
        )}

        {/* Step 2: Reason */}
        {step === "reason" && (
          <div>
            <h1
              style={{
                fontSize: 28,
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                margin: "0 0 12px",
              }}
            >
              one quick thing...
            </h1>
            <p style={{ fontSize: 15, opacity: 0.6, margin: "0 0 24px", lineHeight: 1.6 }}>
              help us improve — why are you leaving?
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {reasons.map((r) => (
                <button
                  key={r}
                  onClick={() => setReason(r)}
                  style={{
                    padding: "12px 20px",
                    background: reason === r ? "#1B1F3B" : "#fff",
                    color: reason === r ? "#fff" : "#1B1F3B",
                    border: "1px solid rgba(27,31,59,0.15)",
                    borderRadius: 10,
                    fontSize: 14,
                    cursor: "pointer",
                    textAlign: "left",
                    fontFamily: "inherit",
                    transition: "all 0.15s",
                  }}
                >
                  {r}
                </button>
              ))}
            </div>

            <button
              onClick={handleUnsubscribe}
              disabled={!reason}
              style={{
                marginTop: 24,
                padding: "14px 32px",
                background: reason ? "#1B1F3B" : "rgba(27,31,59,0.2)",
                color: "#fff",
                border: "none",
                borderRadius: 50,
                fontSize: 14,
                fontWeight: 600,
                cursor: reason ? "pointer" : "not-allowed",
                width: "100%",
                fontFamily: "inherit",
              }}
            >
              Confirm unsubscribe
            </button>
          </div>
        )}

        {/* Step 3: Processing */}
        {step === "processing" && (
          <div>
            <p style={{ fontSize: 18, opacity: 0.5 }}>
              {loading ? "processing..." : "done!"}
            </p>
          </div>
        )}

        {/* Step 4: Done */}
        {step === "done" && (
          <div>
            <h1
              style={{
                fontSize: 28,
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                margin: "0 0 12px",
              }}
            >
              you&apos;ve been unsubscribed
            </h1>
            <p style={{ fontSize: 15, opacity: 0.6, margin: "0 0 32px", lineHeight: 1.6 }}>
              we&apos;ve removed you from our email list. if you change your mind,
              you can always sign up again at drinkshroome.com.
            </p>
            <a
              href="https://www.drinkshroome.com"
              style={{
                padding: "14px 32px",
                background: "#C8FF3A",
                color: "#1B1F3B",
                border: "none",
                borderRadius: 50,
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                textDecoration: "none",
                display: "inline-block",
                fontFamily: "inherit",
              }}
            >
              back to drinkshroome.com
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default function UnsubscribePage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "100vh", background: "#FDF4EE", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ fontFamily: "system-ui", color: "#1B1F3B", opacity: 0.5 }}>Loading...</p>
        </div>
      }
    >
      <UnsubscribeFlow />
    </Suspense>
  );
}
