import { NextRequest } from "next/server";

export function getIP(request: Request | NextRequest) {
  let xff: string | null | undefined = null;

  if (request instanceof Request) {
    xff = request.headers.get("x-forwarded-for");
  }
  if (request instanceof NextRequest) {
    xff = request.ip;
  }

  return xff ? (Array.isArray(xff) ? xff[0] : xff.split(",")[0]) : "127.0.0.1";
}
