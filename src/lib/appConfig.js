// ─── App store links (admin-configurable) ────────────────────────────────────
// Reads the public GET /api/v1/app/version endpoint, which returns the iOS
// App Store and Google Play URLs as configured in the admin portal
// (app_config.app_store_url_ios / app_store_url_android). Falls back to the
// known production listing URLs if the API is unreachable or a value is empty.

const BASE = import.meta.env.VITE_API_URL ?? '/api/v1';

export const FALLBACK_IOS_URL     = "https://apps.apple.com/app/kunga-basics/id000000000";
export const FALLBACK_ANDROID_URL = "https://play.google.com/store/apps/details?id=rw.devemm.kunga.basics";

/**
 * Fetch the current App Store / Play Store URLs from the API.
 * Always resolves — never throws — falling back to the constants above.
 */
export async function getStoreUrls() {
  try {
    const res = await fetch(`${BASE}/app/version`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return {
      ios: data.storeUrlIos || FALLBACK_IOS_URL,
      android: data.storeUrlAndroid || FALLBACK_ANDROID_URL,
    };
  } catch {
    return { ios: FALLBACK_IOS_URL, android: FALLBACK_ANDROID_URL };
  }
}
