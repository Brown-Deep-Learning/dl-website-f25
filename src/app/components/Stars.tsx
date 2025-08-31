"use client";

import React, { useEffect, useRef } from "react";
import styles from "./Stars.module.css";

const Stars = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let keySequence = "";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Make the canvas fill its parent’s size
    const setCanvasSize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Star properties
    const stars: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
    }> = [];
    const shootingStars: Array<{
      x: number;
      y: number;
      length: number;
      speed: number;
    }> = [];
    const nebulas: Array<{
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      baseSize: number;
      color: string;
      vx: number;
      vy: number;
      angle: number;
      angularSpeed: number;
    }> = [];

    // Function to get random color for nebulas
    const getRandomNebulaColor = () => {
      const colors = [
        "rgba(255, 0, 255, 0.1)", // Purple
        "rgba(0, 255, 255, 0.1)", // Cyan
        "rgba(255, 255, 0, 0.1)", // Yellow
        "rgba(255, 0, 0, 0.1)", // Red
        "rgba(0, 255, 0, 0.1)", // Green
        "rgba(0, 0, 255, 0.1)", // Blue
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    // Create initial stars
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5,
      });
    }

    // Create nebulas with movement properties
    const numNebulas = Math.floor(Math.random() * 3) + 3; // 3 to 5 nebulas
    for (let i = 0; i < numNebulas; i++) {
      const size = Math.random() * 200 + 100; // Sizes between 100 and 300 pixels
      nebulas.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        baseX: 0, // For sinusoidal movement
        baseY: 0, // For sinusoidal movement
        size: size,
        baseSize: size,
        color: getRandomNebulaColor(),
        vx: (Math.random() - 0.5) * 0.5, // Small horizontal velocity
        vy: (Math.random() - 0.5) * 0.5, // Small vertical velocity
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.002, // Slow rotation
      });
    }

    // Easter egg variables
    let showConstellation = false;

    // Function to draw the hidden constellation
    const drawConstellation = () => {
      // Example constellation: a simple pattern
      const constellationStars = [
        { x: canvas.width * 0.2, y: canvas.height * 0.3 },
        { x: canvas.width * 0.35, y: canvas.height * 0.4 },
        { x: canvas.width * 0.5, y: canvas.height * 0.35 },
        { x: canvas.width * 0.65, y: canvas.height * 0.5 },
        { x: canvas.width * 0.8, y: canvas.height * 0.45 },
      ];

      ctx.strokeStyle = "rgba(255, 215, 0, 0.8)"; // Gold color
      ctx.lineWidth = 2;
      ctx.beginPath();
      constellationStars.forEach((star, index) => {
        if (index === 0) {
          ctx.moveTo(star.x, star.y);
        } else {
          ctx.lineTo(star.x, star.y);
        }
        // Draw star points
        ctx.fillStyle = "rgba(255, 215, 0, 0.8)";
        ctx.beginPath();
        ctx.arc(star.x, star.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.stroke();
    };

    // Animation function
    let animationFrameId: number;
    let lastTime = 0;

    const animate = (time: number) => {
      if (!ctx) return;
      const deltaTime = time - lastTime;
      lastTime = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw nebulas with movement
      nebulas.forEach((nebula) => {
        // Update position
        nebula.x += nebula.vx * deltaTime * 0.05;
        nebula.y += nebula.vy * deltaTime * 0.05;

        // Update size (pulsating effect)
        nebula.angle += nebula.angularSpeed * deltaTime;
        nebula.size =
          nebula.baseSize + Math.sin(nebula.angle) * (nebula.baseSize * 0.05);

        // Wrap around screen edges
        if (nebula.x - nebula.size > canvas.width) nebula.x = -nebula.size;
        if (nebula.x + nebula.size < 0) nebula.x = canvas.width + nebula.size;
        if (nebula.y - nebula.size > canvas.height) nebula.y = -nebula.size;
        if (nebula.y + nebula.size < 0) nebula.y = canvas.height + nebula.size;

        // Create radial gradient
        const gradient = ctx.createRadialGradient(
          nebula.x,
          nebula.y,
          0,
          nebula.x,
          nebula.y,
          nebula.size
        );
        gradient.addColorStop(0, nebula.color);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(nebula.x, nebula.y, nebula.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw and update regular stars
      stars.forEach((star) => {
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Move star downward
        star.y += star.speed;
        // When a star leaves bottom edge, wrap it to top
        if (star.y > canvas.height) star.y = 0;
      });

      // Randomly create shooting stars
      if (Math.random() < 0.02) {
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: 0,
          length: Math.random() * 80 + 20,
          speed: Math.random() * 15 + 5,
        });
      }

      // Draw and update shooting stars
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;
      shootingStars.forEach((s, index) => {
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + s.length, s.y + s.length);
        ctx.stroke();

        s.x += s.speed;
        s.y += s.speed;

        // Remove shooting star if it goes off screen
        if (s.x > canvas.width || s.y > canvas.height) {
          shootingStars.splice(index, 1);
        }
      });

      // If easter egg is activated, draw the constellation
      if (showConstellation) {
        drawConstellation();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Event listener for key presses
    const handleKeyDown = (e: KeyboardEvent) => {
      keySequence += e.key.toLowerCase();
      if (keySequence.includes("universe")) {
        showConstellation = true;
      }
      // Limit the length of the sequence to prevent memory issues
      if (keySequence.length > 100) {
        keySequence = keySequence.slice(-100);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup listeners on unmount
    return () => {
      window.removeEventListener("resize", setCanvasSize);
      window.removeEventListener("keydown", handleKeyDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.starsCanvas} />;
};

export default Stars;
