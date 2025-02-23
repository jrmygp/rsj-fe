import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useCreateSuratJalanMutation = ({ onSuccess, onError }) => {
  const { mutate, status } = useMutation({
    mutationFn: async (data) => {
      console.log(data);
      return await AxiosInstance.post('/surat-jalan', {
        ...data,
      });
    },
    onSuccess,
    onError,
  });

  return { mutate, status };
};
