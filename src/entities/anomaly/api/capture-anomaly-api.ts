import { AxiosError } from "axios";
import { AnomalySchema } from "@/shared/schemes/scheme";
import { apiClient } from "@/shared/api/instance";

export const captureAnomalyApi = async (id: string) => {
  try {
    const res = await apiClient.post("/api/anomalies/capture", { id });
    return AnomalySchema.parse(res.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.error || "Capture failed";
      throw new Error(message);
    }
    throw new Error("Network error");
  }
};
