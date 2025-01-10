import { useGetD2DInvoiceDetailQuery } from '../api/useGetD2DInvoiceDetail';

export const useGetD2DInvoiceDetail = (id) => {
  const {
    data: invoiceDetailData,
    status: invoiceDetailStatus,
    refetch,
  } = useGetD2DInvoiceDetailQuery(id);
  return {
    invoiceDetailData,
    invoiceDetailStatus,
    refetch,
  };
};
