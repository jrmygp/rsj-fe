import { useGetInvoiceQuery } from '../../invoice/api/useGetInvoiceQuery';

export const useGetInvoice = (search, page = 1, filter) => {
  const {
    data: invoiceData,
    status: invoiceStatus,
    refetch,
  } = useGetInvoiceQuery(search, page, filter);
  return {
    invoiceData,
    invoiceStatus,
    refetch,
  };
};
