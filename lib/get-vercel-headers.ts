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
  "x-vercel-id", // both
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
  "x-vercel-sc-headers", //'{"Authorization":"Bearer xxxx"}'
  "x-vercel-sc-host", // iad1.suspense-cache.vercel-infra.com
]);

const VERCEL_HEADERS_VISTOR = new Set([
  "x-real-ip",
  "x-vercel-ip-as-number",
  "x-vercel-ip-continent",
  "x-vercel-ip-country",
  "x-vercel-ip-country-region",
  "x-vercel-ip-city",
  "x-vercel-ip-latitude",
  "x-vercel-ip-longitude",
  "x-vercel-ip-timezone",
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
  const headers: { [K: string]: string } = {};
  const visitorLocation: { [K: string]: string } = {};
  const rawHeaders = request.headers.entries();
  for (const [key, value] of rawHeaders) {
    if (VERCEL_HEADERS_VISTOR.has(key)) {
      visitorLocation[key] = value ?? "";
    }
    if (VERCEL_HEADERS.has(key)) {
      headers[key] = value ?? "";
    }
  }
  return [headers, visitorLocation];
}
