import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useGetInvoiceDetailQuery = (id) => {
  const { data, status, refetch } = useQuery({
    queryKey: ['detail-invoice'],
    queryFn: async () => {
      return await AxiosInstance.get(`/invoice/${id}`);
    },
  });
  return { data, status, refetch };
};
