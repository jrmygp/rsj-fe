import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useDeleteImportInvoiceMutation = ({ onSuccess, onError }) => {
  const { mutate, status } = useMutation({
    mutationFn: async (data) => {
      return await AxiosInstance.delete(`/invoice-import/${data.id}`);
    },
    onSuccess,
    onError,
  });

  return { mutate, status };
};
