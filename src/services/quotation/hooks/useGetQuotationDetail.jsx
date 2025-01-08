import { useGetQuotationDetailQuery } from '../api/useGetQuotationDetailQuery';

export const useGetQuotationDetail = (id) => {
  const {
    data: quotationDetailData,
    status: quotationDetailStatus,
    refetch,
  } = useGetQuotationDetailQuery(id);
  return {
    quotationDetailData,
    quotationDetailStatus,
    refetch,
  };
};
