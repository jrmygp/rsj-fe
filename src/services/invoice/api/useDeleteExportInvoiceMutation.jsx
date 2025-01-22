import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useDeleteExportInvoiceMutation = ({ onSuccess, onError }) => {
  const { mutate, status } = useMutation({
    mutationFn: async (data) => {
      return await AxiosInstance.delete(`/invoice-export/${data.id}`);
    },
    onSuccess,
    onError,
  });

  return { mutate, status };
};
