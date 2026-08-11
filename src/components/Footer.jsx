import { Link } from "react-router-dom";
import { Monitor, LogIn } from "lucide-react";

const PORTAL = "https://user.kungabasics.com";

export default function Footer() {
  return (
    <footer className="site-footer">

      {/* ── Portal CTA band ── */}
      <div className="footer-portal-band">
        <div className="container footer-portal-inner">
          <div className="footer-portal-text">
            <div className="footer-portal-title">Ready to get started?</div>
            <div className="footer-portal-sub">Access the full learning portal on any browser — no app required.</div>
          </div>
          <div className="footer-portal-actions">
            <a href={`${PORTAL}/login`} className="footer-btn-signin">
              <LogIn size={15} /> Sign in
            </a>
            <a href={`${PORTAL}/register`} className="footer-btn-signup">
              <Monitor size={15} /> Continue with the web
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="container">
        <div className="copyright">
          © {new Date().getFullYear()} Kunga Basics Ltd. · Kigali, Rwanda
        </div>
        <div className="links">
          <Link to="/features">Features</Link>
          <Link to="/about">About</Link>
          <Link to="/support">Support</Link>
          <Link to="/location">Location</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <a href="mailto:info@kungabasics.com">info@kungabasics.com</a>
        </div>
      </div>
    </footer>
  );
}
