import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import {
  findAnomalyById,
  updateAnomalyStatus,
} from "@/shared/lib/in-memory-store";
import { AnomalySchema } from "@/shared/schemes/scheme";

const CaptureBodySchema = z.object({
  id: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = CaptureBodySchema.parse(body);

    const anomaly = findAnomalyById(id);
    if (!anomaly || anomaly.status !== "Active") {
      return NextResponse.json(
        { error: "Anomaly not found or already captured" },
        { status: 404 }
      );
    }

    if (Math.random() < 0.3) {
      return NextResponse.json(
        { error: "Capture failed: spirit escaped!" },
        { status: 400 }
      );
    }

    updateAnomalyStatus(id, "Captured");

    const updated = AnomalySchema.parse({ ...anomaly, status: "Captured" });
    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    console.error("Unexpected error in POST /capture:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
