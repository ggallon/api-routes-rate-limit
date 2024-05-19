import { NextRequest } from "next/server";

const VERCEL_HEADERS = new Set([
  "host",
  "x-forwarded-host", // idem host
  "x-forwarded-proto",
  "x-forwarded-for",
  "x-real-ip",
  "x-vercel-deployment-url",
  "x-vercel-forwarded-for",
  "x-vercel-id",
  "x-vercel-ip-continent",
  "x-vercel-ip-country",
  "x-vercel-ip-country-region",
  "x-vercel-ip-city",
  "x-vercel-ip-latitude",
  "x-vercel-ip-longitude",
  "x-vercel-ip-timezone",
  "x-vercel-signature",
  "x-matched-path", // reponse
  "x-vercel-cache", // reponse
  "x-vercel-execution-region", // reponse
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
