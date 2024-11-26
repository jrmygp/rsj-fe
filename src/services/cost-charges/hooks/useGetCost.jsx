import { useGetCostQuery } from '../api/useGetCostQuery';

export const useGetCost = (search = '', page) => {
  const shouldFetch = page !== undefined && page !== null;

  const {
    data: costData,
    status: costStatus,
    refetch: costRefetch,
  } = useGetCostQuery(search, shouldFetch ? page : 1, {
    enabled: shouldFetch,
  });

  return {
    costData,
    costStatus,
    costRefetch,
  };
};
