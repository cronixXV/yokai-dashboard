import { Anomaly } from "@/shared/schemes/scheme";

export const getThreatColor = (level: Anomaly["threatLevel"]) => {
  switch (level) {
    case "Critical":
      return "critical";
    case "High":
      return "high";
    case "Medium":
      return "medium";
    default:
      return "low";
  }
};
