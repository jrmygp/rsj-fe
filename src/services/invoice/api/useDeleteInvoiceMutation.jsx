import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useDeleteInvoiceMutation = ({ onSuccess, onError }) => {
  const { mutate, status } = useMutation({
    mutationFn: async (data) => {
      return await AxiosInstance.delete(`/invoice/${data.id}`);
    },
    onSuccess,
    onError,
  });

  return { mutate, status };
};
