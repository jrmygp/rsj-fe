import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useUpdateSuratJalanMutation = ({ onSuccess, onError }) => {
  const { mutate, status } = useMutation({
    mutationFn: async (data) => {
      return await AxiosInstance.patch(`/surat-jalan/${data.id}`, {
        ...data,
      });
    },
    onSuccess,
    onError,
  });

  return { mutate, status };
};
