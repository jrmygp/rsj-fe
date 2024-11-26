import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useGetQuotationQuery = (search, page) => {
  const { data, status, refetch } = useQuery({
    queryKey: ['quotation'],
    queryFn: async () => {
      return await AxiosInstance.get(
        `/quotation?search=${search}&page=${page}`,
      );
    },
  });
  return { data, status, refetch };
};
