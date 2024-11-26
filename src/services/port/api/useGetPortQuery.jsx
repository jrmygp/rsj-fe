import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useGetPortQuery = (search, page) => {
  const { data, status, refetch } = useQuery({
    queryKey: ['port', search, page],
    queryFn: async () => {
      return await AxiosInstance.get(
        `/master-data/port?search=${search}&page=${page}`,
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
