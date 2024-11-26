import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useLoginMutation = ({ onSuccess, onError }) => {
  const { mutate } = useMutation({
    mutationFn: async ({ username, password }) => {
      return await AxiosInstance.post('/login', {
        username,
        password,
      });
    },
    onSuccess,
    onError,
  });

  return { mutate };
};
