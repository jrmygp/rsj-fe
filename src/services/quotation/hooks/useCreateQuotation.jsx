import { useToast } from '@/hooks/use-toast';

import { useCreateQuotationMutation } from '../api/useCreateQuotationMutation';

export const useCreateQuotation = () => {
  const { toast } = useToast();

  const { mutate: createQuotationMutation, status: createQuotationStatus } =
    useCreateQuotationMutation({
      onSuccess: async (res) => {
        console.log(res);
        toast({
          title: 'Create Quotation Success',
        });
      },
      onError: (err) => {
        console.log(err);
      },
    });

  return { createQuotationMutation, createQuotationStatus };
};
