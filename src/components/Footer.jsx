import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
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
