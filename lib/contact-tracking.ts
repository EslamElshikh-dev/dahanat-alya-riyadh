import { site } from "../data/site";

// Copied from this Google Ads account's event snippets on 2026-10-17.
// These are website click actions, separate from the ad's call asset/action.
export const googleAdsId = "AW-18479223454";
export const contactConversions = {
  phone: `${googleAdsId}/b15RCIL_tJ8dEJ6lyutE`,
  whatsapp: `${googleAdsId}/6mgcCIX_tJ8dEJ6lyutE`,
} as const;

export type ContactChannel = keyof typeof contactConversions;
export type ConversionParameters = { send_to: string };

export function isLiveContactPage(hostname: string, pathname: string) {
  return hostname === "dahanat-alya-riyadh.vercel.app"
    && !/^\/(?:admin|api)(?:\/|$)/.test(pathname);
}

export function contactChannel(href: string): ContactChannel | null {
  try {
    const url = new URL(href);
    if (url.protocol === "tel:") {
      const number = decodeURIComponent(url.pathname).replace(/[\s()+-]/g, "");
      return number === site.phoneRaw || number === site.whatsapp ? "phone" : null;
    }
    if (url.protocol !== "https:") return null;
    if (url.hostname === "wa.me" && url.pathname === `/${site.whatsapp}`) return "whatsapp";
    if (url.hostname === "api.whatsapp.com" && url.pathname === "/send"
      && url.searchParams.get("phone") === site.whatsapp) return "whatsapp";
  } catch {
    // Relative, malformed and unrelated links are not contact conversions.
  }
  return null;
}

export function trackContactActivation(
  activation: { href: string; button: number; defaultPrevented: boolean },
  report: (parameters: ConversionParameters) => void,
) {
  if (activation.defaultPrevented || activation.button !== 0) return false;
  const channel = contactChannel(activation.href);
  if (!channel) return false;
  try {
    // No URL, message, form data or customer details are sent as event parameters.
    report({ send_to: contactConversions[channel] });
    return true;
  } catch {
    // Analytics must never interrupt the contact link's native navigation.
    return false;
  }
}
