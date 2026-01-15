import { Anomaly } from "@/shared/schemes/scheme";

export interface IAnomalyCardProps {
  anomaly: Anomaly;
  onCapture: (id: string) => void;
  isCapturing: boolean;
}
