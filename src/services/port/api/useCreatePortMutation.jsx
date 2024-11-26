import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useCreatePortMutation = ({ onSuccess, onError }) => {
  const { mutate, status } = useMutation({
    mutationFn: async ({ portName, note, status }) => {
      return await AxiosInstance.post('/master-data/port', {
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
