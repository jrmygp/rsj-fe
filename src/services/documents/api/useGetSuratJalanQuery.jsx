import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useGetSuratJalanQuery = (search, page) => {
  const { data, status, refetch } = useQuery({
    queryKey: ['surat-jalan'],
    queryFn: async () => {
      return await AxiosInstance.post(
        `/surat-jalan/pagination?search=${search}&page=${page}`,
      );
    },
  });
  return { data, status, refetch };
};
