import { useToast } from '@/hooks/use-toast';
import { useUpdatePortMutation } from '../api/useUpdatePortMutation';
import { useGetPort } from './useGetPort';

export const useUpdatePort = () => {
  const { toast } = useToast();
  const { portRefetch } = useGetPort();
  const { mutate: updatePortMutation, status: updatePortStatus } =
    useUpdatePortMutation({
      onSuccess: async (res) => {
        console.log(res);
        portRefetch();
        toast({
          title: 'Update Port Success',
        });
      },
      onError: (err) => {
        console.log(err);
      },
    });

  return { updatePortMutation, updatePortStatus };
};
