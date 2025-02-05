/* eslint-disable no-unused-vars */
import { useToast } from '@/hooks/use-toast';

import { useCreateQuotationMutation } from '../api/useCreateQuotationMutation';

export const useCreateQuotation = () => {
  const { toast } = useToast();

  const { mutate: createQuotationMutation, status: createQuotationStatus } =
    useCreateQuotationMutation({
      onSuccess: async (res) => {
        toast({
          title: 'Create Quotation Success',
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

  return { createQuotationMutation, createQuotationStatus };
};
