import { useToast } from '@/hooks/use-toast';
import { useUpdateQuotationMutation } from '../api/useUpdateQuotationMutation';

export const useUpdateQuotation = () => {
  const { toast } = useToast();

  const { mutate: updateQuotationMutation, status: updateQuotationStatus } =
    useUpdateQuotationMutation({
      onSuccess: async () => {
        toast({
          title: 'update Quotation Success',
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

  return { updateQuotationMutation, updateQuotationStatus };
};
