"use client";

import { Anomaly } from "@/shared/schemes/scheme";
import styles from "./anomalyCard.module.scss";
import clsx from "clsx";

interface IAnomalyCardProps {
  anomaly: Anomaly;
  onCapture: (id: string) => void;
  isCapturing: boolean;
}

export const AnomalyCard = ({
  anomaly,
  onCapture,
  isCapturing,
}: IAnomalyCardProps) => {
  const getThreatColor = (level: Anomaly["threatLevel"]) => {
    switch (level) {
      case "Critical":
        return "critical";
      case "High":
        return "high";
      case "Medium":
        return "medium";
      default:
        return "low";
    }
  };

  const threatClass = getThreatColor(anomaly.threatLevel);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.name}>{anomaly.name}</h3>
        <span className={clsx(styles.threatBadge, styles[threatClass])}>
          {anomaly.threatLevel}
        </span>
      </div>
      <p className={styles.location}>📍 {anomaly.location}</p>
      <p className={styles.status}>
        Status: <strong>{anomaly.status}</strong>
      </p>
      {anomaly.status === "Active" && (
        <button
          className={styles.captureBtn}
          onClick={() => onCapture(anomaly.id)}
          disabled={isCapturing}
        >
          {isCapturing ? "Catching..." : "Capture"}
        </button>
      )}
    </div>
  );
};
