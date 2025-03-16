import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useGetShipmentQuery = (search, page) => {
  const { data, status, refetch } = useQuery({
    queryKey: ['shipment'],
    queryFn: async () => {
      return await AxiosInstance.get(
        `/shipment/pagination?search=${search}&page=${page}`,
      );
    },
  });
  return { data, status, refetch };
};
