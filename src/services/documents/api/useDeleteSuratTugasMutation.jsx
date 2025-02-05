import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useDeleteSuratTugasMutation = ({ onSuccess, onError }) => {
  const { mutate, status } = useMutation({
    mutationFn: async (data) => {
      return await AxiosInstance.delete(`/surat-tugas/${data.id}`);
    },
    onSuccess,
    onError,
  });

  return { mutate, status };
};
