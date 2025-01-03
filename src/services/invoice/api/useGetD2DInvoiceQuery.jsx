import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useGetD2DInvoiceQuery = (search, page, filter) => {
  const { data, status, refetch } = useQuery({
    queryKey: ['invoice-d2d'],
    queryFn: async () => {
      return await AxiosInstance.post(
        `/door-to-door/pagination?search=${search}&page=${page}`,
        filter,
      );
    },
  });
  return { data, status, refetch };
};
