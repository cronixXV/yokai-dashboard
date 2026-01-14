"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Anomaly } from "@/shared/schemes/scheme";

const ANOMALIES_QUERY_KEY = ["anomalies"];

export const useAnomaliesSSE = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const connect = () => {
      const eventSource = new EventSource("/api/anomalies/stream");

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          const { id, threatLevel } = data;

          if (typeof id === "string" && typeof threatLevel === "string") {
            queryClient.setQueryData<Anomaly[]>(ANOMALIES_QUERY_KEY, (old) => {
              if (!old) return old;
              return old.map((anomaly) =>
                anomaly.id === id
                  ? {
                      ...anomaly,
                      threatLevel: threatLevel as Anomaly["threatLevel"],
                    }
                  : anomaly
              );
            });
          }
        } catch (e) {
          console.error("Failed to parse SSE message:", e);
        }
      };

      eventSource.onerror = () => {
        console.warn("SSE connection lost. Reconnecting in 2s...");
        eventSource.close();
        setTimeout(connect, 2000);
      };

      return () => {
        eventSource.close();
      };
    };

    connect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
