import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useUpdateCustomerMutation = ({ onSuccess, onError }) => {
  const { mutate, status } = useMutation({
    mutationFn: async ({ name, address, customerId }) => {
      return await AxiosInstance.patch(`/master-data/customer/${customerId}`, {
        name,
        address,
      });
    },
    onSuccess,
    onError,
  });

  return { mutate, status };
};
