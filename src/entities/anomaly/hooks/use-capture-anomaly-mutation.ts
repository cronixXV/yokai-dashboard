import { Anomaly } from "@/shared/schemes/scheme";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { captureAnomalyApi } from "../api/capture-anomaly-api";

const ANOMALIES_QUERY_KEY = ["anomalies"];

export const useCaptureAnomalyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: captureAnomalyApi,

    // Optimistic update
    onMutate: async (id) => {
      // Отменяем исходящие запросы (refetches)
      await queryClient.cancelQueries({ queryKey: ANOMALIES_QUERY_KEY });

      // Сохраняем предыдущее состояние
      const previousAnomalies =
        queryClient.getQueryData<Anomaly[]>(ANOMALIES_QUERY_KEY);

      // Обновляем локально: меняем статус на "Captured"
      queryClient.setQueryData<Anomaly[]>(ANOMALIES_QUERY_KEY, (old) => {
        if (!old) return old;
        return old.map((anomaly) =>
          anomaly.id === id ? { ...anomaly, status: "Captured" } : anomaly
        );
      });

      // Возвращаем контекст для отката
      return { previousAnomalies };
    },

    //  Откат при ошибке
    onError: (error, id, context) => {
      // Восстанавливаем предыдущее состояние
      queryClient.setQueryData(ANOMALIES_QUERY_KEY, context?.previousAnomalies);
      // Ошибка будет обработана на уровне UI (через isError + error.message)
    },

    //  Успешное обновление (опционально)
    onSuccess: (updatedAnomaly) => {
      // Фактически, данные уже обновлены оптимистично,
      // но можно принудительно обновить, если сервер вернул что-то новое
      queryClient.setQueryData<Anomaly[]>(ANOMALIES_QUERY_KEY, (old) => {
        if (!old) return old;
        return old.map((a) =>
          a.id === updatedAnomaly.id ? updatedAnomaly : a
        );
      });
    },
  });
};
