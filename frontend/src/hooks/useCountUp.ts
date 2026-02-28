import { useEffect, useState } from 'react';

interface UseCountUpOptions {
  target: number;
  duration?: number;
  trigger?: boolean;
  decimals?: number;
}

export function useCountUp({ target, duration = 2000, trigger = true, decimals = 0 }: UseCountUpOptions) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      setCount(parseFloat(current.toFixed(decimals)));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration, trigger, decimals]);

  return count;
}
