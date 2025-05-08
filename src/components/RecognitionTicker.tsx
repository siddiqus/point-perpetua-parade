
import React, { useEffect, useRef, useState } from "react";
import RecognitionCard from "./RecognitionCard";

interface Person {
  name: string;
  email: string;
  department: string;
  profile_pic_url: string;
}

interface Recognition {
  amount: number;
  reason_decoded: string;
  giver: Person;
  receiver: Person;
}

interface RecognitionTickerProps {
  recognitions: Recognition[];
  speed?: number; // pixels per second
}

const RecognitionTicker = ({
  recognitions,
  speed = 30, // default speed
}: RecognitionTickerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const animationRef = useRef<number>();
  const lastTimeRef = useRef<number>();

  // Reset dimensions when recognitions change or on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.clientHeight);
        setContentHeight(containerRef.current.scrollHeight);
      }
    };

    // Initial update and listen for resize
    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [recognitions]);

  // Handle the animation
  useEffect(() => {
    if (!containerRef.current || contentHeight <= containerHeight) {
      return; // Don't animate if content fits in container
    }

    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
      }
      
      // Calculate time delta and convert speed to px per ms
      const delta = timestamp - lastTimeRef.current;
      const pixelsToScroll = (speed / 1000) * delta;
      
      setScrollPosition((prevPosition) => {
        // Reset position when we've scrolled through all cards once
        if (prevPosition >= contentHeight) {
          return 0;
        }
        return prevPosition + pixelsToScroll;
      });
      
      lastTimeRef.current = timestamp;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [contentHeight, containerHeight, speed]);

  // When we're at the beginning, we want to show some cards from the end to create a seamless loop
  const duplicateCount = Math.min(3, recognitions.length);
  const displayRecognitions = [
    ...recognitions,
    ...recognitions.slice(0, duplicateCount)
  ];

  return (
    <div 
      className="relative h-full overflow-hidden fade-mask"
      ref={containerRef}
    >
      <div 
        className="absolute w-full"
        style={{ 
          transform: `translateY(-${scrollPosition}px)`,
          transition: scrollPosition === 0 ? 'none' : 'transform 100ms linear'
        }}
      >
        {displayRecognitions.map((recognition, index) => (
          <RecognitionCard
            key={index}
            amount={recognition.amount}
            reason={recognition.reason_decoded}
            giver={recognition.giver}
            receiver={recognition.receiver}
          />
        ))}
      </div>
    </div>
  );
};

export default RecognitionTicker;
