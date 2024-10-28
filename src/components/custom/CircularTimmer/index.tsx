import React, { useEffect, useState } from 'react';

interface CircularTimerProps {
  duration: number; // Duration in seconds
  onComplete: () => void; // Callback when timer completes
  running: boolean; // Control if the timer is running
}

const CircularTimer: React.FC<CircularTimerProps> = ({ duration, onComplete, running }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (running) {
      setTimeLeft(duration); // Reset timeLeft when starting the timer
      const totalMilliseconds = duration * 1000;
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            onComplete(); // Trigger onComplete when the timer reaches zero
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval); // Cleanup interval on unmount
    } else {
      setTimeLeft(duration); // Reset the timer if not running
    }
  }, [duration, onComplete, running]);

  // Calculate strokeDashoffset for the circular stroke
  const circumference = 2 * Math.PI * 20; // Circle with radius 20
  const strokeDashoffset = circumference - (timeLeft / duration) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg className="w-24 h-24">
        <circle
          cx="50%"
          cy="50%"
          r="20"
          stroke="white"
          strokeWidth="4"
          fill="none"
          className="transition-all duration-1000"
          style={{ strokeDasharray: circumference, strokeDashoffset }}
        />
      </svg>
      <div className="absolute text-xl font-bold text-white">{timeLeft}</div>
    </div>
  );
};

export default CircularTimer;
