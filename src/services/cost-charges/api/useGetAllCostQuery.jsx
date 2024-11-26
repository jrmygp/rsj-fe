import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useGetAllCostQuery = () => {
  const { data, status, refetch } = useQuery({
    queryKey: ['all-cost'],
    queryFn: async () => {
      return await AxiosInstance.get(`/master-data/cost-charges/no-pagination`);
    },
    retry: false,
  });

  return {
    data,
    status,
    refetch,
  };
};
