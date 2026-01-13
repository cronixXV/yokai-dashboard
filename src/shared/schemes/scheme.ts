import { z } from "zod";
import { ANOMALY_STATUSES, THREAT_LEVELS } from "../lib/anomaly";

export const AnomalySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Name is required"),
  threatLevel: z.enum(THREAT_LEVELS),
  location: z.string().min(1, "Location is required"),
  status: z.enum(ANOMALY_STATUSES),
});

export type Anomaly = z.infer<typeof AnomalySchema>;

export const AnomaliesResponseSchema = z.array(AnomalySchema);
