import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useGetAllPortQuery = () => {
  const { data, status, refetch } = useQuery({
    queryKey: ['all-port'],
    queryFn: async () => {
      return await AxiosInstance.get(`/master-data/port/no-pagination`);
    },
    retry: false,
  });

  return {
    data,
    status,
    refetch,
  };
};
