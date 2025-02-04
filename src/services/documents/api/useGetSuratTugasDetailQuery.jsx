import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useGetSuratTugasDetailQuery = (id) => {
  const { data, status, refetch } = useQuery({
    queryKey: ['detail-surat-tugas'],
    queryFn: async () => {
      return await AxiosInstance.get(`/surat-tugas/${id}`);
    },
  });
  return { data, status, refetch };
};
