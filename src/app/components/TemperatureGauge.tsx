// src/app/components/TemperatureGauge.tsx
"use client";

import React from "react";
import styles from "./TemperatureGauge.module.css";

interface TemperatureGaugeProps {
  progress: number; // 0-100
  daysRemaining?: number;
}

const TemperatureGauge: React.FC<TemperatureGaugeProps> = ({
  progress,
  daysRemaining,
}) => {
  // Calculate temperature based on progress (325°F to 425°F)
  const minTemp = 325;
  const maxTemp = 425;
  const currentTemp = Math.round(minTemp + (progress / 100) * (maxTemp - minTemp));

  // Determine color based on temperature/progress
  const getTemperatureColor = () => {
    if (progress < 25) return "#FFE4B5"; // Pale yellow (lukewarm)
    if (progress < 50) return "#FFD17A"; // Light golden
    if (progress < 75) return "#FFB347"; // Golden
    if (progress < 90) return "#FFA500"; // Orange
    return "#FF6B35"; // Red-orange (hot!)
  };

  const getTemperatureLabel = () => {
    if (progress < 25) return "Getting Warm";
    if (progress < 50) return "Heating Up";
    if (progress < 75) return "Perfect Temp";
    if (progress < 90) return "Getting Hot";
    return "Too Hot!";
  };

  return (
    <div className={styles.container}>
      <div className={styles.gaugeWrapper}>
        {/* Thermometer bulb */}
        <div className={styles.thermometerBulb}>
          <div
            className={styles.bulbFill}
            style={{ backgroundColor: getTemperatureColor() }}
          />
        </div>

        {/* Thermometer tube */}
        <div className={styles.thermometerTube}>
          {/* Background markings */}
          <div className={styles.markings}>
            {[425, 400, 375, 350, 325].map((temp) => (
              <div key={temp} className={styles.marking}>
                <span className={styles.markingLine} />
                <span className={styles.markingLabel}>{temp}°F</span>
              </div>
            ))}
          </div>

          {/* Mercury fill */}
          <div
            className={styles.mercury}
            style={{
              height: `${progress}%`,
              backgroundColor: getTemperatureColor(),
            }}
          >
            <div className={styles.mercuryGlow} />
          </div>
        </div>
      </div>

      {/* Info panel */}
      <div className={styles.infoPanel}>
        <div className={styles.tempDisplay}>
          <span className={styles.tempValue}>{currentTemp}°F</span>
          <span className={styles.tempLabel}>{getTemperatureLabel()}</span>
        </div>

        <div className={styles.progressInfo}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{
                width: `${progress}%`,
                backgroundColor: getTemperatureColor(),
              }}
            />
          </div>
          <span className={styles.progressText}>{Math.round(progress)}% Crispy</span>
        </div>

        {daysRemaining !== undefined && (
          <div className={styles.daysRemaining}>
            <span className={styles.daysLabel}>Days until service ends:</span>
            <span className={styles.daysValue}>{daysRemaining}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemperatureGauge;
