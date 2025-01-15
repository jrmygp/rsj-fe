import { useGetShipperQuery } from '../api/useGetShipperQuery';

export const useGetShipper = (search, page) => {
  const shouldFetch = page !== undefined && page !== null;

  const {
    data: shipperData,
    status: shipperStatus,
    refetch: shipperRefetch,
  } = useGetShipperQuery(search, shouldFetch ? page : 1, {
    enabled: shouldFetch,
  });

  return {
    shipperData,
    shipperStatus,
    shipperRefetch,
  };
};
