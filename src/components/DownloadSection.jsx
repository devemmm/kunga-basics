import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Download, Heart, Globe2, ShieldCheck } from "lucide-react";
import { trackEvent } from "../lib/track.js";
import { getStoreUrls, FALLBACK_IOS_URL, FALLBACK_ANDROID_URL } from "../lib/appConfig.js";
import Reveal from "./Reveal.jsx";

const AppleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 814 1000" width="22" height="22" fill="white">
    <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.3 268.5-317.3 99.8 0 160.7 54.9 216.3 54.9 53.5 0 122.2-57.8 232.8-57.8 37.6 0 139.4 3.2 213.4 97.9zm-161.3-190.7c48.6-57.8 83-138.8 83-219.8 0-11.3-.6-22.6-2.6-32.3-78.7 3.2-170.6 52.2-225.7 116.4-44.5 50.3-85.5 131.3-85.5 213.5 0 12.3 2 24.6 2.6 28.5 5.2 1.3 13.5 2.6 21.8 2.6 69.4 0 156.5-46.2 205.4-108.9z"/>
  </svg>
);

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24">
    <linearGradient id="pa" x1="61.6" y1="3.3" x2="236.2" y2="356.9" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#32a071"/><stop offset=".07" stopColor="#2da771"/><stop offset=".48" stopColor="#15cf74"/><stop offset=".8" stopColor="#06e775"/><stop offset="1" stopColor="#00f076"/></linearGradient>
    <linearGradient id="pb" x1="276.4" y1="256" x2="276.4" y2="494.4" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#ff3a44"/><stop offset="1" stopColor="#c31162"/></linearGradient>
    <linearGradient id="pc" x1="21.7" y1="0" x2="21.7" y2="161.9" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#32a071"/><stop offset=".07" stopColor="#2da771"/><stop offset=".48" stopColor="#15cf74"/><stop offset=".8" stopColor="#06e775"/><stop offset="1" stopColor="#00f076"/></linearGradient>
    <path fill="url(#pa)" d="M41.2 0C25.7 0 13 12 13 28.1v455.8c0 9.8 5 18.5 12.5 23.5L267 265.5 41.2 0z"/>
    <path fill="#ff3a44" d="M348.3 181.7L41.2 0 267 265.5l81.3-83.8z"/>
    <path fill="url(#pb)" d="M267 265.5L12.6 507.2c2.6 1.8 5.6 2.8 8.6 2.8 4.8 0 9.6-1.8 13.5-5.3l307.6-178.4L267 265.5z"/>
    <path fill="url(#pc)" d="M13 484.1V28.1L267 265.5 13 484.1z"/>
    <path fill="#ffd900" d="M348.3 181.7L499 265.5 341.8 326.3 267 265.5l81.3-83.8z"/>
  </svg>
);

export default function DownloadSection() {
  const [urls, setUrls] = useState({ ios: FALLBACK_IOS_URL, android: FALLBACK_ANDROID_URL });

  useEffect(() => {
    let cancelled = false;
    getStoreUrls().then((u) => {
      if (!cancelled) setUrls(u);
    });
    return () => { cancelled = true; };
  }, []);

  const { ios: IOS_URL, android: ANDROID_URL } = urls;

  return (
    <section id="download" className="conversion-section imigongo-bg">
      <div className="container" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <Reveal as="div">
          <h2>Start Supporting Your Child's Journey Today</h2>
          <p className="section-sub-light">
            Available on iPhone and Android. Scan the QR code with your camera
            to open the app store, or tap the button below.
          </p>
          <div className="conversion-benefits">
            <span className="benefit"><Heart size={16} /> Free to get started</span>
            <span className="benefit"><Globe2 size={16} /> Available in 4 languages</span>
            <span className="benefit"><ShieldCheck size={16} /> Trusted by families</span>
          </div>
        </Reveal>

        <Reveal className="download-grid">
          {/* iOS */}
          <div className="download-card">
            <div className="store-row">
              <div className="store-icon" style={{ background: "#000" }}>
                <AppleIcon />
              </div>
              <div className="store-label">
                <div className="eyebrow">Download on the</div>
                <div className="name">App Store</div>
              </div>
            </div>
            <div className="qr-wrap">
              <QRCodeSVG value={IOS_URL} size={150} bgColor="#fff" fgColor="#0F172A" level="M" />
            </div>
            <div className="download-card-body">
              <div className="qr-hint">Scan with your iPhone camera to open the App Store listing.</div>
              <a
                className="btn btn-primary"
                href={IOS_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent("click", "/", "download_ios")}
              >
                <Download size={15} /> Download for iOS
              </a>
            </div>
          </div>

          {/* Android */}
          <div className="download-card">
            <div className="store-row">
              <div className="store-icon" style={{ background: "#fff", border: "1px solid var(--border)" }}>
                <PlayIcon />
              </div>
              <div className="store-label">
                <div className="eyebrow">Get it on</div>
                <div className="name">Google Play</div>
              </div>
            </div>
            <div className="qr-wrap">
              <QRCodeSVG value={ANDROID_URL} size={150} bgColor="#fff" fgColor="#0F172A" level="M" />
            </div>
            <div className="download-card-body">
              <div className="qr-hint">Scan with your Android camera or Google Lens to open Play Store.</div>
              <a
                className="btn btn-primary"
                href={ANDROID_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent("click", "/", "download_android")}
              >
                <Download size={15} /> Download for Android
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
