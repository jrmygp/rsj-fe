import { useToast } from '@/hooks/use-toast';
import { useDeletePortMutation } from '../api/useDeletePortMutation';

export const useDeletePort = () => {
  const { toast } = useToast();

  const { mutate: deletePortMutation, status: deletePortStatus } =
    useDeletePortMutation({
      onSuccess: async (res) => {
        toast({
          variant: 'destructive',
          title: 'Delete Port Success',
        });
      },
      onError: (err) => {
        console.log(err);
      },
    });
  return { deletePortMutation, deletePortStatus };
};
