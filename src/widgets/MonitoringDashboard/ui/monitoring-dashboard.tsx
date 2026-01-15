import Link from "next/link";

import { AnomalyList } from "@/features/anomaly/AnomalyList";
import { AppNotification } from "@/shared/ui/AppNotification/app-notification";

import { IMonitoringDashboardProps } from "../model/types/types";

import styles from "./monitoringDashboard.module.scss";

export const MonitoringDashboard = ({
  anomalies,
  isLoading,
  isError,
  error,
  showError,
  captureMutation,
  handleCapture,
  setShowError,
}: IMonitoringDashboardProps) => {
  if (isLoading) {
    return <div className={styles.containerLoading}>Loading anomalies...</div>;
  }

  if (isError) {
    return (
      <div className={styles.container}>Error: {(error as Error)?.message}</div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.backButtonWrapper}>
        <Link href="/" className={styles.backButton}>
          ← Back to Home
        </Link>
      </div>

      <header>
        <h1>Yokai Monitoring Dashboard</h1>
      </header>

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
};
