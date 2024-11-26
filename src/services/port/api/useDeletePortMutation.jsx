import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useDeletePortMutation = ({ onSuccess, onError }) => {
  const { mutate, status } = useMutation({
    mutationFn: async ({ portId }) => {
      return await AxiosInstance.delete(`/master-data/port/${portId}`);
    },
    onSuccess,
    onError,
  });

  return { mutate, status };
};
