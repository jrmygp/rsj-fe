import { useToast } from '@/hooks/use-toast';
import { useCreatePortMutation } from '../api/useCreatePortMutation';

export const useCreatePort = () => {
  const { toast } = useToast();

  const { mutate: createPortMutation, status: createPortStatus } =
    useCreatePortMutation({
      onSuccess: async (res) => {
        toast({
          title: 'Create Port Success',
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

  return { createPortMutation, createPortStatus };
};
