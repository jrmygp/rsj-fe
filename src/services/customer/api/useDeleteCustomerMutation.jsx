import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useDeleteCustomerMutation = ({ onSuccess, onError }) => {
  const { mutate, status } = useMutation({
    mutationFn: async ({ customerId }) => {
      return await AxiosInstance.delete(`/master-data/customer/${customerId}`);
    },
    onSuccess,
    onError,
  });

  return { mutate, status };
};
