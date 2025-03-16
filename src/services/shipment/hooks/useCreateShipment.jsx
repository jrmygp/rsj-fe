/* eslint-disable no-unused-vars */
import { useToast } from '@/hooks/use-toast';

import { useCreateShipmentMutation } from '../api/useCreateShipmentMutation';

export const useCreateShipment = () => {
  const { toast } = useToast();

  const { mutate: createShipmentMutation, status: createShipmentStatus } =
    useCreateShipmentMutation({
      onSuccess: async (res) => {
        toast({
          title: 'Create Shipment Success',
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

  return { createShipmentMutation, createShipmentStatus };
};
