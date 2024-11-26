import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useUpdatePortMutation = ({ onSuccess, onError }) => {
  const { mutate, status } = useMutation({
    mutationFn: async ({ portName, note, status, portId }) => {
      return await AxiosInstance.patch(`/master-data/port/${portId}`, {
        portName,
        note,
        status,
      });
    },
    onSuccess,
    onError,
  });

  return { mutate, status };
};
