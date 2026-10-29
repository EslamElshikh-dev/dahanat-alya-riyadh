export const ALYA_ADS_ACCOUNT = "4130939368";
export const ADS_REPORT_SOURCE = "Google Ads · ربط مباشر مجاني";
export const ADS_REPORT_ENDPOINT = "https://dahanat-alya-riyadh.vercel.app/api/integrations/google-ads/report";

// This template only queries performance. It has no Google Ads mutation calls.
// The report credential is supplied at runtime to an authenticated administrator.
export function googleAdsReportScript(token: string) {
  return `/**
 * ALYA | Dashboard reports | Read performance only
 * Account: 413-093-9368. Schedule: hourly or daily in Google Ads.
 * Keep this account-specific script private.
 */
const REPORT_ENDPOINT = ${JSON.stringify(ADS_REPORT_ENDPOINT)};
const REPORT_TOKEN = ${JSON.stringify(token)};
const EXPECTED_ACCOUNT = ${JSON.stringify(ALYA_ADS_ACCOUNT)};

function main() {
  const account = AdsApp.currentAccount();
  if (account.getCustomerId().replace(/-/g, '') !== EXPECTED_ACCOUNT) {
    throw new Error('This script is restricted to Alya account 413-093-9368.');
  }
  if (account.getCurrencyCode() !== 'SAR' || account.getTimeZone() !== 'Asia/Riyadh') {
    throw new Error('Expected SAR currency and Asia/Riyadh account timezone.');
  }
  const now = new Date();
  const to = Utilities.formatDate(now, 'Asia/Riyadh', 'yyyy-MM-dd');
  const from = new Date(Date.parse(to + 'T00:00:00Z') - 89 * 86400000).toISOString().slice(0, 10);
  const query = 'SELECT segments.date, campaign.id, campaign.name, metrics.impressions, ' +
    'metrics.clicks, metrics.cost_micros, metrics.conversions FROM campaign ' +
    "WHERE segments.date BETWEEN '" + from + "' AND '" + to + "'";
  const result = AdsApp.search(query);
  const rows = [];
  while (result.hasNext()) {
    const row = result.next();
    rows.push({date: row.segments.date, campaignId: String(row.campaign.id),
      campaign: row.campaign.name, currency: 'SAR', impressions: Number(row.metrics.impressions),
      clicks: Number(row.metrics.clicks), spend: Number(row.metrics.costMicros) / 1000000,
      conversions: Number(row.metrics.conversions)});
    if (rows.length > 15000) throw new Error('Report exceeds the dashboard row limit.');
  }
  if (AdsApp.getExecutionInfo().isPreview()) {
    Logger.log('Preview OK: ' + rows.length + ' daily campaign rows. No report sent and no Ads settings changed.');
    return;
  }
  const response = UrlFetchApp.fetch(REPORT_ENDPOINT, {
    method: 'post', contentType: 'application/json',
    headers: {Authorization: 'Bearer ' + REPORT_TOKEN},
    payload: JSON.stringify({schemaVersion: 1, accountId: EXPECTED_ACCOUNT,
      currency: 'SAR', timeZone: 'Asia/Riyadh', generatedAt: now.toISOString(), from: from, to: to, rows: rows}),
    followRedirects: false, muteHttpExceptions: true
  });
  if (response.getResponseCode() !== 200) {
    throw new Error('Dashboard sync failed (HTTP ' + response.getResponseCode() + ').');
  }
  const receipt = JSON.parse(response.getContentText());
  if (!receipt.ok) throw new Error('Dashboard did not confirm receipt.');
  Logger.log('Dashboard confirmed ' + rows.length + ' daily campaign rows. No Google Ads settings changed.');
}
`;
}
