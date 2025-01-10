import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useGetD2DInvoiceDetailQuery = (id) => {
  const { data, status, refetch } = useQuery({
    queryKey: ['detail-invoice-d2d'],
    queryFn: async () => {
      return await AxiosInstance.get(`/door-to-door/${id}`);
    },
  });
  return { data, status, refetch };
};
