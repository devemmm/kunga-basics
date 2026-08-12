/**
 * Free Child Assessment — public page on the Kunga Basics marketing site.
 * No login required. Submits to POST /assessments/guest.
 */

import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { trackEvent } from "../lib/track.js";
import Seo from "../components/Seo.jsx";

const API_BASE = import.meta.env.VITE_API_URL ?? "/api/v1";

// ─── Constants ────────────────────────────────────────────────────────────────

const QUESTIONS = [
  { id: 1,  text: "Follows simple instructions",           example: 'E.g. "Come here", "Sit down", "Give me", "Stop"' },
  { id: 2,  text: "Makes eye contact when spoken to",      example: "Looks at your face during conversation" },
  { id: 3,  text: "Responds to their name",                example: "Turns head or acknowledges when name is called" },
  { id: 4,  text: "Points to objects or people",           example: "Uses finger to point at things they want or see" },
  { id: 5,  text: "Plays with other children",             example: "Engages in shared play, not just parallel play" },
  { id: 6,  text: "Uses words to communicate",             example: "Says single words or short phrases to express needs" },
  { id: 7,  text: "Imitates actions or sounds",            example: "Copies clapping, waving, animal sounds" },
  { id: 8,  text: "Shows interest in surroundings",        example: "Explores environment, curious about new objects" },
  { id: 9,  text: "Maintains attention during activities", example: "Stays focused on a task for several minutes" },
  { id: 10, text: 'Understands "yes" and "no"',            example: "Responds correctly to yes/no questions" },
  { id: 11, text: "Uses gestures (waves, claps)",          example: "Waves bye-bye, claps hands, shakes head no" },
  { id: 12, text: "Tolerates changes in routine",          example: "Adapts when usual schedule or plan changes" },
  { id: 13, text: "Engages in pretend play",               example: "Pretends toys are people, mimics daily activities" },
  { id: 14, text: "Can calm down when upset",              example: "Self-soothes or responds to comforting within minutes" },
  { id: 15, text: "Follows a two-step direction",          example: '"Pick up the toy and bring it here"' },
  { id: 16, text: "Shows affection to familiar people",    example: "Hugs, smiles at, or seeks comfort from caregivers" },
  { id: 17, text: "Coordinates hand-eye movements",        example: "Stacks blocks, draws, catches a ball" },
  { id: 18, text: "Plays independently for short periods", example: "Entertains themselves without needing constant attention" },
  { id: 19, text: "Responds to emotions in others",        example: "Reacts to someone crying or laughing" },
  { id: 20, text: "Identifies common objects by name",     example: '"Where is the cup?" — child points or looks at it' },
  { id: 21, text: "Walks up and down stairs",              example: "Manages steps with or without holding rail" },
  { id: 22, text: "Holds a crayon or pencil",              example: "Grasps writing tool to draw or colour" },
  { id: 23, text: "Reacts to loud or sudden sounds",       example: "Startles, covers ears, or appears distressed" },
  { id: 24, text: "Shows preference for certain foods or textures", example: "Very selective about what they eat or touch" },
  { id: 25, text: "Seeks sensory stimulation",             example: "Spins, rocks, flaps hands, or seeks intense pressure" },
];

const OPTIONS = [
  { key: "never",     label: "Never",     sub: "Does not do this",           score: 0, emoji: "😞", color: "#ef4444" },
  { key: "rarely",    label: "Rarely",    sub: "Does this very few times",   score: 1, emoji: "😕", color: "#ea580c" },
  { key: "sometimes", label: "Sometimes", sub: "Does this some of the time", score: 2, emoji: "😐", color: "#f59e0b" },
  { key: "often",     label: "Often",     sub: "Does this many times",       score: 3, emoji: "🙂", color: "#16a34a" },
  { key: "always",    label: "Always",    sub: "Does this all the time",     score: 4, emoji: "😄", color: "#15803d" },
];

const PROGRAMS = [
  { id: "foundation",     icon: "🏗️", title: "Foundation Program",    desc: "Builds essential skills in communication, attention and daily routines.",           duration: "3–6 months" },
  { id: "implementation", icon: "🏡", title: "Implementation Program", desc: "Learn how to apply Kunga Therapy strategies at home with expert guidance.",        duration: "6–12 months" },
  { id: "advanced",       icon: "🚀", title: "Advanced Program",       desc: "For children needing intensive support and skill development.",                     duration: "12+ months" },
];

