import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { trackEvent } from "../lib/track.js";

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="site-header">
      <div className="container">
        <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
          <img src="/icon.png" alt="Kunga Basics" className="logo" />
          Kunga Basics
        </NavLink>

        <button
          className="nav-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className={`nav-links${open ? " open" : ""}`}>
          <NavLink to="/" end onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/features" onClick={() => setOpen(false)}>Features</NavLink>
          <NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink>
          <NavLink to="/support" onClick={() => setOpen(false)}>Support</NavLink>
          <NavLink to="/location" onClick={() => setOpen(false)}>Location</NavLink>
          <NavLink to="/privacy" onClick={() => setOpen(false)}>Privacy</NavLink>
          <NavLink to="/terms" onClick={() => setOpen(false)}>Terms</NavLink>
          <a
            href="https://admin.kungabasics.com"
            onClick={() => {
              setOpen(false);
              trackEvent("click", "/", "header_admin_login");
            }}
          >
            Admin Login
          </a>
        </nav>
      </div>
    </header>
  );
}
