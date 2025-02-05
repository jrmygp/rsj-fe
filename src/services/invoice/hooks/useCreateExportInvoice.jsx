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
        toast({
          title: 'Error',
          description: err.response.data.error,
          variant: 'destructive',
        });
      },
    });

  return { createInvoiceMutation, createInvoiceStatus };
};
