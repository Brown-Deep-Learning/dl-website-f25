// src/app/components/FryerBackground.tsx
"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import styles from "./FryerBackground.module.css";
import { useLayer, LAYERS, LayerKey } from "../contexts/LayerContext";

interface Bubble {
  x: number;
  y: number;
  size: number;
  speed: number;
  wobble: number;
  opacity: number;
}

interface FriedItem {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  floatOffset: number;
  floatSpeed: number;
  type: string;
  isGolden: boolean;
  isDying: boolean;
  scale: number;
}

interface OilLayer {
  name: string;
  baseColor: string;
  bubbleColor: string;
  temperature: number;
  shimmerIntensity: number;
}

const FryerBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { currentLayer } = useLayer();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previousLayer, setPreviousLayer] = useState<LayerKey>(currentLayer);
  const [transitionProgress, setTransitionProgress] = useState(1);
  const [friedItems, setFriedItems] = useState<FriedItem[]>([]);
  const nextIdRef = useRef(0);

  // Define temperature stages for each layer
  const oilLayers: Record<LayerKey, OilLayer> = {
    [LAYERS.SEA_LEVEL]: {
      name: "Prep Station",
      baseColor: "#FFF8E7",
      bubbleColor: "#FFE5B4",
      temperature: 0,
      shimmerIntensity: 0.1,
    },
    [LAYERS.CRUST]: {
      name: "Batter Station",
      baseColor: "#F5E6D3",
      bubbleColor: "#E8D5C4",
      temperature: 25,
      shimmerIntensity: 0.15,
    },
    [LAYERS.UPPER_MANTLE]: {
      name: "Warm Oil (325°F)",
      baseColor: "#FFE4B5",
      bubbleColor: "#FFD17A",
      temperature: 325,
      shimmerIntensity: 0.3,
    },
    [LAYERS.LOWER_MANTLE]: {
      name: "Hot Oil (350°F)",
      baseColor: "#FFCC80",
      bubbleColor: "#FFB74D",
      temperature: 350,
      shimmerIntensity: 0.5,
    },
    [LAYERS.OUTER_CORE]: {
      name: "Golden Crisp (375°F)",
      baseColor: "#FFB347",
      bubbleColor: "#D4A574",
      temperature: 375,
      shimmerIntensity: 0.7,
    },
    [LAYERS.INNER_CORE]: {
      name: "Cooling Rack",
      baseColor: "#DEB887",
      bubbleColor: "#F0E68C",
      temperature: 200,
      shimmerIntensity: 0.2,
    },
  };

  // Fried item types with emoji representations
  const friedItemTypes = [
    "🍟", // French fries
    "🍗", // Chicken nugget
    "🧅", // Onion ring
    "🥟", // Dumpling/fried wonton
    "🍤", // Tempura shrimp
    "🍩", // Donut
    "🥠", // Fortune cookie (fried)
  ];

  // Handle layer transitions
  useEffect(() => {
    if (currentLayer !== previousLayer) {
      setIsTransitioning(true);
      setTransitionProgress(0);

      const duration = 1500;
      const startTime = Date.now();

      const animateTransition = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easeProgress =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        setTransitionProgress(easeProgress);

        if (progress < 1) {
          requestAnimationFrame(animateTransition);
        } else {
          setIsTransitioning(false);
          setPreviousLayer(currentLayer);
        }
      };

      requestAnimationFrame(animateTransition);
    }
  }, [currentLayer, previousLayer]);

  // Initialize fried items
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const itemCount = isMobile ? 8 : 20;
    const items: FriedItem[] = [];

    for (let i = 0; i < itemCount; i++) {
      items.push({
        id: nextIdRef.current++,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: 30 + Math.random() * 30,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.5,
        floatOffset: Math.random() * Math.PI * 2,
        floatSpeed: 0.02 + Math.random() * 0.02,
        type: friedItemTypes[Math.floor(Math.random() * friedItemTypes.length)],
        isGolden: Math.random() < 0.05, // 5% chance of being golden/special
        isDying: false,
        scale: 1,
      });
    }

    setFriedItems(items);
  }, []);

  // Handle click on fried items
  const handleCanvasClick = useCallback((event: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setFriedItems((items) => {
      let clickedItem: FriedItem | null = null;

      const updatedItems = items.map((item) => {
        const dx = x - item.x;
        const dy = y - item.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < item.size && !item.isDying) {
          clickedItem = item;
          return { ...item, isDying: true, scale: 1 };
        }
        return item;
      });

      // Play "cronch" animation and respawn
      if (clickedItem) {
        setTimeout(() => {
          setFriedItems((prevItems) => {
            return prevItems.map((item) =>
              item.id === clickedItem!.id
                ? {
                    ...item,
                    x: Math.random() * canvas.width,
                    y: -50,
                    isDying: false,
                    scale: 1,
                    isGolden: Math.random() < 0.05,
                    type: friedItemTypes[
                      Math.floor(Math.random() * friedItemTypes.length)
                    ],
                  }
                : item
            );
          });
        }, 300);
      }

      return updatedItems;
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);
    canvas.addEventListener("click", handleCanvasClick as any);

    // Initialize bubbles
    const isMobile = window.innerWidth < 768;
    const bubbleCount = isMobile ? 12 : 30;
    const bubbles: Bubble[] = [];

    for (let i = 0; i < bubbleCount; i++) {
      bubbles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: 3 + Math.random() * 8,
        speed: 0.5 + Math.random() * 1.5,
        wobble: Math.random() * Math.PI * 2,
        opacity: 0.3 + Math.random() * 0.4,
      });
    }

    // Animation loop
    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.016;

      // Get current and previous layer colors
      const currentOil = oilLayers[currentLayer];
      const previousOil = oilLayers[previousLayer];

      // Interpolate colors during transition
      const progress = isTransitioning ? transitionProgress : 1;
      const baseColor = isTransitioning
        ? interpolateColor(previousOil.baseColor, currentOil.baseColor, progress)
        : currentOil.baseColor;
      const bubbleColor = isTransitioning
        ? interpolateColor(
            previousOil.bubbleColor,
            currentOil.bubbleColor,
            progress
          )
        : currentOil.bubbleColor;

      // Draw oil background with gradient
      const gradient = ctx.createLinearGradient(
        0,
        0,
        0,
        window.innerHeight
      );
      gradient.addColorStop(0, baseColor);
      gradient.addColorStop(0.5, darkenColor(baseColor, 0.9));
      gradient.addColorStop(1, darkenColor(baseColor, 0.8));
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      // Draw shimmer effect
      const shimmer = currentOil.shimmerIntensity;
      if (shimmer > 0.1) {
        ctx.save();
        ctx.globalAlpha = 0.1 + Math.sin(time * 2) * 0.05;
        const shimmerGradient = ctx.createLinearGradient(
          0,
          0,
          window.innerWidth,
          window.innerHeight
        );
        shimmerGradient.addColorStop(0, "rgba(255, 255, 255, 0)");
        shimmerGradient.addColorStop(0.5, `rgba(255, 255, 255, ${shimmer})`);
        shimmerGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = shimmerGradient;
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.restore();
      }

      // Draw and animate bubbles
      bubbles.forEach((bubble) => {
        ctx.save();
        ctx.globalAlpha = bubble.opacity;

        const bubbleGradient = ctx.createRadialGradient(
          bubble.x,
          bubble.y,
          0,
          bubble.x,
          bubble.y,
          bubble.size
        );
        bubbleGradient.addColorStop(0, bubbleColor);
        bubbleGradient.addColorStop(0.5, `${bubbleColor}88`);
        bubbleGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = bubbleGradient;
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
        ctx.fill();

        // Highlight on bubble
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.beginPath();
        ctx.arc(
          bubble.x - bubble.size * 0.3,
          bubble.y - bubble.size * 0.3,
          bubble.size * 0.3,
          0,
          Math.PI * 2
        );
        ctx.fill();

        ctx.restore();

        // Update bubble position
        bubble.y -= bubble.speed;
        bubble.x += Math.sin(bubble.wobble) * 0.5;
        bubble.wobble += 0.05;

        // Reset bubble when it reaches the top
        if (bubble.y < -bubble.size) {
          bubble.y = window.innerHeight + bubble.size;
          bubble.x = Math.random() * window.innerWidth;
        }
      });

      // Draw and animate fried items
      friedItems.forEach((item) => {
        ctx.save();

        // Death animation
        if (item.isDying) {
          item.scale *= 0.9;
          ctx.globalAlpha = item.scale;
        }

        // Calculate float animation
        const floatY = Math.sin(item.floatOffset + time) * 15;
        item.floatOffset += item.floatSpeed;
        item.rotation += item.rotationSpeed;

        ctx.translate(item.x, item.y + floatY);
        ctx.rotate((item.rotation * Math.PI) / 180);
        ctx.scale(item.scale, item.scale);

        // Draw golden sparkle effect for special items
        if (item.isGolden && !item.isDying) {
          const sparkleSize = item.size * 1.5;
          const sparkleGradient = ctx.createRadialGradient(
            0,
            0,
            0,
            0,
            0,
            sparkleSize
          );
          sparkleGradient.addColorStop(0, "rgba(255, 215, 0, 0.3)");
          sparkleGradient.addColorStop(
            0.5,
            `rgba(255, 215, 0, ${0.2 + Math.sin(time * 3) * 0.1})`
          );
          sparkleGradient.addColorStop(1, "rgba(255, 215, 0, 0)");
          ctx.fillStyle = sparkleGradient;
          ctx.fillRect(
            -sparkleSize,
            -sparkleSize,
            sparkleSize * 2,
            sparkleSize * 2
          );
        }

        // Draw the fried item (emoji)
        ctx.font = `${item.size}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(item.type, 0, 0);

        ctx.restore();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      canvas.removeEventListener("click", handleCanvasClick as any);
      cancelAnimationFrame(animationId);
    };
  }, [
    currentLayer,
    isTransitioning,
    transitionProgress,
    previousLayer,
    friedItems,
    handleCanvasClick,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={styles.fryerCanvas}
      aria-label="Deep Fry animated background with bubbling oil and floating fried items"
    />
  );
};

// Utility functions
function interpolateColor(color1: string, color2: string, progress: number): string {
  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);

  const r = Math.round(c1.r + (c2.r - c1.r) * progress);
  const g = Math.round(c1.g + (c2.g - c1.g) * progress);
  const b = Math.round(c1.b + (c2.b - c1.b) * progress);

  return `rgb(${r}, ${g}, ${b})`;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

function darkenColor(color: string, factor: number): string {
  const rgb = hexToRgb(color);
  const r = Math.round(rgb.r * factor);
  const g = Math.round(rgb.g * factor);
  const b = Math.round(rgb.b * factor);
  return `rgb(${r}, ${g}, ${b})`;
}

export default FryerBackground;
