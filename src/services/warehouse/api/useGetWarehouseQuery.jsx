import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useGetWarehouseQuery = (search, page) => {
  const { data, status, refetch } = useQuery({
    queryKey: ['warehouse', search, page],
    queryFn: async () => {
      return await AxiosInstance.get(
        `/master-data/warehouse?search=${search}&page=${page}`,
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
