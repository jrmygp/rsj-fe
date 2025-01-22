import { useToast } from '@/hooks/use-toast';
import { useDeleteImportInvoiceMutation } from '../api/useDeleteImportInvoiceMutation';

export const useDeleteImportInvoice = () => {
  const { toast } = useToast();

  const { mutate: deleteInvoiceMutation, status: deleteInvoiceStatus } =
    useDeleteImportInvoiceMutation({
      onSuccess: async () => {
        toast({
          variant: 'destructive',
          title: 'Delete Invoice Success',
        });
      },
      onError: (err) => {
        console.log(err);
      },
    });
  return { deleteInvoiceMutation, deleteInvoiceStatus };
};
