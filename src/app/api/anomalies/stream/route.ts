import { NextResponse } from "next/server";

import { THREAT_LEVELS } from "@/shared/lib/anomaly";
import { anomalies } from "../route";

export const runtime = "nodejs";

export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();

      const sendUpdate = () => {
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

        controller.enqueue(encoder.encode(`data: ${message}\n\n`));
      };

      setTimeout(() => {
        sendUpdate();

        const interval = setInterval(sendUpdate, 5000);

        const timer = setTimeout(() => {
          clearInterval(interval);
          controller.close();
        }, 60_000);
      }, 1000);
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
