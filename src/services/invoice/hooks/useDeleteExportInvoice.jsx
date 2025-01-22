import { useToast } from '@/hooks/use-toast';
import { useDeleteExportInvoiceMutation } from '../api/useDeleteExportInvoiceMutation';

export const useDeleteExportInvoice = () => {
  const { toast } = useToast();

  const { mutate: deleteInvoiceMutation, status: deleteInvoiceStatus } =
    useDeleteExportInvoiceMutation({
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
