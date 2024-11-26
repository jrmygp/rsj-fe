import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

export const useGetUserQuery = () => {
  const { data, status, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      return await AxiosInstance.get(`/user`);
    },
    retry: false,
  });

  return {
    data,
    status,
    refetch,
  };
};
