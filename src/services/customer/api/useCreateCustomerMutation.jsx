import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useCreateCustomerMutation = ({ onSuccess, onError }) => {
  const { mutate, status } = useMutation({
    mutationFn: async ({ name, address }) => {
      return await AxiosInstance.post('/master-data/customer', {
        name,
        address,
      });
    },
    onSuccess,
    onError,
  });

  return { mutate, status };
};