const COUNTRIES = [
  "Afghanistan","Albania","Algeria","Angola","Argentina","Australia","Austria",
  "Bangladesh","Belgium","Bolivia","Botswana","Brazil","Bulgaria","Burundi",
  "Cambodia","Cameroon","Canada","Chad","Chile","China","Colombia","Congo (DRC)",
  "Costa Rica","Croatia","Cuba","Denmark","Ecuador","Egypt","Ethiopia",
  "Finland","France","Gabon","Gambia","Germany","Ghana","Greece","Guatemala",
  "Haiti","Honduras","India","Indonesia","Iran","Iraq","Ireland","Israel",
  "Italy","Jamaica","Japan","Jordan","Kenya","Kuwait","Lebanon","Libya",
  "Madagascar","Malawi","Malaysia","Mali","Mexico","Morocco","Mozambique",
  "Namibia","Nepal","Netherlands","New Zealand","Nigeria","Norway","Pakistan",
  "Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania",
  "Russia","Rwanda","Saudi Arabia","Senegal","Serbia","Sierra Leone","Somalia",
  "South Africa","South Korea","South Sudan","Spain","Sri Lanka","Sudan",
  "Sweden","Switzerland","Syria","Tanzania","Thailand","Tunisia","Turkey",
  "Uganda","Ukraine","United Arab Emirates","United Kingdom","United States",
  "Uruguay","Uzbekistan","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe",
];

const DOMAIN_LABELS = {
  communication:     "Communication",
  attention:         "Attention",
  socialInteraction: "Social Interaction",
  sensoryProcessing: "Sensory Processing",
  movement:          "Movement",
};
const DOMAIN_ICONS = {
  communication:     "💬",
  attention:         "👁️",
  socialInteraction: "👥",
  sensoryProcessing: "🌀",
  movement:          "🚶",
};

const STRENGTH_TEXT = {
  enjoysPlay:     "Enjoys playing with others",
  goodEyeContact: "Good eye contact",
  respondsToName: "Responds to name",
  curiosity:      "Shows curiosity in surroundings",
  curiousEager:   "Curious and eager to explore",
};
const AREA_TEXT = {
  expressiveCommunication: "Expressive communication",
  attentionSpan:           "Attention span",
  followingInstructions:   "Following multi-step instructions",
  sensorySensitivities:    "Sensory sensitivities",
  continuedPractice:       "Continued practice across all areas",
};

const STEPS = ["Child Info", "Assessment", "Results", "Insights", "Plan", "Next Steps"];

// ─── Score helper ─────────────────────────────────────────────────────────────

function scoreProfile(answers) {
  const total = Object.values(answers).reduce((s, v) => s + v, 0);
  const max   = QUESTIONS.length * 4;
  const avg   = (ids) => {
    const scores = ids.map((id) => answers[id] ?? 0);
    return Math.round((scores.reduce((a, b) => a + b, 0) / (ids.length * 4)) * 100);
  };
  const domains = {
    communication:     avg([1, 6, 10, 11, 15, 20]),
    attention:         avg([9, 12, 18]),
    socialInteraction: avg([2, 3, 5, 16, 19]),
    sensoryProcessing: avg([23, 24, 25]),
    movement:          avg([17, 21, 22]),
  };
  const overallPct = Math.round((total / max) * 100);
  let program = "foundation";
  if (overallPct >= 60) program = "implementation";
  if (overallPct >= 75) program = "advanced";

  const strengths = [];
  const areas     = [];
  if (domains.socialInteraction >= 60) strengths.push("enjoysPlay");
  if ((answers[2] ?? 0) >= 3)          strengths.push("goodEyeContact");
  if ((answers[3] ?? 0) >= 3)          strengths.push("respondsToName");
  if (domains.movement >= 60)          strengths.push("curiosity");
  if (domains.communication < 50)      areas.push("expressiveCommunication");
  if (domains.attention < 50)          areas.push("attentionSpan");
  if ((answers[15] ?? 0) < 2)          areas.push("followingInstructions");
  if (domains.sensoryProcessing < 40)  areas.push("sensorySensitivities");

  return { domains, overallPct, program, strengths, areas };
}

function domainColor(pct) {
  if (pct >= 70) return "#16a34a";
  if (pct >= 45) return "#f59e0b";
  return "#ea580c";
}

// ─── Step bar ─────────────────────────────────────────────────────────────────

