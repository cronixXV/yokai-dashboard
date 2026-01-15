import { useState } from "react";

import {
  useAnomaliesQuery,
  useAnomaliesSSE,
  useCaptureAnomalyMutation,
} from "@/entities/Anomaly";

export const useMonitoringDashboard = () => {
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

  return {
    anomalies,
    isLoading,
    isError,
    error,
    showError,
    captureMutation,
    handleCapture,
    setShowError,
  };
};
