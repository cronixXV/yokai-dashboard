"use client";

import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { Anomaly } from "@/shared/schemes/scheme";

const ANOMALIES_QUERY_KEY = ["anomalies"];
const RECONNECT_DELAY = 2000;

export const useAnomaliesSSE = () => {
  const queryClient = useQueryClient();
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const connect = () => {
    if (typeof window === "undefined") return;

    const eventSource = new EventSource("/api/anomalies/stream");
    eventSourceRef.current = eventSource;

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
      console.warn(
        "SSE connection lost. Reconnecting in",
        RECONNECT_DELAY / 1000,
        "s..."
      );
      cleanup();
      reconnectTimeoutRef.current = setTimeout(connect, RECONNECT_DELAY);
    };
  };

  const cleanup = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    connect();

    return () => {
      cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
