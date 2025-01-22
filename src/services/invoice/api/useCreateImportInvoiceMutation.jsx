import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useCreateImportInvoiceMutation = ({ onSuccess, onError }) => {
  const { mutate, status } = useMutation({
    mutationFn: async (data) => {
      return await AxiosInstance.post('/invoice-import', {
        ...data,
      });
    },
    onSuccess,
    onError,
  });

  return { mutate, status };
};
