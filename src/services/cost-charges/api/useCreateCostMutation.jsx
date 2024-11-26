import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useCreateCostMutation = ({ onSuccess, onError }) => {
  const { mutate, status } = useMutation({
    mutationFn: async ({ name, status }) => {
      return await AxiosInstance.post('/master-data/cost-charges', {
        name,
        status,
      });
    },
    onSuccess,
    onError,
  });

  return { mutate, status };
};
