import { NextRequest, NextResponse } from "next/server";

import { getAnomalies, updateAnomalyField } from "@/shared/lib/in-memory-store";
import { THREAT_LEVELS } from "@/shared/lib/anomaly";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();
      let intervalId: NodeJS.Timeout | null = null;
      let timeoutId: NodeJS.Timeout | null = null;
      let isClosed = false;

      const sendUpdate = () => {
        if (
          isClosed ||
          controller.desiredSize === null ||
          controller.desiredSize <= 0
        ) {
          return;
        }

        const anomalies = getAnomalies();
        if (anomalies.length === 0) return;

        const activeAnomalies = anomalies.filter((a) => a.status === "Active");
        if (activeAnomalies.length === 0) return;

        const randomAnomaly =
          activeAnomalies[Math.floor(Math.random() * activeAnomalies.length)];
        const newThreatLevel =
          THREAT_LEVELS[Math.floor(Math.random() * THREAT_LEVELS.length)];

        updateAnomalyField(randomAnomaly.id, (a) => ({
          ...a,
          threatLevel: newThreatLevel,
        }));

        const message = JSON.stringify({
          id: randomAnomaly.id,
          threatLevel: newThreatLevel,
        });

        try {
          controller.enqueue(encoder.encode(`data: ${message}\n\n`));
        } catch (err) {
          console.warn("Failed to enqueue SSE message:", err);
          cleanup();
        }
      };

      const cleanup = () => {
        if (isClosed) return;
        isClosed = true;
        if (intervalId) clearInterval(intervalId);
        if (timeoutId) clearTimeout(timeoutId);
        try {
          controller.close();
        } catch (err) {
          console.warn("Failed to close SSE connection:", err);
        }
      };

      timeoutId = setTimeout(() => {
        if (isClosed) return;
        sendUpdate();
        intervalId = setInterval(() => {
          if (!isClosed) sendUpdate();
        }, 5000);
      }, 1000);

      const abortController = request.signal;
      abortController.onabort = () => {
        console.log("SSE client disconnected");
        cleanup();
      };

      return cleanup;
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
