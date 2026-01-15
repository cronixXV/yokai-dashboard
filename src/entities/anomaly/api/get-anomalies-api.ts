import { AxiosError } from "axios";

import { AnomaliesResponseSchema } from "@/shared/schemes/scheme";
import { apiClient } from "@/shared/api/instance";

export const getAnomaliesApi = async () => {
  try {
    const res = await apiClient.get("/api/anomalies");
    return AnomaliesResponseSchema.parse(res.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      const message =
        error.response?.data?.error || "Failed to fetch anomalies";
      throw new Error(message);
    }

    throw new Error("Network error");
  }
};
