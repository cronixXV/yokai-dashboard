"use client";

import { AnomalyCard } from "../../AnomalyCard/ui/anomaly-card";
import { IAnomalyListProps } from "../model/types/types";

import styles from "./anomalyList.module.scss";

export const AnomalyList = ({
  anomalies,
  onCapture,
  capturingId,
}: IAnomalyListProps) => {
  if (anomalies.length === 0) {
    return <div className={styles.empty}>No yokai detected</div>;
  }

  return (
    <div className={styles.list}>
      {anomalies.map((anomaly) => (
        <AnomalyCard
          key={anomaly.id}
          anomaly={anomaly}
          onCapture={onCapture}
          isCapturing={capturingId === anomaly.id}
        />
      ))}
    </div>
  );
};
