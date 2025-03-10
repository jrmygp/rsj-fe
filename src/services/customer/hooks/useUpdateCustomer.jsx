import { useUpdateCustomerMutation } from '../api/useUpdateCustomerMutation';
import { useToast } from '@/hooks/use-toast';
import { useGetCustomer } from './useGetCustomer';

export const useUpdateCustomer = () => {
  const { toast } = useToast();
  const { customerRefetch } = useGetCustomer();
  const { mutate: updateCustomerMutation, status: updateCustomerStatus } =
    useUpdateCustomerMutation({
      onSuccess: async () => {
        customerRefetch();
        toast({
          title: 'Update Customer Success',
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

  return { updateCustomerMutation, updateCustomerStatus };
};
