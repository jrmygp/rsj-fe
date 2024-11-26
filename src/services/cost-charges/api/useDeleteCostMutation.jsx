import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useDeleteCostMutation = ({ onSuccess, onError }) => {
  const { mutate, status } = useMutation({
    mutationFn: async ({ costId }) => {
      return await AxiosInstance.delete(`/master-data/cost-charges/${costId}`);
    },
    onSuccess,
    onError,
  });

  return { mutate, status };
};
