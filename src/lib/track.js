// ─── Lightweight visitor/usage tracking client (public portal) ───────────────
// Sends pageview/event beacons to POST /api/v1/analytics/track with source='portal'.
// Mirrors kunga-admin-portal's src/lib/track.js. Anonymous by default — visitors
// of the public site are not authenticated.

const BASE = import.meta.env.VITE_API_URL ?? '/api/v1';
const SOURCE = 'portal';
const SESSION_KEY = 'kb_portal_session_id';

function getSessionId() {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`);
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

function send(payload) {
  const body = JSON.stringify({
    sessionId: getSessionId(),
    source: SOURCE,
    language: navigator.language,
    screenWidth: window.screen?.width,
    screenHeight: window.screen?.height,
    referrer: document.referrer || undefined,
    ...payload,
  });

  const url = `${BASE}/analytics/track`;

  // Prefer sendBeacon for unload-safety — public visitors are anonymous so no
  // auth header is ever needed here.
  if (navigator.sendBeacon) {
    try {
      const ok = navigator.sendBeacon(url, new Blob([body], { type: 'application/json' }));
      if (ok) return;
    } catch { /* fall through to fetch */ }
  }

  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  }).catch(() => { /* tracking is best-effort — never block the UI */ });
}

/** Track a page view (call whenever the route changes) */
export function trackPageview(path) {
  send({ eventType: 'pageview', path });
}

/** Track a generic event (button click, form submit, download, etc.) */
export function trackEvent(eventType, path, label, meta) {
  send({ eventType, path, label, meta });
}

/** Capture utm_source / utm_medium / utm_campaign from the URL on first load */
export function captureUtm() {
  const params = new URLSearchParams(window.location.search);
  const utmSource   = params.get('utm_source')   ?? undefined;
  const utmMedium   = params.get('utm_medium')   ?? undefined;
  const utmCampaign = params.get('utm_campaign') ?? undefined;
  if (utmSource || utmMedium || utmCampaign) {
    return { utmSource, utmMedium, utmCampaign };
  }
  return {};
}
