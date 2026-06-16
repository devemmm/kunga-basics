import { useEffect, useRef, useState } from "react";

/**
 * Animates a number counting up from 0 to `value` once it scrolls into view.
 * `suffix` is appended after the animated number (e.g. "+", "%").
 */
export default function MetricDisplay({ value, suffix = "", duration = 1400, label }) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setCount(value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setCount(Math.round(value * eased));
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <div className="stat-item" ref={ref}>
      <div className="stat-number">{count.toLocaleString()}{suffix}</div>
      {label && <div className="stat-label">{label}</div>}
    </div>
  );
}
