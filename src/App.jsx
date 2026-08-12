import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { trackPageview, captureUtm } from "./lib/track.js";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Features from "./pages/Features.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsOfService from "./pages/TermsOfService.jsx";
import Support from "./pages/Support.jsx";
import About from "./pages/About.jsx";
import Location from "./pages/Location.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import AppRedirect from "./pages/AppRedirect.jsx";
import Assessment from "./pages/Assessment.jsx";
import NotFound from "./pages/NotFound.jsx";

// Track a pageview on first load and on every route change.
function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    captureUtm();
    trackPageview(location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
}

// Standalone auth/deep-link screens render full-bleed, without the
// marketing site's header and footer.
const STANDALONE_ROUTES = ["/reset-password", "/app"];

export default function App() {
  usePageTracking();
  const location = useLocation();
  const isStandalone = STANDALONE_ROUTES.some(
    (path) => location.pathname === path || location.pathname.startsWith(`${path}/`)
  );

  return (
    <div className="shell">
      {!isStandalone && <Header />}
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/support" element={<Support />} />
          <Route path="/location" element={<Location />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/app/*" element={<AppRedirect />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isStandalone && <Footer />}
    </div>
  );
}
