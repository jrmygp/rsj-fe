import { useGetAllCustomerQuery } from '../api/useGetAllCustomerQuery';

export const useGetAllCustomer = () => {
  const {
    data: customerData,
    status: customerStatus,
    refetch: customerRefetch,
  } = useGetAllCustomerQuery();

  return {
    customerData,
    customerStatus,
    customerRefetch,
  };
};
