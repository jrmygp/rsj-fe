import { useToast } from '@/hooks/use-toast';
import { useCreateWarehouseMutation } from '../api/useCreateWarehouseMutation';

export const useCreateWarehouse = () => {
  const { toast } = useToast();

  const { mutate: createWarehouseMutation, status: createWarehouseStatus } =
    useCreateWarehouseMutation({
      onSuccess: async () => {
        toast({
          title: 'Create Warehouse Success',
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

  return { createWarehouseMutation, createWarehouseStatus };
};
