import { useEffect, useRef, useState } from "react";
import {
  Brain,
  MessageCircle,
  Eye,
  Zap,
  Activity,
  BookOpen,
  Star,
  ChevronRight,
  PlayCircle,
  ArrowRight,
  CheckCircle,
  Users,
  Heart,
  TrendingUp,
  Lightbulb,
  Move,
} from "lucide-react";
import { trackEvent } from "../lib/track.js";
import DownloadSection from "../components/DownloadSection.jsx";
import Reveal from "../components/Reveal.jsx";
import MetricDisplay from "../components/MetricDisplay.jsx";
import Seo from "../components/Seo.jsx";

const API_BASE = import.meta.env.VITE_API_URL ?? "/api/v1";

const DEFAULT_STATS = {
  familiesSupported: 10000,
  caregiverSatisfaction: 95,
  languagesSupported: 4,
};

const SESSION_AREAS = [
  { emoji: "🧠", title: "Attention Development", desc: "Building focus and sustained engagement." },
  { emoji: "🗣️", title: "Communication Foundations", desc: "Strengthening the roots of language." },
  { emoji: "👀", title: "Eye Contact & Social Engagement", desc: "Developing connection and interaction." },
  { emoji: "⚖️", title: "Coordination & Balance", desc: "Movement that supports brain development." },
  { emoji: "🎯", title: "Sensory Regulation", desc: "Calming the body so the mind can learn." },
];

const JOURNEY_STEPS = [
  { icon: Brain, label: "Attention", color: "#16A34A" },
  { icon: Users, label: "Interaction", color: "#10B981" },
  { icon: MessageCircle, label: "Communication", color: "#16A34A" },
  { icon: Activity, label: "Coordination", color: "#10B981" },
  { icon: BookOpen, label: "Learning Readiness", color: "#16A34A" },
];

const FOUNDATIONS = [
  {
    icon: Eye,
    title: "Attention",
    desc: "The ability to focus and take in information.",
  },
  {
    icon: Brain,
    title: "Understanding",
    desc: "The brain processes what it sees, hears, and experiences.",
  },
  {
    icon: Users,
    title: "Interaction",
    desc: "Engaging with people creates the desire to communicate.",
  },
  {
    icon: MessageCircle,
    title: "Communication",
    desc: "Words come later when the brain is ready.",
  },
];

const BRAIN_PILLARS = [
  {
    icon: Activity,
    title: "Coordination",
    desc: "Helps the brain organize and plan movements.",
  },
  {
    icon: Lightbulb,
    title: "Attention",
    desc: "Builds focus, persistence, and engagement.",
  },
  {
    icon: Heart,
    title: "Regulation",
    desc: "Supports calm, balance, and readiness to learn.",
  },
];

const OUTCOMES = [
  { icon: Brain, title: "Stronger Foundations", desc: "Better attention, focus, and brain connections." },
  { icon: Users, title: "Better Interaction", desc: "More connection, engagement, and social understanding." },
  { icon: MessageCircle, title: "Clearer Communication", desc: "Improved language, expression, and communication skills." },
  { icon: Move, title: "Improved Movement", desc: "Better coordination, balance, and body awareness." },
  { icon: BookOpen, title: "Learning Readiness", desc: "Stronger readiness for school and daily learning." },
  { icon: Star, title: "Greater Independence", desc: "More confidence, self-help skills, and independence." },
];

