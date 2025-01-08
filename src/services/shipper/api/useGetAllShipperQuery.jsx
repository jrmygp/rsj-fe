import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useGetAllShipperQuery = () => {
  const { data, status, refetch } = useQuery({
    queryKey: ['all-shipper'],
    queryFn: async () => {
      return await AxiosInstance.get(`/master-data/shipper/no-pagination`);
    },
    retry: false,
  });

  return {
    data,
    status,
    refetch,
  };
};
