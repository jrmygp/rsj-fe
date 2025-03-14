import { useGetAllWarehouseQuery } from '../api/useGetAllWarehouseQuery';

export const useGetAllWarehouse = () => {
  const {
    data: warehouseData,
    status: warehouseStatus,
    refetch: warehouseRefetch,
  } = useGetAllWarehouseQuery();

  return {
    warehouseData,
    warehouseStatus,
    warehouseRefetch,
  };
};
