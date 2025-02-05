import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useCreateSuratTugasMutation = ({ onSuccess, onError }) => {
  const { mutate, status } = useMutation({
    mutationFn: async (data) => {
      return await AxiosInstance.post('/surat-tugas', {
        ...data,
      });
    },
    onSuccess,
    onError,
  });

  return { mutate, status };
};
