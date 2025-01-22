import { useToast } from '@/hooks/use-toast';
import { useCreateImportInvoiceMutation } from '../api/useCreateImportInvoiceMutation';

export const useCreateImportInvoice = () => {
  const { toast } = useToast();

  const { mutate: createInvoiceMutation, status: createInvoiceStatus } =
    useCreateImportInvoiceMutation({
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
