import { NextRequest } from "next/server";

const VERCEL_HEADERS = new Set([
  "host",
  "pragma",
  "sec-fetch-site", // same-origin
  "sec-fetch-mode", // cors
  "sec-fetch-dest", // empty
  "x-forwarded-for",
  "x-forwarded-host", // idem host
  "x-forwarded-port",
  "x-forwarded-proto",
  "x-matched-path", // reponse
  "x-real-ip",
  "x-vercel-deployment-url",
  "x-vercel-forwarded-for",
  "x-vercel-id",
  "x-vercel-ip-as-number",
  "x-vercel-ip-continent",
  "x-vercel-ip-country",
  "x-vercel-ip-country-region",
  "x-vercel-ip-city",
  "x-vercel-ip-latitude",
  "x-vercel-ip-longitude",
  "x-vercel-ip-timezone",
  "x-vercel-proxied-for",
  "x-vercel-proxy-signature",
  "x-vercel-proxy-signature-ts",
  "x-vercel-signature",
  "x-vercel-cache", // reponse
  "x-vercel-execution-region", // reponse
  "x-vercel-sc-basepath",
  "x-vercel-sc-headers", //'{"Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXBsb3ltZW50SWQiOiJkcGxfQ25DNmN6VDdRU1hDdHJUQWJxR0pnYjl5NWJFUiIsInVubGltaXRlZCI6ZmFsc2UsInBsYW4iOiJob2JieSIsImRvbWFpbiI6ImFwaS1yb3V0ZXMtcmF0ZS1saW1pdC10d28udmVyY2VsLmFwcCIsImJsb2NrIjpmYWxzZSwiaWF0IjoxNzE2MTYwMTI5LCJwcm9qZWN0SWQiOiJwcmpfTzRjWFBJWG1neGRUbmZUWDNMbm12NmZpdGRmSCIsImV4cCI6MTcxNjE2MTA0OSwib3duZXJJZCI6InRlYW1fWE0wdGdJd0k5NUt6QVVTT000TDlDVXRxIiwicmVxdWVzdElkIjoibmZ2ODgtMTcxNjE2MDEyOTA3My02YzM3MWQ5MDQ4Y2UiLCJlbnYiOiJwcm9kdWN0aW9uIn0.p8ttKnPSnfdkejVvhdXGcEmLJWx96GJnpl3f5PzSSHQ"}'
  "x-vercel-sc-host", // iad1.suspense-cache.vercel-infra.com
]);

const Continent = new Map([
  ["AF", "Africa"],
  ["AN", "Antarctica"],
  ["AS", "Asia"],
  ["EU", "Europe"],
  ["NA", "North America"],
  ["OC", "Oceania"],
  ["SA", "South America"],
]);

export function getVercelHeaders(request: Request | NextRequest) {
  const rawHeaders = request.headers.entries();
  const headers = [...rawHeaders].filter((header) => {
    console.log(header);
    return VERCEL_HEADERS.has(header[0]);
  });
  return headers;
}
