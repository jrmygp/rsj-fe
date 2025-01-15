import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useDeleteShipperMutation = ({ onSuccess, onError }) => {
  const { mutate, status } = useMutation({
    mutationFn: async ({ shipperId }) => {
      return await AxiosInstance.delete(`/master-data/shipper/${shipperId}`);
    },
    onSuccess,
    onError,
  });

  return { mutate, status };
};
