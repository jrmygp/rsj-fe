import { useToast } from '@/hooks/use-toast';
import { useDeleteD2DInvoiceMutation } from '../api/useDeleteD2DInvoiceMutation';

export const useDeleteD2DInvoice = () => {
  const { toast } = useToast();

  const { mutate: deleteInvoiceMutation, status: deleteInvoiceStatus } =
    useDeleteD2DInvoiceMutation({
      onSuccess: async () => {
        toast({
          variant: 'destructive',
          title: 'Delete Invoice Success',
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
  return { deleteInvoiceMutation, deleteInvoiceStatus };
};
