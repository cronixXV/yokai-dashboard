"use client";

import { Anomaly } from "@/shared/schemes/scheme";
import { AnomalyCard } from "../../AnomalyCard/ui/anomaly-card";
import styles from "./anomalyList.module.scss";

interface IAnomalyListProps {
  anomalies: Anomaly[];
  onCapture: (id: string) => void;
  capturingId: string | null;
}

export const AnomalyList = ({
  anomalies,
  onCapture,
  capturingId,
}: IAnomalyListProps) => {
  if (anomalies.length === 0) {
    return <div className={styles.empty}>No anomalies detected</div>;
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
