import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useUpdateImportInvoiceMutation = ({ onSuccess, onError }) => {
  const { mutate, status } = useMutation({
    mutationFn: async (data) => {
      return await AxiosInstance.patch(`/invoice-import/${data.id}`, {
        ...data,
      });
    },
    onSuccess,
    onError,
  });

  return { mutate, status };
};
