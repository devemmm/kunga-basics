import Seo from "../components/Seo.jsx";

export default function DeleteAccount() {
  return (
    <>
      <Seo
        title="Delete Account — Kunga Basics"
        description="Learn how to request deletion of your Kunga Basics account and associated data."
      />
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "60px 24px" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 8 }}>
          Delete Your Account
        </h1>
        <p style={{ color: "#666", marginBottom: 40 }}>
          Last updated: August 2026
        </p>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: 12 }}>
            How to Request Account Deletion
          </h2>
          <p style={{ lineHeight: 1.7, marginBottom: 16 }}>
            You can request the deletion of your Kunga Basics account and all
            associated personal data by sending an email to our support team.
          </p>
          <p style={{ lineHeight: 1.7, marginBottom: 16 }}>
            To submit a deletion request, email us at:
          </p>
          <a
            href="mailto:support@kungabasics.com?subject=Account Deletion Request"
            style={{
              display: "inline-block",
              background: "#1a6b32",
              color: "white",
              padding: "12px 28px",
              borderRadius: 8,
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "1rem",
            }}
          >
            support@kungabasics.com
          </a>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: 12 }}>
            What to Include in Your Request
          </h2>
          <ul style={{ lineHeight: 1.9, paddingLeft: 20 }}>
            <li>Your full name</li>
            <li>The email address associated with your account</li>
            <li>Subject line: <strong>Account Deletion Request</strong></li>
          </ul>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: 12 }}>
            What Data Will Be Deleted
          </h2>
          <ul style={{ lineHeight: 1.9, paddingLeft: 20 }}>
            <li>Your account information (name, email, password)</li>
            <li>Child profiles and developmental data</li>
            <li>Progress tracking and milestone records</li>
            <li>Assessment reports</li>
            <li>Questions submitted to Dr. Kirenga Gad</li>
            <li>Subscription records</li>
          </ul>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: 12 }}>
            Data Retention
          </h2>
          <p style={{ lineHeight: 1.7 }}>
            We will process your deletion request within <strong>30 days</strong>.
            Some data may be retained for a limited period as required by law or
            for legitimate business purposes (e.g. fraud prevention, financial
            records). We will notify you once your account has been deleted.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: 12 }}>
            Questions?
          </h2>
          <p style={{ lineHeight: 1.7 }}>
            If you have any questions about account deletion or your personal data,
            contact us at{" "}
            <a href="mailto:support@kungabasics.com" style={{ color: "#1a6b32" }}>
              support@kungabasics.com
            </a>
            .
          </p>
        </section>
      </div>
    </>
  );
}
