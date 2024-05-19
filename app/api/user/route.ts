import { type NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";

import { rateLimit } from "@/lib/rate-limit";
import { getIP } from "@/lib/get-ip";
import { getVercelHeaders } from "@/lib/get-vercel-headers";
import { ApiResponse } from "@/lib/formatResponse";

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

const start = Date.now();

export async function GET(request: NextRequest) {
  const time = Date.now();

  const { success, ...rateLimit } = await limiter.check(
    10, // 10 requests per minute
    getIP(request),
  );

  const headers = getVercelHeaders(request);

  if (!success) {
    return ApiResponse.fullJson(
      {
        error: "You have reached your request limit.",
        headers,
      },
      { obs: { start, time }, rateLimit },
      { status: 429 },
    );
  }

  return ApiResponse.fullJson(
    { id: uuidv4(), headers },
    { obs: { start, time }, rateLimit },
  );
}
