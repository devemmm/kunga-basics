import {
  Video,
  CalendarCheck,
  MessageCircle,
  Star,
  BookOpen,
  Bell,
  Users,
  Globe,
  CreditCard,
  ShieldCheck,
  Heart,
  PartyPopper,
} from "lucide-react";
import { trackEvent } from "../lib/track.js";
import DownloadSection from "../components/DownloadSection.jsx";
import Seo from "../components/Seo.jsx";

const GROUPS = [
  {
    title: "Learn & Get Guidance",
    desc: "Expert-curated content and direct access to Dr. Gad, whenever you need it.",
    items: [
      {
        icon: Video,
        title: "Expert Video Modules",
        desc: "Bite-sized video lessons on child development, organised into easy-to-follow modules you can revisit anytime.",
      },
      {
        icon: MessageCircle,
        title: "Ask Dr. Gad",
        desc: "Submit questions about your child's development and get personalised video responses straight from Dr. Gad.",
      },
      {
        icon: Bell,
        title: "Announcements & Updates",
        desc: "Stay in the loop with new modules, tips, and announcements from the Kunga Basics team.",
      },
    ],
  },
  {
    title: "Track Daily Progress",
    desc: "Build healthy routines and watch your child's development unfold over time.",
    items: [
      {
        icon: CalendarCheck,
        title: "Daily Routines & Streaks",
        desc: "Set up daily routines for your child, check them off, and build healthy habits with streaks and reminders.",
      },
      {
        icon: Star,
        title: "Milestone Tracking",
        desc: "Record developmental milestones as your child reaches them, building a clear timeline of their growth.",
      },
      {
        icon: BookOpen,
        title: "Private Journal",
        desc: "Keep journal entries about your child's day-to-day progress, behaviours, and wins — all in one private place.",
      },
      {
        icon: PartyPopper,
        title: "Celebrations",
        desc: "Get a moment of celebration every time your child hits a streak or milestone — small wins matter.",
      },
    ],
  },
  {
    title: "Built for Your Family",
    desc: "Designed around real caregivers, with the flexibility families need.",
    items: [
      {
        icon: Users,
        title: "Multiple Child Profiles",
        desc: "Set up a profile for each child, with routines, milestones, and journals tracked separately for every child.",
      },
      {
        icon: Globe,
        title: "Multi-language Support",
        desc: "Use the app in English, French, Kinyarwanda, or Swahili — switch anytime from settings.",
      },
      {
        icon: Heart,
        title: "Caregiver-first Design",
        desc: "Built for parents and caregivers of children with developmental challenges — practical, supportive, and judgment-free.",
      },
    ],
  },
  {
    title: "Account & Subscriptions",
    desc: "Flexible payment options and full control over your account.",
    items: [
      {
        icon: CreditCard,
        title: "Mobile Money & Card Payments",
        desc: "Subscribe and pay easily using mobile money or card — built for how families in the region actually pay.",
      },
      {
        icon: ShieldCheck,
        title: "Privacy You Control",
        desc: "Manage your privacy preferences and cookie settings directly from the app, with full transparency.",
      },
      {
        icon: Bell,
        title: "Smart Notifications",
        desc: "Gentle reminders for routines, new modules, and responses from Dr. Gad — never miss what matters.",
      },
    ],
  },
];

export default function Features() {
  return (
    <>
      <Seo
        title="App Features — Autism Activities, Speech & ADHD Support | Kunga Basics"
        description="Explore Kunga Basics features: expert video modules for Autism, Speech Delay, ADHD and Cerebral Palsy, daily routine tracking, milestone reports, journals, and Ask Dr. Gad for personalised guidance."
      />

      <section className="hero imigongo-bg imigongo-hero" style={{ paddingBottom: 40 }}>
        <div className="container">
          <h1>Everything the Kunga Basics app can do.</h1>
          <p>
            A closer look at the tools, content, and support built into the
            Kunga Basics mobile app — designed to help caregivers support every
            stage of a child's development.
          </p>
          <div className="actions">
            <a
              className="btn btn-primary"
              href="#download"
              onClick={() => trackEvent("click", "/features", "features_hero_download")}
            >
              Get the App
            </a>
            <a
              className="btn btn-outline"
              href="/about"
              onClick={() => trackEvent("click", "/features", "features_hero_about")}
            >
              About Kunga Basics
            </a>
          </div>
        </div>
      </section>

      {GROUPS.map((group, i) => (
        <section
          key={group.title}
          className="section"
          style={i % 2 === 1 ? { background: "var(--surface)" } : undefined}
        >
          <div className="container">
            <h2 className="section-ttl">{group.title}</h2>
            <p className="section-sub">{group.desc}</p>
            <div className="feature-grid">
              {group.items.map((f) => (
                <div className="feature-card" key={f.title}>
                  <div className="icon"><f.icon size={20} /></div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <DownloadSection />
    </>
  );
}
