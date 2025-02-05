import { useCreateCustomerMutation } from '../api/useCreateCustomerMutation';
import { useToast } from '@/hooks/use-toast';
import { useGetCustomer } from './useGetCustomer';

export const useCreateCustomer = () => {
  const { toast } = useToast();
  const { customerRefetch } = useGetCustomer();
  const { mutate: createCustomerMutation, status: createCustomerStatus } =
    useCreateCustomerMutation({
      onSuccess: async () => {
        customerRefetch();
        toast({
          title: 'Create Customer Success',
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

  return { createCustomerMutation, createCustomerStatus };
};
