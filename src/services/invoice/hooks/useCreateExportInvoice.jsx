import { useToast } from '@/hooks/use-toast';
import { useCreateExportInvoiceMutation } from '../api/useCreateExportInvoiceMutation';

export const useCreateExportInvoice = () => {
  const { toast } = useToast();

  const { mutate: createInvoiceMutation, status: createInvoiceStatus } =
    useCreateExportInvoiceMutation({
      onSuccess: async () => {
        toast({
          title: 'Create Invoice Success',
        });
      },
      onError: (err) => {
        console.log(err);
      },
    });

  return { createInvoiceMutation, createInvoiceStatus };
};
