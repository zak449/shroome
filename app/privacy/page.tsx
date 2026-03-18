export default function Privacy() {
  const s = {
    wrap: { maxWidth: 720, margin: "0 auto", padding: "80px 24px 120px", fontFamily: "'Syne', system-ui, sans-serif", color: "#1B1F3B", lineHeight: 1.8 } as React.CSSProperties,
    h1: { fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontStyle: "italic" as const, marginBottom: 8 },
    h2: { fontFamily: "'Syne', system-ui, sans-serif", fontWeight: 700, fontSize: "1.1rem", letterSpacing: "0.04em", marginTop: 40, marginBottom: 12, textTransform: "uppercase" as const },
    p: { fontSize: "0.92rem", color: "rgba(27,31,59,0.7)", marginBottom: 16 },
    ul: { fontSize: "0.92rem", color: "rgba(27,31,59,0.7)", marginBottom: 16, paddingLeft: 24 },
    li: { marginBottom: 8 },
    updated: { fontSize: "0.75rem", color: "rgba(27,31,59,0.4)", marginBottom: 32 },
  };

  return (
    <div style={s.wrap}>
      <h1 style={s.h1}>Privacy Policy</h1>
      <p style={s.updated}>Last updated: March 18, 2026</p>

      <p style={s.p}>
        ZSQUARED INC (&quot;shroomé,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the website drinkshroome.com. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or sign up for our waitlist.
      </p>

      <h2 style={s.h2}>Information We Collect</h2>
      <p style={s.p}>We collect information you voluntarily provide, including:</p>
      <ul style={s.ul}>
        <li style={s.li}><strong>Email address</strong> — when you join our waitlist</li>
        <li style={s.li}><strong>Phone number</strong> — when you opt in to SMS marketing (optional)</li>
        <li style={s.li}><strong>Usage data</strong> — pages visited, time on site, scroll depth, and interactions via Google Analytics</li>
        <li style={s.li}><strong>Device information</strong> — browser type, operating system, and screen size (collected automatically)</li>
      </ul>

      <h2 style={s.h2}>How We Use Your Information</h2>
      <ul style={s.ul}>
        <li style={s.li}>To send you waitlist updates, product launch announcements, and promotional offers via email</li>
        <li style={s.li}>To send you marketing text messages if you opt in to SMS</li>
        <li style={s.li}>To send you your exclusive discount code at launch</li>
        <li style={s.li}>To analyze website traffic and improve our site experience</li>
        <li style={s.li}>To communicate with you about your inquiries or requests</li>
      </ul>

      <h2 style={s.h2}>SMS Marketing</h2>
      <p style={s.p}>
        By providing your phone number and opting in, you consent to receive marketing text messages from shroomé at the number provided. Message frequency varies. Message and data rates may apply. You can opt out at any time by replying <strong>STOP</strong> to any message. Reply <strong>HELP</strong> for assistance. Your consent to receive SMS is not a condition of purchase.
      </p>

      <h2 style={s.h2}>Third-Party Services</h2>
      <p style={s.p}>We use the following third-party services to operate our business:</p>
      <ul style={s.ul}>
        <li style={s.li}><strong>Klaviyo</strong> — email and SMS marketing platform</li>
        <li style={s.li}><strong>Resend</strong> — transactional email delivery</li>
        <li style={s.li}><strong>Google Analytics</strong> — website analytics</li>
        <li style={s.li}><strong>Cloudflare Turnstile</strong> — bot protection</li>
        <li style={s.li}><strong>Vercel</strong> — website hosting</li>
        <li style={s.li}><strong>Google Sheets</strong> — data backup</li>
      </ul>
      <p style={s.p}>
        These services may collect and process your data in accordance with their own privacy policies. We do not sell your personal information to third parties.
      </p>

      <h2 style={s.h2}>Data Retention</h2>
      <p style={s.p}>
        We retain your personal information for as long as your account is active or as needed to provide you services. You may request deletion of your data at any time by emailing info@drinkshroome.com.
      </p>

      <h2 style={s.h2}>Your Rights</h2>
      <p style={s.p}>Depending on your location, you may have the right to:</p>
      <ul style={s.ul}>
        <li style={s.li}>Access the personal data we hold about you</li>
        <li style={s.li}>Request correction or deletion of your data</li>
        <li style={s.li}>Opt out of marketing communications at any time</li>
        <li style={s.li}>Unsubscribe from emails via the link in any email</li>
        <li style={s.li}>Opt out of SMS by replying STOP</li>
      </ul>

      <h2 style={s.h2}>Cookies & Tracking</h2>
      <p style={s.p}>
        We use Google Analytics to understand how visitors interact with our site. This may use cookies and similar technologies. You can opt out by using browser privacy settings or the Google Analytics opt-out browser add-on.
      </p>

      <h2 style={s.h2}>Children&apos;s Privacy</h2>
      <p style={s.p}>
        Our website is not directed to individuals under the age of 13. We do not knowingly collect personal information from children under 13.
      </p>

      <h2 style={s.h2}>Changes to This Policy</h2>
      <p style={s.p}>
        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
      </p>

      <h2 style={s.h2}>Contact Us</h2>
      <p style={s.p}>
        If you have questions about this Privacy Policy, contact us at:<br />
        <strong>ZSQUARED INC</strong><br />
        Email: info@drinkshroome.com
      </p>

      <div style={{ marginTop: 60, paddingTop: 20, borderTop: "1px solid rgba(27,31,59,0.08)" }}>
        <a href="/" style={{ fontSize: "0.8rem", color: "#1B1F3B", textDecoration: "underline" }}>← Back to drinkshroome.com</a>
      </div>
    </div>
  );
}
