"use client";

import { useAnomaliesQuery } from "@/entities/anomaly/hooks/use-anomalies-query";
import { useCaptureAnomalyMutation } from "@/entities/anomaly/hooks/use-capture-anomaly-mutation";
import { AnomalyList } from "@/features/anomaly/AnomalyList";
import { AppNotification } from "@/shared/ui/AppNotification/app-notification";
import { useState } from "react";

export default function MonitoringPage() {
  const {
    data: anomalies = [],
    isLoading,
    isError,
    error,
  } = useAnomaliesQuery();
  const captureMutation = useCaptureAnomalyMutation();
  const [showError, setShowError] = useState(false);

  const handleCapture = (id: string) => {
    captureMutation.mutate(id);
  };

  if (captureMutation.isError) {
    if (!showError) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  }

  if (isLoading) return <div>Loading anomalies...</div>;
  if (isError) return <div>Error: {(error as Error)?.message}</div>;

  return (
    <div>
      <h1>Yokai Monitoring Dashboard</h1>
      {showError && (
        <AppNotification
          message={captureMutation.error?.message || "Failed to capture spirit"}
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
