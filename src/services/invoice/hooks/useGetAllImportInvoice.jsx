import { useGetAllImportInvoiceQuery } from '../api/useGetAllImportInvoiceQuery';

export const useGetAllImportInvoice = () => {
  const { data: invoiceData, status: invoiceStatus } =
    useGetAllImportInvoiceQuery();
  return {
    invoiceData,
    invoiceStatus,
  };
};
