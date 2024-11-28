import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useUpdateQuotationMutation = ({ onSuccess, onError }) => {
  const { mutate, status } = useMutation({
    mutationFn: async (data) => {
      return await AxiosInstance.patch(`/quotation/${data.id}`, {
        ...data,
      });
    },
    onSuccess,
    onError,
  });

  return { mutate, status };
};
