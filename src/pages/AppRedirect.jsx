import { useEffect, useState } from "react";
import Seo from "../components/Seo.jsx";
import { getStoreUrls } from "../lib/appConfig.js";

// Shown when a Universal Link (https://kungabasics.com/app/*) opens in a
// browser instead of the app — i.e. the app isn't installed, or App Links
// verification hasn't matched on this device.
export default function AppRedirect() {
  const [stores, setStores] = useState(null);

  useEffect(() => {
    getStoreUrls().then(setStores);
  }, []);

  return (
    <>
      <Seo title="Open in the Kunga Basics app" description="Continue in the Kunga Basics mobile app." />
      <div style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "32px 16px", background: "var(--surface)",
        backgroundImage: "var(--pattern-hero)", backgroundSize: "var(--pattern-hero-size)",
        textAlign: "center",
      }}>
        <img src="/icon.png" style={{ width: 56, height: 56, marginBottom: 16 }} alt="Kunga Basics" />
        <div style={{ fontFamily: "var(--fd)", fontWeight: 900, fontSize: 20, color: "var(--ink)", marginBottom: 10 }}>
          Continue in the app
        </div>
        <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, marginBottom: 22, maxWidth: 360 }}>
          If the Kunga Basics app didn't open automatically, sign in there with your new password, or get the app below.
        </div>
        {stores && (
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <a href={stores.ios} style={{
              padding: "12px 22px", borderRadius: 12, background: "var(--gradient-primary)",
              color: "#fff", fontFamily: "var(--fb)", fontSize: 14, fontWeight: 700, textDecoration: "none",
            }}>
              App Store
            </a>
            <a href={stores.android} style={{
              padding: "12px 22px", borderRadius: 12, background: "var(--gradient-primary)",
              color: "#fff", fontFamily: "var(--fb)", fontSize: 14, fontWeight: 700, textDecoration: "none",
            }}>
              Google Play
            </a>
          </div>
        )}
      </div>
    </>
  );
}
