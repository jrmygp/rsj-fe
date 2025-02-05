import { useToast } from '@/hooks/use-toast';
import { useCreateD2DInvoiceMutation } from '../api/useCreateD2DInvoiceMutation';

export const useCreateD2DInvoice = () => {
  const { toast } = useToast();

  const { mutate: createInvoiceMutation, status: createInvoiceStatus } =
    useCreateD2DInvoiceMutation({
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
