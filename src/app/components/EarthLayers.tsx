// src/app/components/EarthLayers.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./EarthLayers.module.css";
import { useLayer, LAYERS, LayerKey } from "../contexts/LayerContext";

interface EarthLayer {
  name: string;
  depth: number;
  baseColor: string;
  particles: string[];
  particleColors: string[];
  textures: string[];
}

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  rotation: number;
  type: string;
  opacity: number;
  wobble: number;
  pulsePhase: number;
}

interface MagmaBubble {
  x: number;
  y: number;
  size: number;
  speed: number;
  wobble: number;
  color: string;
  heat: number;
}

interface Mineral {
  x: number;
  y: number;
  size: number;
  rotation: number;
  color: string;
  sparkle: number;
  facets: number;
}

interface LavaFlow {
  x: number;
  y: number;
  width: number;
  height: number;
  temperature: number;
  flow: number;
  color: string;
  speed: number;
  direction: number;
}

interface Diamond {
  x: number;
  y: number;
  size: number;
  sparkle: number;
  rotation: number;
  color: string;
  rotationSpeed: number;
  pulsePhase: number;
  sparklePhase: number;
}

interface Crystal {
  x: number;
  y: number;
  size: number;
  rotation: number;
  color: string;
  glow: number;
  rotationSpeed: number;
  pulsePhase: number;
  opacity: number;
  type: string;
}

