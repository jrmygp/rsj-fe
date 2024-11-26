import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useGetCostQuery = (search, page) => {
  const { data, status, refetch } = useQuery({
    queryKey: ['cost', search, page],
    queryFn: async () => {
      return await AxiosInstance.get(
        `/master-data/cost-charges?search=${search}&page=${page}`,
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
