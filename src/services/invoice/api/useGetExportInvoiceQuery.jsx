import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useGetExportInvoiceQuery = (search, page, filter) => {
  const { data, status, refetch } = useQuery({
    queryKey: ['invoice-export'],
    queryFn: async () => {
      return await AxiosInstance.post(
        `/invoice-export/pagination?search=${search}&page=${page}`,
        filter,
      );
    },
  });
  return { data, status, refetch };
};
