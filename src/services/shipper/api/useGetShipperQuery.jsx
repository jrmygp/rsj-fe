import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useGetShipperQuery = (search, page) => {
  const { data, status, refetch } = useQuery({
    queryKey: ['shipper', search, page],
    queryFn: async () => {
      return await AxiosInstance.get(
        `/master-data/shipper?search=${search}&page=${page}`,
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
