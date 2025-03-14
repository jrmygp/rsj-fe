import { useGetWarehouseQuery } from '../api/useGetWarehouseQuery';

export const useGetWarehouse = (search, page) => {
  const shouldFetch = page !== undefined && page !== null;

  const {
    data: warehouseData,
    status: warehouseStatus,
    refetch: warehouseRefetch,
  } = useGetWarehouseQuery(search, shouldFetch ? page : 1, {
    enabled: shouldFetch,
  });

  return {
    warehouseData,
    warehouseStatus,
    warehouseRefetch,
  };
};
