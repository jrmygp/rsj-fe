import { useGetImportInvoiceQuery } from '../api/useGetImportInvoiceQuery';

export const useGetImportInvoice = (search, page = 1, filter) => {
  const {
    data: invoiceData,
    status: invoiceStatus,
    refetch,
  } = useGetImportInvoiceQuery(search, page, filter);
  return {
    invoiceData,
    invoiceStatus,
    refetch,
  };
};
