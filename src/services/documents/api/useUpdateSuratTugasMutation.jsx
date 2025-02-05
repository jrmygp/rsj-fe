import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useUpdateSuratTugasMutation = ({ onSuccess, onError }) => {
  const { mutate, status } = useMutation({
    mutationFn: async (data) => {
      return await AxiosInstance.patch(`/surat-tugas/${data.id}`, {
        ...data,
      });
    },
    onSuccess,
    onError,
  });

  return { mutate, status };
};
