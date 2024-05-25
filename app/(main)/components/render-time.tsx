import { useEffect, useState } from "react";
import { Timer } from "@/lib/useTimer";

export interface TimerRendererProps {
  /** The timer or stopwatch to render. */
  timer: Timer;
  /**
   * Renders the timer, returning a JSX element.
   * @param timer The timer to render.
   */
  render?: (timer: Timer) => JSX.Element;
  /** Render rate in milliseconds. */
  renderRate?: number;
}

/**
 * Renders a timer or stopwatch at regular intervals.
 */
export const TimerRenderer = ({
  timer,
  render = (timer) => <>{timer.getRunningTime()}</>,
  renderRate = 10,
}: TimerRendererProps) => {
  const [, setRenderTime] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(
      () => setRenderTime(new Date().getTime()),
      renderRate,
    );
    return () => clearTimeout(id);
  }, [renderRate]);
  return render(timer);
};
