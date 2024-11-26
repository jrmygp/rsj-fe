import { useUpdateCustomerMutation } from '../api/useUpdateCustomerMutation';
import { useToast } from '@/hooks/use-toast';
import { useGetCustomer } from './useGetCustomer';

export const useUpdateCustomer = () => {
  const { toast } = useToast();
  const { customerRefetch } = useGetCustomer();
  const { mutate: updateCustomerMutation, status: updateCustomerStatus } =
    useUpdateCustomerMutation({
      onSuccess: async (res) => {
        customerRefetch();
        toast({
          title: 'Update Customer Success',
        });
      },
      onError: (err) => {
        console.log(err);
      },
    });

  return { updateCustomerMutation, updateCustomerStatus };
};
