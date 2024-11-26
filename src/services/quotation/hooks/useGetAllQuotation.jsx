import { useGetAllQuotationQuery } from '../api/useGetAllQuotationQuery';

export const useGetAllQuotation = () => {
  const { data: quotationData, status: quotationStatus } =
    useGetAllQuotationQuery();
  return {
    quotationData,
    quotationStatus,
  };
};
