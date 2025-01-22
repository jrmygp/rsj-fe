import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useGetImportInvoiceDetailQuery = (id) => {
  const { data, status, refetch } = useQuery({
    queryKey: ['detail-invoice-import'],
    queryFn: async () => {
      return await AxiosInstance.get(`/invoice-import/${id}`);
    },
  });
  return { data, status, refetch };
};
