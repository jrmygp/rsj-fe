import { useToast } from '@/hooks/use-toast';
import { useUpdateInvoiceMutation } from '../api/useUpdateInvoiceMutation';

export const useUpdateInvoice = () => {
  const { toast } = useToast();

  const { mutate: updateInvoiceMutation, status: updateInvoiceStatus } =
    useUpdateInvoiceMutation({
      onSuccess: async (res) => {
        console.log(res);
        toast({
          title: 'Update Invoice Success',
        });
      },
      onError: (err) => {
        console.log(err);
      },
    });

  return { updateInvoiceMutation, updateInvoiceStatus };
};
