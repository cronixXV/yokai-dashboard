import { NextRequest, NextResponse } from "next/server";
import { anomalies } from "../route";
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

        if (anomalies.length === 0) return;

        const randomIndex = Math.floor(Math.random() * anomalies.length);
        const anomaly = anomalies[randomIndex];

        if (anomaly.status !== "Active") return;

        const newThreatLevel =
          THREAT_LEVELS[Math.floor(Math.random() * THREAT_LEVELS.length)];

        anomalies[randomIndex] = {
          ...anomaly,
          threatLevel: newThreatLevel,
        };

        const message = JSON.stringify({
          id: anomaly.id,
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
