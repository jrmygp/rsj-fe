import { useToast } from '@/hooks/use-toast';
import { useCreateInvoiceMutation } from '../api/useCreateInvoiceMutation';

export const useCreateInvoice = () => {
  const { toast } = useToast();

  const { mutate: createInvoiceMutation, status: createInvoiceStatus } =
    useCreateInvoiceMutation({
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
