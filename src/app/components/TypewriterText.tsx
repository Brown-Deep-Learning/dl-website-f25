// components/TypewriterText.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./TypewriterText.module.css";

interface TypewriterTextProps {
  text: string;
  speed?: number; // typing speed in milliseconds
  className?: string;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speed = 150,
  className,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let currentIndex = 0;
    let isCancelled = false;

    const typeNextChar = () => {
      if (isCancelled) return;

      if (currentIndex <= text.length) {
        setDisplayedText(text.substring(0, currentIndex));
        currentIndex += 1;
        timeoutRef.current = setTimeout(typeNextChar, speed);
      }
    };

    typeNextChar();

    // Cleanup function
    return () => {
      isCancelled = true;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, speed]);

  return (
    <h1 className={`${styles.typewriter} ${className}`}>{displayedText}</h1>
  );
};

export default TypewriterText;
