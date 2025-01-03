import { useGetD2DInvoiceQuery } from '../api/useGetD2DInvoiceQuery';

export const useGetD2DInvoice = (search, page = 1, filter) => {
  const {
    data: invoiceData,
    status: invoiceStatus,
    refetch,
  } = useGetD2DInvoiceQuery(search, page, filter);
  return {
    invoiceData,
    invoiceStatus,
    refetch,
  };
};
