import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useDeleteD2DInvoiceMutation = ({ onSuccess, onError }) => {
  const { mutate, status } = useMutation({
    mutationFn: async (data) => {
      return await AxiosInstance.delete(`/door-to-door/${data.id}`);
    },
    onSuccess,
    onError,
  });

  return { mutate, status };
};
