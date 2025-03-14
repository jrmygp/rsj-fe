import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useGetAllWarehouseQuery = () => {
  const { data, status, refetch } = useQuery({
    queryKey: ['all-warehouse'],
    queryFn: async () => {
      return await AxiosInstance.get(`/master-data/warehouse/no-pagination`);
    },
    retry: false,
  });

  return {
    data,
    status,
    refetch,
  };
};
