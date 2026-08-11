import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // On the home page, the header starts transparent over the dark hero
  // and switches to a solid background once the user scrolls past it.
  useEffect(() => {
    if (!isHome) {
      setScrolled(false);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const dark = isHome && !scrolled && !open;

  return (
    <header className={`site-header${dark ? " site-header--dark" : ""}`}>
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

          {/* Portal CTA buttons */}
          <div className="header-cta">
            <a
              href="https://user.kungabasics.com/login"
              className="header-btn-signin"
              onClick={() => setOpen(false)}
            >
              Sign in
            </a>
            <a
              href="https://user.kungabasics.com/register"
              className="header-btn-signup"
              onClick={() => setOpen(false)}
            >
              Get started
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
