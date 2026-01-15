import { Anomaly } from "@/shared/schemes/scheme";
import { UseMutationResult } from "@tanstack/react-query";

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
