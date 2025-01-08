import { useGetAllInvoiceQuery } from '../api/useGetAllInvoiceQuery';

export const useGetAllInvoice = () => {
  const { data: invoiceData, status: invoiceStatus } = useGetAllInvoiceQuery();
  return {
    invoiceData,
    invoiceStatus,
  };
};
