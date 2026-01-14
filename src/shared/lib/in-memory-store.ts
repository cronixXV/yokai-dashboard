import { Anomaly } from "@/shared/schemes/scheme";
import { generateMockAnomalies } from "../mocks/mock-utils";

const store = {
  anomalies: generateMockAnomalies(6),
};

export const getAnomalies = (): Anomaly[] => store.anomalies;
export const setAnomalies = (anomalies: Anomaly[]) => {
  store.anomalies = anomalies;
};
export const findAnomalyById = (id: string): Anomaly | undefined => {
  return store.anomalies.find((a) => a.id === id);
};
export const updateAnomalyStatus = (
  id: string,
  status: "Active" | "Captured"
) => {
  store.anomalies = store.anomalies.map((a) =>
    a.id === id ? { ...a, status } : a
  );
};

export const updateAnomalyField = (
  id: string,
  updateFn: (a: Anomaly) => Anomaly
) => {
  store.anomalies = store.anomalies.map((a) => (a.id === id ? updateFn(a) : a));
};
