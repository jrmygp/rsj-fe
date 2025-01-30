import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useGenerateSuratTugasPDFMutation = ({ onSuccess, onError }) => {
  const { mutate, status, data } = useMutation({
    mutationFn: async (data) => {
      return await AxiosInstance.get(`/surat-tugas/generate-pdf/${data.id}`, {
        responseType: 'blob',
      });
    },
    onSuccess,
    onError,
  });

  return { mutate, status, data };
};
