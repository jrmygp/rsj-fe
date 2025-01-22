import { useToast } from '@/hooks/use-toast';
import { useUpdateImportInvoiceMutation } from '../api/useUpdateImportInvoiceMutation';

export const useUpdateImportInvoice = () => {
  const { toast } = useToast();

  const { mutate: updateInvoiceMutation, status: updateInvoiceStatus } =
    useUpdateImportInvoiceMutation({
      onSuccess: async () => {
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
