export default function Terms() {
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
      <h1 style={s.h1}>Terms of Service</h1>
      <p style={s.updated}>Last updated: March 18, 2026</p>

      <p style={s.p}>
        Welcome to drinkshroome.com, operated by ZSQUARED INC (&quot;shroomé,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By accessing or using our website, you agree to be bound by these Terms of Service.
      </p>

      <h2 style={s.h2}>Use of Website</h2>
      <p style={s.p}>
        Our website is currently in pre-launch mode and is used to collect waitlist signups for our upcoming product launch. By using this website, you agree to provide accurate information and to use the site only for lawful purposes.
      </p>

      <h2 style={s.h2}>Waitlist & Promotions</h2>
      <ul style={s.ul}>
        <li style={s.li}>Joining the waitlist does not guarantee product availability or pricing</li>
        <li style={s.li}>Promotional discount codes (20% off + free shipping) are subject to terms at the time of launch</li>
        <li style={s.li}>Discount codes are non-transferable and may have expiration dates</li>
        <li style={s.li}>We reserve the right to modify or cancel promotions at any time</li>
        <li style={s.li}>The additional 10% phone discount is stackable with the base waitlist discount</li>
      </ul>

      <h2 style={s.h2}>SMS Terms</h2>
      <p style={s.p}>
        By opting in to receive text messages from shroomé, you agree to the following:
      </p>
      <ul style={s.ul}>
        <li style={s.li}>You consent to receive recurring automated marketing text messages at the phone number provided</li>
        <li style={s.li}>Consent is not a condition of any purchase</li>
        <li style={s.li}>Message frequency varies; message and data rates may apply</li>
        <li style={s.li}>You can opt out at any time by replying <strong>STOP</strong></li>
        <li style={s.li}>For help, reply <strong>HELP</strong> or contact info@drinkshroome.com</li>
        <li style={s.li}>Compatible carriers include but are not limited to AT&T, T-Mobile, Verizon, and Sprint</li>
        <li style={s.li}>shroomé and its service providers (including Klaviyo) may have access to your phone number for the purpose of sending messages</li>
      </ul>

      <h2 style={s.h2}>Intellectual Property</h2>
      <p style={s.p}>
        All content on this website — including text, graphics, logos, images, and software — is the property of ZSQUARED INC and is protected by United States and international intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.
      </p>

      <h2 style={s.h2}>Product Information</h2>
      <p style={s.p}>
        Product descriptions, ingredient information, and health-related statements on this website are for informational purposes only. These statements have not been evaluated by the Food and Drug Administration. Our products are not intended to diagnose, treat, cure, or prevent any disease. Consult your healthcare provider before starting any new supplement.
      </p>

      <h2 style={s.h2}>Disclaimer of Warranties</h2>
      <p style={s.p}>
        This website is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied. We do not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components.
      </p>

      <h2 style={s.h2}>Limitation of Liability</h2>
      <p style={s.p}>
        To the fullest extent permitted by law, ZSQUARED INC shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the website or services.
      </p>

      <h2 style={s.h2}>Governing Law</h2>
      <p style={s.p}>
        These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to conflict of law principles.
      </p>

      <h2 style={s.h2}>Changes to Terms</h2>
      <p style={s.p}>
        We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to this page. Your continued use of the website constitutes acceptance of the revised terms.
      </p>

      <h2 style={s.h2}>Contact Us</h2>
      <p style={s.p}>
        Questions about these Terms? Contact us at:<br />
        <strong>ZSQUARED INC</strong><br />
        Email: info@drinkshroome.com
      </p>

      <div style={{ marginTop: 60, paddingTop: 20, borderTop: "1px solid rgba(27,31,59,0.08)" }}>
        <a href="/" style={{ fontSize: "0.8rem", color: "#1B1F3B", textDecoration: "underline" }}>← Back to drinkshroome.com</a>
      </div>
    </div>
  );
}
