import { useGetAllShipperQuery } from '../api/useGetAllShipperQuery';

export const useGetAllShipper = () => {
  const {
    data: shipperData,
    status: shipperStatus,
    refetch,
  } = useGetAllShipperQuery();

  return {
    shipperData,
    shipperStatus,
    refetch,
  };
};
