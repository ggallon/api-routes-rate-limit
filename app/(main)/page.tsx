import styles from "./styles.module.css";
import RateLimitOutput from "./components/output";
import { Suspense } from "react";

export default function Index() {
  return (
    <main className={styles.container}>
      <h1>Next.js API Routes Rate Limiting</h1>
      <p>
        This example uses <code className={styles.inlineCode}>lru-cache</code>{" "}
        to implement a simple rate limiter for API routes (Serverless
        Functions).
      </p>
      <Suspense fallback={null}>
        <RateLimitOutput />
      </Suspense>
    </main>
  );
}
