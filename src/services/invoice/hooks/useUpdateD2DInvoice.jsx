/* eslint-disable no-unused-vars */
import { useToast } from '@/hooks/use-toast';
import { useUpdateD2DInvoiceMutation } from '../api/useUpdateD2DInvoiceMutation';

export const useUpdateD2DInvoice = () => {
  const { toast } = useToast();

  const { mutate: updateInvoiceMutation, status: updateInvoiceStatus } =
    useUpdateD2DInvoiceMutation({
      onSuccess: async (res) => {
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
