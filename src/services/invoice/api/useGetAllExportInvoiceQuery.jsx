import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useGetAllExportInvoiceQuery = () => {
  const { data, status } = useQuery({
    queryKey: ['all-invoice'],
    queryFn: async () => {
      return await AxiosInstance.post(`/invoice-export/pagination`, {
        customerId: 0,
      });
    },
  });
  return { data, status };
};