const PROGRAMS = [
  {
    name: "Foundation Program",
    price: "$49",
    period: "/month",
    badge: "Start Here",
    color: "var(--green)",
    bestFor: "Parents who want to understand Kunga Therapy and build strong developmental foundations.",
    includes: [
      "Kunga Therapy Theory Cards",
      "Understanding Autism",
      "Understanding Speech Delay",
      "Understanding ADHD",
      "Understanding Cerebral Palsy",
      "Understanding Down Syndrome",
      "Sensory Regulation Foundations",
      "Progress Tracking Journal",
    ],
    tag: "THEORY · UNDERSTANDING · FOUNDATIONS",
  },
  {
    name: "Guided Implementation Program",
    price: "$210",
    period: "/month",
    badge: "Full Support",
    color: "#0F172A",
    bestFor: "Parents actively implementing Kunga Therapy at home and seeking ongoing guidance.",
    includes: [
      "Everything in Foundation, plus:",
      "Practical Training Videos",
      "Autism Activities",
      "Speech Development Activities",
      "ADHD Activities",
      "Cerebral Palsy Activities",
      "Down Syndrome Activities",
      "Coordination & Movement Training",
      "Sensory Regulation Activities",
      "Progress Reviews & Monitoring",
      "Ask Dr. Gad Support",
      "Priority Support",
    ],
    tag: "PRACTICAL TRAINING · ACTIVITIES · GUIDANCE · SUPPORT",
    featured: true,
  },
];

const CONDITIONS = ["Autism", "Speech Delay", "ADHD", "Cerebral Palsy", "Down Syndrome", "Developmental Delays"];

const TESTIMONIALS = [
  {
    name: "Aline U.",
    role: "Mother of two, Kigali",
    quote: "Kunga Therapy helped me understand why my son wasn't speaking yet. Now I know what to work on every day, and I can see real progress.",
  },
  {
    name: "Eric N.",
    role: "Father & caregiver",
    quote: "Ask Dr. Gad changed everything — I finally understood how attention, interaction, and movement all connect to communication.",
  },
  {
    name: "Solange M.",
    role: "Caregiver, Huye",
    quote: "The structured sessions give me confidence. I'm not just guessing anymore — I'm doing real Kunga Therapy with my daughter every day.",
  },
];

