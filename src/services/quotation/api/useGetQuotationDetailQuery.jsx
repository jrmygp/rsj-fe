import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useGetQuotationDetailQuery = (id) => {
  const { data, status, refetch } = useQuery({
    queryKey: ['detail-quotation'],
    queryFn: async () => {
      return await AxiosInstance.get(`/quotation/${id}`);
    },
  });
  return { data, status, refetch };
};
