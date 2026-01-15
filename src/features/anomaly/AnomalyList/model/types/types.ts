import { Anomaly } from "@/shared/schemes/scheme";

export interface IAnomalyListProps {
  anomalies: Anomaly[];
  onCapture: (id: string) => void;
  capturingId: string | null;
}
