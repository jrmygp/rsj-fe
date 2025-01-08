import { useGetInvoiceDetailQuery } from '../api/useGetInvoiceDetailQuery';

export const useGetInvoiceDetail = (id) => {
  const {
    data: invoiceDetailData,
    status: invoiceDetailStatus,
    refetch,
  } = useGetInvoiceDetailQuery(id);
  return {
    invoiceDetailData,
    invoiceDetailStatus,
    refetch,
  };
};
