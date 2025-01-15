import { useToast } from '@/hooks/use-toast';
import { useCreateShipperMutation } from '../api/useCreateShipperMutation';

export const useCreateShipper = () => {
  const { toast } = useToast();

  const { mutate: createShipperMutation, status: createShipperStatus } =
    useCreateShipperMutation({
      onSuccess: async (res) => {
        toast({
          title: 'Create Shipper Success',
        });
      },
      onError: (err) => {
        console.log(err);
      },
    });

  return { createShipperMutation, createShipperStatus };
};
