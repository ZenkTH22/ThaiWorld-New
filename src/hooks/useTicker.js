import { useState, useEffect } from 'react';

export const useTicker = (initialValue, ratePerSecond, variance = 0.1) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    // We update more frequently than once per second to make it look smooth
    const intervalMs = 100;
    const ticksPerSecond = 1000 / intervalMs;
    const baseIncrement = ratePerSecond / ticksPerSecond;

    const interval = setInterval(() => {
      setValue((prev) => {
        // Add some random variance
        const randomFactor = 1 + (Math.random() * variance * 2 - variance);
        return prev + (baseIncrement * randomFactor);
      });
    }, intervalMs);

    return () => clearInterval(interval);
  }, [ratePerSecond, variance]);

  return value;
};
