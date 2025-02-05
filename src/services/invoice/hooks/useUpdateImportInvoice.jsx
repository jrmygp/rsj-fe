import { useToast } from '@/hooks/use-toast';
import { useUpdateImportInvoiceMutation } from '../api/useUpdateImportInvoiceMutation';

export const useUpdateImportInvoice = () => {
  const { toast } = useToast();

  const { mutate: updateInvoiceMutation, status: updateInvoiceStatus } =
    useUpdateImportInvoiceMutation({
      onSuccess: async () => {
        toast({
          title: 'Update Invoice Success',
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

  return { updateInvoiceMutation, updateInvoiceStatus };
};
