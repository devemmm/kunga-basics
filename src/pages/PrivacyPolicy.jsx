const SECTIONS = [
  {
    title: "1. Information We Collect",
    body: `We collect information you provide directly to us when you create an account, set up a child profile, or use our features:

• Account information: name, email address, password
• Child profile: child's name, date of birth, developmental challenges
• Usage data: routine completions, milestone reports, journal entries, module progress
• Device information: push notification token, platform type
• Payment information: processed securely through Flutterwave — we do not store card details`,
  },
  {
    title: "2. How We Use Your Information",
    body: `We use the information we collect to:

• Provide, maintain, and improve Kunga Basics services
• Personalise content and recommendations for your child's developmental needs
• Send push notifications about routines, milestones, and Dr. Gad responses
• Process subscription payments and question credits
• Respond to your questions and support requests
• Comply with legal obligations under GDPR and applicable laws`,
  },
  {
    title: "3. Data Sharing",
    body: `We do not sell your personal data. We share information only:

• With service providers (Flutterwave for payments, Expo for push notifications) under strict data processing agreements
• With Dr. Gad when you submit questions through the Ask Dr. Gad feature
• When required by law or to protect the rights and safety of our users`,
  },
  {
    title: "4. Data Retention",
    body: `We retain your personal data for as long as your account is active. When you delete your account, we anonymise your personal information within 30 days in accordance with GDPR Article 17.

You may export all your data at any time from Settings → Export my data (GDPR Article 20).`,
  },
  {
    title: "5. Your Rights",
    body: `Under GDPR and applicable privacy laws, you have the right to:

• Access your personal data (export available in Settings)
• Correct inaccurate data (edit your profile at any time)
• Delete your data (account deletion available in Settings)
• Object to processing for marketing purposes (toggle off in Notification Preferences)
• Data portability (JSON export available in Settings)`,
  },
  {
    title: "6. Children's Privacy",
    body: `Kunga Basics is designed for parents and caregivers — not for use directly by children. We collect child profile information solely to personalise developmental content for the parent/caregiver's use. We do not direct our services to children or knowingly collect data from children under 13.`,
  },
  {
    title: "7. Security",
    body: `We implement industry-standard security measures including:

• JWT-based authentication with secure token storage
• HTTPS encryption for all data in transit
• Hashed passwords (bcrypt)
• Two-factor authentication (optional)

No method of transmission over the Internet is 100% secure. We encourage you to use a strong password and enable 2FA.`,
  },
  {
    title: "8. Cookies & Analytics",
    body: `This website and the Kunga Basics app collect basic visitor analytics — such as approximate location (derived from IP address), device and browser type, pages visited, and session duration — to help us understand usage and improve our services. This data is stored securely and is not sold to third parties.

You can manage cookie preferences for the mobile app in Settings → Cookie Preferences.`,
  },
  {
    title: "9. Contact Us",
    body: `For privacy-related questions or to exercise your rights, contact us at:

📧 privacy@kungabasics.com
🌐 https://portal.kungabasics.com

We will respond within 30 days as required by GDPR.`,
  },
];

export default function PrivacyPolicy() {
  return (
    <section className="legal-page">
      <div className="container" style={{ maxWidth: 760 }}>
        <h1>Privacy Policy</h1>
        <div className="updated">Last updated: June 2026</div>
        <p className="intro">
          Your privacy matters to us. This policy explains how Kunga Basics
          collects, uses, and protects your personal data.
        </p>
        {SECTIONS.map((s) => (
          <div className="legal-section" key={s.title}>
            <h2>{s.title}</h2>
            <p>{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
