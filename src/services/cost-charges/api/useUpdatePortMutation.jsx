import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useUpdateCostMutation = ({ onSuccess, onError }) => {
  const { mutate, status } = useMutation({
    mutationFn: async ({ name, status, costId }) => {
      return await AxiosInstance.patch(`/master-data/cost-charges/${costId}`, {
        name,
        status,
      });
    },
    onSuccess,
    onError,
  });

  return { mutate, status };
};