interface Crack {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface TectonicPlate {
  x: number;
  y: number;
  width: number;
  height: number;
  vx: number;
  vy: number;
  color: string;
  cracks: Crack[];
}

const EarthLayers = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { currentLayer } = useLayer();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previousLayer, setPreviousLayer] = useState<LayerKey>(currentLayer);
  const [transitionProgress, setTransitionProgress] = useState(1);

  const layers: Record<LayerKey, EarthLayer> = {
    [LAYERS.SEA_LEVEL]: {
      name: "Sea Level/Surface",
      depth: 0,
      baseColor: "#26667F",
      particles: ["bubble", "fish", "seaweed", "plankton"],
      particleColors: ["#94d2bd", "#4ecdc4", "#e9f5db", "#26667F"],
      textures: ["water", "waves", "coral"],
    },
    [LAYERS.CRUST]: {
      name: "Earth's Crust",
      depth: 1,
      baseColor: "#B99470",
      particles: ["rock", "soil", "fossil", "root", "gem"],
      particleColors: ["#e6ccb2", "#B99470", "#e07a5f", "#6B4423"],
      textures: ["sediment", "granite", "limestone"],
    },
    [LAYERS.UPPER_MANTLE]: {
      name: "Upper Mantle",
      depth: 2,
      baseColor: "#FFB4A2",
      particles: ["mineral", "magma", "olivine", "diamond"],
      particleColors: ["#FF7D29", "#FFB4A2", "#ffb74d", "#8FBC8F"],
      textures: ["peridotite", "basalt"],
    },
    [LAYERS.LOWER_MANTLE]: {
      name: "Lower Mantle",
      depth: 3,
      baseColor: "#E7CCCC",
      particles: ["magma", "iron", "silicate", "molten-rock"],
      particleColors: ["#8A2D3B", "#E7CCCC", "#e68a2e", "#B22222"],
      textures: ["bridgmanite", "ferropericlase"],
    },
    [LAYERS.OUTER_CORE]: {
      name: "Outer Core",
      depth: 4,
      baseColor: "#FFCDB2",
      particles: ["molten", "metal", "nickel", "iron-flow"],
      particleColors: ["#FFBF78", "#FFCDB2", "#d62828", "#CD853F"],
      textures: ["liquid-iron", "liquid-nickel"],
    },
    [LAYERS.INNER_CORE]: {
      name: "Inner Core",
      depth: 5,
      baseColor: "#FFECC8",
      particles: ["crystal", "diamond", "iron-crystal", "pressure-crystal"],
      particleColors: ["#EBE5C2", "#FFECC8", "#0a9396", "#F0E68C"],
      textures: ["crystalline-iron", "solid-core"],
    },
  };

  // Handle layer transitions
  useEffect(() => {
    if (currentLayer !== previousLayer) {
      setIsTransitioning(true);
      setTransitionProgress(0);

      // Animate transition
      const duration = 1500; // 1.5 seconds
      const startTime = Date.now();

      const animateTransition = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Use easeInOutCubic for smooth transition
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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Particle systems
    const particles: Particle[] = [];

    const minerals: Mineral[] = [];

    const magmaBubbles: MagmaBubble[] = [];

    const crystals: Crystal[] = [];

    const seismicWaves: Array<{
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      speed: number;
      opacity: number;
      color: string;
    }> = [];

    const tectonicPlates: TectonicPlate[] = [];

    const lavaFlows: LavaFlow[] = [];

    const floatingDiamonds: Diamond[] = [];

    // Initialize particles for current layer
    const initParticles = (layerKey: LayerKey) => {
      particles.length = 0;
      minerals.length = 0;
      magmaBubbles.length = 0;
      crystals.length = 0;
      tectonicPlates.length = 0;
      lavaFlows.length = 0;
      floatingDiamonds.length = 0;

      const layer = layers[layerKey];

      // Reduce particle count for better performance and readability
      for (let i = 0; i < 40; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 4 + 1,
          color:
            layer.particleColors[
              Math.floor(Math.random() * layer.particleColors.length)
            ],
          speed: Math.random() * 0.5 + 0.1,
          rotation: Math.random() * Math.PI * 2,
          type: layer.particles[
            Math.floor(Math.random() * layer.particles.length)
          ],
          opacity: Math.random() * 0.4 + 0.2, // Reduced opacity
          wobble: Math.random() * Math.PI * 2,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }

      // Layer-specific elements with reduced counts
      if (layerKey === LAYERS.SEA_LEVEL) {
        for (let i = 0; i < 25; i++) {
          magmaBubbles.push({
            x: Math.random() * canvas.width,
            y: canvas.height + Math.random() * 200,
            size: Math.random() * 8 + 3,
            speed: Math.random() * 1.5 + 0.3,
            wobble: Math.random() * Math.PI * 2,
            color:
              layer.particleColors[
                Math.floor(Math.random() * layer.particleColors.length)
              ],
            heat: Math.random() * 0.4 + 0.2,
          });
        }
      } else if (layerKey === LAYERS.CRUST) {
        for (let i = 0; i < 2; i++) {
          const plate = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            width: Math.random() * 200 + 100,
            height: Math.random() * 100 + 50,
            vx: (Math.random() - 0.5) * 0.1,
            vy: (Math.random() - 0.5) * 0.1,
            color: `rgba(139, 115, 85, ${0.15 + Math.random() * 0.15})`, // More subtle
            cracks: [] as Array<{
              x1: number;
              y1: number;
              x2: number;
              y2: number;
            }>,
          };

          for (let j = 0; j < 3; j++) {
            plate.cracks.push({
              x1: Math.random() * plate.width,
              y1: Math.random() * plate.height,
              x2: Math.random() * plate.width,
              y2: Math.random() * plate.height,
            });
          }

          tectonicPlates.push(plate);
        }

        for (let i = 0; i < 12; i++) {
          minerals.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 12 + 4,
            color: [
              "#9370DB",
              "#4169E1",
              "#20B2AA",
              "#FFD700",
              "#FF69B4",
              "#32CD32",
            ][Math.floor(Math.random() * 6)],
            rotation: Math.random() * Math.PI * 2,
            sparkle: 0,
            facets: Math.floor(Math.random() * 4) + 6,
          });
        }
      } else if (
        layerKey === LAYERS.UPPER_MANTLE ||
        layerKey === LAYERS.LOWER_MANTLE
      ) {
        for (let i = 0; i < 20; i++) {
          magmaBubbles.push({
            x: Math.random() * canvas.width,
            y: canvas.height + Math.random() * 200,
            size: Math.random() * 12 + 4,
            speed: Math.random() * 2 + 0.5,
            wobble: Math.random() * Math.PI * 2,
            color:
              layer.particleColors[
                Math.floor(Math.random() * layer.particleColors.length)
              ],
            heat: Math.random() * 0.5 + 0.3,
          });
        }

        for (let i = 0; i < 4; i++) {
          lavaFlows.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            width: Math.random() * 80 + 40,
            height: Math.random() * 15 + 8,
            speed: Math.random() * 1.5 + 0.5,
            temperature: Math.random() * 0.3 + 0.4,
            direction: Math.random() * Math.PI * 2,
            flow: Math.random() * 0.5 + 0.3,
            color: "#FF4500",
          });
        }

        if (layerKey === LAYERS.UPPER_MANTLE) {
          for (let i = 0; i < 5; i++) {
            floatingDiamonds.push({
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height,
              size: Math.random() * 10 + 6,
              rotation: Math.random() * Math.PI * 2,
              rotationSpeed: (Math.random() - 0.5) * 0.02,
              pulsePhase: Math.random() * Math.PI * 2,
              sparklePhase: Math.random() * Math.PI * 2,
              sparkle: 0,
              color: "#00FFFF",
            });
          }
        }
      } else if (
        layerKey === LAYERS.OUTER_CORE ||
        layerKey === LAYERS.INNER_CORE
      ) {
        for (let i = 0; i < 15; i++) {
          crystals.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 25 + 10,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.015,
            color: layerKey === LAYERS.INNER_CORE ? "#FFFFFF" : "#FFD700",
            opacity: Math.random() * 0.4 + 0.3, // Reduced opacity
            type: layerKey === LAYERS.INNER_CORE ? "diamond" : "metal",
            pulsePhase: Math.random() * Math.PI * 2,
            glow: Math.random() * 0.5 + 0.3,
          });
        }

        for (let i = 0; i < 8; i++) {
          floatingDiamonds.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 18 + 10,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.015,
            pulsePhase: Math.random() * Math.PI * 2,
            sparklePhase: Math.random() * Math.PI * 2,
            sparkle: 0,
            color: "#FFFFFF",
          });
        }
      }
    };

    // Create muted color palettes for better readability
    const createGradient = (layerKey: LayerKey, alpha: number = 1) => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);

      if (layerKey === LAYERS.SEA_LEVEL) {
        gradient.addColorStop(0, `rgba(135, 206, 235, ${0.3 * alpha})`); // Much more subtle
        gradient.addColorStop(0.2, `rgba(38, 102, 127, ${0.4 * alpha})`);
        gradient.addColorStop(0.4, `rgba(148, 210, 189, ${0.3 * alpha})`);
        gradient.addColorStop(0.6, `rgba(78, 205, 196, ${0.3 * alpha})`);
        gradient.addColorStop(0.8, `rgba(31, 95, 91, ${0.4 * alpha})`);
        gradient.addColorStop(1, `rgba(13, 42, 46, ${0.5 * alpha})`);
      } else if (layerKey === LAYERS.CRUST) {
        gradient.addColorStop(0, `rgba(230, 204, 178, ${0.3 * alpha})`);
        gradient.addColorStop(0.2, `rgba(185, 148, 112, ${0.4 * alpha})`);
        gradient.addColorStop(0.4, `rgba(224, 122, 95, ${0.3 * alpha})`);
        gradient.addColorStop(0.6, `rgba(107, 68, 35, ${0.4 * alpha})`);
        gradient.addColorStop(0.8, `rgba(93, 78, 55, ${0.4 * alpha})`);
        gradient.addColorStop(1, `rgba(74, 60, 40, ${0.5 * alpha})`);
      } else if (layerKey === LAYERS.UPPER_MANTLE) {
        gradient.addColorStop(0, `rgba(255, 180, 162, ${0.3 * alpha})`);
        gradient.addColorStop(0.2, `rgba(255, 125, 41, ${0.3 * alpha})`);
        gradient.addColorStop(0.4, `rgba(255, 183, 77, ${0.3 * alpha})`);
        gradient.addColorStop(0.6, `rgba(220, 20, 60, ${0.3 * alpha})`);
        gradient.addColorStop(0.8, `rgba(178, 34, 34, ${0.4 * alpha})`);
        gradient.addColorStop(1, `rgba(139, 0, 0, ${0.4 * alpha})`);
      } else if (layerKey === LAYERS.LOWER_MANTLE) {
        gradient.addColorStop(0, `rgba(231, 204, 204, ${0.3 * alpha})`);
        gradient.addColorStop(0.2, `rgba(138, 45, 59, ${0.3 * alpha})`);
        gradient.addColorStop(0.4, `rgba(230, 138, 46, ${0.3 * alpha})`);
        gradient.addColorStop(0.6, `rgba(255, 69, 0, ${0.3 * alpha})`);
        gradient.addColorStop(0.8, `rgba(255, 99, 71, ${0.3 * alpha})`);
        gradient.addColorStop(1, `rgba(255, 140, 0, ${0.4 * alpha})`);
      } else if (layerKey === LAYERS.OUTER_CORE) {
        gradient.addColorStop(0, `rgba(255, 205, 178, ${0.3 * alpha})`);
        gradient.addColorStop(0.2, `rgba(255, 191, 120, ${0.3 * alpha})`);
        gradient.addColorStop(0.4, `rgba(214, 40, 40, ${0.3 * alpha})`);
        gradient.addColorStop(0.6, `rgba(255, 165, 0, ${0.3 * alpha})`);
        gradient.addColorStop(0.8, `rgba(255, 215, 0, ${0.3 * alpha})`);
        gradient.addColorStop(1, `rgba(255, 255, 0, ${0.4 * alpha})`);
      } else {
        gradient.addColorStop(0, `rgba(255, 236, 200, ${0.3 * alpha})`);
        gradient.addColorStop(0.2, `rgba(235, 229, 194, ${0.3 * alpha})`);
        gradient.addColorStop(0.4, `rgba(10, 147, 150, ${0.2 * alpha})`);
        gradient.addColorStop(0.6, `rgba(255, 250, 250, ${0.2 * alpha})`);
        gradient.addColorStop(0.8, `rgba(240, 248, 255, ${0.2 * alpha})`);
        gradient.addColorStop(1, `rgba(230, 230, 250, ${0.3 * alpha})`);
      }

      return gradient;
    };

    // Enhanced drawing functions with reduced opacity
    const drawMineral = (mineral: Mineral, globalAlpha: number = 1) => {
      ctx.save();
      ctx.translate(mineral.x, mineral.y);
      ctx.rotate(mineral.rotation);
      ctx.globalAlpha = 0.6 * globalAlpha; // Reduced base opacity

      const glowGradient = ctx.createRadialGradient(
        0,
        0,
        0,
        0,
        0,
        mineral.size * 1.5
      );
      glowGradient.addColorStop(0, mineral.color);
      glowGradient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(0, 0, mineral.size * 1.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalAlpha = 0.7 * globalAlpha;
      ctx.fillStyle = mineral.color;
      ctx.beginPath();

      for (let i = 0; i < mineral.facets; i++) {
        const angle = ((Math.PI * 2) / mineral.facets) * i;
        const radius =
          mineral.size * (0.8 + Math.sin(i + mineral.sparkle) * 0.1);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    const drawMagmaBubble = (bubble: MagmaBubble, globalAlpha: number = 1) => {
      ctx.save();
      ctx.globalAlpha = 0.4 * bubble.heat * globalAlpha; // Reduced opacity

      const outerGlowGradient = ctx.createRadialGradient(
        bubble.x,
        bubble.y,
        0,
        bubble.x,
        bubble.y,
        bubble.size * 2
      );
      outerGlowGradient.addColorStop(0, bubble.color);
      outerGlowGradient.addColorStop(1, "rgba(0,0,0,0)");

      ctx.fillStyle = outerGlowGradient;
      ctx.beginPath();
      ctx.arc(bubble.x, bubble.y, bubble.size * 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalAlpha = 0.6 * bubble.heat * globalAlpha;
      const gradient = ctx.createRadialGradient(
        bubble.x - bubble.size * 0.3,
        bubble.y - bubble.size * 0.3,
        0,
        bubble.x,
        bubble.y,
        bubble.size
      );
      gradient.addColorStop(0, "#FFFFFF");
      gradient.addColorStop(0.3, bubble.color);
      gradient.addColorStop(1, "#8B0000");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const drawFloatingDiamond = (diamond: Diamond, globalAlpha: number = 1) => {
      ctx.save();
      ctx.translate(diamond.x, diamond.y);
      ctx.rotate(diamond.rotation);

      const pulseSize = diamond.size * (1 + Math.sin(diamond.pulsePhase) * 0.2);
      ctx.globalAlpha = 0.5 * globalAlpha; // Reduced opacity

      const sparkleGradient = ctx.createRadialGradient(
        0,
        0,
        0,
        0,
        0,
        pulseSize * 1.5
      );
      const sparkleIntensity = (Math.sin(diamond.sparklePhase) + 1) / 2;
      sparkleGradient.addColorStop(
        0,
        `rgba(255,255,255,${sparkleIntensity * 0.6})`
      );
      sparkleGradient.addColorStop(1, "rgba(0,0,0,0)");

      ctx.fillStyle = sparkleGradient;
      ctx.beginPath();
      ctx.arc(0, 0, pulseSize * 1.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalAlpha = 0.7 * globalAlpha;
      const diamondGradient = ctx.createLinearGradient(
        -pulseSize,
        -pulseSize,
        pulseSize,
        pulseSize
      );
      diamondGradient.addColorStop(0, "rgba(255,255,255,0.8)");
      diamondGradient.addColorStop(1, "rgba(255,255,255,0.4)");

      ctx.fillStyle = diamondGradient;
      ctx.beginPath();
      ctx.moveTo(0, -pulseSize);
      ctx.lineTo(pulseSize * 0.6, 0);
      ctx.lineTo(0, pulseSize);
      ctx.lineTo(-pulseSize * 0.6, 0);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    const drawCrystal = (crystal: Crystal, globalAlpha: number = 1) => {
      ctx.save();
      ctx.translate(crystal.x, crystal.y);
      ctx.rotate(crystal.rotation);

      const pulseSize = crystal.size * (1 + Math.sin(crystal.pulsePhase) * 0.1);
      ctx.globalAlpha = crystal.opacity * 0.6 * globalAlpha; // Reduced opacity

      if (crystal.type === "diamond") {
        const gradient = ctx.createLinearGradient(
          -pulseSize,
          -pulseSize,
          pulseSize,
          pulseSize
        );
        gradient.addColorStop(0, "rgba(255,255,255,0.6)");
        gradient.addColorStop(1, "rgba(255,255,255,0.2)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(0, -pulseSize);
        ctx.lineTo(pulseSize * 0.6, 0);
        ctx.lineTo(0, pulseSize);
        ctx.lineTo(-pulseSize * 0.6, 0);
        ctx.closePath();
        ctx.fill();
      } else {
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, pulseSize);
        gradient.addColorStop(0, "rgba(255,215,0,0.6)");
        gradient.addColorStop(1, "rgba(184,134,11,0.3)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
          const angle = ((Math.PI * 2) / 8) * i;
          const radius = pulseSize * (i % 2 === 0 ? 1 : 0.7);
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
      }

      ctx.restore();
    };

    const drawLavaFlow = (lava: LavaFlow, globalAlpha: number = 1) => {
      ctx.save();
      ctx.globalAlpha = lava.temperature * 0.5 * globalAlpha; // Reduced opacity

      const gradient = ctx.createLinearGradient(
        lava.x,
        lava.y,
        lava.x + lava.width,
        lava.y + lava.height
      );
      gradient.addColorStop(0, "rgba(255,69,0,0.5)");
      gradient.addColorStop(0.5, "rgba(255,99,71,0.4)");
      gradient.addColorStop(1, "rgba(139,0,0,0.3)");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.ellipse(
        lava.x,
        lava.y,
        lava.width,
        lava.height,
        lava.direction,
        0,
        Math.PI * 2
      );
      ctx.fill();

      ctx.restore();
    };

    const drawTectonicPlate = (
      plate: TectonicPlate,
      globalAlpha: number = 1
    ) => {
      ctx.save();
      ctx.globalAlpha = 0.25 * globalAlpha; // Much more subtle

      ctx.fillStyle = plate.color;
      ctx.fillRect(plate.x, plate.y, plate.width, plate.height);

      ctx.globalAlpha = 0.4 * globalAlpha;
      ctx.strokeStyle = "rgba(0,0,0,0.3)";
      ctx.lineWidth = 1;
      plate.cracks.forEach((crack: Crack) => {
        ctx.beginPath();
        ctx.moveTo(plate.x + crack.x1, plate.y + crack.y1);
        ctx.lineTo(plate.x + crack.x2, plate.y + crack.y2);
        ctx.stroke();
      });

      ctx.restore();
    };

    // Initialize particles for both current and previous layers
    initParticles(currentLayer);

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const time = Date.now() * 0.001;

      // Handle layer transitions
      if (isTransitioning) {
        // Draw previous layer
        const prevGradient = createGradient(
          previousLayer,
          1 - transitionProgress
        );
        ctx.fillStyle = prevGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw current layer
        const currentGradient = createGradient(
          currentLayer,
          transitionProgress
        );
        ctx.fillStyle = currentGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        // Draw current layer background
        const gradient = createGradient(currentLayer);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Add subtle base texture overlay for better content visibility
      ctx.save();
      ctx.globalAlpha = 0.05;
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      // Reduced heat distortion effect
      if (
        currentLayer === LAYERS.UPPER_MANTLE ||
        currentLayer === LAYERS.LOWER_MANTLE ||
        currentLayer === LAYERS.OUTER_CORE ||
        currentLayer === LAYERS.INNER_CORE
      ) {
        ctx.globalAlpha = 0.08; // Much more subtle
        for (let i = 0; i < 4; i++) {
          // Reduced count
          const x = ((Math.sin(time * 0.3 + i) + 1) * canvas.width) / 2;
          const y = ((Math.cos(time * 0.2 + i) + 1) * canvas.height) / 2;
          const radius = 60 + Math.sin(time + i) * 30;

          const heatGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
          if (currentLayer === LAYERS.INNER_CORE) {
            heatGradient.addColorStop(0, `rgba(255, 255, 255, 0.2)`);
          } else {
            heatGradient.addColorStop(0, `rgba(255, 100, 0, 0.2)`);
          }
          heatGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

          ctx.fillStyle = heatGradient;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      const layerAlpha = isTransitioning ? transitionProgress : 1;

      // Draw all elements with proper alpha blending
      tectonicPlates.forEach((plate) => {
        drawTectonicPlate(plate, layerAlpha);
        plate.x += plate.vx;
        plate.y += plate.vy;

        if (plate.x > canvas.width) plate.x = -plate.width;
        if (plate.x < -plate.width) plate.x = canvas.width;
        if (plate.y > canvas.height) plate.y = -plate.height;
        if (plate.y < -plate.height) plate.y = canvas.height;
      });

      minerals.forEach((mineral) => {
        drawMineral(mineral, layerAlpha);
        mineral.rotation += 0.005;
        mineral.sparkle = Math.abs(Math.sin(time + mineral.x * 0.01));
      });

      lavaFlows.forEach((flow) => {
        drawLavaFlow(flow, layerAlpha);
        flow.x += Math.cos(flow.direction) * flow.speed * 0.5;
        flow.y += Math.sin(flow.direction) * flow.speed * 0.5;
        flow.temperature = 0.5 + Math.sin(time * 2) * 0.2;

        if (flow.x > canvas.width + 100) flow.x = -100;
        if (flow.y > canvas.height + 100) flow.y = -100;
        if (flow.x < -100) flow.x = canvas.width + 100;
        if (flow.y < -100) flow.y = canvas.height + 100;
      });

      floatingDiamonds.forEach((diamond) => {
        drawFloatingDiamond(diamond, layerAlpha);
        diamond.rotation += diamond.rotationSpeed;
        diamond.pulsePhase += 0.03;
        diamond.sparklePhase += 0.05;

        diamond.x += Math.sin(time + diamond.pulsePhase) * 0.3;
        diamond.y += Math.cos(time * 0.5 + diamond.sparklePhase) * 0.2;

        if (diamond.x > canvas.width + 50) diamond.x = -50;
        if (diamond.x < -50) diamond.x = canvas.width + 50;
        if (diamond.y > canvas.height + 50) diamond.y = -50;
        if (diamond.y < -50) diamond.y = canvas.height + 50;
      });

      magmaBubbles.forEach((bubble) => {
        drawMagmaBubble(bubble, layerAlpha);
        bubble.y -= bubble.speed * 0.5;
        bubble.x += Math.sin(bubble.wobble) * 0.8;
        bubble.wobble += 0.03;
        bubble.heat = 0.4 + Math.sin(time + bubble.x * 0.01) * 0.3;

        if (bubble.y < -bubble.size * 2) {
          bubble.y = canvas.height + bubble.size * 2;
          bubble.x = Math.random() * canvas.width;
        }
      });

      crystals.forEach((crystal) => {
        drawCrystal(crystal, layerAlpha);
        crystal.rotation += crystal.rotationSpeed;
        crystal.pulsePhase += 0.02;
        crystal.opacity = 0.3 + Math.sin(crystal.pulsePhase) * 0.2;
      });

      // Subtle seismic waves
      if (Math.random() < 0.003 && currentLayer !== LAYERS.SEA_LEVEL) {
        seismicWaves.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: 0,
          maxRadius: 200,
          speed: 3,
          opacity: 0.4,
          color:
            currentLayer === LAYERS.OUTER_CORE ||
            currentLayer === LAYERS.INNER_CORE
              ? "rgba(255,215,0,0.3)"
              : "rgba(255,99,71,0.3)",
        });
      }

      seismicWaves.forEach((wave, index) => {
        ctx.save();
        ctx.globalAlpha = wave.opacity * layerAlpha;
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 1;
        ctx.setLineDash([10, 5]);
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        wave.radius += wave.speed;
        wave.opacity *= 0.98;

        if (wave.radius > wave.maxRadius || wave.opacity < 0.01) {
          seismicWaves.splice(index, 1);
        }
      });

      // Draw particles with reduced opacity and size
      particles.forEach((particle) => {
        ctx.save();
        ctx.globalAlpha = particle.opacity * 0.6 * layerAlpha; // More subtle
        ctx.fillStyle = particle.color;

        if (particle.type === "rock" || particle.type === "soil") {
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = ((Math.PI * 2) / 6) * i;
            const radius = particle.size * (0.7 + Math.random() * 0.3);
            const x = particle.x + Math.cos(angle + particle.rotation) * radius;
            const y = particle.y + Math.sin(angle + particle.rotation) * radius;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.fill();
        } else {
          const particleGradient = ctx.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            particle.size
          );
          particleGradient.addColorStop(0, particle.color);
          particleGradient.addColorStop(1, "rgba(0,0,0,0)");

          ctx.fillStyle = particleGradient;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();

        particle.y += particle.speed;
        particle.x += Math.sin(particle.wobble) * 0.3;
        particle.wobble += 0.02;
        particle.rotation += 0.01;

        if (particle.y > canvas.height + particle.size) {
          particle.y = -particle.size;
          particle.x = Math.random() * canvas.width;
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationId);
    };
  }, [currentLayer, isTransitioning, transitionProgress, previousLayer]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <canvas
      ref={canvasRef}
      className={styles.earthCanvas}
      aria-label="Deep Earth animated background"
    />
  );
};

export default EarthLayers;
