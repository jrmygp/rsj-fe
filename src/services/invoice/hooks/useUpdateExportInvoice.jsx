import { useToast } from '@/hooks/use-toast';
import { useUpdateExportInvoiceMutation } from '../api/useUpdateExportInvoiceMutation';

export const useUpdateExportInvoice = () => {
  const { toast } = useToast();

  const { mutate: updateInvoiceMutation, status: updateInvoiceStatus } =
    useUpdateExportInvoiceMutation({
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
