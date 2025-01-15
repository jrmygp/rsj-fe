import { useToast } from '@/hooks/use-toast';
import { useDeleteShipperMutation } from '../api/useDeleteShipperMutation';

export const useDeleteShipper = () => {
  const { toast } = useToast();

  const { mutate: deleteShipperMutation, status: deleteShipperStatus } =
    useDeleteShipperMutation({
      onSuccess: async (res) => {
        toast({
          variant: 'destructive',
          title: 'Delete Shipper Success',
        });
      },
      onError: (err) => {
        console.log(err);
      },
    });
  return { deleteShipperMutation, deleteShipperStatus };
};
