import { useToast } from '@/hooks/use-toast';
import { useUpdatePortMutation } from '../api/useUpdatePortMutation';
import { useGetPort } from './useGetPort';

export const useUpdatePort = () => {
  const { toast } = useToast();
  const { portRefetch } = useGetPort();
  const { mutate: updatePortMutation, status: updatePortStatus } =
    useUpdatePortMutation({
      onSuccess: async () => {
        portRefetch();
        toast({
          title: 'Update Port Success',
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

  return { updatePortMutation, updatePortStatus };
};
