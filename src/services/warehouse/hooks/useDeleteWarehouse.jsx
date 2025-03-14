import { useToast } from '@/hooks/use-toast';
import { useDeleteWarehouseMutation } from '../api/useDeleteWarehouseMutation';

export const useDeleteWarehouse = () => {
  const { toast } = useToast();

  const { mutate: deleteWarehouseMutation, status: deleteWarehouseStatus } =
    useDeleteWarehouseMutation({
      onSuccess: async () => {
        toast({
          variant: 'destructive',
          title: 'Delete Warehouse Success',
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
  return { deleteWarehouseMutation, deleteWarehouseStatus };
};
