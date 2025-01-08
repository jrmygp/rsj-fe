import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useCreateCustomerMutation = ({ onSuccess, onError }) => {
  const { mutate, status } = useMutation({
    mutationFn: async ({ name, address, companyCode }) => {
      return await AxiosInstance.post('/master-data/customer', {
        name,
        address,
        companyCode,
      });
    },
    onSuccess,
    onError,
  });

  return { mutate, status };
};
