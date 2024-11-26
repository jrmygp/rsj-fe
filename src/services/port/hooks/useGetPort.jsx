import { useGetPortQuery } from '../api/useGetPortQuery';

export const useGetPort = (search, page) => {
  const shouldFetch = page !== undefined && page !== null;

  const {
    data: portData,
    status: portStatus,
    refetch: portRefetch,
  } = useGetPortQuery(search, shouldFetch ? page : 1, {
    enabled: shouldFetch,
  });

  return {
    portData,
    portStatus,
    portRefetch,
  };
};
