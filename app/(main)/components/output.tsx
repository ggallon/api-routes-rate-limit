"use client";

import { useState } from "react";

export default function RateLimitOutput(
  { debug }: { debug?: boolean } = { debug: false },
) {
  const [response, setResponse] = useState<Record<string, string> | null>(null);

  const makeRequest = async () => {
    const res = await fetch("/api/user");

    setResponse({
      status: res.status.toString(),
      body: await res.json(),
      limit: res.headers.get("X-RateLimit-Limit")?.toString() ?? "0",
      remaining: res.headers.get("X-RateLimit-Remaining")?.toString() ?? "0",
    });
  };

  return (
    <>
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <button
          className="flex h-10 items-center justify-center gap-2 rounded-full border border-solid border-transparent bg-foreground px-4 text-sm text-background transition-colors hover:bg-button-primary-hover sm:h-12 sm:px-5 sm:text-base"
          onClick={() => makeRequest()}
        >
          Make Request
        </button>
        <a
          className="flex h-10 items-center justify-center rounded-full border border-solid border-gray-alpha-200 px-4 text-sm transition-colors hover:border-transparent hover:bg-button-secondary-hover sm:h-12 sm:min-w-44 sm:px-5 sm:text-base"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read our docs
        </a>
      </div>
      {response && (
        <code className="mt-4 rounded-lg bg-foreground p-4 text-background">
          <div>
            <b>Status Code:</b> {response.status}
          </div>
          <div>
            <b>Body: </b> {JSON.stringify(response.body, null, 2)}
          </div>
          <div>
            <b>Request Limit:</b> {response.limit}
          </div>
          <div>
            <b>Remaining Requests:</b> {response.remaining}
          </div>
          {debug && (
            <>
              <div>
                <b>debug:</b>
              </div>
              <pre>{JSON.stringify(response, null, 2)}</pre>
            </>
          )}
        </code>
      )}
    </>
  );
}
