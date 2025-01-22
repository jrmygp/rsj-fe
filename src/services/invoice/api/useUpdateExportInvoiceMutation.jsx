import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useUpdateExportInvoiceMutation = ({ onSuccess, onError }) => {
  const { mutate, status } = useMutation({
    mutationFn: async (data) => {
      return await AxiosInstance.patch(`/invoice-export/${data.id}`, {
        ...data,
      });
    },
    onSuccess,
    onError,
  });

  return { mutate, status };
};
