import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useGenerateImportPdfMutation = ({ onSuccess, onError }) => {
  const { mutate, status, data } = useMutation({
    mutationFn: async (data) => {
      return await AxiosInstance.get(
        `/invoice-import/generate-pdf/${data.id}`,
        {
          responseType: 'blob',
        },
      );
    },
    onSuccess,
    onError,
  });

  return { mutate, status, data };
};