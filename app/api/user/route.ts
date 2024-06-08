import { type NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { ApiResponse } from "@/lib/formatResponse";
import { getIP } from "@/lib/get-ip";
import { getVercelHeaders } from "@/lib/get-vercel-headers";
import { rateLimit } from "@/lib/rate-limit";

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

let coldStart = true;
const start = Date.now();

export async function GET(request: NextRequest) {
  const time = Date.now();
  const isCold = coldStart;
  coldStart = false;

  const { success, ...rateLimit } = await limiter.check(
    10, // 10 requests per minute
    getIP(request),
  );

  const [headers, visitorLocation] = getVercelHeaders(request);

  if (!success) {
    return ApiResponse.fullJson(
      {
        error: "You have reached your request limit.",
        invocationIsCold: isCold,
        invocationIsColdTime: start === time,
        headers,
      },
      { obs: { start, time }, rateLimit },
      { status: 429 },
    );
  }

  return ApiResponse.fullJson(
    { id: uuidv4(), invocationIsCold: isCold, visitorLocation, headers },
    { obs: { start, time }, rateLimit },
  );
}
