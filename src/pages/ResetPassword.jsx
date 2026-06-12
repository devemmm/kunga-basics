import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Eye, EyeOff, CheckCircle2, AlertCircle } from "lucide-react";
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

function getStrength(pw) {
  if (!pw) return null;
  if (pw.length < 6) return { bars: 1, color: "#ef4444", label: "Too short" };
  if (pw.length < 8) return { bars: 2, color: "#f59e0b", label: "Weak" };
  const score = [/[A-Z]/.test(pw), /[0-9]/.test(pw), /[^A-Za-z0-9]/.test(pw)].filter(Boolean).length;
  if (score >= 3)  return { bars: 4, color: "#10b981", label: "Strong" };
  if (score === 2) return { bars: 3, color: "#3b82f6", label: "Good" };
  return             { bars: 2, color: "#f59e0b", label: "Weak" };
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

  const strength   = getStrength(newPw);
  const pwMatch    = confirmPw.length > 0 && newPw === confirmPw;
  const pwMismatch = confirmPw.length > 0 && newPw !== confirmPw;

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
    width: "100%", padding: "12px 44px 12px 16px", borderRadius: 10, fontSize: 14,
    fontFamily: "var(--fb)", color: "#111",
    background: invalid ? "#fef2f2" : focused ? "#fff" : "var(--surface)",
    border: `1.5px solid ${invalid ? "#ef4444" : focused ? "var(--green)" : "var(--border)"}`,
    boxShadow: focused && !invalid ? "0 0 0 3px rgba(22,163,74,.13)" : "none",
    outline: "none", transition: "all .15s", boxSizing: "border-box",
  });

  return (
    <>
      <Seo title="Reset your password — Kunga Basics" description="Set a new password for your Kunga Basics account." />
      <div style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "32px 16px", background: "var(--surface)",
        backgroundImage: "var(--pattern-hero)", backgroundSize: "var(--pattern-hero-size)",
      }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 18, margin: "0 auto 14px",
            background: "#fff", padding: 8, display: "flex",
            alignItems: "center", justifyContent: "center",
            boxShadow: "0 8px 32px rgba(22,163,74,.25)",
          }}>
            <img src="/icon.png" style={{ width: 38, height: 38, objectFit: "contain" }} alt="Kunga Basics" />
          </div>
          <div style={{ fontFamily: "var(--fd)", fontWeight: 900, fontSize: 20, color: "var(--ink)", letterSpacing: "-.3px" }}>
            Kunga Basics
          </div>
          <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4, letterSpacing: ".4px", textTransform: "uppercase" }}>
            Password reset
          </div>
        </div>

        <div style={{
          background: "#fff", borderRadius: 20, padding: "36px 36px 28px",
          width: "100%", maxWidth: 420,
          boxShadow: "0 24px 64px rgba(15,23,42,.12), 0 4px 16px rgba(15,23,42,.06)",
        }}>
          {!token ? (
            <div style={{ textAlign: "center" }}>
              <AlertCircle size={40} color="#ef4444" style={{ marginBottom: 14 }} />
              <div style={{ fontFamily: "var(--fd)", fontWeight: 900, fontSize: 20, color: "var(--ink)", marginBottom: 10 }}>
                Invalid link
              </div>
              <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>
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
              <div style={{ fontFamily: "var(--fd)", fontWeight: 900, fontSize: 20, color: "var(--ink)", marginBottom: 10 }}>
                Password updated!
              </div>
              <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, marginBottom: 22 }}>
                Your password has been changed successfully. You can now go back to the Kunga Basics app and sign in with your new password.
              </div>
              <a
                href="https://kungabasics.com/app/login"
                style={{
                  display: "inline-block", width: "100%", padding: "13px 0", borderRadius: 12,
                  background: "var(--gradient-primary)", color: "#fff", fontFamily: "var(--fb)",
                  fontSize: 15, fontWeight: 700, textDecoration: "none",
                  boxShadow: "0 4px 18px rgba(22,163,74,.3)", boxSizing: "border-box",
                }}
              >
                Open Kunga Basics app
              </a>
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 10 }}>
                If nothing happens, open the Kunga Basics app manually and sign in.
              </div>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: 26 }}>
                <div style={{ fontFamily: "var(--fd)", fontWeight: 900, fontSize: 20, color: "var(--ink)", letterSpacing: "-.3px", marginBottom: 5 }}>
                  Set new password
                </div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>
                  Choose a strong password for your account.
                </div>
              </div>

              <form onSubmit={submit}>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "var(--ink2)", marginBottom: 6, letterSpacing: ".5px", textTransform: "uppercase" }}>
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
                      style={{ ...inp(newFocus, false), paddingRight: 46 }}
                    />
                    <button type="button" tabIndex={-1} onClick={() => setShowNew(v => !v)}
                      style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: showNew ? "var(--green)" : "var(--ghost)", display: "flex", padding: 4 }}>
                      {showNew ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>

                  {strength && (
                    <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ display: "flex", gap: 3, flex: 1 }}>
                        {[1, 2, 3, 4].map(n => (
                          <div key={n} style={{
                            flex: 1, height: 4, borderRadius: 2,
                            background: n <= strength.bars ? strength.color : "var(--border)",
                            transition: "background .2s",
                          }} />
                        ))}
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: strength.color, minWidth: 52 }}>
                        {strength.label}
                      </span>
                    </div>
                  )}
                </div>

                <div style={{ marginBottom: 22 }}>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "var(--ink2)", marginBottom: 6, letterSpacing: ".5px", textTransform: "uppercase" }}>
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
                      style={{ ...inp(confFocus, pwMismatch), paddingRight: 46 }}
                    />
                    <button type="button" tabIndex={-1} onClick={() => setShowConf(v => !v)}
                      style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: showConf ? "var(--green)" : "var(--ghost)", display: "flex", padding: 4 }}>
                      {pwMatch
                        ? <CheckCircle2 size={17} color="#10b981" />
                        : showConf ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                  {pwMismatch && (
                    <div style={{ fontSize: 11, color: "#ef4444", marginTop: 4 }}>Passwords do not match</div>
                  )}
                </div>

                {error && (
                  <div style={{
                    background: "#fef2f2", color: "#b91c1c", border: "1px solid #fca5a5",
                    borderRadius: 10, padding: "10px 14px", fontSize: 13, marginBottom: 18,
                    display: "flex", alignItems: "center", gap: 8, fontWeight: 500,
                  }}>
                    <AlertCircle size={15} /> {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !newPw || !confirmPw}
                  style={{
                    width: "100%", padding: "13px 0", borderRadius: 12, border: "none",
                    background: "var(--gradient-primary)",
                    color: "#fff", fontFamily: "var(--fb)", fontSize: 15, fontWeight: 700,
                    cursor: loading ? "default" : "pointer",
                    opacity: loading || !newPw || !confirmPw ? 0.7 : 1,
                    boxShadow: "0 4px 18px rgba(22,163,74,.3)",
                  }}
                >
                  {loading ? "Updating…" : "Reset password"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
