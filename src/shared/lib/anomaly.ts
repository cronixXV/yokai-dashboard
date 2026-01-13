export const THREAT_LEVELS = ["Low", "Medium", "High", "Critical"] as const;
export type ThreatLevel = (typeof THREAT_LEVELS)[number];

export const ANOMALY_STATUSES = ["Active", "Captured"] as const;
export type AnomalyStatus = (typeof ANOMALY_STATUSES)[number];
