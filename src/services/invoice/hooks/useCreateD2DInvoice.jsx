import { useToast } from '@/hooks/use-toast';
import { useCreateD2DInvoiceMutation } from '../api/useCreateD2DInvoiceMutation';

export const useCreateD2DInvoice = () => {
  const { toast } = useToast();

  const { mutate: createInvoiceMutation, status: createInvoiceStatus } =
    useCreateD2DInvoiceMutation({
      onSuccess: async (res) => {
        console.log(res);
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
