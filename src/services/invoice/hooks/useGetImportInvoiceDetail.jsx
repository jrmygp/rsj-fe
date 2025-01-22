import { useGetImportInvoiceDetailQuery } from '../api/useGetImportInvoiceDetailQuery';

export const useGetImportInvoiceDetail = (id) => {
  const {
    data: invoiceDetailData,
    status: invoiceDetailStatus,
    refetch,
  } = useGetImportInvoiceDetailQuery(id);
  return {
    invoiceDetailData,
    invoiceDetailStatus,
    refetch,
  };
};
