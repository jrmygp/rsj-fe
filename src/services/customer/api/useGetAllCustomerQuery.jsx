import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useGetAllCustomerQuery = () => {
  const { data, status, refetch } = useQuery({
    queryKey: ['all-customer'],
    queryFn: async () => {
      return await AxiosInstance.get(`/master-data/customer/no-pagination`);
    },
    retry: false,
  });

  return {
    data,
    status,
    refetch,
  };
};
