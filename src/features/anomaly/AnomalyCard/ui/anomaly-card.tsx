"use client";

import clsx from "clsx";

import { getThreatColor } from "../model/lib/getThreatColor";
import { IAnomalyCardProps } from "../model/types/types";

import styles from "./anomalyCard.module.scss";

export const AnomalyCard = ({
  anomaly,
  onCapture,
  isCapturing,
}: IAnomalyCardProps) => {
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
