import { useGetExportInvoiceQuery } from '../api/useGetExportInvoiceQuery';

export const useGetExportInvoice = (search, page = 1, filter) => {
  const {
    data: invoiceData,
    status: invoiceStatus,
    refetch,
  } = useGetExportInvoiceQuery(search, page, filter);
  return {
    invoiceData,
    invoiceStatus,
    refetch,
  };
};
