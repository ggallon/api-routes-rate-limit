"use client";

import { useState } from "react";
import styles from "./styles.module.css";

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
      <button onClick={() => makeRequest()}>Make Request</button>
      {response && (
        <code className={styles.code}>
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
