import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useUpdateInvoiceMutation = ({ onSuccess, onError }) => {
  const { mutate, status } = useMutation({
    mutationFn: async (data) => {
      return await AxiosInstance.patch('/invoice', {
        ...data,
      });
    },
    onSuccess,
    onError,
  });

  return { mutate, status };
};
