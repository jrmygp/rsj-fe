import { useGetUserQuery } from '../api/useGetUserQuery';

export const useGetUser = () => {
  const {
    data: userData,
    status: userStatus,
    refetch: userRefetch,
  } = useGetUserQuery();

  return {
    userData,
    userStatus,
    userRefetch,
  };
};
