import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useGetCustomerQuery = (search, page) => {
  const { data, status, refetch } = useQuery({
    queryKey: ['customer', search, page],
    queryFn: async () => {
      return await AxiosInstance.get(
        `/master-data/customer?search=${search}&page=${page}`,
      );
    },
    retry: false,
  });

  return {
    data,
    status,
    refetch,
  };
};
