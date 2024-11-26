import { useToast } from '@/hooks/use-toast';
import { useDeleteCostMutation } from '../api/useDeleteCostMutation';

export const useDeleteCost = () => {
  const { toast } = useToast();

  const { mutate: deleteCostMutation, status: deleteCostStatus } =
    useDeleteCostMutation({
      onSuccess: async (res) => {
        toast({
          variant: 'destructive',
          title: 'Delete Cost Success',
        });
      },
      onError: (err) => {
        console.log(err);
      },
    });

  return { deleteCostMutation, deleteCostStatus };
};
