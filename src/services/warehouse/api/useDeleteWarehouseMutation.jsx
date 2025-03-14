import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useDeleteWarehouseMutation = ({ onSuccess, onError }) => {
  const { mutate, status } = useMutation({
    mutationFn: async ({ warehouseId }) => {
      return await AxiosInstance.delete(
        `/master-data/warehouse/${warehouseId}`,
      );
    },
    onSuccess,
    onError,
  });

  return { mutate, status };
};
