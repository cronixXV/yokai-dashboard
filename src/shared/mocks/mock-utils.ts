import { randomUUID } from "crypto";

import { THREAT_LEVELS } from "../lib/anomaly";
import { Anomaly } from "../schemes/scheme";

const TOKYO_DISTRICTS = [
  "Shibuya",
  "Shinjuku",
  "Akihabara",
  "Asakusa",
  "Roppongi",
  "Ueno",
  "Ikebukuro",
  "Ginza",
  "Odaiba",
  "Harajuku",
];

const YOKAI_NAMES = [
  "Kitsune",
  "Tengu",
  "Oni",
  "Nurikabe",
  "Kappa",
  "Yuki-onna",
  "Rokurokubi",
  "Tanuki",
  "Jorōgumo",
  "Futakuchi-onna",
];

export const generateMockAnomalies = (count = 8): Anomaly[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: randomUUID(),
    name: YOKAI_NAMES[i % YOKAI_NAMES.length],
    threatLevel:
      THREAT_LEVELS[Math.floor(Math.random() * THREAT_LEVELS.length)],
    location:
      TOKYO_DISTRICTS[Math.floor(Math.random() * TOKYO_DISTRICTS.length)],
    status: "Active" as const,
  }));
};
