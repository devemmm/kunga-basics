import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Eye, EyeOff, CheckCircle2, AlertCircle, Check, ShieldCheck } from "lucide-react";
import Seo from "../components/Seo.jsx";

const BASE = import.meta.env.VITE_API_URL ?? "/api/v1";

async function resetPassword(token, newPassword) {
  const res  = await fetch(`${BASE}/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, newPassword }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error ?? data?.message ?? "Something went wrong");
  return data;
}

function getRequirements(pw) {
  return [
    { label: "At least 8 characters", met: pw.length >= 8 },
    { label: "One uppercase letter", met: /[A-Z]/.test(pw) },
    { label: "One number", met: /[0-9]/.test(pw) },
  ];
}

function getStrength(pw) {
  if (!pw) return null;
  if (pw.length < 6) return { pct: 25, color: "#ef4444", label: "Too short" };
  if (pw.length < 8) return { pct: 45, color: "#f59e0b", label: "Weak" };
  const score = [/[A-Z]/.test(pw), /[0-9]/.test(pw), /[^A-Za-z0-9]/.test(pw)].filter(Boolean).length;
  if (score >= 3)  return { pct: 100, color: "#10b981", label: "Strong" };
  if (score === 2) return { pct: 75,  color: "#3b82f6", label: "Good" };
  return             { pct: 60,  color: "#f59e0b", label: "Weak" };
}

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [newPw,     setNewPw]     = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showNew,   setShowNew]   = useState(false);
  const [showConf,  setShowConf]  = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [done,      setDone]      = useState(false);
  const [error,     setError]     = useState(null);
  const [newFocus,  setNewFocus]  = useState(false);
  const [confFocus, setConfFocus] = useState(false);

  const strength     = getStrength(newPw);
  const requirements = getRequirements(newPw);
  const pwMatch      = confirmPw.length > 0 && newPw === confirmPw;
  const pwMismatch   = confirmPw.length > 0 && newPw !== confirmPw;

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!newPw || newPw.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (newPw !== confirmPw)        { setError("Passwords do not match.");                  return; }
    setLoading(true);
    try {
      await resetPassword(token, newPw);
      setDone(true);
      window.history.replaceState({}, document.title, "/reset-password");
    } catch (err) {
      setError(err?.message ?? "Invalid or expired reset link. Please request a new one.");
    } finally {
      setLoading(false);
    }
  };

  const inp = (focused, invalid) => ({
    width: "100%", padding: "13px 46px 13px 16px", borderRadius: 12, fontSize: 14.5,
    fontFamily: "var(--fb)", color: "#111",
    background: invalid ? "#fef2f2" : focused ? "#fff" : "var(--surface)",
    border: `1.5px solid ${invalid ? "#ef4444" : focused ? "var(--green)" : "var(--border)"}`,
    boxShadow: focused && !invalid ? "0 0 0 4px rgba(22,163,74,.12)" : "none",
    outline: "none", transition: "all .15s", boxSizing: "border-box",
  });

  return (
    <>
      <Seo title="Reset your password — Kunga Basics" description="Set a new password for your Kunga Basics account." />
      <div className="reset-shell" style={{
        minHeight: "100vh", display: "flex",
        fontFamily: "var(--fb)",
      }}>
        {/* Brand panel — becomes a top hero strip on small screens */}
        <div className="reset-brand-panel" style={{
          flex: "0 0 42%", display: "flex", flexDirection: "column",
          justifyContent: "space-between", gap: 28,
          padding: "44px 48px",
          background: "linear-gradient(155deg, #0d3b36 0%, #134e3f 45%, var(--green) 100%)",
          backgroundImage: "var(--pattern-hero), linear-gradient(155deg, #0d3b36 0%, #134e3f 45%, var(--green) 100%)",
          backgroundSize: "var(--pattern-hero-size), cover",
          color: "#fff", position: "relative", overflow: "hidden",
        }}>
          <div className="reset-brand-orb" style={{
            position: "absolute", top: -120, right: -120, width: 320, height: 320,
            borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,.14), transparent 70%)",
          }} />
          <div className="reset-brand-orb" style={{
            position: "absolute", bottom: -140, left: -100, width: 360, height: 360,
            borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,.08), transparent 70%)",
          }} />

          <a href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", position: "relative", zIndex: 1 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 14, background: "#fff", padding: 7,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 8px 24px rgba(0,0,0,.18)",
            }}>
              <img src="/icon.png" style={{ width: 28, height: 28, objectFit: "contain" }} alt="Kunga Basics" />
            </div>
            <span style={{ fontFamily: "var(--fd)", fontWeight: 900, fontSize: 19, color: "#fff", letterSpacing: "-.3px" }}>
              Kunga Basics
            </span>
          </a>

          <div className="reset-brand-copy" style={{ position: "relative", zIndex: 1, maxWidth: 360 }}>
            <div className="reset-brand-badge" style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "rgba(255,255,255,.12)", borderRadius: 999,
              padding: "6px 12px", fontSize: 11.5, fontWeight: 700,
              letterSpacing: ".4px", textTransform: "uppercase", marginBottom: 18,
            }}>
              <ShieldCheck size={14} /> Account security
            </div>
            <div className="reset-brand-headline" style={{ fontFamily: "var(--fd)", fontWeight: 900, fontSize: 30, lineHeight: 1.25, marginBottom: 12 }}>
              Let's get you a fresh password
            </div>
            <div className="reset-brand-desc" style={{ fontSize: 14.5, lineHeight: 1.7, color: "rgba(255,255,255,.85)" }}>
              Choose something strong and memorable — you'll use it to sign back
              into the Kunga Basics app on your child's device.
            </div>
          </div>

          <div className="reset-brand-footer" style={{ position: "relative", zIndex: 1, fontSize: 12.5, color: "rgba(255,255,255,.65)" }}>
            © {new Date().getFullYear()} Kunga Basics. All rights reserved.
          </div>
        </div>

        {/* Form panel */}
        <div style={{
          flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
          padding: "32px 16px", background: "var(--surface)",
        }}>
          <div style={{ width: "100%", maxWidth: 420 }}>

            <div style={{
              background: "#fff", borderRadius: 24, padding: "40px 36px",
              boxShadow: "0 24px 64px rgba(15,23,42,.10), 0 4px 16px rgba(15,23,42,.05)",
              border: "1px solid rgba(15,23,42,.04)",
            }}>
              {!token ? (
                <div style={{ textAlign: "center" }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: "50%", margin: "0 auto 18px",
                    background: "linear-gradient(135deg, rgba(239,68,68,.14), rgba(239,68,68,.04))",
                    border: "2px solid rgba(239,68,68,.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <AlertCircle size={28} color="#ef4444" />
                  </div>
                  <div style={{ fontFamily: "var(--fd)", fontWeight: 900, fontSize: 21, color: "var(--ink)", marginBottom: 10 }}>
                    Invalid link
                  </div>
                  <div style={{ fontSize: 13.5, color: "var(--muted)", lineHeight: 1.7 }}>
                    This password reset link is missing or invalid. Please request a new one from the Kunga Basics app.
                  </div>
                </div>
              ) : done ? (
                <div style={{ textAlign: "center" }}>
                  <div style={{
                    width: 72, height: 72, borderRadius: "50%", margin: "0 auto 20px",
                    background: "linear-gradient(135deg, rgba(16,185,129,.15), rgba(16,185,129,.05))",
                    border: "2px solid rgba(16,185,129,.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <CheckCircle2 size={34} color="#10b981" />
                  </div>
                  <div style={{ fontFamily: "var(--fd)", fontWeight: 900, fontSize: 21, color: "var(--ink)", marginBottom: 10 }}>
                    Password updated!
                  </div>
                  <div style={{ fontSize: 13.5, color: "var(--muted)", lineHeight: 1.7, marginBottom: 24 }}>
                    Your password has been changed successfully. You can now go back to the Kunga Basics app and sign in with your new password.
                  </div>
                  <a
                    href="https://kungabasics.com/app/login"
                    style={{
                      display: "inline-block", width: "100%", padding: "14px 0", borderRadius: 14,
                      background: "var(--gradient-primary)", color: "#fff", fontFamily: "var(--fb)",
                      fontSize: 15, fontWeight: 700, textDecoration: "none",
                      boxShadow: "0 8px 24px rgba(22,163,74,.28)", boxSizing: "border-box",
                    }}
                  >
                    Open Kunga Basics app
                  </a>
                  <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 12 }}>
                    If nothing happens, open the Kunga Basics app manually and sign in.
                  </div>
                </div>
              ) : (
                <>
                  <div style={{ marginBottom: 28 }}>
                    <div style={{ fontFamily: "var(--fd)", fontWeight: 900, fontSize: 22, color: "var(--ink)", letterSpacing: "-.3px", marginBottom: 6 }}>
                      Set new password
                    </div>
                    <div style={{ fontSize: 13.5, color: "var(--muted)", lineHeight: 1.6 }}>
                      Choose a strong password to protect your account.
                    </div>
                  </div>

                  <form onSubmit={submit}>
                    <div style={{ marginBottom: 18 }}>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "var(--ink2)", marginBottom: 7, letterSpacing: ".5px", textTransform: "uppercase" }}>
                        New password
                      </label>
                      <div style={{ position: "relative" }}>
                        <input
                          type={showNew ? "text" : "password"}
                          value={newPw}
                          required
                          autoFocus
                          onChange={e => setNewPw(e.target.value)}
                          onFocus={() => setNewFocus(true)}
                          onBlur={() => setNewFocus(false)}
                          placeholder="At least 8 characters"
                          style={inp(newFocus, false)}
                        />
                        <button type="button" tabIndex={-1} onClick={() => setShowNew(v => !v)}
                          style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: showNew ? "var(--green)" : "var(--ghost)", display: "flex", padding: 4 }}>
                          {showNew ? <EyeOff size={17} /> : <Eye size={17} />}
                        </button>
                      </div>

                      {strength && (
                        <div style={{ marginTop: 10 }}>
                          <div style={{ height: 5, borderRadius: 3, background: "var(--border)", overflow: "hidden" }}>
                            <div style={{
                              height: "100%", width: `${strength.pct}%`, background: strength.color,
                              borderRadius: 3, transition: "width .25s ease, background .25s ease",
                            }} />
                          </div>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 14px", marginTop: 10 }}>
                            {requirements.map(req => (
                              <div key={req.label} style={{
                                display: "flex", alignItems: "center", gap: 5,
                                fontSize: 12, color: req.met ? "#10b981" : "var(--ghost)",
                                fontWeight: req.met ? 600 : 500, transition: "color .15s",
                              }}>
                                <div style={{
                                  width: 14, height: 14, borderRadius: "50%",
                                  display: "flex", alignItems: "center", justifyContent: "center",
                                  background: req.met ? "rgba(16,185,129,.15)" : "var(--border)",
                                  transition: "background .15s",
                                }}>
                                  {req.met && <Check size={9} strokeWidth={3} />}
                                </div>
                                {req.label}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div style={{ marginBottom: 24 }}>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "var(--ink2)", marginBottom: 7, letterSpacing: ".5px", textTransform: "uppercase" }}>
                        Confirm password
                      </label>
                      <div style={{ position: "relative" }}>
                        <input
                          type={showConf ? "text" : "password"}
                          value={confirmPw}
                          required
                          onChange={e => setConfirmPw(e.target.value)}
                          onFocus={() => setConfFocus(true)}
                          onBlur={() => setConfFocus(false)}
                          placeholder="Repeat new password"
                          style={inp(confFocus, pwMismatch)}
                        />
                        <button type="button" tabIndex={-1} onClick={() => setShowConf(v => !v)}
                          style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: showConf ? "var(--green)" : "var(--ghost)", display: "flex", padding: 4 }}>
                          {pwMatch
                            ? <CheckCircle2 size={17} color="#10b981" />
                            : showConf ? <EyeOff size={17} /> : <Eye size={17} />}
                        </button>
                      </div>
                      {pwMismatch && (
                        <div style={{ fontSize: 12, color: "#ef4444", marginTop: 6, fontWeight: 500 }}>Passwords do not match</div>
                      )}
                    </div>

                    {error && (
                      <div style={{
                        background: "#fef2f2", color: "#b91c1c", border: "1px solid #fca5a5",
                        borderRadius: 12, padding: "11px 14px", fontSize: 13, marginBottom: 20,
                        display: "flex", alignItems: "center", gap: 8, fontWeight: 500,
                      }}>
                        <AlertCircle size={15} /> {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading || !newPw || !confirmPw}
                      style={{
                        width: "100%", padding: "14px 0", borderRadius: 14, border: "none",
                        background: "var(--gradient-primary)",
                        color: "#fff", fontFamily: "var(--fb)", fontSize: 15, fontWeight: 700,
                        cursor: loading ? "default" : "pointer",
                        opacity: loading || !newPw || !confirmPw ? 0.6 : 1,
                        boxShadow: "0 8px 24px rgba(22,163,74,.28)",
                        transition: "opacity .15s, transform .1s",
                      }}
                    >
                      {loading ? "Updating…" : "Reset password"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 880px) {
            .reset-shell { flex-direction: column; }
            .reset-brand-panel {
              flex: 0 0 auto !important;
              padding: 28px 24px !important;
              gap: 16px !important;
            }
            .reset-brand-orb { display: none; }
            .reset-brand-copy { max-width: 100% !important; }
            .reset-brand-headline { font-size: 22px !important; margin-bottom: 8px !important; }
            .reset-brand-desc { display: none; }
            .reset-brand-badge { margin-bottom: 0 !important; }
            .reset-brand-footer { display: none !important; }
          }
        `}</style>
      </div>
    </>
  );
}
