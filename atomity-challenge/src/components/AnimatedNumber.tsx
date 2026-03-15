import { useEffect, useRef } from "react";
import { animate } from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

function formatNumber(v: number): string {
  if (Math.abs(v) >= 1000) {
    return (v / 1000).toFixed(1) + "k";
  }
  return Math.round(v).toString();
}

export default function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  className = "",
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const prevValue = useRef(0);

  useEffect(() => {
    const from = prevValue.current;
    const ctrl = animate(from, value, {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        if (ref.current) {
          ref.current.textContent = prefix + formatNumber(v) + suffix;
        }
      },
    });
    prevValue.current = value;
    return () => ctrl.stop();
  }, [value, prefix, suffix]);

  return (
    <span ref={ref} className={className} aria-live="polite">
      {prefix}{formatNumber(value)}{suffix}
    </span>
  );
}
