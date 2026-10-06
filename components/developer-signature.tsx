import { ExternalLink } from "lucide-react";
import { site } from "@/data/site";

export function DeveloperSignature() {
  return <a className="developer-signature" href={site.developerUrl} target="_blank" rel="noopener noreferrer" aria-label={`موقع ${site.developerName} — تصميم وتطوير، يفتح في تبويب جديد`}>
    <span className="studio-code-mark" aria-hidden="true"><img src="/developer-mark.webp" width="32" height="32" loading="lazy" decoding="async" alt="" /></span>
    <span className="signature-copy">تصميم وتطوير<strong>{site.developerName}</strong></span><span className="signature-link-icon" aria-hidden="true"><ExternalLink size={13} /></span>
  </a>;
}
