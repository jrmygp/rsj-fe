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
        console.log(err);
      },
    });

  return { updateQuotationMutation, updateQuotationStatus };
};
