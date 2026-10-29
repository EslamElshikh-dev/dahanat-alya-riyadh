import {adminJson} from "@/lib/admin/http";
import {AdsPushError, authorizeAdsPush, readAdsPushBody, receiveAdsPush, validateAdsPush} from "@/lib/admin/ads-push";
import {StoreConflict} from "@/lib/admin/storage";
export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    if (!authorizeAdsPush(request.headers.get("authorization"))) return adminJson({error:"غير مصرح."}, 401);
    return adminJson(await receiveAdsPush(validateAdsPush(await readAdsPushBody(request))));
  } catch(error) {
    if (error instanceof AdsPushError) return adminJson({error:error.message}, error.status);
    if (error instanceof StoreConflict) return adminJson({error:"تعارض في الحفظ. أعد إرسال التقرير."}, 409);
    // Never return provider URLs, storage errors, credentials, or stored reports.
    return adminJson({error:"تعذّر قبول التقرير."}, 400);
  }
}
