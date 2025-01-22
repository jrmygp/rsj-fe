import { useToast } from '@/hooks/use-toast';
import { useUpdateExportInvoiceMutation } from '../api/useUpdateExportInvoiceMutation';

export const useUpdateExportInvoice = () => {
  const { toast } = useToast();

  const { mutate: updateInvoiceMutation, status: updateInvoiceStatus } =
    useUpdateExportInvoiceMutation({
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
