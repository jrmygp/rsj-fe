import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useGetInvoiceQuery = (search, page, filter) => {
  const { data, status, refetch } = useQuery({
    queryKey: ['invoice'],
    queryFn: async () => {
      return await AxiosInstance.post(
        `/invoice/pagination?search=${search}&page=${page}`,
        filter,
      );
    },
  });
  return { data, status, refetch };
};
