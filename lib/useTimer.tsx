import { useCallback, useEffect, useMemo, useState, useRef } from "react";

export interface Timer {
  /**
   * Start the timer. If already started, will restart the timer.
   *
   * @param startTime Optional. The Unix epoch time in milliseconds at which to start the timer. Defaults to the current time in millis.
   */
  start: (startTime?: number) => void;
  /** Stop the timer. */
  stop: () => void;
  /** Returns `true` if the timer is started, `false` otherwise. */
  isStarted: () => boolean;
  /** Returns `true` if the timer is stopped, `false` otherwise. */
  isStopped: () => boolean;
  /** Return the amount of time that has elapsed in milliseconds since starting the timer. Returns lasttime if the timer is stopped. */
  getRunningTime: () => number;
}

/** Milliseconds representing forever in the future. */
const never = Number.MAX_SAFE_INTEGER;

export const useTimer = (): Timer => {
  const [renderTime, setRenderTime] = useState(Date.now());
  const startedRef = useRef(false);
  const startTimeRef = useRef(never);
  const lastTimeRef = useRef(never);

  const isStarted = useCallback((): boolean => {
    return startedRef.current;
  }, []);

  const isStopped = useCallback((): boolean => {
    return !startedRef.current;
  }, [isStarted]);

  const getRunningTime = useCallback((): number => {
    if (isStarted()) {
      return (lastTimeRef.current = Date.now() - startTimeRef.current);
    } else {
      return lastTimeRef.current;
    }
  }, [isStarted]);

  const start = useCallback((): void => {
    startedRef.current = true;
    startTimeRef.current = Date.now();
    setRenderTime(Date.now());
  }, []);

  const stop = useCallback((): void => {
    startedRef.current = false;
    startTimeRef.current = never;
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      Math.max(startTimeRef.current + 1, 1);
    });

    return () => clearTimeout(id);
  }, [renderTime]);

  return useMemo(() => {
    return {
      start,
      stop,
      isStarted,
      isStopped,
      getRunningTime,
    };
  }, [getRunningTime, isStopped, isStarted, stop, start]);
};
