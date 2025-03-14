import { useToast } from '@/hooks/use-toast';
import { useGetShipper } from './useGetShipper';
import { useUpdateShipperMutation } from '../api/useUpdatePortMutation';

export const useUpdateShipper = () => {
  const { toast } = useToast();
  const { shipperRefetch } = useGetShipper();
  const { mutate: updateShipperMutation, status: updateShipperStatus } =
    useUpdateShipperMutation({
      onSuccess: async () => {
        shipperRefetch();
        toast({
          title: 'Update Shipper Success',
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

  return { updateShipperMutation, updateShipperStatus };
};
