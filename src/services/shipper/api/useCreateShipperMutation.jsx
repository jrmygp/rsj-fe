import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useCreateShipperMutation = ({ onSuccess, onError }) => {
  const { mutate, status } = useMutation({
    mutationFn: async ({ name, address }) => {
      return await AxiosInstance.post('/master-data/shipper', {
        name,
        address,
      });
    },
    onSuccess,
    onError,
  });

  return { mutate, status };
};
