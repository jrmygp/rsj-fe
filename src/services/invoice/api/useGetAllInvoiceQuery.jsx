import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useGetAllInvoiceQuery = () => {
  const { data, status } = useQuery({
    queryKey: ['all-invoice'],
    queryFn: async () => {
      return await AxiosInstance.post(`/invoice/pagination`, {
        customerId: 0,
      });
    },
  });
  return { data, status };
};
