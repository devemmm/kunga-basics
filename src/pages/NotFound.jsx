import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";

export default function NotFound() {
  return (
    <section className="section" style={{ textAlign: "center" }}>
      <Seo title="Page Not Found | Kunga Basics" />
      <div className="container">
        <h2 className="section-ttl">404 — Page not found</h2>
        <p className="section-sub" style={{ margin: "0 auto 24px" }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link className="btn btn-primary" to="/">Back to Home</Link>
      </div>
    </section>
  );
}
