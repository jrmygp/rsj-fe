import { useToast } from '@/hooks/use-toast';
import { useUpdateD2DInvoiceMutation } from '../api/useUpdateD2DInvoiceMutation';

export const useUpdateD2DInvoice = () => {
  const { toast } = useToast();

  const { mutate: updateInvoiceMutation, status: updateInvoiceStatus } =
    useUpdateD2DInvoiceMutation({
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
