import { useToast } from '@/hooks/use-toast';
import { useDeleteQuotationMutation } from '../api/useDeleteQuotationMutation';

export const useDeleteQuotation = () => {
  const { toast } = useToast();

  const { mutate: deleteQuotationMutation, status: deleteQuotationStatus } =
    useDeleteQuotationMutation({
      onSuccess: async () => {
        toast({
          variant: 'destructive',
          title: 'Delete Quotation Success',
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
  return { deleteQuotationMutation, deleteQuotationStatus };
};
