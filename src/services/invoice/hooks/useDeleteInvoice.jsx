import { useToast } from '@/hooks/use-toast';
import { useDeleteInvoiceMutation } from '../api/useDeleteInvoiceMutation';

export const useDeleteInvoice = () => {
  const { toast } = useToast();

  const { mutate: deleteInvoiceMutation, status: deleteInvoiceStatus } =
    useDeleteInvoiceMutation({
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
