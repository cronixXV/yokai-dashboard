import { useQuery } from "@tanstack/react-query";
import { getAnomaliesApi } from "../api/get-anomalies-api";

const ANOMALIES_QUERY_KEY = ["anomalies"];

export const useAnomaliesQuery = () => {
  return useQuery({
    queryKey: ANOMALIES_QUERY_KEY,
    queryFn: getAnomaliesApi,
    refetchOnWindowFocus: false,
    staleTime: 1000,
  });
};
