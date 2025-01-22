import { useGetAllExportInvoiceQuery } from '../api/useGetAllExportInvoiceQuery';

export const useGetAllExportInvoice = () => {
  const { data: invoiceData, status: invoiceStatus } =
    useGetAllExportInvoiceQuery();
  return {
    invoiceData,
    invoiceStatus,
  };
};
