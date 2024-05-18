import Image from "next/image";
import { Suspense } from "react";

import RateLimitOutput from "./components/output";

export default function Index() {
  return (
    <>
      <div className="text-center sm:text-left">
        <div className="flex flex-row items-center justify-center sm:justify-start">
          <Image
            className="dark:invert"
            src="/proactice.svg"
            alt="Proactice logo"
            width={32}
            height={32}
            priority
          />
          <h1 className="ml-2 text-2xl font-semibold">
            API Routes Rate Limiting
          </h1>
        </div>
        <p className="mt-2 max-w-xl text-balance sm:text-wrap">
          This example uses{" "}
          <code className="whitespace-pre-wrap text-blue-500 before:content-['`'] after:content-['`']">
            lru-cache
          </code>{" "}
          to implement a simple rate limiter for API routes (Serverless
          Functions).
        </p>
      </div>
      <ol className="list-inside list-decimal text-left font-mono text-sm sm:text-left">
        <li className="mb-2">
          Get started by editing{" "}
          <code className="rounded bg-gray-alpha-100 px-1 py-0.5 font-semibold">
            app/api/user.ts
          </code>
        </li>
        <li>Save and make a request.</li>
      </ol>

      <div className="flex flex-col items-center gap-4">
        <Suspense fallback={null}>
          <RateLimitOutput />
        </Suspense>
      </div>
    </>
  );
}
