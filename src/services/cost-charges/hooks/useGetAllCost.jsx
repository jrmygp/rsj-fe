import { useGetCostQuery } from '../api/useGetCostQuery';
import { useGetAllCostQuery } from '../api/useGetAllCostQuery';

export const useGetAllCost = () => {
  const {
    data: costData,
    status: costStatus,
    refetch: costRefetch,
  } = useGetAllCostQuery();

  return {
    costData,
    costStatus,
    costRefetch,
  };
};
