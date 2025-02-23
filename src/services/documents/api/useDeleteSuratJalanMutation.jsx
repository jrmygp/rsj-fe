import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useDeleteSuratJalanMutation = ({ onSuccess, onError }) => {
  const { mutate, status } = useMutation({
    mutationFn: async (data) => {
      return await AxiosInstance.delete(`/surat-jalan/${data.id}`);
    },
    onSuccess,
    onError,
  });

  return { mutate, status };
};
