import { NextResponse } from "next/server";

interface ReportsData {
  obs?: {
    time: number;
    start: number;
  };
  rateLimit: {
    limit: number;
    remaining: number;
  };
}

export class ApiResponse extends NextResponse {
  constructor(body?: BodyInit | null, init: ResponseInit = {}) {
    super(body, init);
  }

  static fullJson<JsonBody>(
    body: JsonBody,
    reports: ReportsData,
    init?: ResponseInit,
  ): NextResponse<JsonBody> {
    const { obs, rateLimit } = reports;
    const response: Response = Response.json(
      {
        ...body,
        ...(obs && {
          queryDuration: Date.now() - obs.time,
          invocationIsCold: obs.start === obs.time,
        }),
      },
      {
        ...init,
        headers: {
          ...init?.headers,
          "X-RateLimit-Limit": rateLimit.limit.toString(),
          "X-RateLimit-Remaining": rateLimit.remaining.toString(),
        },
      },
    );
    return new NextResponse(response.body, response);
  }
}