export default function Home() {
  const [stats, setStats] = useState(DEFAULT_STATS);

  useEffect(() => {
    let cancelled = false;
    fetch(`${API_BASE}/analytics/site/public-stats`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data || cancelled) return;
        setStats((prev) => ({
          familiesSupported: data.familiesSupported || prev.familiesSupported,
          caregiverSatisfaction: data.caregiverSatisfaction ?? prev.caregiverSatisfaction,
          languagesSupported: data.languagesSupported ?? prev.languagesSupported,
        }));
      })
      .catch(() => { });
    return () => { cancelled = true; };
  }, []);

  return (
    <>
      <Seo
        title="Kunga Therapy — The Missing Link Between Attention, Interaction, Movement & Communication"
        description="A structured child development program designed to strengthen the brain systems that support speech, attention, interaction, coordination, learning, and behavior. Supporting children with Autism, Speech Delay, ADHD, Cerebral Palsy, and Down Syndrome."
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              name: "Kunga Basics",
              url: "https://kungabasics.com",
              logo: "https://kungabasics.com/icon.png",
              email: "info@kungabasics.com",
            },
            {
              "@type": "MobileApplication",
              name: "Kunga Basics",
              applicationCategory: "HealthApplication",
              operatingSystem: "iOS, Android",
              description:
                "Kunga Therapy — a structured child development program designed to strengthen the brain systems that support speech, attention, interaction, coordination, learning, and behavior.",
              offers: { "@type": "Offer", price: "49.00", priceCurrency: "USD" },
            },
          ],
        }}
      />

      {/* ── Hero — Premium Split Layout ──────────────────────────────────── */}
      <section className="kt-hero-v2">

        {/* Brand topbar */}
        {/* <div className="kt-v2-topbar container">
          <div className="kt-v2-brand">
            <img src="/icon.png" alt="Kunga Therapy" />
            <div>
              <span className="kt-v2-brand-name">KUNGA</span>
              <span className="kt-v2-brand-sub">THERAPY</span>
            </div>
          </div>
          <div className="kt-v2-trust">
            <div className="kt-v2-trust-icon"><Users size={18} /></div>
            <div>
              <span className="kt-v2-trust-num">10,000+</span>
              <span className="kt-v2-trust-label">Families Worldwide</span>
            </div>
          </div>
        </div> */}

        {/* Split: copy left | photo right */}
        <div className="kt-hero-split container">

          {/* LEFT — headline, description, chips, banner, CTA, stats */}
          <Reveal as="div" className="kt-hero-left">
            <h1 className="kt-hero-h1">
              The <span className="kt-hero-accent">Missing<br />Link</span>
            </h1>
            <p className="kt-hero-sub">
              Between <strong>Attention</strong>, <strong>Interaction</strong>,{" "}
              <strong>Movement</strong>, and <strong>Communication</strong>.
              A structured therapy program that builds the brain foundations every child needs.
            </p>
            <div className="kt-hero-chips">
              {[
                { icon: Brain, label: "Attention" },
                { icon: Users, label: "Interaction" },
                { icon: Move, label: "Movement" },
                { icon: MessageCircle, label: "Communication" },
              ].map((c) => (
                <span key={c.label} className="kt-hero-chip">
                  <c.icon size={14} /> {c.label}
                </span>
              ))}
            </div>
            <div className="kt-hero-banner">
              <Heart size={18} />
              <p>
                Strong communication begins with{" "}
                <strong>attention, interaction, and connection.</strong>
              </p>
            </div>
            <a
              className="btn btn-primary kt-hero-cta"
              href="#download"
              onClick={() => trackEvent("click", "/", "hero_start_journey")}
            >
              START YOUR JOURNEY <ArrowRight size={20} />
            </a>
            <div className="kt-hero-mini-stats">
              <div className="kt-hero-stat"><strong>10,000+</strong><span>Families</span></div>
              <div className="kt-hero-stat-div" />
              <div className="kt-hero-stat"><strong>95%</strong><span>Satisfaction</span></div>
              <div className="kt-hero-stat-div" />
              <div className="kt-hero-stat"><strong>4</strong><span>Languages</span></div>
            </div>
          </Reveal>

          {/* RIGHT — photo + floating pillar badges */}
          <Reveal className="kt-hero-right">
            <div className="kt-v2-photo-wrap">
              <img
                src="/images/image-to-use.jpeg"
                alt="Mother engaging with child — Kunga Therapy"
                className="kt-v2-photo"
              />
              <div className="kt-pillar-center">
                <img src="/icon.png" alt="Kunga Therapy" />
              </div>
              <div className="kt-pillar kt-pillar--attention">
                <div className="kt-pillar-icon"><Brain size={20} /></div>
                <span>Attention</span>
              </div>
              <div className="kt-pillar kt-pillar--interaction">
                <div className="kt-pillar-icon"><Users size={20} /></div>
                <span>Interaction</span>
              </div>
              <div className="kt-pillar kt-pillar--communication">
                <div className="kt-pillar-icon"><MessageCircle size={20} /></div>
                <span>Communication</span>
              </div>
              <div className="kt-pillar kt-pillar--movement">
                <div className="kt-pillar-icon"><Move size={20} /></div>
                <span>Movement</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Feature cards — full width below the split */}
        <div className="container">
          <Reveal>
            <div className="kt-hero-features">
              {[
                { icon: Brain, label: "Understand", desc: "Understand the reasons behind your child's developmental challenges." },
                { icon: BookOpen, label: "Learn", desc: "Access practical strategies and expert guidance you can use at home." },
                { icon: TrendingUp, label: "Track", desc: "Monitor real progress and milestones every step of the way." },
                { icon: Users, label: "Transform", desc: "Turn daily interactions into meaningful developmental growth." },
              ].map((f) => (
                <div className="kt-hero-feat" key={f.label}>
                  <div className="kt-hero-feat-icon"><f.icon size={30} /></div>
                  <strong>{f.label}</strong>
                  <span>{f.desc}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={60}>
            <div className="kt-v2-cta-wrap">
              <a
                className="btn btn-primary kt-v2-cta"
                href="#download"
                onClick={() => trackEvent("click", "/", "hero_cta_bottom")}
              >
                START YOUR JOURNEY <ArrowRight size={18} />
              </a>
              <div className="kt-v2-dots">
                <span className="active" /><span /><span /><span />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Today's Kunga Session ─────────────────────────────────────────── */}
      <section className="section" id="session" style={{ background: "var(--surface)" }}>
        <div className="container">
          <Reveal as="div" className="section-head">
            <p className="kt-section-eyebrow">Daily Structured Training</p>
            <h2 className="section-ttl">Today's Kunga Session</h2>
            <p className="section-sub">
              Every day, your child works through five targeted areas that build the brain
              systems needed for communication, learning, and connection.
            </p>
          </Reveal>

          <Reveal>
            <div className="kt-session-card">
              <div className="kt-session-grid">
                {SESSION_AREAS.map((area, i) => (
                  <div className="kt-session-area" key={area.title}>
                    <div className="kt-session-num">{i + 1}</div>
                    <div className="kt-session-emoji">{area.emoji}</div>
                    <div className="kt-session-text">
                      <strong>{area.title}</strong>
                      <span>{area.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="kt-session-cta">
                <a
                  className="btn btn-primary"
                  href="#download"
                  onClick={() => trackEvent("click", "/", "session_start_training")}
                >
                  <PlayCircle size={18} /> Start Today's Training
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Why Your Child Understands But Doesn't Speak ────────────────── */}
      <section className="section">
        <div className="container">
          <Reveal as="div" className="kt-split">
            <div className="kt-split-copy">
              <p className="kt-section-eyebrow">Understanding the Why</p>
              <h2 className="kt-split-headline">
                Why Your Child Understands<br />
                But <span className="accent">Doesn't Speak</span>
              </h2>
              <p className="kt-split-sub">Speech begins long before words.</p>
              <p>
                It's not always about words. There is usually a deeper reason. Communication
                is built on foundations that must develop first — and when those foundations
                are weak, speech is delayed even when understanding is present.
              </p>
              <a
                className="btn btn-outline"
                href="#programs"
                onClick={() => trackEvent("click", "/", "why_learn_more")}
              >
                Learn How Kunga Therapy Helps <ChevronRight size={16} />
              </a>
            </div>
            <div className="kt-foundations-list">
              <p className="kt-foundations-label">Communication is built on these foundations:</p>
              {FOUNDATIONS.map((f, i) => (
                <div className="kt-foundation-row" key={f.title}>
                  <div className="kt-foundation-num">{i + 1}</div>
                  <div className="kt-foundation-icon"><f.icon size={20} /></div>
                  <div>
                    <strong>{f.title}</strong>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))}
              <div className="kt-foundation-insight">
                <Brain size={18} />
                <p>
                  Learn how <strong>attention, interaction, sensory regulation,
                    movement, and learning readiness</strong> work together to support communication.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Build The Brain Before The Words ─────────────────────────────── */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="container">
          <Reveal as="div" className="section-head">
            <p className="kt-section-eyebrow">The Brain-Body Connection</p>
            <h2 className="section-ttl">
              Build the Brain<br /><span className="accent">Before the Words</span>
            </h2>
            <p className="section-sub">
              Many children are taught words before the brain is ready to use them.
              Movement, coordination, and regulation build the foundation for communication and learning.
            </p>
          </Reveal>

          <div className="kt-brain-grid">
            {BRAIN_PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 80} className="feature-card kt-brain-card">
                <div className="icon"><p.icon size={22} /></div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="kt-insight-banner">
              <Brain size={20} />
              <p>When the body is ready, the brain can <strong>focus, communicate, and learn.</strong></p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Child Development Journey ──────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <Reveal as="div" className="section-head">
            <p className="kt-section-eyebrow">The Kunga Development Pathway</p>
            <h2 className="section-ttl">Child Development Journey</h2>
            <p className="section-sub">
              Stronger foundations in every area lead to lifelong progress.
              Small daily steps create big developmental changes.
            </p>
          </Reveal>

          <Reveal>
            <div className="kt-journey">
              {JOURNEY_STEPS.map((step, i) => (
                <div className="kt-journey-step" key={step.label}>
                  <div className="kt-journey-icon" style={{ background: step.color }}>
                    <step.icon size={22} color="#fff" />
                  </div>
                  <span className="kt-journey-label">{step.label}</span>
                  {i < JOURNEY_STEPS.length - 1 && (
                    <div className="kt-journey-arrow"><ArrowRight size={18} /></div>
                  )}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="kt-journey-areas">
              {["Communication", "Attention", "Interaction", "Coordination", "Learning Readiness"].map((a) => (
                <div className="kt-journey-area-chip" key={a}>
                  <CheckCircle size={14} />
                  {a}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Today's Recommended Lesson ────────────────────────────────────── */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="container">
          <Reveal as="div" className="section-head">
            <p className="kt-section-eyebrow">Today's Recommended Lesson</p>
            <h2 className="section-ttl">Start With This</h2>
          </Reveal>

          <Reveal>
            <div className="kt-lesson-card">
              <div className="kt-lesson-thumb">
                <PlayCircle size={48} color="#fff" />
              </div>
              <div className="kt-lesson-body">
                <span className="kt-lesson-tag">Featured Lesson</span>
                <h3>"Why Your Child Understands But Doesn't Speak"</h3>
                <p>
                  Discover the developmental foundations behind communication — and learn
                  exactly what you can do today to help your child move forward.
                </p>
                <a
                  className="btn btn-primary"
                  href="#download"
                  onClick={() => trackEvent("click", "/", "lesson_watch")}
                >
                  <PlayCircle size={16} /> Watch Lesson
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── What Your Child Can Gain ──────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <Reveal as="div" className="section-head">
            <p className="kt-section-eyebrow">Real Change. Real Impact.</p>
            <h2 className="section-ttl">
              Real Change for <span className="accent">Real Life</span>
            </h2>
            <p className="section-sub">
              When you support the whole child — brain, body, and connection — amazing things happen.
            </p>
          </Reveal>

          <div className="feature-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
            {OUTCOMES.map((o, i) => (
              <Reveal key={o.title} delay={i * 60} className="feature-card">
                <div className="icon"><o.icon size={22} /></div>
                <h3>{o.title}</h3>
                <p>{o.desc}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={100}>
            <div className="kt-insight-banner" style={{ marginTop: 40 }}>
              <Heart size={20} />
              <p>
                Kunga Therapy is used by families supporting children with <strong>speech delays, autism,
                  ADHD, Down syndrome, cerebral palsy,</strong> and other developmental challenges.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <section className="stats-section imigongo-bg imigongo-hero">
        <div className="container">
          <div className="stats-grid">
            <MetricDisplay value={stats.familiesSupported} suffix="+" label="Families Supported" />
            <MetricDisplay value={stats.caregiverSatisfaction} suffix="%" label="Caregiver Satisfaction" />
            <MetricDisplay value={stats.languagesSupported} suffix=" Languages" label="Supported in App" />
            <MetricDisplay value={24} suffix="/7" label="Access to Guidance" />
          </div>
        </div>
      </section>

      {/* ── Programs ──────────────────────────────────────────────────────── */}
      <section className="section" id="programs" style={{ background: "var(--surface)" }}>
        <div className="container">
          <Reveal as="div" className="section-head">
            <p className="kt-section-eyebrow">Choose Your Program</p>
            <h2 className="section-ttl">
              Every Child is Unique.<br />Their Plan Should Be Too.
            </h2>
            <p className="section-sub">
              Choose the program that fits your child's needs and your family's goals.
              Start today. Change your child's tomorrow.
            </p>
          </Reveal>

          <div className="kt-programs-grid">
            {PROGRAMS.map((prog) => (
              <Reveal key={prog.name} className={`kt-program-card${prog.featured ? " kt-program-card--featured" : ""}`}>
                <div className="kt-program-badge" style={{ background: prog.color }}>
                  {prog.badge}
                </div>
                <h3>{prog.name}</h3>
                <div className="kt-program-price">
                  <span className="kt-price-amount">{prog.price}</span>
                  <span className="kt-price-period">{prog.period}</span>
                </div>
                <ul className="kt-program-includes">
                  {prog.includes.map((item) => (
                    <li key={item}>
                      <CheckCircle size={14} color="var(--green)" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="kt-program-best">
                  <Star size={14} />
                  <span><strong>Best For:</strong> {prog.bestFor}</span>
                </div>
                <a
                  className={`btn ${prog.featured ? "btn-primary" : "btn-outline"}`}
                  href="#download"
                  onClick={() => trackEvent("click", "/", `program_${prog.featured ? "guided" : "foundation"}`)}
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  Get Started <ArrowRight size={16} />
                </a>
                <p className="kt-program-tag">{prog.tag}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={80}>
            <div className="kt-program-reassurance">
              {[
                { icon: "✓", label: "Cancel Anytime", desc: "You're in control." },
                { icon: "🔒", label: "No Long-Term Commitment", desc: "Flexible and hassle-free." },
                { icon: "✦", label: "New Content Added Regularly", desc: "Fresh lessons every month." },
                { icon: "▶", label: "Access While Active", desc: "Learn anytime, anywhere." },
              ].map((r) => (
                <div className="kt-reassurance-item" key={r.label}>
                  <span className="kt-reassurance-icon">{r.icon}</span>
                  <div>
                    <strong>{r.label}</strong>
                    <p>{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Ask Dr. Gad ───────────────────────────────────────────────────── */}
      <section className="mid-cta imigongo-bg imigongo-hero">
        <div className="container mid-cta-inner">
          <Reveal as="div">
            <p className="kt-section-eyebrow" style={{ color: "rgba(255,255,255,.7)" }}>Expert Guidance, Personalised</p>
            <h2>Ask Dr. Gad</h2>
            <p>
              Have questions about your child's development? Get personalised, judgment-free
              guidance directly from Dr. Gad — a real expert who understands your journey.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="kt-askgad-features">
              {[
                "Submit questions about your child",
                "Get personalised video answers",
                "Expert knowledge you can trust",
                "Available in your language",
              ].map((f) => (
                <div className="kt-askgad-feature" key={f}>
                  <CheckCircle size={16} color="var(--green-2)" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
            <a
              className="btn btn-primary"
              href="#download"
              onClick={() => trackEvent("click", "/", "askgad_cta")}
            >
              Ask Dr. Gad <ArrowRight size={16} />
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────────── */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="container">
          <Reveal as="div" className="section-head">
            <p className="kt-section-eyebrow">Real Families. Real Progress.</p>
            <h2 className="section-ttl">Stories of Transformation</h2>
            <p className="section-sub">
              Hear from parents who use Kunga Therapy every day.
            </p>
          </Reveal>
          <div className="testimonial-grid">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 80} className="testimonial-card">
                <div className="stars">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} size={16} fill="currentColor" />
                  ))}
                </div>
                <p>&ldquo;{t.quote}&rdquo;</p>
                <div className="author">
                  <div className="avatar">{t.name.charAt(0)}</div>
                  <div>
                    <div className="name">{t.name}</div>
                    <div className="role">{t.role}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Download ──────────────────────────────────────────────────────── */}
      <DownloadSection />
    </>
  );
}
