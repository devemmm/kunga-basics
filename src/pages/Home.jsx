import {
  Heart,
  Clock,
  TrendingUp,
  Sparkles,
  Video,
  MessageCircle,
  CalendarCheck,
  BookOpen,
  Users,
  Globe,
  CreditCard,
  Bell,
  CheckCircle2,
  Smartphone,
  Globe2,
  PlayCircle,
  Star,
} from "lucide-react";
import { trackEvent } from "../lib/track.js";
import DownloadSection from "../components/DownloadSection.jsx";
import Reveal from "../components/Reveal.jsx";
import StatCounter from "../components/StatCounter.jsx";

const BENEFITS = [
  {
    icon: Clock,
    title: "Save Time",
    desc: "Quick daily routines and bite-sized guidance that fit into even the busiest caregiving schedule.",
  },
  {
    icon: MessageCircle,
    title: "Get Expert Advice",
    desc: "Ask Dr. Gad your questions and get personalised, judgment-free guidance from a real expert.",
  },
  {
    icon: TrendingUp,
    title: "Track Progress",
    desc: "Watch milestones, streaks, and journals build into a clear picture of your child's growth over time.",
  },
  {
    icon: Heart,
    title: "Support Every Milestone",
    desc: "From first steps to first words, celebrate every win — big or small — along the way.",
  },
];

const FEATURE_GROUPS = [
  {
    title: "Learn",
    desc: "Expert-led content, whenever you need it.",
    items: [
      { icon: Video, title: "Video Modules", desc: "Bite-sized expert lessons on child development." },
      { icon: MessageCircle, title: "Ask Dr. Gad", desc: "Personalised video answers to your questions." },
    ],
  },
  {
    title: "Track",
    desc: "Build routines and watch progress unfold.",
    items: [
      { icon: CalendarCheck, title: "Daily Progress", desc: "Routines, streaks, and reminders that stick." },
      { icon: BookOpen, title: "Journals", desc: "Capture milestones, moods, and daily wins." },
    ],
  },
  {
    title: "Family",
    desc: "Built around how real families work.",
    items: [
      { icon: Users, title: "Child Profiles", desc: "Separate tracking for every child in your care." },
      { icon: Globe, title: "Multi-language", desc: "English, French, Kinyarwanda, and Swahili." },
    ],
  },
  {
    title: "Account",
    desc: "Flexible, secure, and under your control.",
    items: [
      { icon: CreditCard, title: "Payments", desc: "Mobile money & card payments built for the region." },
      { icon: Bell, title: "Notifications", desc: "Gentle reminders for what matters most." },
    ],
  },
];

const TESTIMONIALS = [
  {
    name: "Aline U.",
    role: "Mother of two, Kigali",
    quote: "Kunga Basics helped me understand my son's milestones without feeling overwhelmed. The daily routines fit right into our mornings.",
  },
  {
    name: "Eric N.",
    role: "Father & caregiver",
    quote: "Ask Dr. Gad is a game changer — I finally have a place to ask the questions I was embarrassed to ask anyone else.",
  },
  {
    name: "Solange M.",
    role: "Caregiver, Huye",
    quote: "The journal feature lets me look back and see how far my daughter has come. It's become part of our daily routine.",
  },
];

export default function Home() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="hero imigongo-bg imigongo-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">
              <Sparkles size={14} /> Built for caregivers, by experts
            </span>
            <h1>
              Helping Every Child Reach Their{" "}
              <span className="accent">Full Potential</span>
            </h1>
            <p>
              Expert guidance, developmental tracking, and personalized support
              for caregivers — all in one app.
            </p>
            <div className="actions">
              <a
                className="btn btn-primary"
                href="#download"
                onClick={() => trackEvent("click", "/", "hero_get_started")}
              >
                Get Started
              </a>
              <a
                className="btn btn-outline"
                href="/features"
                onClick={() => trackEvent("click", "/", "hero_watch_demo")}
              >
                <PlayCircle size={18} /> Watch Demo
              </a>
            </div>
            <div className="trust-row">
              <span className="trust-item"><CheckCircle2 size={16} /> Trusted by families</span>
              <span className="trust-item"><Smartphone size={16} /> Available on iOS &amp; Android</span>
              <span className="trust-item"><Globe2 size={16} /> Multi-language support</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="phone-frame">
              <div className="phone-screen">
                <img src="/icon.png" alt="Kunga Basics app preview" />
              </div>
            </div>
            <div className="float-card card-1">
              <CalendarCheck size={18} /> Routine completed!
            </div>
            <div className="float-card card-2">
              <Star size={18} /> Milestone reached 🎉
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Parents Love Kunga Basics ───────────────────────────────── */}
      <section className="section">
        <div className="container">
          <Reveal as="div" className="section-head">
            <h2 className="section-ttl">Why Parents Love Kunga Basics</h2>
            <p className="section-sub">
              Everything you need to support your child's development, designed
              around real life.
            </p>
          </Reveal>
          <div className="feature-grid cols-4">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={i * 80} className="feature-card">
                <div className="icon"><b.icon size={22} /></div>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── App Preview ──────────────────────────────────────────────────── */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="container">
          <Reveal as="div" className="section-head">
            <h2 className="section-ttl">A Closer Look at the App</h2>
            <p className="section-sub">
              A simple, friendly experience designed for busy caregivers — on
              iOS and Android.
            </p>
          </Reveal>
          <Reveal>
            <div className="app-preview">
              {["Daily Routines", "Milestone Tracking", "Ask Dr. Gad", "Family Profiles", "Journal"].map((label) => (
                <div className="preview-card" key={label}>
                  <div className="placeholder">{label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Features grouped by category ────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <Reveal as="div" className="section-head">
            <h2 className="section-ttl">Everything You Need, In One Place</h2>
            <p className="section-sub">
              Learn, track, and grow together — with tools built for every part
              of your caregiving journey.
            </p>
          </Reveal>

          {FEATURE_GROUPS.map((group, gi) => (
            <Reveal key={group.title} delay={gi * 60} style={{ marginBottom: 40 }}>
              <h3 className="group-ttl">{group.title}</h3>
              <p className="section-sub" style={{ marginBottom: 20 }}>{group.desc}</p>
              <div className="feature-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
                {group.items.map((f) => (
                  <div className="feature-card" key={f.title}>
                    <div className="icon"><f.icon size={22} /></div>
                    <h3>{f.title}</h3>
                    <p>{f.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}

          <Reveal style={{ textAlign: "center", marginTop: 8 }}>
            <a
              className="btn btn-outline"
              href="/features"
              onClick={() => trackEvent("click", "/", "home_explore_features")}
            >
              Explore All Features
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── Stats / Social proof ─────────────────────────────────────────── */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <StatCounter value={10000} suffix="+" label="Families Supported" />
            <StatCounter value={95} suffix="%" label="Caregiver Satisfaction" />
            <StatCounter value={4} suffix=" Languages" label="Supported in App" />
            <StatCounter value={24} suffix="/7" label="Access to Guidance" />
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="container">
          <Reveal as="div" className="section-head">
            <h2 className="section-ttl">Real Stories, Real Progress</h2>
            <p className="section-sub">
              Hear from caregivers who use Kunga Basics every day.
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

      {/* ── Conversion / Download ────────────────────────────────────────── */}
      <DownloadSection />
    </>
  );
}
