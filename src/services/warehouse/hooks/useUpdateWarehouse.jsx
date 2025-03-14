import { useToast } from '@/hooks/use-toast';
import { useUpdateWarehouseMutation } from '../api/useUpdateWarehouseMutation';
import { useGetWarehouse } from './useGetWarehouse';

export const useUpdateWarehouse = () => {
  const { toast } = useToast();
  const { warehouseRefetch } = useGetWarehouse();
  const { mutate: updateWarehouseMutation, status: updateWarehouseStatus } =
    useUpdateWarehouseMutation({
      onSuccess: async () => {
        warehouseRefetch();
        toast({
          title: 'Update Warehouse Success',
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

  return { updateWarehouseMutation, updateWarehouseStatus };
};
