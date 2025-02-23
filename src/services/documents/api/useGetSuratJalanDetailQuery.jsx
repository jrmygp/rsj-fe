import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useGetSuratJalanDetailQuery = (id) => {
  const { data, status, refetch } = useQuery({
    queryKey: ['detail-surat-jalan'],
    queryFn: async () => {
      return await AxiosInstance.get(`/surat-jalan/${id}`);
    },
  });
  return { data, status, refetch };
};
