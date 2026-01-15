import { useMutation, useQueryClient } from "@tanstack/react-query";
import { captureAnomalyApi } from "../api/capture-anomaly-api";

import { Anomaly } from "@/shared/schemes/scheme";

const ANOMALIES_QUERY_KEY = ["anomalies"];

export const useCaptureAnomalyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: captureAnomalyApi,

    // Optimistic update
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ANOMALIES_QUERY_KEY });

      const previousAnomalies =
        queryClient.getQueryData<Anomaly[]>(ANOMALIES_QUERY_KEY);

      queryClient.setQueryData<Anomaly[]>(ANOMALIES_QUERY_KEY, (old) => {
        if (!old) return old;
        return old.map((anomaly) =>
          anomaly.id === id ? { ...anomaly, status: "Captured" } : anomaly
        );
      });

      return { previousAnomalies };
    },

    onError: (error, id, context) => {
      queryClient.setQueryData(ANOMALIES_QUERY_KEY, context?.previousAnomalies);
    },

    onSuccess: (updatedAnomaly) => {
      queryClient.setQueryData<Anomaly[]>(ANOMALIES_QUERY_KEY, (old) => {
        if (!old) return old;
        return old.map((a) =>
          a.id === updatedAnomaly.id ? updatedAnomaly : a
        );
      });
    },
  });
};
