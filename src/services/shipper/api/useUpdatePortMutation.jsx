import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useUpdateShipperMutation = ({ onSuccess, onError }) => {
  const { mutate, status } = useMutation({
    mutationFn: async ({ name, address, shipperId }) => {
      return await AxiosInstance.patch(`/master-data/shipper/${shipperId}`, {
        name,
        address,
      });
    },
    onSuccess,
    onError,
  });

  return { mutate, status };
};
