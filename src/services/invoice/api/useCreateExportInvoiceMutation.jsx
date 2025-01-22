import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useCreateExportInvoiceMutation = ({ onSuccess, onError }) => {
  const { mutate, status } = useMutation({
    mutationFn: async (data) => {
      return await AxiosInstance.post('/invoice-export', {
        ...data,
      });
    },
    onSuccess,
    onError,
  });

  return { mutate, status };
};
