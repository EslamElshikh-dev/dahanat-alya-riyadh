import {requireSession, sameOrigin} from "@/lib/admin/auth";
import {reportCredential} from "@/lib/admin/ads-push";
import {googleAdsReportScript} from "@/lib/admin/ads-script-source";
import {adminError, adminJson} from "@/lib/admin/http";
export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    sameOrigin(request);
    await requireSession();
    return adminJson({script:googleAdsReportScript(reportCredential())});
  } catch(error) { return adminError(error); }
}
