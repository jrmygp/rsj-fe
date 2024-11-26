import { useGetQuotationQuery } from '../api/useGetQuotatinQuery';

export const useGetQuotation = (search, page = 1) => {
  const {
    data: quotationData,
    status: quotationStatus,
    refetch,
  } = useGetQuotationQuery(search, page);
  return {
    quotationData,
    quotationStatus,
    refetch,
  };
};
