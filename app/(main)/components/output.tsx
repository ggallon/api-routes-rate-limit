"use client";

import { useTimer } from "@/lib/useTimer";
import { useCallback, useEffect, useState } from "react";
import { TimerRenderer } from "./render-time";

const dataFormatter = (number: number) =>
  Intl.NumberFormat("us").format(number).toString();

export default function RateLimitOutput(
  { debug }: { debug?: boolean } = { debug: false },
) {
  const [response, setResponse] = useState<Record<
    string,
    string | number
  > | null>(null);
  const timer = useTimer();

  const makeRequest = useCallback(async () => {
    const startFetch = Date.now();
    timer.start(startFetch);
    const res = await fetch("/api/user");
    const status = res.status.toString();
    const body = await res.json();
    const end = Date.now();
    setResponse({
      status,
      body,
      visitorLocation: body.visitorLocation,
      limit: res.headers.get("X-RateLimit-Limit")?.toString() ?? "0",
      remaining: res.headers.get("X-RateLimit-Remaining")?.toString() ?? "0",
      elapsed: end - startFetch,
    });
    timer.stop();
  }, []);

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
      <div>
        <b>Elapsed: </b>
        <TimerRenderer
          timer={timer}
          render={(time) => (
            <span>
              {dataFormatter(
                timer.isStarted()
                  ? time.getRunningTime()
                  : (response?.elapsed as number) ?? 0,
              )}
            </span>
          )}
          renderRate={0}
        />{" "}
        ms
      </div>

      {response && (
        <>
          <code className="max-w-xl rounded-lg bg-foreground p-4 text-background">
            <div>
              <b>Cold Start:</b> {response.invocationIsCold ? "Yes" : "Not"}
            </div>
            <div>
              <b>Status Code:</b> {response.status}
            </div>
            <div>
              <b>Request Limit:</b> {response.limit}
            </div>
            <div>
              <b>Remaining Requests:</b> {response.remaining}
            </div>
            <div>
              <b>Location: </b>{" "}
              {JSON.stringify(response.visitorLocation, null, 2)}
            </div>
            <div>
              <b>Body: </b> {JSON.stringify(response.body, null, 2)}
            </div>
          </code>
          {debug && (
            <code className="max-w-xl rounded-lg bg-foreground p-4 text-background">
              <div>
                <b>debug:</b>
              </div>
              <pre>{JSON.stringify(response, null, 2)}</pre>
            </code>
          )}
        </>
      )}
    </>
  );
}
