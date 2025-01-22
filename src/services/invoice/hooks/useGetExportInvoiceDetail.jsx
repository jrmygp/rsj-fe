import { useGetExportInvoiceDetailQuery } from '../api/useGetExportInvoiceDetailQuery';

export const useGetExportInvoiceDetail = (id) => {
  const {
    data: invoiceDetailData,
    status: invoiceDetailStatus,
    refetch,
  } = useGetExportInvoiceDetailQuery(id);
  return {
    invoiceDetailData,
    invoiceDetailStatus,
    refetch,
  };
};
