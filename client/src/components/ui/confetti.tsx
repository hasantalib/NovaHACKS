import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiProps {
  duration?: number;
  particleCount?: number;
  spread?: number;
  colors?: string[];
}

export const Confetti = ({
  duration = 1500,
  particleCount = 50,
  spread = 50,
  colors = ['#6366F1', '#EC4899', '#10B981']
}: ConfettiProps) => {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive) return;

    const end = Date.now() + duration;

    const frame = () => {
      // Launch a few confetti from the left edge
      confetti({
        particleCount: particleCount / 4,
        angle: 60,
        spread,
        origin: { x: 0, y: 0.7 },
        colors
      });
      
      // And launch a few from the right edge
      confetti({
        particleCount: particleCount / 4,
        angle: 120,
        spread,
        origin: { x: 1, y: 0.7 },
        colors
      });

      // Keep going until we are out of time
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      } else {
        setIsActive(false);
      }
    };

    // Start the animation
    frame();

    return () => {
      // Clean up if component unmounts
      setIsActive(false);
    };
  }, [isActive, duration, particleCount, spread, colors]);

  // This component doesn't render anything
  return null;
};
