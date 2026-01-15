"use client";

import { useMonitoringDashboard } from "@/widgets/MonitoringDashboard";
import { MonitoringDashboard } from "@/widgets/MonitoringDashboard";

export default function MonitoringPage() {
  const props = useMonitoringDashboard();

  return <MonitoringDashboard {...props} />;
}
