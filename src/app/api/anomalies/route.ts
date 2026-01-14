import { getAnomalies } from "@/shared/lib/in-memory-store";

import { AnomaliesResponseSchema } from "@/shared/schemes/scheme";
import { NextResponse } from "next/server";

const anomalies = getAnomalies();

export async function GET() {
  try {
    const validated = AnomaliesResponseSchema.parse(anomalies);
    return NextResponse.json(validated);
  } catch (error) {
    console.error("Validation error in GET /anomalies:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export { anomalies };
