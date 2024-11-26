import { useDeleteCustomerMutation } from '../api/useDeleteCustomerMutation';
import { useToast } from '@/hooks/use-toast';

export const useDeleteCustomer = () => {
  const { toast } = useToast();

  const { mutate: deleteCustomerMutation, status: deleteCustomerStatus } =
    useDeleteCustomerMutation({
      onSuccess: async (res) => {
        toast({
          variant: 'destructive',
          title: 'Delete Customer Success',
        });
      },
      onError: (err) => {
        console.log(err);
      },
    });

  return { deleteCustomerMutation, deleteCustomerStatus };
};