function StepBar({ step }) {
  return (
    <div style={{ borderBottom: "1px solid var(--border)", padding: "14px 0 12px", marginBottom: 32 }}>
      <div className="container">
        <div style={{ display: "flex", alignItems: "flex-start", position: "relative", maxWidth: 640, margin: "0 auto" }}>
          <div style={{ position: "absolute", top: 11, left: 12, right: 12, height: 2, background: "var(--border)", zIndex: 0 }} />
          {STEPS.map((label, i) => {
            const done    = i < step;
            const current = i === step;
            return (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", zIndex: 1 }}>
                <div style={{
                  width: 24, height: 24, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, fontWeight: 800, marginBottom: 5, flexShrink: 0,
                  background: done ? "#16a34a" : current ? "#14532d" : "var(--border)",
                  color: done || current ? "#fff" : "var(--ghost)",
                  transition: "all .2s",
                }}>
                  {done ? "✓" : i + 1}
                </div>
                <div style={{
                  fontSize: 9.5, fontWeight: current ? 700 : 500, textAlign: "center", lineHeight: 1.2,
                  color: done ? "#16a34a" : current ? "#14532d" : "var(--ghost)",
                  maxWidth: 52,
                }}>
                  {label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Shared card style ────────────────────────────────────────────────────────

const card = {
  background: "#fff",
  border: "1px solid var(--border)",
  borderRadius: 16,
  padding: "28px 28px",
  marginBottom: 20,
};

const inputStyle = {
  width: "100%",
  padding: "10px 13px",
  border: "1.5px solid var(--border)",
  borderRadius: 10,
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box",
  color: "var(--ink)",
  background: "#fff",
  fontFamily: "inherit",
};

// ─── Main page ────────────────────────────────────────────────────────────────

export default function Assessment() {
  const scrollRef = useRef(null);
  const [step, setStep]   = useState(0);

  // Step 0
  const [childName,  setChildName]  = useState("");
  const [dob,        setDob]        = useState("");
  const [gender,     setGender]     = useState("");
  const [country,    setCountry]    = useState("");
  const [parentName, setParentName] = useState("");
  const [email,      setEmail]      = useState("");
  const [phoneCode,  setPhoneCode]  = useState("+250");
  const [phone,      setPhone]      = useState("");
  const [showErrors, setShowErrors] = useState(false);

  const errors = {
    childName: !childName.trim() ? "Child's name is required" : null,
    dob:       !dob              ? "Date of birth is required" : null,
    gender:    !gender           ? "Please select a gender"   : null,
    phone:     !phone.trim()     ? "Phone number is required" : null,
  };
  const step0Valid = Object.values(errors).every((e) => e === null);

  // Step 1
  const [qIndex,  setQIndex]  = useState(0);
  const [answers, setAnswers] = useState({});

  // Step 2+
  const [profile,         setProfile]         = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [submitting,      setSubmitting]      = useState(false);
  const [submitted,       setSubmitted]       = useState(false);
  const [submitError,     setSubmitError]     = useState("");

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const goNext = () => {
    if (step === 0) {
      if (!step0Valid) { setShowErrors(true); return; }
      setShowErrors(false);
      trackEvent("assessment_step", { step: "child_info_complete" });
    }
    if (step === 1) {
      if (qIndex < QUESTIONS.length - 1) {
        setQIndex((q) => q + 1);
        scrollTop();
        return;
      }
      // All questions done — compute profile
      const computed = scoreProfile(answers);
      setProfile(computed);
      setSelectedProgram(computed.program);
      trackEvent("assessment_step", { step: "questions_complete", overallPct: computed.overallPct });
    }
    setStep((s) => s + 1);
    scrollTop();
  };

  const goBack = () => {
    if (step === 1 && qIndex > 0) { setQIndex((q) => q - 1); scrollTop(); return; }
    if (step === 0) return;
    setStep((s) => s - 1);
    scrollTop();
  };

  const handleSubmit = async () => {
    if (submitting) return;
    const computed = profile ?? scoreProfile(answers);
    setSubmitting(true);
    setSubmitError("");
    try {
      await fetch(`${API_BASE}/assessments/guest`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Platform": "web" },
        body: JSON.stringify({
          childName:          childName.trim(),
          dateOfBirth:        dob,
          gender,
          country,
          parentName:         parentName.trim(),
          parentEmail:        email.trim(),
          parentPhone:        phone.trim() ? `${phoneCode} ${phone.trim()}` : "",
          answers,
          domainScores:       computed.domains,
          recommendedProgram: PROGRAMS.find((p) => p.id === computed.program)?.title ?? computed.program,
          selectedProgram:    PROGRAMS.find((p) => p.id === selectedProgram)?.title  ?? selectedProgram,
          strengths:          computed.strengths.map((k) => STRENGTH_TEXT[k] ?? k),
          areasToSupport:     computed.areas.map((k) => AREA_TEXT[k] ?? k),
        }),
      });
      setSubmitted(true);
      trackEvent("assessment_submitted", { program: computed.program });
    } catch {
      setSubmitError("Something went wrong — please try again.");
    } finally {
      setSubmitting(false);
    }
    setStep(5);
    scrollTop();
  };

  return (
    <>
      <Seo
        title="Free Child Assessment — Kunga Basics"
        description="Take our free 25-question child development assessment and get a personalised profile, domain scores, and program recommendation — no account required."
      />

      {/* Hero banner */}
      <div style={{
        background: "linear-gradient(135deg,#0D3D22 0%,#1B5E3B 50%,#2D7A52 100%)",
        padding: "48px 24px 40px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -60, right: -40, width: 220, height: 220, borderRadius: "50%", background: "rgba(255,255,255,.04)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 620, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.12)", borderRadius: 99, padding: "5px 14px", marginBottom: 16 }}>
            <span style={{ fontSize: 14 }}>🎁</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#fff", letterSpacing: .4 }}>LIMITED-TIME OFFER — 100% FREE</span>
          </div>
          <h1 style={{ color: "#fff", fontFamily: "var(--fd)", fontSize: "clamp(26px,5vw,38px)", fontWeight: 800, lineHeight: 1.2, margin: "0 0 14px" }}>
            Free Child Development Assessment
          </h1>
          <p style={{ color: "rgba(255,255,255,.80)", fontSize: 15, lineHeight: 1.65, margin: "0 auto 0", maxWidth: 500 }}>
            Answer 25 questions about your child's behaviour and get a personalised development profile with domain scores, strengths, and a recommended support program — completely free, no account needed.
          </p>
        </div>
      </div>

      <StepBar step={step} />

      <div className="container" style={{ maxWidth: 680, paddingBottom: 80 }} ref={scrollRef}>

        {/* ── STEP 0: Child & Parent Info ──────────────────────────────────── */}
        {step === 0 && (
          <div style={card}>
            <h2 style={{ fontFamily: "var(--fd)", fontSize: 20, fontWeight: 800, color: "var(--ink)", marginBottom: 6 }}>
              Tell us about your child
            </h2>
            <p style={{ fontSize: 13.5, color: "var(--muted)", marginBottom: 24, lineHeight: 1.55 }}>
              This helps personalise the assessment. All fields marked required must be filled.
            </p>

            {/* Child name */}
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--ink2)", marginBottom: 6 }}>Child's Full Name *</label>
            <input style={{ ...inputStyle, borderColor: showErrors && errors.childName ? "#ef4444" : "var(--border)" }}
              placeholder="e.g. Amina" value={childName} onChange={(e) => setChildName(e.target.value)} />
            {showErrors && errors.childName && <p style={{ color: "#ef4444", fontSize: 12, margin: "4px 0 0" }}>{errors.childName}</p>}

            {/* DOB */}
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--ink2)", margin: "16px 0 6px" }}>Date of Birth *</label>
            <input type="date" style={{ ...inputStyle, borderColor: showErrors && errors.dob ? "#ef4444" : "var(--border)" }}
              value={dob} onChange={(e) => setDob(e.target.value)} />
            {showErrors && errors.dob && <p style={{ color: "#ef4444", fontSize: 12, margin: "4px 0 0" }}>{errors.dob}</p>}

            {/* Gender */}
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--ink2)", margin: "16px 0 8px" }}>Gender *</label>
            <div style={{ display: "flex", gap: 10 }}>
              {["Boy", "Girl", "Other"].map((g) => (
                <button key={g} onClick={() => setGender(g)}
                  style={{
                    flex: 1, padding: "10px 0", borderRadius: 10, fontWeight: 700, fontSize: 13.5, cursor: "pointer",
                    border: `2px solid ${gender === g ? "#16a34a" : "var(--border)"}`,
                    background: gender === g ? "#16a34a" : "#fff",
                    color: gender === g ? "#fff" : "var(--ink2)", transition: "all .15s",
                  }}>
                  {g}
                </button>
              ))}
            </div>
            {showErrors && errors.gender && <p style={{ color: "#ef4444", fontSize: 12, margin: "4px 0 0" }}>{errors.gender}</p>}

            {/* Country */}
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--ink2)", margin: "16px 0 6px" }}>Country</label>
            <select style={inputStyle} value={country} onChange={(e) => setCountry(e.target.value)}>
              <option value="">Select country (optional)</option>
              {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "24px 0 18px" }}>
              <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: "#16a34a", background: "rgba(22,163,74,.08)", border: "1px solid rgba(22,163,74,.2)", borderRadius: 99, padding: "3px 12px" }}>👤 Parent / Guardian</span>
              <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            </div>

            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--ink2)", marginBottom: 6 }}>Your Name</label>
            <input style={inputStyle} placeholder="Full name" value={parentName} onChange={(e) => setParentName(e.target.value)} />

            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--ink2)", margin: "14px 0 6px" }}>Email Address</label>
            <input type="email" style={inputStyle} placeholder="you@example.com (we'll email your results)"
              value={email} onChange={(e) => setEmail(e.target.value)} />

            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--ink2)", margin: "14px 0 6px" }}>
              Phone Number <span style={{ background: "#16a34a", color: "#fff", fontSize: 10, fontWeight: 800, borderRadius: 99, padding: "2px 8px", marginLeft: 4 }}>Required</span>
            </label>
            <div style={{ display: "flex", gap: 8 }}>
              <select value={phoneCode} onChange={(e) => setPhoneCode(e.target.value)}
                style={{ ...inputStyle, width: 90, flexShrink: 0 }}>
                {["+250","+1","+44","+33","+49","+91","+86","+55","+234","+254","+256","+255","+237","+243","+27","+971","+966","+81","+82","+61","+64"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <input type="tel" style={{ ...inputStyle, flex: 1, borderColor: showErrors && errors.phone ? "#ef4444" : "var(--border)" }}
                placeholder="780 000 000" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            {showErrors && errors.phone && <p style={{ color: "#ef4444", fontSize: 12, margin: "4px 0 0" }}>{errors.phone}</p>}

            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, background: "rgba(22,163,74,.06)", border: "1px solid rgba(22,163,74,.15)", borderRadius: 10, padding: "12px 14px", marginTop: 20 }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>🛡️</span>
              <span style={{ fontSize: 12, color: "var(--ink2)", lineHeight: 1.55 }}>Your information is private and only used to personalise your child's assessment report.</span>
            </div>
          </div>
        )}

        {/* ── STEP 1: Questions ─────────────────────────────────────────────── */}
        {step === 1 && (
          <div style={card}>
            {/* Progress */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: "var(--ink)" }}>
                Question {qIndex + 1} <span style={{ fontWeight: 400, color: "var(--muted)" }}>of {QUESTIONS.length}</span>
              </span>
              <span style={{ fontWeight: 800, fontSize: 14, color: "#16a34a" }}>
                {Math.round(((qIndex + 1) / QUESTIONS.length) * 100)}%
              </span>
            </div>
            <div style={{ height: 6, background: "var(--border)", borderRadius: 99, marginBottom: 20, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${((qIndex + 1) / QUESTIONS.length) * 100}%`, background: "#16a34a", borderRadius: 99, transition: "width .3s" }} />
            </div>

            <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 18 }}>
              Observe your child and select how often they demonstrate each behaviour.
            </p>

            {/* Question card */}
            <div style={{ background: "rgba(22,163,74,.06)", border: "1px solid rgba(22,163,74,.15)", borderRadius: 14, padding: "20px 18px", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0, boxShadow: "0 1px 4px rgba(0,0,0,.08)" }}>❓</div>
                <p style={{ fontWeight: 800, fontSize: 17, color: "var(--ink)", lineHeight: 1.35, margin: 0 }}>
                  {QUESTIONS[qIndex].text}
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 6, background: "rgba(255,255,255,.7)", borderRadius: 8, padding: "8px 12px" }}>
                <span style={{ fontSize: 13, flexShrink: 0 }}>💡</span>
                <span style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.5 }}>{QUESTIONS[qIndex].example}</span>
              </div>
            </div>

            {/* Options */}
            {OPTIONS.map((opt) => {
              const selected = answers[QUESTIONS[qIndex].id] === opt.score;
              return (
                <button key={opt.key} onClick={() => setAnswers((prev) => ({ ...prev, [QUESTIONS[qIndex].id]: opt.score }))}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "13px 16px",
                    borderRadius: 12, marginBottom: 8, cursor: "pointer", textAlign: "left",
                    background: selected ? opt.color + "12" : "#fff",
                    border: `${selected ? 2 : 1.5}px solid ${selected ? opt.color : "var(--border)"}`,
                    transition: "all .14s", fontFamily: "inherit",
                  }}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0, background: selected ? opt.color + "20" : "var(--surface)" }}>
                    {opt.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: selected ? opt.color : "var(--ink)" }}>{opt.label}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 1 }}>{opt.sub}</div>
                  </div>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", flexShrink: 0, border: `2px solid ${selected ? opt.color : "var(--border)"}`, background: selected ? opt.color : "transparent", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11 }}>
                    {selected && "✓"}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* ── STEP 2: Results ───────────────────────────────────────────────── */}
        {step === 2 && profile && (
          <div style={card}>
            <div style={{ background: "linear-gradient(135deg,#14532d,#16a34a)", borderRadius: 12, padding: "24px 20px", marginBottom: 28, textAlign: "center" }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>📊</div>
              <h2 style={{ color: "#fff", fontFamily: "var(--fd)", fontSize: 22, fontWeight: 800, margin: "0 0 6px" }}>Development Profile</h2>
              <p style={{ color: "rgba(255,255,255,.82)", fontSize: 13, margin: 0 }}>Based on {QUESTIONS.length} questions answered</p>
            </div>

            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ fontSize: 52, fontWeight: 900, color: domainColor(profile.overallPct), lineHeight: 1 }}>{profile.overallPct}%</div>
              <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>Overall development score</div>
            </div>

            {Object.entries(profile.domains).map(([key, pct]) => {
              const color = domainColor(pct);
              return (
                <div key={key} style={{ marginBottom: 18 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>
                      {DOMAIN_ICONS[key]}
                    </div>
                    <span style={{ flex: 1, fontWeight: 700, fontSize: 14, color: "var(--ink)" }}>{DOMAIN_LABELS[key]}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color, background: color + "18", borderRadius: 99, padding: "2px 8px" }}>
                      {pct >= 70 ? "On track" : "Needs support"}
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "var(--muted)", minWidth: 36, textAlign: "right" }}>{pct}%</span>
                  </div>
                  <div style={{ height: 8, background: "var(--border)", borderRadius: 99, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 99, transition: "width .6s ease" }} />
                  </div>
                </div>
              );
            })}

            <div style={{ marginTop: 20, display: "flex", alignItems: "flex-start", gap: 10, background: "rgba(22,163,74,.06)", border: "1px solid rgba(22,163,74,.15)", borderRadius: 12, padding: "14px 16px" }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>ℹ️</span>
              <span style={{ fontSize: 12.5, color: "var(--ink2)", lineHeight: 1.55 }}>This profile is an initial screen — not a clinical diagnosis. Please consult a specialist for a full evaluation.</span>
            </div>
          </div>
        )}

        {/* ── STEP 3: Insights ──────────────────────────────────────────────── */}
        {step === 3 && profile && (
          <div style={card}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14, background: "rgba(22,163,74,.06)", border: "1px solid rgba(22,163,74,.15)", borderRadius: 12, padding: "18px 20px", marginBottom: 24 }}>
              <span style={{ fontSize: 30, flexShrink: 0 }}>✨</span>
              <div>
                <h2 style={{ fontFamily: "var(--fd)", fontSize: 18, fontWeight: 800, color: "var(--ink)", marginBottom: 4 }}>Key Insights</h2>
                <p style={{ fontSize: 13, color: "var(--muted)", margin: 0, lineHeight: 1.55 }}>Based on your child's assessment responses, here are personalised observations.</p>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 15, fontWeight: 800, color: "var(--ink)", marginBottom: 12 }}>🌟 Strengths</h3>
              {(profile.strengths.length > 0 ? profile.strengths : ["curiousEager"]).map((s) => (
                <div key={s} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
                  <span style={{ color: "#16a34a", fontSize: 18, flexShrink: 0, marginTop: 1 }}>✅</span>
                  <span style={{ fontSize: 14, color: "var(--ink2)", lineHeight: 1.5 }}>{STRENGTH_TEXT[s] ?? s}</span>
                </div>
              ))}
            </div>

            <div>
              <h3 style={{ fontSize: 15, fontWeight: 800, color: "#ea580c", marginBottom: 12 }}>🎯 Areas to Support</h3>
              {(profile.areas.length > 0 ? profile.areas : ["continuedPractice"]).map((a) => (
                <div key={a} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ea580c", flexShrink: 0, marginTop: 6 }} />
                  <span style={{ fontSize: 14, color: "var(--ink2)", lineHeight: 1.5 }}>{AREA_TEXT[a] ?? a}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── STEP 4: Plan ──────────────────────────────────────────────────── */}
        {step === 4 && profile && (
          <>
            <div style={card}>
              <h2 style={{ fontFamily: "var(--fd)", fontSize: 20, fontWeight: 800, color: "var(--ink)", marginBottom: 6 }}>Recommended Program</h2>
              <p style={{ fontSize: 13.5, color: "var(--muted)", marginBottom: 22, lineHeight: 1.55 }}>Choose a program that fits your child's current needs.</p>

              {PROGRAMS.map((prog) => {
                const active      = selectedProgram === prog.id;
                const recommended = profile.program === prog.id;
                return (
                  <button key={prog.id} onClick={() => setSelectedProgram(prog.id)}
                    style={{
                      width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "18px 18px",
                      borderRadius: 14, marginBottom: 12, cursor: "pointer", textAlign: "left", position: "relative",
                      border: `${active ? 2 : 1.5}px solid ${active ? "#16a34a" : "var(--border)"}`,
                      background: active ? "rgba(22,163,74,.06)" : "#fff", transition: "all .15s", fontFamily: "inherit",
                    }}>
                    {recommended && (
                      <div style={{ position: "absolute", top: -1, right: 14, background: "#16a34a", color: "#fff", fontSize: 10, fontWeight: 800, padding: "3px 10px", borderRadius: "0 0 8px 8px" }}>
                        ⭐ Recommended
                      </div>
                    )}
                    <div style={{ width: 52, height: 52, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0, background: active ? "rgba(22,163,74,.14)" : "var(--surface)" }}>
                      {prog.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, fontSize: 15, color: active ? "#14532d" : "var(--ink)", marginBottom: 3 }}>{prog.title}</div>
                      <div style={{ fontSize: 12.5, color: "var(--muted)", lineHeight: 1.4, marginBottom: 5 }}>{prog.desc}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <span style={{ fontSize: 12 }}>🕐</span>
                        <span style={{ fontSize: 12, color: "#16a34a", fontWeight: 700 }}>{prog.duration}</span>
                      </div>
                    </div>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", flexShrink: 0, border: `2px solid ${active ? "#16a34a" : "var(--border)"}`, background: active ? "#16a34a" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12 }}>
                      {active && "✓"}
                    </div>
                  </button>
                );
              })}
            </div>

            <div style={{ ...card, background: "rgba(22,163,74,.05)", border: "1px solid rgba(22,163,74,.15)" }}>
              <h3 style={{ fontFamily: "var(--fd)", fontSize: 15, fontWeight: 800, color: "var(--ink)", marginBottom: 14 }}>What's included</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[{ e: "📋", l: "Structured lessons" }, { e: "👩‍👧", l: "Parent coaching" }, { e: "📊", l: "Progress tracking" }, { e: "👨‍⚕️", l: "Expert support" }].map((item) => (
                  <div key={item.l} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "14px 10px", background: "#fff", borderRadius: 12, border: "1px solid var(--border)" }}>
                    <span style={{ fontSize: 24 }}>{item.e}</span>
                    <span style={{ fontSize: 12, color: "var(--ink2)", fontWeight: 600, textAlign: "center" }}>{item.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── STEP 5: Next Steps ────────────────────────────────────────────── */}
        {step === 5 && (
          <div style={card}>
            <div style={{ background: "linear-gradient(135deg,#14532d,#16a34a)", borderRadius: 12, padding: "28px 20px", marginBottom: 24, textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 10 }}>👨‍⚕️</div>
              <h2 style={{ color: "#fff", fontFamily: "var(--fd)", fontSize: 20, fontWeight: 800, margin: "0 0 8px" }}>What Happens Next?</h2>
              <p style={{ color: "rgba(255,255,255,.85)", fontSize: 13, margin: 0, lineHeight: 1.55 }}>
                Your assessment is complete. Our team will review it and reach out within 2 business days.
              </p>
              {submitted && email && (
                <div style={{ marginTop: 14, background: "rgba(255,255,255,.15)", borderRadius: 10, padding: "10px 14px", display: "inline-block" }}>
                  <span style={{ color: "#fff", fontWeight: 700, fontSize: 13 }}>✅ Results sent to {email}</span>
                </div>
              )}
            </div>

            <p style={{ fontSize: 14, color: "var(--ink2)", marginBottom: 22, lineHeight: 1.65 }}>
              Ready to take the next step? Download the Kunga Basics app for full access to modules, daily routines, and Dr. Gad.
            </p>

            {/* App download CTA */}
            <div style={{ background: "rgba(22,163,74,.06)", border: "1px solid rgba(22,163,74,.15)", borderRadius: 14, padding: "20px 18px", marginBottom: 20, textAlign: "center" }}>
              <div style={{ fontWeight: 800, fontSize: 16, color: "var(--ink)", marginBottom: 6 }}>Get the Kunga Basics App</div>
              <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 16, lineHeight: 1.55 }}>
                Access all programs, track your child's progress, and connect with Dr. Gad — available on iOS.
              </p>
              <a href="https://apps.apple.com/app/kunga-basics/id6744225698" target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#16a34a", color: "#fff", padding: "12px 24px", borderRadius: 99, fontWeight: 800, fontSize: 14, textDecoration: "none" }}
                onClick={() => trackEvent("assessment_appstore_click")}>
                📱 Download on the App Store
              </a>
            </div>

            {/* Contact / Support CTA */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 18px", background: "#fff", border: "1px solid var(--border)", borderRadius: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(37,99,235,.10)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>📞</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: "var(--ink)" }}>Talk to Our Team</div>
                <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 2 }}>Questions about the results? We're here to help.</div>
              </div>
              <Link to="/support" style={{ display: "inline-flex", alignItems: "center", gap: 4, color: "#16a34a", fontWeight: 700, fontSize: 13, textDecoration: "none" }}>
                Contact →
              </Link>
            </div>
          </div>
        )}

        {/* ── Navigation buttons ────────────────────────────────────────────── */}
        <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
          {step > 0 && step < 5 && (
            <button onClick={goBack}
              style={{ flex: 1, padding: "13px 20px", borderRadius: 12, fontWeight: 700, fontSize: 14, border: "1.5px solid var(--border)", background: "#fff", color: "var(--ink2)", cursor: "pointer" }}>
              ← Back
            </button>
          )}

          {step < 4 && (
            <button onClick={goNext}
              disabled={step === 1 && answers[QUESTIONS[qIndex]?.id] === undefined}
              style={{
                flex: 1, padding: "13px 20px", borderRadius: 12, fontWeight: 800, fontSize: 14, border: "none",
                background: step === 1 && answers[QUESTIONS[qIndex]?.id] === undefined ? "var(--border)" : "var(--green)",
                color: step === 1 && answers[QUESTIONS[qIndex]?.id] === undefined ? "var(--ghost)" : "#fff",
                cursor: step === 1 && answers[QUESTIONS[qIndex]?.id] === undefined ? "not-allowed" : "pointer",
                transition: "all .15s",
              }}>
              Next →
            </button>
          )}

          {step === 4 && (
            <>
              {submitError && <p style={{ width: "100%", color: "#ef4444", fontSize: 13, margin: "0 0 8px" }}>{submitError}</p>}
              <button onClick={goBack} style={{ flex: 1, padding: "13px 20px", borderRadius: 12, fontWeight: 700, fontSize: 14, border: "1.5px solid var(--border)", background: "#fff", color: "var(--ink2)", cursor: "pointer" }}>
                ← Back
              </button>
              <button onClick={handleSubmit} disabled={submitting}
                style={{ flex: 2, padding: "13px 20px", borderRadius: 12, fontWeight: 800, fontSize: 14, border: "none", background: submitting ? "var(--border)" : "var(--green)", color: submitting ? "var(--ghost)" : "#fff", cursor: submitting ? "not-allowed" : "pointer" }}>
                {submitting ? "Submitting…" : "Submit Assessment →"}
              </button>
            </>
          )}

          {step === 5 && (
            <a href="https://apps.apple.com/app/kunga-basics/id6744225698" target="_blank" rel="noopener noreferrer"
              style={{ flex: 1, padding: "13px 20px", borderRadius: 12, fontWeight: 800, fontSize: 14, border: "none", background: "var(--green)", color: "#fff", textAlign: "center", textDecoration: "none", display: "block" }}
              onClick={() => trackEvent("assessment_appstore_click_footer")}>
              📱 Download the App
            </a>
          )}
        </div>
      </div>
    </>
  );
}
