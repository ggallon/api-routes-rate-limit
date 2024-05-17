import { NextResponse, type NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";

import { rateLimit } from "@/lib/rate-limit";
import { getIP } from "@/lib/get-ip";

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export async function GET(request: NextRequest) {
  const { success, limit, remaining } = await limiter.check(
    10, // 10 requests per minute
    getIP(request),
  );

  if (!success) {
    return NextResponse.json(
      { error: "You have reached your request limit." },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
        },
      },
    );
  }

  return NextResponse.json(
    { id: uuidv4() },
    {
      headers: {
        "X-RateLimit-Limit": limit.toString(),
        "X-RateLimit-Remaining": remaining.toString(),
      },
    },
  );
}
