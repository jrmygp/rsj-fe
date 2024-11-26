import { useToast } from '@/hooks/use-toast';

import { useCreateCostMutation } from '../api/useCreateCostMutation';

export const useCreateCost = () => {
  const { toast } = useToast();

  const { mutate: createCostMutation, status: createCostStatus } =
    useCreateCostMutation({
      onSuccess: async (res) => {
        toast({
          title: 'Create Cost Success',
        });
      },
      onError: (err) => {
        console.log(err);
      },
    });

  return { createCostMutation, createCostStatus };
};
