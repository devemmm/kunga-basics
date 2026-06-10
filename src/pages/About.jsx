export default function About() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 760 }}>
        <h2 className="section-ttl">About Kunga Basics</h2>
        <p className="section-sub" style={{ maxWidth: "none" }}>
          Kunga Basics is a child development support platform built for parents
          and caregivers of children with developmental challenges. Our mission is
          to make expert guidance, daily routines, and milestone tracking
          accessible to every family.
        </p>

        <div className="legal-section" style={{ borderTop: "none", paddingTop: 0 }}>
          <h2>What we offer</h2>
          <p>
            Through the Kunga Basics mobile app, caregivers get access to video
            modules curated by Dr. Gad, daily routine tracking with streaks,
            milestone reporting, a private journal, and the Ask Dr. Gad feature —
            where caregivers can submit questions and receive personalised video
            responses.
          </p>
        </div>

        <div className="legal-section">
          <h2>Our approach</h2>
          <p>
            We believe every child develops at their own pace, and every caregiver
            deserves clear, practical, and judgment-free support. Kunga Basics
            content is designed by professionals and structured so caregivers can
            fit guidance into their daily routines — at home, at their own pace.
          </p>
        </div>

        <div className="legal-section">
          <h2>Get in touch</h2>
          <p>
            Have questions, feedback, or partnership ideas? Visit our{" "}
            <a href="/support">Support page</a> or email us at{" "}
            <a href="mailto:info@kungabasics.com">info@kungabasics.com</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
