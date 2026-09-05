import Seo from "../components/Seo.jsx";

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: `By downloading, installing, or using Kunga Basics, you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use the application.

These terms apply to all users of Kunga Basics, including parents, caregivers, and healthcare professionals.`,
  },
  {
    title: "2. Description of Service",
    body: `Kunga Basics is a child development support platform that provides:

• Video modules on child development topics curated by Dr. Gad
• Daily routine tracking and streak monitoring
• Milestone reporting and progress journaling
• Ask Dr. Gad — submit questions and receive personalised video responses
• Community resources and expert guidance

The app is intended for parents and caregivers supporting children with developmental challenges.`,
  },
  {
    title: "3. Subscription & Payments",
    body: `Access to premium features requires a paid subscription:

• Gold plan: $299.99/month — includes core video modules, daily routine planner, journal, and Ask Dr. Gad (2 expert questions/month)
• Premium plan: $349.99/month — includes everything in Gold plus unlimited Ask Dr. Gad questions, unlimited child assessments, priority support, downloadable milestone reports, and early access to new modules

Subscriptions are processed securely via Apple In-App Purchase (iOS) or Google Play Billing (Android). By subscribing, you authorise us to charge your payment method on a recurring basis.

You may cancel your subscription at any time from Settings. Cancellation takes effect at the end of the current billing period. We do not provide refunds for partial periods.

Question Credits are one-time purchases that give additional Ask Dr. Gad slots for the current calendar month.`,
  },
  {
    title: "4. Medical Disclaimer",
    body: `Kunga Basics and Dr. Gad's responses are for informational and educational purposes only. They do not constitute medical advice, diagnosis, or treatment.

Always seek the advice of a qualified healthcare professional for any medical concerns regarding your child. Do not disregard professional medical advice or delay seeking it based on information from this application.`,
  },
  {
    title: "5. User Responsibilities",
    body: `You agree to:

• Provide accurate and truthful information when creating your account and child profile
• Keep your login credentials confidential
• Use the application only for its intended lawful purposes
• Not share your account with others
• Not attempt to reverse-engineer, copy, or redistribute any content

You are responsible for all activity that occurs under your account.`,
  },
  {
    title: "6. Intellectual Property",
    body: `All content within Kunga Basics — including video modules, text, graphics, and Dr. Gad's responses — is the intellectual property of Kunga Basics Ltd. and is protected by copyright law.

You are granted a personal, non-transferable licence to access the content for your own private use. You may not copy, distribute, or create derivative works from any content without our prior written consent.`,
  },
  {
    title: "7. Limitation of Liability",
    body: `To the maximum extent permitted by applicable law, Kunga Basics Ltd. shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the application.

Our total liability to you for any direct damages shall not exceed the amount you paid for the service in the 12 months preceding the claim.`,
  },
  {
    title: "8. Termination",
    body: `We reserve the right to suspend or terminate your account if you violate these terms, engage in fraudulent activity, or misuse the Ask Dr. Gad feature.

You may delete your account at any time from Settings. Upon deletion, your personal data will be anonymised in accordance with our Privacy Policy.`,
  },
  {
    title: "9. Changes to Terms",
    body: `We may update these Terms of Service from time to time. We will notify you of significant changes through the app or by email. Continued use of the application after changes take effect constitutes your acceptance of the updated terms.`,
  },
  {
    title: "10. Contact Us",
    body: `For questions about these terms, contact us at:

📧 legal@kungabasics.com
🌐 https://kungabasics.com

Kunga Basics Ltd. · Kigali, Rwanda`,
  },
];

export default function TermsOfService() {
  return (
    <section className="legal-page">
      <Seo title="Terms of Service | Kunga Basics" />
      <div className="container" style={{ maxWidth: 760 }}>
        <h1>Terms of Service</h1>
        <div className="updated">Last updated: June 2026</div>
        <p className="intro">
          Please read these terms carefully before using Kunga Basics. By using
          our app you agree to be bound by them.
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
