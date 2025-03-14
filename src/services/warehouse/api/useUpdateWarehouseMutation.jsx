import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useUpdateWarehouseMutation = ({ onSuccess, onError }) => {
  const { mutate, status } = useMutation({
    mutationFn: async (data, warehouseId) => {
      return await AxiosInstance.patch(
        `/master-data/port/${warehouseId}`,
        data,
      );
    },
    onSuccess,
    onError,
  });

  return { mutate, status };
};
