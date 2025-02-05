import { useToast } from '@/hooks/use-toast';
import { useUpdateCostMutation } from '../api/useUpdatePortMutation';

export const useUpdateCost = () => {
  const { toast } = useToast();

  const { mutate: updateCostMutation, status: updateCostStatus } =
    useUpdateCostMutation({
      onSuccess: async (res) => {
        toast({
          title: 'Update Cost Success',
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

  return { updateCostMutation, updateCostStatus };
};
