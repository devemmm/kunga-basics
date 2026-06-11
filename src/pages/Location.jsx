import { MapPin, Mail, Clock } from "lucide-react";
import { trackEvent } from "../lib/track.js";
import Seo from "../components/Seo.jsx";

const MAPS_QUERY = "Kigali, Rwanda";
const MAPS_EMBED_SRC = `https://maps.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&z=12&output=embed`;
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`;

export default function Location() {
  return (
    <section className="legal-page">
      <Seo
        title="Our Location — Autism Therapy Support in Kigali, Rwanda | Kunga Basics"
        description="Kunga Basics is based in Kigali, Rwanda, supporting families across the region with autism therapy resources, developmental guidance, and the Kunga Basics app."
      />
      <div className="container" style={{ maxWidth: 760 }}>
        <h1>Our Location</h1>
        <p className="intro">
          Kunga Basics is based in Kigali, Rwanda. Find us on the map below, or
          get in touch using the details on our{" "}
          <a href="/support">Support page</a>.
        </p>

        <div className="contact-card">
          <h3><MapPin size={16} style={{ verticalAlign: "-3px", marginRight: 6 }} />Address</h3>
          <p>
            Kigali, Rwanda
            <br />
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("click", "/location", "open_in_google_maps")}
            >
              Open in Google Maps →
            </a>
          </p>
        </div>

        <div className="contact-card">
          <h3><Clock size={16} style={{ verticalAlign: "-3px", marginRight: 6 }} />Working Hours</h3>
          <p>Monday – Friday, 8:00 AM – 5:00 PM (CAT)</p>
        </div>

        <div className="contact-card">
          <h3><Mail size={16} style={{ verticalAlign: "-3px", marginRight: 6 }} />Get in Touch</h3>
          <p>
            For any inquiries, email{" "}
            <a
              href="mailto:info@kungabasics.com"
              onClick={() => trackEvent("click", "/location", "email_info")}
            >
              info@kungabasics.com
            </a>.
          </p>
        </div>

        <div className="map-embed">
          <iframe
            title="Kunga Basics location on Google Maps"
            src={MAPS_EMBED_SRC}
            width="100%"
            height="360"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
