import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useGetAllImportInvoiceQuery = () => {
  const { data, status } = useQuery({
    queryKey: ['all-invoice-import'],
    queryFn: async () => {
      return await AxiosInstance.post(`/invoice-import/pagination`, {
        customerId: 0,
      });
    },
  });
  return { data, status };
};
