import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useGetAllQuotationQuery = () => {
  const { data, status } = useQuery({
    queryKey: ['all-quotation'],
    queryFn: async () => {
      return await AxiosInstance.get(`/quotation/no-pagination`);
    },
  });
  return { data, status };
};
