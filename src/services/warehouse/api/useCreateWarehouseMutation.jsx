import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useCreateWarehouseMutation = ({ onSuccess, onError }) => {
  const { mutate, status } = useMutation({
    mutationFn: async (data) => {
      return await AxiosInstance.post('/master-data/warehouse', data);
    },
    onSuccess,
    onError,
  });

  return { mutate, status };
};
