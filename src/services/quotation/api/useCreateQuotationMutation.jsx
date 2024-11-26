import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useCreateQuotationMutation = ({ onSuccess, onError }) => {
  const { mutate, status } = useMutation({
    mutationFn: async (data) => {
      return await AxiosInstance.post('/quotation', {
        ...data,
      });
    },
    onSuccess,
    onError,
  });

  return { mutate, status };
};
