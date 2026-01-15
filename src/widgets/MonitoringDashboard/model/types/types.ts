import { UseMutationResult } from "@tanstack/react-query";

import { Anomaly } from "@/shared/schemes/scheme";

type CaptureMutation = UseMutationResult<Anomaly, Error, string, unknown>;

export interface IMonitoringDashboardProps {
  anomalies: Anomaly[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  showError: boolean;
  captureMutation: CaptureMutation;
  handleCapture: (id: string) => void;
  setShowError: (show: boolean) => void;
}
