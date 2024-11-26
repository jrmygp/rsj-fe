import { useGetCustomerQuery } from '../api/useGetCustomerQuery';

export const useGetCustomer = (search = '', page) => {
  const shouldFetch = page !== undefined && page !== null;

  const {
    data: customerData,
    status: customerStatus,
    refetch: customerRefetch,
  } = useGetCustomerQuery(search, shouldFetch ? page : 1, {
    enabled: shouldFetch,
  });

  return {
    customerData,
    customerStatus,
    customerRefetch,
  };
};
