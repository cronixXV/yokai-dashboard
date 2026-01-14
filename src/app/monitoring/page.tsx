"use client";

import { useAnomaliesQuery } from "@/entities/anomaly/hooks/use-anomalies-query";
import { useAnomaliesSSE } from "@/entities/anomaly/hooks/use-anomalies-sse";
import { useCaptureAnomalyMutation } from "@/entities/anomaly/hooks/use-capture-anomaly-mutation";
import { AnomalyList } from "@/features/anomaly/AnomalyList";
import { AppNotification } from "@/shared/ui/AppNotification/app-notification";
import { useState } from "react";
import styles from "./page.module.scss";

export default function MonitoringPage() {
  useAnomaliesSSE();

  const {
    data: anomalies = [],
    isLoading,
    isError,
    error,
  } = useAnomaliesQuery();
  const [showError, setShowError] = useState<boolean>(false);

  const captureMutation = useCaptureAnomalyMutation();

  const handleCapture = (id: string) => {
    captureMutation.mutate(id, {
      onError: () => {
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      },
    });
  };

  if (isLoading) return <div className="container">Loading anomalies...</div>;

  if (isError)
    return <div className="container">Error: {(error as Error)?.message}</div>;

  return (
    <div className={styles.container}>
      <h1>Yokai Monitoring Dashboard</h1>
      {showError && (
        <AppNotification
          message={captureMutation.error?.message || "Failed to capture Yokai"}
          onClose={() => setShowError(false)}
        />
      )}
      <AnomalyList
        anomalies={anomalies}
        onCapture={handleCapture}
        capturingId={captureMutation.variables ?? null}
      />
    </div>
  );
}
