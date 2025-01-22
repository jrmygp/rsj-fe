import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useGetImportInvoiceQuery = (search, page, filter) => {
  const { data, status, refetch } = useQuery({
    queryKey: ['invoice-import'],
    queryFn: async () => {
      return await AxiosInstance.post(
        `/invoice-import/pagination?search=${search}&page=${page}`,
        filter,
      );
    },
  });
  return { data, status, refetch };
};
