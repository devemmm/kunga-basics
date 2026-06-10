import { Mail, LifeBuoy, MessageSquare } from "lucide-react";
import { trackEvent } from "../lib/track.js";

const FAQS = [
  {
    q: "How do I create an account?",
    a: "Download the Kunga Basics app from the Play Store or App Store, then tap \"Sign Up\" and follow the steps to create your account and set up your child's profile.",
  },
  {
    q: "How does the Ask Dr. Gad feature work?",
    a: "From the Ask Dr. Gad tab, submit a question about your child's development. Dr. Gad reviews submissions and responds with a personalised video answer, which appears in your feed.",
  },
  {
    q: "How do I cancel my subscription?",
    a: "Open the app, go to Settings → Subscription, and tap \"Cancel Subscription\". Your access continues until the end of the current billing period.",
  },
  {
    q: "How do I delete my account or export my data?",
    a: "Go to Settings → Account in the app. You can export all your data as a JSON file, or permanently delete your account and data at any time.",
  },
  {
    q: "I found a bug or have feedback — who do I contact?",
    a: "Email us at support@kungabasics.com with details (and a screenshot if possible) and we'll get back to you as soon as we can.",
  },
];

export default function Support() {
  return (
    <section className="legal-page">
      <div className="container" style={{ maxWidth: 760 }}>
        <h1>Support</h1>
        <p className="intro">
          Need help with Kunga Basics? Browse common questions below, or reach
          out to our team directly.
        </p>

        <div className="contact-card">
          <h3><Mail size={16} style={{ verticalAlign: "-3px", marginRight: 6 }} />Email Support</h3>
          <p>
            For account, billing, or general questions, email{" "}
            <a
              href="mailto:support@kungabasics.com"
              onClick={() => trackEvent("click", "/support", "email_support")}
            >
              support@kungabasics.com
            </a>. We typically respond within 1–2 business days.
          </p>
        </div>

        <div className="contact-card">
          <h3><LifeBuoy size={16} style={{ verticalAlign: "-3px", marginRight: 6 }} />Privacy & Legal</h3>
          <p>
            For privacy or data requests, email{" "}
            <a href="mailto:privacy@kungabasics.com">privacy@kungabasics.com</a>.
            For legal questions, email{" "}
            <a href="mailto:legal@kungabasics.com">legal@kungabasics.com</a>.
          </p>
        </div>

        <h2 style={{ fontFamily: "var(--fd)", fontSize: 20, marginTop: 40, marginBottom: 4 }}>
          <MessageSquare size={18} style={{ verticalAlign: "-3px", marginRight: 6 }} />
          Frequently Asked Questions
        </h2>

        {FAQS.map((f) => (
          <div className="faq-item" key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
