import { Mail, LifeBuoy, MessageSquare } from "lucide-react";
import { trackEvent } from "../lib/track.js";
import Seo from "../components/Seo.jsx";

const FAQS = [
  {
    q: "My child is not talking yet — how can Kunga Basics help?",
    a: "Speech delays are common, and Kunga Basics offers video modules on speech & communication development plus daily routines you can use at home to encourage talking. If you're concerned about your child's speech, you can also ask Dr. Gad directly through the app for personalised guidance — though we always recommend speaking with a qualified speech-language professional for an evaluation.",
  },
  {
    q: "My child doesn't respond to their name — is this related to Autism?",
    a: "Not responding to their name can be one of many early signs caregivers notice, but it isn't a diagnosis on its own. Kunga Basics' Autism-focused modules can help you understand common developmental signs and daily strategies, and Ask Dr. Gad lets you raise specific concerns. For a formal assessment, please consult a paediatrician or developmental specialist.",
  },
  {
    q: "How can I help my autistic child at home?",
    a: "Kunga Basics provides structured daily routines, milestone tracking, and expert video modules designed for caregivers of children with Autism — covering communication, sensory needs, and everyday activities you can build into your family's schedule. The Ask Dr. Gad feature also lets you get personalised, judgment-free advice for your child's specific situation.",
  },
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
      <Seo
        title="Support & Help — Autism Parent Support | Kunga Basics"
        description="Get help with Kunga Basics: account setup, subscriptions, and frequently asked questions. Find resources for early intervention, special needs parenting, and home therapy activities for children with Autism, Speech Delay, and ADHD."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.a,
            },
          })),
        }}
      />
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
