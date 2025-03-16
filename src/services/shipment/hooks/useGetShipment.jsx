import { useGetShipmentQuery } from '../api/useGetShipmentQuery';

export const useGetShipment = (search, page = 1) => {
  const {
    data: shipmentData,
    status: shipmentStatus,
    refetch,
  } = useGetShipmentQuery(search, page);
  return {
    shipmentData,
    shipmentStatus,
    refetch,
  };
};
